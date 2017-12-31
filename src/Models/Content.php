<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\FormatDatesTrait;
use App\Traits\ResponsableTrait;

class Content extends Model
{
    use FormatDatesTrait, ResponsableTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'content_name', 'content'
    ];
}
