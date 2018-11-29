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
        $mappings = config('ecommerce.shop_data.collection_mappings');

        return [
          'url' => Setting::get('url'),
          'currency' => Setting::get('Currency'),
          'phone' => Setting::get('Contact Phone'),
          'orders' => $this->when(Auth::guard('api')->check(), function () {
              return Order::processing()->get()->count();
          }),
          'collection_mappings' => $this->when(Auth::guard('api')->check(), function () use ($mappings) {
              return $mappings;
          }),
          'collection_mappings_values' => $this->when(Auth::guard('api')->check(), function () use ($mappings) {
            $values = [];
            foreach ($mappings as $key => $mapping) {
                  $values[$mapping] = Setting::get($mapping);
            }
            return $values;
          }),
          'site_images' => $this->when(Auth::guard('api')->check(), function () {
              return config('ecommerce.shop_data.site_images');
          }),
        ];
    }
}
