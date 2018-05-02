<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Activitylog\Traits\LogsActivity;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use ChrisBraybrooke\ECommerce\Traits\HasColours;
use ChrisBraybrooke\ECommerce\Traits\Importable;
use ChrisBraybrooke\ECommerce\Traits\SluggableTrait;
use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;
use ChrisBraybrooke\ECommerce\Traits\HasMediaAttached;
use ChrisBraybrooke\ECommerce\Traits\HasContentAttached;
use ChrisBraybrooke\ECommerce\Scopes\LiveScope;
use ChrisBraybrooke\ECommerce\Events\CollectionTypeCreated;
use ChrisBraybrooke\ECommerce\Contracts\CollectionType as CollectionTypeContract;
use Carbon\Carbon;
use Collection;

class CollectionType extends Model implements CollectionTypeContract
{

    use LogsActivity, ResponsableTrait, FormatDatesTrait, SluggableTrait, SoftDeletes, HasMediaAttached,
    HasContentAttached, HasColours, Importable;

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(new LiveScope);
    }

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'created' => CollectionTypeCreated::class,
    ];


    /**
     * The default meta to create on creation
     *
     * @var array
     */
    public $defaultMeta = [
        'featured_colour' => '',
    ];

    /**
     * The default content to create on creation
     *
     * @var array
     */
    public $defaultContent = [
        ['content_name' => 'Main Content', 'content' => '', 'order' => 1, 'type' => 'quill'],
        ['content_name' => 'Features', 'content' => '', 'order' => 3],
        ['content_name' => 'Snippet', 'content' => '', 'order' => 2]
    ];

    /**
     * The attributes to log when changes are made.
     *
     * @var array
     */
    protected static $logAttributes = [
        'id', 'name', 'individual_name', 'live_at', 'slug', 'in_menu', 'collection_id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'individual_name', 'live_at', 'slug', 'in_menu', 'images', 'meta', 'list_order', 'collection_id'
    ];

    protected $hidden = ['pivot'];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'live_at'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'in_menu' => 'boolean',
        'last_login' => 'array',
        'meta' => 'array',
    ];

    /**
     * Set default event log message.
     *
     * @var String
     */
    public function getDescriptionForEvent(string $eventName): string
    {
        return "Collection Type was: {$eventName}";
    }

    /**
     * The collection which this collection type belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function collection(): BelongsTo
    {
        return $this->belongsTo(config('ecommerce.models.collection'));
    }

    /**
     * The products that belong to this collection type.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(config('ecommerce.models.product'));
    }

    /**
     * Return the full url for the collection type
     *
     * @return String
     */
    public function getUrlAttribute()
    {
        return url("collections/{$this->collection->slug}/{$this->slug}");
        return '#';
    }

    /**
     * Get meta using a key.
     *
     * @param String $key
     * @return Mixed
     */
    public function getMetaByKey($key)
    {
        if ($this->meta) {
            return array_key_exists($key, $this->meta) ? $this->meta[$key] : null;
        }
        return null;
    }

    /**
    * The validation rules for importing products.
    *
    * @return array
    */
    public function importValidationRules()
    {
        return [
            'name' => 'bail|required|max:255',
            'slug' => 'bail|max:255',
        ];
    }

    /**
    * The validation messages for importing products.
    *
    * @var Int $i
    * @return array
    */
    public function importValidationMessages($i)
    {
        return [
            'required' => 'The :attribute collumn is required on row ' . $i,
            'max' => 'The :attribute collumn should be under 255 characters'
        ];
    }

    /**
    * This gets called on each row when importing a product.
    *
    * @var Array $row
    * @var ChrisBraybrooke\ECommerce\Models\Import $import
    * @return array
    */
    public function importCreate($row, $import)
    {
        $contents = $this->formatImportMeta($row, $import, 'meta_');

        $formatted_contents = [];
        $i = count($this->defaultContent);
        foreach ($contents as $name => $content) {
            $i++;
            $content_is_array = is_array($content) ? true :  false;
            $formatted_contents[] = [
                'content_name' => ucfirst($name),
                'content' => $content_is_array ? json_encode($content) : $content,
                'lang' => $row['language'] ?? 'en',
                'type' => $content_is_array ? 'meta' : 'text',
                'order' => $i
            ];
        }

        $live_at = null;
        if (isset($row['live_at']) && !empty($row['live_at'])) {
            $live_at = Carbon::createFromFormat('d/m/Y', $row['live_at'])->toDateTimeString();
        } elseif (isset($row['live']) && $row['live']) {
            $live_at = Carbon::now()->toDateTimeString();
        }

        $collection_id = $row['collection_id'] ?? null;

        if (!$collection_id && isset($row['collection_name'])) {
            $collection = Collection::firstOrCreate(['name' => $row['collection_name']], [
                'name' => $row['collection_name'],
                'individual_name' => $row['collection_individual_name'] ?? null,
                'live_at' => $live_at,
                'slug' => $row['collection_slug'] ?? $row['collection_name'],
            ]);

            if ($collection->wasRecentlyCreated) {
                $import->models('collection')->attach($collection->id);
            }

            $collection_id = $collection->id;
        }

        $collection_type = self::create([
            'name' => $row['name'],
            'collection_id' => $collection_id,
            'individual_name' => $row['individual_name'] ?? null,
            'live_at' => $live_at,
            'slug' => $row['slug'] ?? $row['name'],
            'in_menu' => $row['in_menu'] ?? false,
            // 'images' => $row['name'],
            // 'meta' => $meta,
            'list_order' => $row['list_order'] ?? null,
        ]);

        $collection_type->content()->createMany($formatted_contents);

        $import->models('collection_type')->attach($collection_type->id);

        return $collection_type;
    }
}
