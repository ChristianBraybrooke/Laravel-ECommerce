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
        'reference', 'method', 'currency', 'amount', 'fee', 'source_id', 'source_brand',
        'source_country', 'source_last4', 'source_exp_month', 'source_exp_year'
    ];

    /**
     * The attributes to log when changes are made.
     *
     * @var array
     */
    protected static $logAttributes = [
        'reference', 'method', 'currency', 'amount', 'fee', 'source_id', 'source_brand',
        'source_country', 'source_last4', 'source_exp_month', 'source_exp_year'
    ];
}
