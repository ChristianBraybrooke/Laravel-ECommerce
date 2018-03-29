<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;
use ChrisBraybrooke\ECommerce\Traits\HasMediaAttached;
use ChrisBraybrooke\ECommerce\Events\ImportCreated;
use ChrisBraybrooke\ECommerce\Events\ImportUpdated;

class Import extends Model
{
    use  ResponsableTrait, FormatDatesTrait, HasMediaAttached;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'import_to', 'user_id', 'rows_added', 'rows_not_added', 'status', 'import_data'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'import_data' => 'array',
    ];

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'created' => ImportCreated::class,
        'updated' => ImportUpdated::class,
    ];
}
