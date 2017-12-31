<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Traits\ResponsableTrait;
use App\Traits\HasColours;
use App\Traits\SluggableTrait;
use App\Traits\FormatDatesTrait;
use App\Traits\HasMediaAttached;
use App\Traits\HasContentAttached;
use App\Scopes\LiveScope;
use App\Events\CollectionTypeCreated;

class CollectionType extends Model
{

    use LogsActivity, ResponsableTrait, FormatDatesTrait, SluggableTrait, SoftDeletes, HasMediaAttached,
    HasContentAttached, HasColours;

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
     * The default relations to load
     *
     * @var array
     */
    protected $with = ['content'];

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
        ['content_name' => 'Main Content', 'content' => ''],
        ['content_name' => 'Features', 'content' => ''],
        ['content_name' => 'Snippet', 'content' => '']
    ];

    /**
     * The attributes to log when changes are made.
     *
     * @var array
     */
    protected static $logAttributes = [
        'id', 'name', 'individual_name', 'live_at', 'slug', 'in_menu'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'individual_name', 'live_at', 'slug', 'in_menu', 'images', 'meta', 'list_order'
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
    public function collection()
    {
        return $this->belongsTo('App\Collection');
    }

    /**
     * The products that belong to this collection type.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function products()
    {
        return $this->belongsToMany('App\Product');
    }

    /**
     * Return the full url for the collection type
     *
     * @return String
     */
    public function getUrlAttribute()
    {
        return url("{$this->collection->slug}/{$this->slug}");
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
}
