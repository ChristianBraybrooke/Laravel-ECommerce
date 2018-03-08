<?php

namespace ChrisBraybrooke\ECommerce\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
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
        if ($this->has('same_shipping_address') && $this->same_shipping_address) {
            return [
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required',
                'phone' => 'required',

                'billing_address_line1' => 'required',
                'billing_address_town' => 'required',
                'billing_address_county' => 'required',
                'billing_address_postcode' => 'required',
                'billing_address_country' => 'required',
            ];
        } else {
            return [
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required',
                'phone' => 'required',

                'billing_address_line1' => 'required',
                'billing_address_town' => 'required',
                'billing_address_county' => 'required',
                'billing_address_postcode' => 'required',
                'billing_address_country' => 'required',

                'shipping_address_line1' => 'required',
                'shipping_address_town' => 'required',
                'shipping_address_county' => 'required',
                'shipping_address_postcode' => 'required',
                'shipping_address_country' => 'required',
            ];
        }
    }
}
