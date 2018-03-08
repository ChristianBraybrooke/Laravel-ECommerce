<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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
        return ['data' => Setting::all()];
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

        Artisan::call('view:clear');

        return ['data' => Setting::all()];
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

        Artisan::call('view:clear');

        return Setting::set($request->key, $request->value);
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

        Artisan::call('view:clear');

        return Setting::forget($request->key);
    }
}
