<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Illuminate\Http\Request;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Models\Import;
use ChrisBraybrooke\ECommerce\Http\Resources\ImportsResource;
use ChrisBraybrooke\ECommerce\Http\Resources\ImportResource;
use Auth;

class ApiImportsController extends Controller
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
    public function import(Request $request, Import $import)
    {
        $import = $import->create([
            'import_to' => $request->import_into,
            'user_id' => Auth::id(),
            'status' => 'Pending'
        ]);

        $import->syncMedia([
            'import_file' => $request->import_files,
        ]);

        return new ImportResource($import);
    }

    /**
     * Index the imports.
     *
     * @param Illuminate\Http\Request $request
     * @return Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $imports = Import::with($request->with ?: [])->basicResponse();

        return new ImportsResource($imports);
    }
}
