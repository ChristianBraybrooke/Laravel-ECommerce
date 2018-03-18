<?php

namespace ChrisBraybrooke\ECommerce\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Notification;
use ChrisBraybrooke\ECommerce\Notifications\SendAdminOrderNotification;
use ChrisBraybrooke\ECommerce\Notifications\SendOrderNotification;
use ChrisBraybrooke\ECommerce\CreateOrderInvoicePdf;
use Setting;
use App\User;

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
        if (isset($event->model->status) && $event->model->status === 'Processing') {
            CreateOrderInvoicePdf::withChain([
                new SendOrderNotification($event->model),
            ])->dispatch($event->model);
        }

        $admin_ids = Setting::get('Admin Notifications');
        if ($admin_ids) {
            $admins = User::whereIn('id', $admin_ids)->get();

            Notification::route('mail', $admins)
                        ->notify(new SendAdminOrderNotification($event->model));
        }
    }
}
