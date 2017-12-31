<?php

namespace ChrisBraybrooke\ECommerce\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CollectionRequest extends FormRequest
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
    public function rules(Request $request)
    {
        $rules = [
          'name' => ['required', Rule::unique('collections')->ignore($request->id)->where(function ($query) {
              return $query->whereNull('deleted_at');
          })],
          'header_img.*.id' => 'exists:media,id'
        ];

        if ($request->isMethod('post')) {
            $rules['live_at'] = 'nullable|date';
        }
        if ($request->isMethod('put')) {
            $rules['slug'] = Rule::unique('collections')->ignore($request->id)->where(function ($query) {
                return $query->whereNull('deleted_at');
            });
            $rules['live_at.live'] = 'boolean';
        }

        return $rules;
    }
}
