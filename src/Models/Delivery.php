<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'order_id', 'batch_id', 'notification_name', 'notification_email', 'notification_phone',
        'cost', 'amount', 'courrier_name', 'collection_date', 'planned_delivery_date',
        'delivery_date', 'confirmation_notification_sent_at', 'delivery_notification_sent_at',
        'delivered_notification_sent_at', 'notes'
    ];
}
