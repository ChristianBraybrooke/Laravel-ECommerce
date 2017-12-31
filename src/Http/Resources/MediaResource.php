<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Support\Facades\Storage;
use File;

use Illuminate\Http\Resources\Json\Resource;

class MediaResource extends Resource
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
            'file_name' => $this->file_name,
            'file_type' => $this->mime_type,
            'percentage' => 100,
            'disk' => $this->disk,
            'parent_type' => $this->model_type,
            'parent_id' => $this->model_id,
            'url' => $this->getUrl(),
            'conversions' => [
                'thumbnail' => $this->getConversion(),
                'header' => $this->getConversion($this->headerName()),
                'panel' => $this->getConversion($this->panelName()),
                'listing' => $this->getConversion($this->listingName()),
                'optimised' => $this->getConversion("{$this->name}-web"),
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
