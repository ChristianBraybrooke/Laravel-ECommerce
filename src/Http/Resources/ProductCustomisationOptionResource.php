<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use App\Http\Resources\MediaResource;
use App\Http\Resources\ContentsResource;

class ProductCustomisationOptionResource extends Resource
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
            'default' => $this->default,
            'main_img' => new MediaResource($this->mediaByLocation('main_img')->first()),
            'selector_img' => new MediaResource($this->mediaByLocation('selector_img')->first()),
            'content' => new ContentsResource($this->whenLoaded('content')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
