<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use ChrisBraybrooke\ECommerce\Http\Resources\ShopResource;
use ChrisBraybrooke\ECommerce\Http\Resources\ContentsResource;
use ChrisBraybrooke\ECommerce\Http\Resources\PaymentResource;
use Order;

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
            'ref' => $this->ref,
            'status' => $this->status,
            'invoice' => $this->invoice,
            'customer' => $this->customer,
            'use_billing_for_shipping' => $this->use_billing_for_shipping,
            'billing_address' => $this->billing_address,
            'shipping_address' => $this->shipping_address,
            'needs_address' => $this->needs_address,
            'cart' => $this->cart,
            'items' => $this->items,
            'payment_amount' => $this->payment_amount,
            'send_auto_emails' => $this->send_auto_emails,
            'thank_you_email_sent' => $this->thank_you_email_sent,
            'shipping_email_sent' => $this->shipping_email_sent,
            'payments' => new PaymentsResource($this->whenLoaded('payments')),
            'content' => new ContentsResource($this->whenLoaded('content')),
            'invoiced_at' => $this->invoiced_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
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
        if (!requestIncludes('no_shop_data')) {
            $shop = new ShopResource($request);
            return [
                'shop_data' => $shop->toArray($request),
                'statuses' => Order::getStatuses()
            ];
        }
        return [
            'statuses' => Order::getStatuses()
        ];
    }
}
