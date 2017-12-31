<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Traits\ResponsableTrait;
use App\Traits\FormatDatesTrait;

class ProductCustomisation extends Model
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
     * @return App\ProductCustomisationOption
     */
    public function options()
    {
        return $this->hasMany('App\ProductCustomisationOption');
    }
}
