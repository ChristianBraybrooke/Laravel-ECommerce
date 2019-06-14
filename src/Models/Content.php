<?php

namespace ChrisBraybrooke\ECommerce\Models;

use ChrisBraybrooke\ECommerce\Events\ContentUpdated;
use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    use FormatDatesTrait, ResponsableTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'content_name', 'content', 'lang', 'type', 'order'
    ];

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'updated' => ContentUpdated::class,
    ];

    /**
     * Get and format the content attribute.
     *
     * @param  string $value
     * @return mixed
     */
    public function getContentAttribute($value)
    {
        return $this->type === 'json' ? json_decode($value) : $value;
    }

    /**
     * Set and format the content attribute.
     *
     * @param  string $value
     * @return void
     */
    public function setContentAttribute($value)
    {
        $this->attributes['content'] = ($this->type === 'json' ? json_encode($value) : $value);
    }
}
