<?php

namespace ChrisBraybrooke\ECommerce\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Auth;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
        if ($this->isMethod('post')) {
            return [
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'dob' => 'date',
                'password' => 'required|string|zxcvbn_min:3',
                // 'timezone' => 'timezone',
                'marketing_preferences' => 'array',
                'roles' => 'array',
                'roles.*' => 'exists:roles,id'
            ];
        }

        return [
            'first_name' => 'string|max:255',
            'last_name' => 'string|max:255',
            'email' => ['string', 'email', 'max:255', Rule::unique('users')->ignore($this->user->id)],
            'dob' => 'date',
            'password' => 'string|zxcvbn_min:3|nullable',
            // 'timezone' => 'timezone',
            'marketing_preferences' => 'array',
            'roles' => 'array',
            'roles.*' => 'exists:roles,id'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'password.zxcvbn_min' => 'The password is not strong enough.'
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (!Auth::User()->hasRole('admin') && $this->filled('roles')) {
                $validator->errors()->add('roles', 'You do not have permission to assign roles to a user.');
            }
        });
    }

}
