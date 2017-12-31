<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

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
            'slug' => $this->slug,
            'main_img' => new MediaResource($this->mediaByLocation('main_img')->first()),
            'live_at' => $this->live_at,
            'meta' => $this->meta,
            'in_menu' => $this->in_menu,
            'content' => new ContentsResource($this->whenLoaded('content')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
