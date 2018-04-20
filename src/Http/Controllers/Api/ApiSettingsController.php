<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Illuminate\Http\Request;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Http\Resources\ShopResource;
use Setting;
use Artisan;

class ApiSettingsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * List all of the settings.
     *
     * @param Illuminate\Http\Request $request
     * @return Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = ['data' => Setting::all() ?: ['url' => env('APP_URL', 'https://www.example.com')]];

        $shop = new ShopResource($request);
        $data['shop_data'] = $shop->toArray($request);

        return $data;
    }

    /**
     * Update all of the settings.
     *
     * @param Illuminate\Http\Request $request
     * @return Illuminate\Http\Response
     */
    public function hydrate(Request $request)
    {
        $this->validate($request, [
            'settings' => 'array|required'
        ]);

        foreach ($request->settings as $key => $setting) {
            Setting::set($key, $setting);
        }
        Setting::save();

        Artisan::call('view:clear');

        return ['data' => Setting::all() ?: ['url' => env('APP_URL', 'https://www.example.com')]];
    }

    /**
     * Set a specific setting.
     *
     * @param Illuminate\Http\Request $request
     * @return Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'key' => 'required',
            'value' => 'required'
        ]);

        $setting = Setting::set($request->key, $request->value);

        Setting::save();

        Artisan::call('view:clear');

        return $setting;
    }

    /**
     * Remove a specific setting.
     *
     * @param Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $this->validate($request, [
            'key' => 'required',
        ]);

        $settings = Setting::forget($request->key);

        Setting::save();

        Artisan::call('view:clear');

        return $settings;
    }
}
