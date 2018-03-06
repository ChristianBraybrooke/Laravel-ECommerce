<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use ChrisBraybrooke\ECommerce\Traits\SluggableTrait;
use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;
use ChrisBraybrooke\ECommerce\Traits\HasMediaAttached;
use ChrisBraybrooke\ECommerce\Scopes\LiveScope;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use ChrisBraybrooke\ECommerce\Contracts\Collection as CollectionContract;

class Collection extends Model implements CollectionContract
{
    use LogsActivity, ResponsableTrait, FormatDatesTrait, SluggableTrait, SoftDeletes, HasMediaAttached;

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
     * The attributes to log when changes are made.
     *
     * @var array
     */
    protected static $logAttributes = [
        'id', 'name', 'individual_name', 'live_at', 'slug', 'index_template',
        'single_template', 'meta'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'individual_name', 'live_at', 'slug', 'in_menu', 'images', 'index_template',
        'single_template', 'meta', 'default_type_meta'
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
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'in_menu' => 'boolean',
        'images' => 'array',
        'meta' => 'array',
        'default_type_meta' => 'array',
    ];

    /**
     * Set default event log message.
     *
     * @var String
     */
    public function getDescriptionForEvent(string $eventName): string
    {
        return "Collection was: {$eventName}";
    }

    /**
     * The collection types within this collection.
     *
     * @return ChrisBraybrooke\ECommerce\CollectionType
     */
    public function types(): HasMany
    {
        return $this->hasMany(config('ecommerce.models.collection_type'));
    }
}
