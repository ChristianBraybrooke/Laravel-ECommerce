<?php

namespace ChrisBraybrooke\ECommerce\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use ChrisBraybrooke\ECommerce\Jobs\CreateOrderInvoicePdf;
use ChrisBraybrooke\ECommerce\Jobs\SendOrderNotification;
use ChrisBraybrooke\ECommerce\Notifications\SendOrderCompleteNotification;
use Notification;

class ProcessOrderUpdate implements ShouldQueue
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
        if (isset($event->model->status) && $event->model->getOriginal('status') !== 'Processing' && $event->model->status === 'Processing') {
            CreateOrderInvoicePdf::withChain([
                new SendOrderNotification($event->model),
            ])->dispatch($event->model);
        }

        if (isset($event->model->status) && $event->model->getOriginal('status') !== 'Completed' && $event->model->status === 'Completed') {
            Notification::route('mail', $event->model->user_email)
            ->notify(new SendOrderCompleteNotification($event->model));

            activity()
               ->performedOn($event->model)
               ->log("Order complete email sent to {$event->model->user_email}");
        }
    }
}
