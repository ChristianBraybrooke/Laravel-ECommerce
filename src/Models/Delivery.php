<?php

namespace ChrisBraybrooke\ECommerce\Models;

use ChrisBraybrooke\ECommerce\Events\DeliveryCreated;
use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;
use ChrisBraybrooke\ECommerce\Traits\HasContentAttached;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class Delivery extends Model
{
    use LogsActivity, ResponsableTrait, FormatDatesTrait, HasContentAttached, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'order_id', 'batch_id', 'notification_name', 'notification_email', 'notification_phone',
        'cost', 'amount', 'courrier_name', 'collection_date', 'planned_delivery_date', 'delivery_date',
        'confirmation_notification_sent_at', 'delivery_notification_sent_at', 'notes'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at', 'planned_delivery_date', 'delivery_date', 'confirmation_notification_sent_at', 'delivery_notification_sent_at', 'collection_date'];

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'created' => DeliveryCreated::class
    ];

    /**
     * The order in which this delivery belongs to.
     *
     * @return \Ecommerce\Models\Order
     */
    public function order()
    {
        return $this->belongsTo(config('ecommerce.models.order'));
    }

    /**
     * Put together the mail message for a new delivery.
     *
     * @param  \Illuminate\Notifications\Messages\MailMessage $mailMessage
     * @param  \App\User $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function newDeliveryMailMessage($mailMessage)
    {
        return $mailMessage->subject(config('app.name', 'TCO') . " Order #{$this->order->ref} Delivery Confirmation")
            ->greeting("Order #{$this->order->ref} is being delivered soon!")
            ->line('This is a notification to let you know that your recent order will be delivered soon, the estimated delivery date can be found below.')
            ->line('**We hope to have your order delivered by: ' . $this->planned_delivery_date->format('d/m/Y') . '**');
    }
}
