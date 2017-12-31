<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Spatie\Permission\Models\Role as BaseRole;
use Spatie\Permission\Contracts\Role as RoleContract;

class Role extends BaseRole implements RoleContract
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'guard_name', 'created_at', 'updated_at', 'level'
    ];
}
