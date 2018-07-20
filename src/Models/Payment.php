<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;


class Payment extends Model
{
    use LogsActivity, ResponsableTrait, FormatDatesTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id', 'reference', 'method', 'currency', 'amount', 'fee', 'source_id', 'source_brand',
        'source_country', 'source_last4', 'source_exp_month', 'source_exp_year', 'refunded', 'notes'
    ];

    /**
     * The attributes to log when changes are made.
     *
     * @var array
     */
    protected static $logAttributes = [
        'order_id', 'reference', 'method', 'currency', 'amount', 'fee', 'source_id', 'source_brand',
        'source_country', 'source_last4', 'source_exp_month', 'source_exp_year', 'refunded', 'notes'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'refunded' => 'boolean',
    ];

    public function validationRules()
    {
        return [

        ];
    }

    public function validationMessages()
    {
        return [

        ];
    }

    /**
     * Set default event log message.
     *
     * @var String
     */
    public function getDescriptionForEvent(string $eventName): string
    {
        return "Payment was: {$eventName}";
    }
}
