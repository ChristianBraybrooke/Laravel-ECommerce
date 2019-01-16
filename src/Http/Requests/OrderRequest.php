<?php

namespace ChrisBraybrooke\ECommerce\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OrderRequest extends FormRequest
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
        if ($this->has('needs_address') && $this->needs_address === 'Needs Address' || !$this->has('needs_address')) {
            $customer = [
                'customer.first_name' => 'required',
                'customer.last_name' => 'required',
                'customer.email' => 'required',
                // 'customer.phone' => 'required'
            ];
            if ($this->has('use_billing_for_shipping') && $this->use_billing_for_shipping) {
                $address = [
                    // 'billing_address.line_1' => 'required',
                    // 'billing_address.town' => 'required',
                    // 'billing_address.county' => 'required',
                    // 'billing_address.postcode' => 'required',
                    // 'billing_address.country' => 'required',
                ];
            } else {
                $address = [
                    // 'billing_address.line_1' => 'required',
                    // 'billing_address.town' => 'required',
                    // 'billing_address.county' => 'required',
                    // 'billing_address.postcode' => 'required',
                    // 'billing_address.country' => 'required',

                    // 'shipping_address.line_1' => 'required',
                    // 'shipping_address.town' => 'required',
                    // 'shipping_address.county' => 'required',
                    // 'shipping_address.postcode' => 'required',
                    // 'shipping_address.country' => 'required',
                ];
            }
            $all = [
                'status' => [
                    // 'required',
                    // Rule::in(array_keys($this->order->getStatuses())),
                ],
            ];
            return array_merge($customer, $address, $all);
        }
        return [];
    }
}
