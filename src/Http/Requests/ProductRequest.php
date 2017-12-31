<?php

namespace ChrisBraybrooke\ECommerce\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'collections.data.collection_types_sync' => 'array',
            'collections.data.collection_types_sync.*' => 'array',
            'content.data' => 'array',
            'content.data.*.content_name' => 'sometimes|required|string|max:250',
            'content.data.*.content' => 'string|nullable',
            'meta' => 'array',
        ];
    }
}
