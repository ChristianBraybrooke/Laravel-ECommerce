<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use App\CollectionType;
use Illuminate\Http\Request;
use App\Http\Resources\CollectionTypesResource;
use App\Http\Resources\CollectionTypeResource;
use App\Http\Controllers\Controller;

class ApiTypesController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->except(['index', 'show']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $types = CollectionType::with($request->with ?: [])->basicResponse();

        return new CollectionTypesResource($types);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CollectionType  $collectionType
     * @return \Illuminate\Http\Response
     */
    public function show(CollectionType $collectionType)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CollectionType  $collectionType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CollectionType $collectionType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CollectionType  $collectionType
     * @return \Illuminate\Http\Response
     */
    public function destroy(CollectionType $collectionType)
    {
        //
    }
}
