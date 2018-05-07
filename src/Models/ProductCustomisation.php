<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\Traits\LogsActivity;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;
use ChrisBraybrooke\ECommerce\Contracts\ProductCustomisation as ProductCustomisationContract;

class ProductCustomisation extends Model implements ProductCustomisationContract
{
    use LogsActivity, ResponsableTrait, FormatDatesTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'order'
    ];

    /**
     * The attributes to log when changes are made.
     *
     * @var array
     */
    protected static $logAttributes = [
        'id', 'name', 'order'
    ];

    /**
     * Set default event log message.
     *
     * @var String
     */
    public function getDescriptionForEvent(string $eventName): string
    {
        return "Product Customisation was: {$eventName}";
    }

    /**
     * The product customisation options that this product customisation is associated with.
     *
     * @return ChrisBraybrooke\ECommerce\ProductCustomisationOption
     */
    public function options(): HasMany
    {
        return $this->hasMany(config('ecommerce.models.product_customisation_option'));
    }

    /**
     * Get the attributes to be merged into the API resource.
     *
     * @return Array
     */
    function getResourceAttributes()
    {
        return [
            //
        ];
    }
}
