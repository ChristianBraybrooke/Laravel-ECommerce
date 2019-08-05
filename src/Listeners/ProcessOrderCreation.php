<?php

namespace ChrisBraybrooke\ECommerce\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Notification;
use ChrisBraybrooke\ECommerce\Notifications\SendAdminOrderNotification;
use Setting;
use App\User;
use Order;

class ProcessOrderCreation implements ShouldQueue
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

        // If order was created and immedietly paid for / marked as processing.
        if ($order->status === Order::$statuses['STATUS_PROCESSING']) {
            $order->createInvoiceAndSend();
        }

        // If order was created but still needs paying for (most orders)
        if ($order->status === Order::$statuses['STATUS_AWAITING_PAYMENT']) {
            $order->hasBeenInvoiced();

            // If there is a full payment then updated the status.
            if ($order->isFullyPaid()) {
                $order->updateStatus('STATUS_PROCESSING');
            }
        }

        // If for some reason there is no ref, create one!
        if (!$order->ref) {
            $order->update(['ref' => $order->id]);
        }

        // If there are admin notifications and the order is a web order.
        $admin_ids = Setting::get('Admin Notifications');
        if ($admin_ids && $order->channel === 'Web') {
            $admins = User::whereIn('id', $admin_ids)->get();

            Notification::route('mail', $admins)
                        ->notify(new SendAdminOrderNotification($event->model));

            $admin_emails = [];
            foreach ($admins as $key => $admin) {
                $admin_emails[] = $admin->email;
            }
            $admin_emails = implode(", ", $admin_emails);

            activity()
               ->performedOn($event->model)
               ->log("New Order notification email sent to admins: {$admin_emails}");
        }
    }
}
