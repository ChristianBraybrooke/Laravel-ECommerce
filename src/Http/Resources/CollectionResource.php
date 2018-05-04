<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use ChrisBraybrooke\ECommerce\Http\Resources\ShopResource;
use ChrisBraybrooke\ECommerce\Http\Resources\MediaResource;
use ChrisBraybrooke\ECommerce\Http\Resources\CollectionTypesResource;

class CollectionResource extends Resource
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
            'individual_name' => $this->when(requestIncludes('individual_name'), $this->individual_name),
            $this->mergeWhen($this->relationLoaded('media'), [
                'header_img' => $this->relationLoaded('media') ? new MediaResource($this->media()->location('header_img')->first()) : null
            ]),
            'types' => new CollectionTypesResource($this->whenLoaded('types')),
            'slug' => $this->when(requestIncludes('slug'), $this->slug),
            'live_at' => $this->when(requestIncludes('live_at'), $this->live_at),
            'created_at' => $this->when(requestIncludes('created_at'), $this->created_at),
            'updated_at' => $this->when(requestIncludes('updated_at'), $this->updated_at),
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
                'shop_data' => $shop->toArray($request)
            ];
        }
        return [];
    }
}
