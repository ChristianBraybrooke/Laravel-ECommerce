<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class FormFieldResource extends Resource
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
            'key' => $this->key,
            'name' => $this->name,
            'hidden_from_frontend' => $this->when(requestIncludes('hidden'), $this->hidden_from_frontend),
            'hidden_from_pdfs' => $this->when(requestIncludes('hidden'), $this->hidden_from_pdfs),
            'hidden_from_pdfs_detail' => $this->when(requestIncludes('hidden'), $this->hidden_from_pdfs_detail),
            'hidden_from_pdfs_admin' => $this->when(requestIncludes('hidden'), $this->hidden_from_pdfs_admin),
            'order' => $this->when(requestIncludes('order'), $this->order),
            'type' => $this->when(requestIncludes('type'), $this->type),
            'rules' => $this->when(requestIncludes('rules'), $this->rules),
            'options' => $this->when(requestIncludes('options'), $this->options),
            'description' => $this->when(requestIncludes('description'), $this->description),
            'append' => $this->when(requestIncludes('append'), $this->append),
            'prepend' => $this->when(requestIncludes('prepend'), $this->prepend),
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
        if (!requestIncludes('no_shop_data')) {
            $shop = new ShopResource($request);
            return [
                'shop_data' => $shop->toArray($request)
            ];
        }
        return [];
    }
}
