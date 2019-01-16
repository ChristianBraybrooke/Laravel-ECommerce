<?php

namespace ChrisBraybrooke\ECommerce\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use ChrisBraybrooke\ECommerce\Services\PaymentService;
use Order;

class HandleOrderStatusChange
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
        $order = $event->model;

        if ($order->status === Order::$statuses['STATUS_PROCESSING']) {
            $order->createInvoiceAndSend();
        }

        if ($order->status === Order::$statuses['STATUS_COMPLETED']) {
            $order->sendCompleteNotification();
        }
    }
}
