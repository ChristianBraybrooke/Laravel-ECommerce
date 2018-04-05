<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use ChrisBraybrooke\ECommerce\Http\Resources\ShopResource;

class FormResource extends Resource
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
            'name' => $this->name,
            'is_order_form' => $this->when(requestIncludes('is_order_form'), $this->is_order_form),
            'effects_price' => $this->when(requestIncludes('effects_price'), $this->effects_price),
            $this->mergeWhen($this->relationLoaded('sections'), [
                'sections' => new FormSectionsResource($this->sections)
            ]),
            'created_at' => $this->created_at
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
