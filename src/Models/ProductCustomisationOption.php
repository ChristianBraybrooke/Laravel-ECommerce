<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Traits\ResponsableTrait;
use App\Traits\FormatDatesTrait;
use App\Traits\HasMediaAttached;
use App\Traits\HasContentAttached;

class ProductCustomisationOption extends Model
{
    use LogsActivity, ResponsableTrait, FormatDatesTrait, HasMediaAttached, HasContentAttached;

    /**
     * The default relations to load
     *
     * @var array
     */
    protected $with = ['content'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'product_customisation_id', 'default'
    ];

    /**
     * The attributes to log when changes are made.
     *
     * @var array
     */
    protected static $logAttributes = [
        'id', 'name', 'product_customisation_id', 'default'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'default' => 'boolean',
    ];

    /**
     * Set default event log message.
     *
     * @var String
     */
    public function getDescriptionForEvent(string $eventName): string
    {
        return "Product Customisation Option was: {$eventName}";
    }
}
