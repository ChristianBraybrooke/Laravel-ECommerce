<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Illuminate\Http\Request;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;

class ApiImportController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Start the import process.
     *
     * @param Illuminate\Http\Request $request
     * @return Illuminate\Http\Response
     */
    public function import(Request $request)
    {
        return $request;
    }
}
