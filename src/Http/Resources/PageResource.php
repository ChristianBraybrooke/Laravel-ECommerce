<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use ChrisBraybrooke\ECommerce\Http\Resources\ShopResource;

class PageResource extends Resource
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
            'slug' => $this->when(requestIncludes('slug'), $this->slug),
            $this->mergeWhen($this->relationLoaded('media'), [
                'main_img' => $this->relationLoaded('media') ? new MediaResource($this->media()->location('main_img')->first()) : null
            ]),
            'live_at' => $this->when(requestIncludes('live_at'), $this->live_at),
            'meta' => $this->when(requestIncludes('meta'), $this->meta),
            'in_menu' => $this->when(requestIncludes('in_menu'), $this->in_menu),
            'content' => new ContentsResource($this->whenLoaded('content')),
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
