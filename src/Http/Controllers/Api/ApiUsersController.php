<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Http\Resources\UserResource;
use ChrisBraybrooke\ECommerce\Http\Resources\UsersResource;
use ChrisBraybrooke\ECommerce\Http\Requests\UserRequest;

class ApiUsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('index', User::class);

        $users = User::with($request->with ?: [])
                     ->withRole($request->withRole)
                     ->basicResponse();

        return new UsersResource($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request, User $user)
    {
        $this->authorize('create', User::class);

        $user = $user->create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,
            'dob' => $request->dob,
            'company' => $request->company,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'timezone' => $request->timezone,
            'language' => $request->language,
            'stripe_id' => $request->stripe_id,
            'last_login' => $request->last_login,
            'marketing_preferences' => $request->marketing_preferences
        ]);

        if ($request->filled('roles') && $user) {
            foreach ($request->roles as $key => $role) {
                if (!$user->hasRole($role)) {
                    $user->assignRole($role);
                }
            }
        }

        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, User $user)
    {
        $this->authorize('view', $user);

        $user->load($request->with ?: []);

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, User $user)
    {
        $this->authorize('update', $user);

        $user->update([
            'first_name' => $request->first_name ?: $user->first_name,
            'last_name' => $request->last_name ?: $user->last_name,
            'gender' => $request->gender ?: $user->gender,
            'dob' => $request->dob ?: $user->dob,
            'company' => $request->company ?: $user->company,
            'phone' => $request->phone ?: $user->phone,
            'email' => $request->email ?: $user->email,
            'timezone' => $request->timezone ?: $user->timezone,
            'language' => $request->language ?: $user->language,
            'stripe_id' => $request->stripe_id ?: $user->stripe_id,
            'last_login' => $request->last_login ?: $user->last_login,
            'marketing_preferences' => $request->markexting_preferences ?: $user->marketing_preferences,
            'shipping_address_line1' => $request->has('shipping_address_line_1') ? $request->shipping_address_line_1 : $user->shipping_address_line1,
            'shipping_address_line2' => $request->has('shipping_address_line_2') ? $request->shipping_address_line_2 : $user->shipping_address_line2,
            'shipping_address_town' => $request->has('shipping_address_town') ? $request->shipping_address_town : $user->shipping_address_town,
            'shipping_address_county' => $request->has('shipping_address_county') ? $request->shipping_address_county : $user->shipping_address_county,
            'shipping_address_postcode' => $request->has('shipping_address_postcode') ? $request->shipping_address_postcode : $user->shipping_address_postcode,
            'shipping_address_country' => $request->has('shipping_address_country') ? $request->shipping_address_country : $user->shipping_address_country,
            'billing_address_line1' => $request->has('billing_address_line_1') ? $request->billing_address_line_1 : $user->billing_address_line1,
            'billing_address_line2' => $request->has('billing_address_line_2') ? $request->billing_address_line_2 : $user->billing_address_line2,
            'billing_address_town' => $request->has('billing_address_town') ? $request->billing_address_town : $user->billing_address_town,
            'billing_address_county' => $request->has('billing_address_county') ? $request->billing_address_county : $user->billing_address_county,
            'billing_address_postcode' => $request->has('billing_address_postcode') ? $request->billing_address_postcode : $user->billing_address_postcode,
            'billing_address_country' => $request->has('billing_address_country') ? $request->billing_address_country : $user->billing_address_country,
            'billing_address_name' => $request->has('billing_address_name') ? $request->billing_address_name : $user->billing_address_name,
            'billing_address_company' => $request->has('billing_address_company') ? $request->billing_address_company : $user->billing_address_company,
            'shipping_address_name' => $request->has('shipping_address_name') ? $request->shipping_address_name : $user->shipping_address_name,
            'shipping_address_company' => $request->has('shipping_address_company') ? $request->shipping_address_company : $user->shipping_address_company
        ]);

        if ($request->filled('password')) {
            $user->update([
                'password' => bcrypt($request->password)
            ]);
        }

        $user->load($request->with ?: []);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $this->authorize('delete', $user);

        $user->delete();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authUser(Request $request)
    {
        return new UserResource($request->user());
    }
}
