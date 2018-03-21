<?php

namespace ChrisBraybrooke\ECommerce\Http\Requests;

use Illuminate\Foundation\Http\FormRequest as BaseRequest;

class FormRequest extends BaseRequest
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
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        //
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
            'sections.data.*.name' => 'required',
            'sections.data.*.fields.data.*.name' => 'required',
            'sections.data.*.fields.data.*.type' => 'required',
        ];
    }
}
