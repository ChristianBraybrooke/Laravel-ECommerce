<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use ChrisBraybrooke\ECommerce\Traits\SluggableTrait;
use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;
use ChrisBraybrooke\ECommerce\Traits\HasMediaAttached;
use ChrisBraybrooke\ECommerce\Traits\HasContentAttached;
use ChrisBraybrooke\ECommerce\Scopes\LiveScope;
use ChrisBraybrooke\ECommerce\Events\PageCreated;

class Page extends Model
{
    use LogsActivity, ResponsableTrait, FormatDatesTrait, SluggableTrait, SoftDeletes, HasMediaAttached,
    HasContentAttached;

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
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'created' => PageCreated::class,
    ];

    /**
     * The default meta to create on creation
     *
     * @var array
     */
    public $defaultMeta = [
        'featured_colour' => '',
    ];

    /**
     * The default content to create on creation
     *
     * @var array
     */
    public $defaultContent = [
      ['content_name' => 'Name', 'content' => '', 'type' => 'text', 'order' => 1],
      ['content_name' => 'Main Content', 'content' => '', 'type' => 'quill', 'order' => 2],
      ['content_name' => 'Snippet', 'content' => '', 'type' => 'textarea', 'order' => 3]
    ];

    /**
     * The attributes to log when changes are made.
     *
     * @var array
     */
    protected static $logAttributes = [
        'id', 'name', 'parent_id', 'in_menu', 'slug', 'live_at', 'meta'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
      'name', 'parent_id', 'in_menu', 'slug', 'live_at', 'meta'
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
        'meta' => 'array',
    ];

    /**
     * Set default event log message.
     *
     * @var String
     */
    public function getDescriptionForEvent(string $eventName): string
    {
        return "Page was: {$eventName}";
    }
}
