<?php

namespace ChrisBraybrooke\ECommerce\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OrderUpdateRequest extends FormRequest
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
            'shipping_address.Name' => 'required',
            'shipping_address.Line 1' => 'required',
            'shipping_address.Town' => 'required',
            'shipping_address.Country' => 'required',
            'shipping_address.Postcode' => 'required',
            'shipping_address.Country' => 'required',

            'billing_address.Name' => 'required',
            'billing_address.Line 1' => 'required',
            'billing_address.Town' => 'required',
            'billing_address.Country' => 'required',
            'billing_address.Postcode' => 'required',
            'billing_address.Country' => 'required',

            'use_billing_for_shipping' => 'boolean',

            'status' => [
                'required',
                Rule::in(array_keys($this->order->getStatuses())),
            ],
        ];
    }
}
