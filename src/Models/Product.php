<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Traits\ResponsableTrait;
use App\Traits\SluggableTrait;
use App\Traits\FormatDatesTrait;
use App\Traits\HasMediaAttached;
use App\Traits\HasContentAttached;
use App\Scopes\LiveScope;
use App\Collection;
use App\Events\ProductCreated;
use App\CollectionType;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{

    use LogsActivity, ResponsableTrait, FormatDatesTrait, SluggableTrait, SoftDeletes, HasMediaAttached, HasContentAttached;

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
        'created' => ProductCreated::class,
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

    ];

    /**
     * The default content to create on creation
     *
     * @var array
     */
    public $defaultContent = [
        ['content_name' => 'Main Content', 'content' => ''],
        ['content_name' => 'Snippet', 'content' => '']
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'use_variant_data', 'live_at', 'slug', 'price', 'use_variant_customisation', 'can_customise',
        'list_in_shop'
    ];

    /**
     * The attributes to log when changes are made.
     *
     * @var array
     */
    protected static $logAttributes = [
        'id', 'name', 'live_at', 'slug', 'price', 'use_variant_customisation', 'can_customise',
        'list_in_shop'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'use_variant_data' => 'boolean',
        'use_variant_customisation' => 'boolean'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'live_at'
    ];

    /**
     * Set default event log message.
     *
     * @var String
     */
    public function getDescriptionForEvent(string $eventName): string
    {
        return "Product was: {$eventName}";
    }

    /**
     * The collection types that this product is associated with.
     *
     * @return App\CollectionType
     */
    public function collectionTypes()
    {
        return ($this->variant && $this->use_variant_data) ?
            $this->variant->collectionTypes() :
            $this->belongsToMany('App\CollectionType')
                 ->with('collection:id,name')
                 ->withTimestamps();
    }

    /**
     * The collection types that this product is associated with.
     *
     * @return App\ProductCustomisation
     */
    public function customisations()
    {
        return $this->hasMany('App\ProductCustomisation');
    }

    /**
     * Add a scope to pull products that belong to a certain collectiontype
     *
     * @param $query
     * @param App\CollectionType $collection_type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWhereCollectionType($query, CollectionType $collection_type)
    {
        return $query->join('collection_type_product', 'products.id', '=', 'collection_type_product.product_id')
                     ->where('collection_type_product.collection_type_id', $collection_type->id);
    }

    /**
    * Group the collection Types.
    *
    * @param Boolean $includeTypes
    * @param Boolean $includeTypesSync
    * @return Array
    */
    public function groupedCollectionTypes($includeTypes = true, $includeTypesSync = true)
    {
        $collectionTypes = $this->collectionTypes;

        $formatted_collections = [];

        foreach ($collectionTypes->groupBy('collection.name') as $collection_name => $collections) {
            $formatted_collection = [];
            foreach ($collections as $key => $collection) {
                $formatted_collection[] = [
                    'id' => $collection['id'],
                    'name' => $collection['name'],
                    'individual_name' => $collection['individual_name'],
                    'main_img' => $collection['main_img'],
                    'slug' => $collection['slug'],
                    'live_at' => $collection['live_at'],
                    'created_at' => $collection['created_at'],
                    'updated_at' => $collection['updated_at'],
                ];
            }
            $formatted_collections[$collection_name] = $formatted_collection;
        }

        $formatted_sync_collections = [];

        foreach ($collectionTypes->groupBy('collection.id') as $collection_id => $collections) {
            $formatted_sync_collection = [];
            foreach ($collections as $key => $collection) {
                $formatted_sync_collection[] = $collection['id'];
            }
            $formatted_sync_collections[$collection_id] = $formatted_sync_collection;
        }

        foreach (Collection::get() as $key => $collection) {
            if (!isset($formatted_sync_collections[$collection['id']])) {
                $formatted_sync_collections[$collection['id']] = [];
            }
        }

        $groupedCollectionsArray = [];

        if ($includeTypesSync) {
            $groupedCollectionsArray['collection_types_sync'] = $formatted_sync_collections;
        }
        if ($includeTypes) {
            $groupedCollectionsArray['collection_types'] = $formatted_collections;
        }

        return $groupedCollectionsArray;
    }

    /**
    * If the pruct is a variant then what is a variant of?
    *
    * @return App\Product
    */
    public function variant()
    {
        return $this->belongsTo('App\Product', 'variant_id', 'id');
    }

    /**
    * If the pruct is a variant then what is a variant of?
    *
    * @return App\Product
    */
    public function getIsVariantAttribute()
    {
        return !empty($this->variant_id);
    }

    /**
    * Display any variants of this product.
    *
    * @return App\Product
    */
    public function variants()
    {
        return $this->hasMany('App\Product', 'variant_id', 'id');
    }
}
