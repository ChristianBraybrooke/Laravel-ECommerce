<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;
use ChrisBraybrooke\ECommerce\Http\Resources\RolesResource;

class UserResource extends Resource
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
            // 'first_name' => $this->first_name,
            // 'last_name' => $this->last_name,
            'gender' => $this->gender,
            'phone' => $this->phone,
            'company' => $this->company,
            'timezone' => $this->timezone,
            'language' => $this->language,
            'email' => $this->email,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'roles' => new RolesResource($this->whenLoaded('roles')),
        ];
    }
}
