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

        if ($order->status === Order::$statuses['STATUS_PROCESSING']) {
            $order->createInvoiceAndSend();
        }

        if (!$order->ref) {
            $order->update(['ref' => $order->id]);
        }

        $admin_ids = Setting::get('Admin Notifications');
        $cart_id = $event->model->cart_data['id'] ?? false;
        if ($admin_ids && $cart_id) {
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
