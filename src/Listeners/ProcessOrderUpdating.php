<?php

namespace ChrisBraybrooke\ECommerce\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use ChrisBraybrooke\ECommerce\Jobs\CreateOrderInvoicePdf;
use ChrisBraybrooke\ECommerce\Jobs\SendOrderNotification;
use ChrisBraybrooke\ECommerce\Notifications\SendOrderCompleteNotification;
use Notification;
use Order;

class ProcessOrderUpdating implements ShouldQueue
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
        //
    }
}
