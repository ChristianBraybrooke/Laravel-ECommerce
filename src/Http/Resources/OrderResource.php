<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use ChrisBraybrooke\ECommerce\Http\Resources\ShopResource;
use ChrisBraybrooke\ECommerce\Http\Resources\ContentsResource;

class OrderResource extends Resource
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
            'status' => $this->status,
            'invoice' => $this->invoice,
            'customer' => $this->customer,
            'content' => new ContentsResource($this->whenLoaded('content')),
            'use_billing_for_shipping' => $this->use_billing_for_shipping,
            'billing_address' => $this->billing_address,
            'shipping_address' => $this->shipping_address,
            'needs_address' => $this->needs_address,
            'cart' => $this->cart,
            'items' => $this->items,
            'amount' => $this->payment_amount,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'payment_method' => $this->payment_method,
            'payment_id' => $this->payment_id,
            'send_auto_emails' => $this->send_auto_emails,
            'amount_paid' => $this->payment_amount,
            'delivery_cost' => $this->delivery_cost,
            'delivery_date' => $this->delivery_date,
            'thank_you_email_sent' => $this->thank_you_email_sent,
            'shipping_email_sent' => $this->shipping_email_sent,
        ];
    }

    /**
     * Get additional data that should be returned with the resource array.
     *
     * @param \Illuminate\Http\Request  $request
     * @return array
     */
    public function with($request)
    {
        $shop = new ShopResource($request);
        return [
            'shop_data' => $shop->toArray($request),
            'statuses' => $this->getStatuses()
        ];
    }
}
