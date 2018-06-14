<?php

namespace ChrisBraybrooke\ECommerce\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use ChrisBraybrooke\ECommerce\Services\PaymentService;

class CreateStripeCustomer implements ShouldQueue
{
    private $payment_service;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(PaymentService $payment_service)
    {
        $this->payment_service = $payment_service;
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        $user = $event->user;

        $this->payment_service->createCustomer($user);
    }
}
