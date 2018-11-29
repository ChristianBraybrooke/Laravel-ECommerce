<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use ChrisBraybrooke\ECommerce\Http\Resources\ShopResource;
use ChrisBraybrooke\ECommerce\Http\Resources\RolesResource;

class UserResource extends Resource
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
            'name' => [
                'first' => $this->first_name,
                'last' => $this->last_name,
                'full' => $this->name
            ],
            'billing_address' => [
                'line_1' => $this->billing_address_line1,
                'line_2' => $this->billing_address_line2,
                'town' => $this->billing_address_town,
                'county' => $this->billing_address_county,
                'postcode' => $this->billing_address_postcode,
                'country' => $this->billing_address_country,
                'company' => $this->billing_address_company,
                'name' => $this->billing_address_name,
            ],
            'shipping_address' => [
                'line_1' => $this->shipping_address_line1,
                'line_2' => $this->shipping_address_line2,
                'town' => $this->shipping_address_town,
                'county' => $this->shipping_address_county,
                'postcode' => $this->shipping_address_postcode,
                'country' => $this->shipping_address_country,
                'company' => $this->shipping_address_company,
                'name' => $this->shipping_address_name,
            ],
            'gender' => $this->gender,
            'phone' => $this->phone,
            'company' => $this->company,
            'timezone' => $this->timezone,
            'language' => $this->language,
            'email' => $this->email,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'roles' => new RolesResource($this->whenLoaded('roles')),
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
            'shop_data' => $shop->toArray($request)
        ];
    }
}
