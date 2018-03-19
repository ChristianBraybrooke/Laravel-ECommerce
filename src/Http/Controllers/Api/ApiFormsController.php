<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Form;
use Illuminate\Http\Request;
use ChrisBraybrooke\ECommerce\Http\Requests\FormRequest;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Http\Resources\FormResource;
use ChrisBraybrooke\ECommerce\Http\Resources\FormsResource;

class ApiFormsController extends Controller
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
        $forms = Form::with($request->with ?: [])
                    ->basicResponse();

        return new FormsResource($forms);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FormRequest $request, Form $form)
    {
        $form->create([
            'name' => $request->name,
        ]);

        $form->load($request->with ?: []);

        return new FormResource($form);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Form $form)
    {
        $form->load($request->with ?: []);

        return new FormResource($form);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Form $form)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Form $form)
    {
        //
    }
}
