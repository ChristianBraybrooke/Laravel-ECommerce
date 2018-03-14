<?php

namespace ChrisBraybrooke\ECommerce\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class CreateMetaOnCreation
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        if (isset($event->model->defaultMeta) && !empty($event->model->defaultMeta)) {
            $event->model->update(['meta' => $event->model->defaultMeta]);
        }
    }
}
