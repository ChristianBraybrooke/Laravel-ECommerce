<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use Setting;
use Order;
use Auth;

class ShopResource extends Resource
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
          'url' => Setting::get('url'),
          'currency' => Setting::get('Currency'),
          // 'cart_url' => route('cart.add'),
          'phone' => Setting::get('Contact Phone'),
          'orders' => $this->when(Auth::guard('api')->check(), function () {
              return Order::processing()->get()->count();
          }),
        ];
    }
}
