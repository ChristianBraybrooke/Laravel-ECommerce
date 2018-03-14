<?php

namespace ChrisBraybrooke\ECommerce\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use ChrisBraybrooke\ECommerce\Notifications\NewOrderNotification;
use Notification;

class SendOrderNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $order;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($order)
    {
        $this->order = $order;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Notification::route('mail', $this->order->user_email)
                    ->notify(new NewOrderNotification($this->order));

        activity()
           ->performedOn($this->order)
           ->log("Order confirmation email sent to {$this->order->user_email}");
    }
}
