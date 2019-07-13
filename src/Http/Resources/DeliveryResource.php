<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class DeliveryResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'batch_id' => $this->batch_id,
            'planned_delivery_date' => optional($this->planned_delivery_date)->format('d-m-Y'),
            'collection_date' => optional($this->collection_date)->format('d-m-Y'),

            'notification_name' => $this->notification_name,
            'notification_email' => $this->notification_email,
            'notification_phone' => $this->notification_phone,
            'notes' => $this->notes,

            'courrier_company' => $this->courrier_company,
            'courrier_name' => $this->courrier_name,
            'courrier_email' => $this->courrier_email,
            'courrier_phone' => $this->courrier_phone,
            'courrier_notes' => $this->courrier_notes,
            'courrier_invoice_received_at' => optional($this->courrier_invoice_received_at)->format('d-m-Y'),

            'cost' => $this->cost,
            'amount' => $this->amount,

            'delivery_date' => $this->delivery_date,
            'confirmation_notification_sent_at' => $this->confirmation_notification_sent_at,
            'delivery_notification_sent_at' => $this->delivery_notification_sent_at,
            'courrier_invoice_recieved_at' => $this->courrier_invoice_recieved_at
        ];
    }
}