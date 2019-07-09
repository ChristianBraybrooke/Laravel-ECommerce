<?php

namespace ChrisBraybrooke\ECommerce\Listeners;

use ChrisBraybrooke\ECommerce\Notifications\NewDeliveryNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class SendNewDeliveryConfirmation
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
        $order = $event->delivery->order;

        Notification::route('mail', $order->user_email)
                    ->notify(new NewDeliveryNotification($event->delivery));
    }
}
