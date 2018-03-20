<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class FormFieldsResource extends ResourceCollection
{
    public $collects = FormFieldResource::class;

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
            'shop_data' => $shop->toArray($request)
        ];
    }
}
