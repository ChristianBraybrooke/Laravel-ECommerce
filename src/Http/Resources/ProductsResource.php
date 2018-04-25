<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use ChrisBraybrooke\ECommerce\Http\Resources\ShopResource;
use ChrisBraybrooke\ECommerce\Http\Resources\ProductResource;

class ProductsResource extends ResourceCollection
{
    public $collects = ProductResource::class;

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {

        $shop = new ShopResource($request);
        return [
            'data' => $this->collection,
            $this->mergeWhen(!requestIncludes('no_shop_data'), [
               'shop_data' => $shop->toArray($request)
           ])
        ];
    }
}
