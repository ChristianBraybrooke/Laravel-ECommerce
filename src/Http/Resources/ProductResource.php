<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use ChrisBraybrooke\ECommerce\Http\Resources\ShopResource;
use ChrisBraybrooke\ECommerce\Http\Resources\MediaResource;
use ChrisBraybrooke\ECommerce\Http\Resources\MediasResource;
use ChrisBraybrooke\ECommerce\Http\Resources\ProductsResource;
use ChrisBraybrooke\ECommerce\Http\Resources\ProductResource;
use ChrisBraybrooke\ECommerce\Http\Resources\CollectionTypesResource;
use ChrisBraybrooke\ECommerce\Http\Resources\ProductCustomisationsResource;
use App\Product;

class ProductResource extends Resource
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
            'collections' =>
            $this->when(
                $this->relationLoaded('collectionTypes'),
                ['data' => $this->relationLoaded('collectionTypes') ? $this->groupedCollectionTypes() : null]
            ),
            'content' => new ContentsResource($this->whenLoaded('content')),
            $this->mergeWhen($this->relationLoaded('media'), [
                'main_img' => $this->relationLoaded('media') ? new MediaResource($this->mediaByLocation('main_img')->first()) : null,
                'gallery' => $this->relationLoaded('media') ? new MediasResource($this->mediaByLocation('gallery')) : null,
                'customisation_base_img' => $this->relationLoaded('media') ? new MediaResource($this->mediaByLocation('customisation_base_img')->first()) : null
            ]),
            'variants' => new ProductsResource($this->whenLoaded('variants')),
            'variant' => new ProductResource($this->whenLoaded('variant')),
            $this->mergeWhen($this->relationLoaded('orderForm'), [
                'order_form' => $this->relationLoaded('orderForm') ? new FormResource($this->available_order_form) : null,
            ]),
            $this->mergeWhen($this->relationLoaded('frontendForm'), [
                'frontend_form' => $this->relationLoaded('frontendForm') ? new FormResource($this->available_frontend_form) : null,
            ]),
            $this->mergeWhen($this->relationLoaded('customisations'), [
                'customisations' => $this->relationLoaded('customisations') ? new ProductCustomisationsResource($this->available_customisations) : null,
            ]),
            'is_variant' => $this->when(requestIncludes('is_variant'), $this->is_variant),
            'live_at' => $this->when(requestIncludes('live_at'), $this->live_at),
            'slug' => $this->when(requestIncludes('slug'), $this->slug),
            'price' => $this->when(requestIncludes('price'), $this->price),
            'order_options' => $this->when(requestIncludes('order_options'), $this->order_options ?: []),
            'use_variant_customisation' => $this->when(requestIncludes('use_variant_customisation'), $this->use_variant_customisation),
            'can_customise' => $this->when(requestIncludes('can_customise'), getResourceValue($this, 'can_customise')),
            'list_in_shop' => $this->when(requestIncludes('list_in_shop'), $this->list_in_shop),
            'featured' => $this->when(requestIncludes('featured'), $this->featured),
            'created_at' => $this->when(requestIncludes('created_at'), $this->created_at),
            'updated_at' => $this->when(requestIncludes('updated_at'), $this->updated_at),
            'can_customise_width' => $this->when(requestIncludes('can_customise_width'), getResourceValue($this, 'can_customise_width')),
            'can_customise_height' => $this->when(requestIncludes('can_customise_height'), requestIncludes('can_customise_height') ? $this->can_customise_height : null),
            'can_customise_depth' => $this->when(requestIncludes('can_customise_depth'), requestIncludes('can_customise_depth') ? $this->can_customise_depth : null),
            'measurement_unit' => $this->when(requestIncludes('measurement_unit'), $this->measurement_unit),
            'width' => $this->when(requestIncludes('width'), $this->width),
            'height' => $this->when(requestIncludes('height'), $this->height),
            'depth' => $this->when(requestIncludes('depth'), $this->depth),
            'sku' => $this->when(requestIncludes('sku'), $this->sku),
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
