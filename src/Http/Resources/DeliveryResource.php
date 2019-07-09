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
            'planned_delivery_date' => $this->planned_delivery_date->format('d/m/Y'),
            'collection_date' => $this->collection_date->format('d/m/Y')
        ];
    }
}