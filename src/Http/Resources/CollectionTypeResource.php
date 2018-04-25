<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use ChrisBraybrooke\ECommerce\Http\Resources\ShopResource;
use ChrisBraybrooke\ECommerce\Http\Resources\MediaResource;
use ChrisBraybrooke\ECommerce\Http\Resources\MediasResource;
use ChrisBraybrooke\ECommerce\Http\Resources\ContentsResource;
use ChrisBraybrooke\ECommerce\Http\Resources\ProductsResource;
use ChrisBraybrooke\ECommerce\Http\Resources\CollectionResource;

class CollectionTypeResource extends Resource
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
            'slug' => $this->when(requestIncludes('slug'), $this->slug),
            $this->mergeWhen($this->relationLoaded('media'), [
                'main_img' => new MediaResource($this->mediaByLocation('main_img')->first()),
                'secondary_img' => new MediaResource($this->mediaByLocation('secondary_img')->first()),
                'third_img' => new MediaResource($this->mediaByLocation('third_img')->first()),
                'gallery' => new MediasResource($this->mediaByLocation('gallery'))
            ]),
            'products' => new ProductsResource($this->whenLoaded('products')),
            'live_at' => $this->when(requestIncludes('live_at'), $this->live_at),
            'meta' => $this->when(requestIncludes('meta'), $this->meta),
            'collection' => new CollectionResource($this->whenLoaded('collection')),
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
