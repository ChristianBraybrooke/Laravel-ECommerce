<?php

namespace ChrisBraybrooke\ECommerce\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Order;
use App\User;

class OrderCreateRequest extends FormRequest
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
     * Prepare the request for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $customerName = "{$this->input('customer.first_name')} {$this->input('customer.last_name')}";
        $useBillingForShipping = $this->input('use_billing_for_shipping') == "true" ? true : false;

        $this->merge([
            'user_first_name' => $this->input('customer.first_name'),
            'user_last_name' => $this->input('customer.last_name'),
            'user_email' => $this->input('customer.email'),
            'user_phone' => $this->input('customer.phone'),
            'user_company' => $this->input('customer.company'),

            'use_billing_for_shipping' => $useBillingForShipping,

            'billing_address_name' => $this->input('billing_address.name') ?: $customerName,
            'billing_address_company' => $this->input('billing_address.company') ?: $this->input('customer.company'),
            'billing_address_line1' => $this->input('billing_address.line_1'),
            'billing_address_line2' => $this->input('billing_address.line_2'),
            'billing_address_town' => $this->input('billing_address.town'),
            'billing_address_county' => $this->input('billing_address.county'),
            'billing_address_postcode' => $this->input('billing_address.postcode'),
            'billing_address_country' => $this->input('billing_address.country'),

            'shipping_address_company' => $this->input('shipping_address.company'),
            'shipping_address_name' => $this->input('shipping_address.name'),
            'shipping_address_line1' => $this->input('shipping_address.line1'),
            'shipping_address_line2' => $this->input('shipping_address.line2'),
            'shipping_address_town' => $this->input('shipping_address.town'),
            'shipping_address_county' => $this->input('shipping_address.county'),
            'shipping_address_postcode' => $this->input('shipping_address.postcode'),
            'shipping_address_country' => $this->input('shipping_address.country'),
        ]);
        $customerName = "{$this->input('customer.first_name')} {$this->input('customer.last_name')}";

        // $this->request->add([
        //     'user_id' => $this->input('customer.id'),
        //     'user_first_name' => $this->input('customer.first_name'),
        //     'user_last_name' => $this->input('customer.last_name'),
        //     'user_email' => $this->input('customer.email'),
        //     'user_phone' => $this->input('customer.phone'),
        //     'user_company' => $this->input('customer.company'),
        // ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'status' => ['required', Rule::in(array_keys(Order::getStatuses()))],
            'ref' => ['required', Rule::unique('orders')],

            'products' => 'array',
            'products.*.product' => 'array',
            'products.*.product.id' => ['required', Rule::exists('products', 'id')],
            'products.totals' => 'array',
            'products.*.totals.unit_price' => 'required|numeric|min:1',
            'products.*.totals.extras' => 'numeric|min:0',
            'products.*.order' => 'numeric',
            'products.*.customisation_data' => 'array',
            'products.*.customisation_data.*.name' => 'required|string',
            'products.*.customisation_data.*.value' => 'present',
            'products.*.customisation_data.*.label' => 'present',
            'products.*.customisation_data.*.order' => 'numeric',
            'products.*.customisation_data.*.group' => 'string',
            'products.*.customisation_data.*.type' => ['required', 'string', Rule::in(['integer', 'string'])],
            'products.*.customisation_data.*.appends' => 'string|nullable',
            'products.*.customisation_data.*.prepends' => 'string|nullable',
            'products.*.qty' => ['required', 'numeric', 'min:1'],
            'products.*.form.id' => Rule::exists('forms', 'id'),

            'customer.id' => [Rule::exists('users', 'id')],
            'customer.first_name' => 'string|required',
            'customer.last_name' => 'string|required',
            'customer.email' => 'email|required',

            'billing_address.line_1' => 'string',
            'billing_address.town' => 'string',
            'billing_address.county' => 'string',
            'billing_address.postcode' => 'string',
            'billing_address.country' => 'string',

            'shipping_address.line_1' => 'string',
            'shipping_address.town' => 'string',
            'shipping_address.county' => 'string',
            'shipping_address.postcode' => 'string',
            'shipping_address.country' => 'string',

            'use_billing_for_shipping' => 'boolean|nullable'
        ];
    }

    /**
     * Get the validator instance for the request and
     * add attach callbacks to be run after validation
     * is completed.
     *
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function getValidatorInstance()
    {
        return parent::getValidatorInstance()->after(function ($validator) {
            $this->after($validator);
        });
    }

    /**
     * Attach callbacks to be run after validation is completed.
     *
     * @param  \Illuminate\Contracts\Validation\Validator $validator
     * @return callback
     */
    protected function after($validator)
    {
        $this->merge([
            'user_id' => $this->resolveUserId()
        ]);
    }

    /**
     * Resolve the user ID of this customer.
     *
     * @return \App\User
     */
    protected function resolveUserId()
    {
        $shippingAddressData = [];
        if ($this->input('save_billing_address')) {
            $shippingAddressData = $this->only([
                'billing_address_line1', 'billing_address_line2', 'billing_address_town', 'billing_address_county',
                'billing_address_postcode','billing_address_country'
            ]);
        }
        if (!$this->filled('customer.id')) {
            $user = User::updateOrCreate(
                ['email' => $this->input('user_email')],
                array_merge(
                    [
                        'first_name' => $this->input('user_first_name'),
                        'last_name' => $this->input('user_last_name'),
                        'company' => $this->input('user_company'),
                        'phone' => $this->input('user_phone'),
                        'password' => bcrypt(str_random(40))
                    ],
                    $shippingAddressData
                )
            );
            $user->assignRole('customer');
            return $user->id;
        }
        return $this->input('customer.id');
    }
}
