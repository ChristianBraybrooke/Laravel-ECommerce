<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;
use ChrisBraybrooke\ECommerce\Http\Resources\ContentResource;

class ContentsResource extends ResourceCollection
{
    public $collects = ContentResource::class;

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        $shop = requestIncludes('no_shop_data') ? null : new ShopResource($request);
        return [
            'data' => $this->collection,
             $this->mergeWhen(!requestIncludes('no_shop_data'), [
               'shop_data' => requestIncludes('no_shop_data') ? null : $shop->toArray($request)
             ])
        ];
    }
}
