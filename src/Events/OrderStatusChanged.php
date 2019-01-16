<?php

namespace ChrisBraybrooke\ECommerce\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class OrderStatusChanged
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $model;

    public $oldStatus;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($order, $oldStatus)
    {
        $this->model = $order;
        $this->oldStatus = $oldStatus;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        //
    }
}
