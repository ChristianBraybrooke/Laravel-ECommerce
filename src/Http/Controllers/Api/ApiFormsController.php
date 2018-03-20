<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Form;
use FormSection;
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
        $form = $form->create([
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
        $form->update([
            'name' => $request->has('name') ? $request->name : $form->name
        ]);

        if ($request->has('sections.data')) {
            $new_sections = [];

            foreach ($request->input('sections.data') as $key => $section) {
                if (!isset($section['id'])) {
                    $new_sections[] = [
                        'name' => isset($section['name']) ? $section['name'] : null,
                        'order' => isset($section['order']) ? $section['order'] : null,
                    ];
                } elseif (!empty($section['id'])) {
                    $update_section = FormSection::find($section['id']);
                    $update_section->update([
                        'name' => isset($section['name']) ? $section['name'] : null,
                        'order' => isset($section['order']) ? $section['order'] : null,
                    ]);

                    $new_fields = [];

                    if (isset($section['fields']['data'])) {
                        foreach ($section['fields']['data'] as $key => $field) {
                            if (!isset($field['id'])) {
                                $new_fields[] = [
                                    'name' => isset($field['name']) ? $field['name'] : null,
                                    'type' => isset($field['type']) ? $field['type'] : null,
                                    'rules' => isset($field['rules']) ? $field['rules'] : null,
                                ];
                            } elseif (!empty($field['id'])) {
                                //
                            }
                        }
                    }

                    if ($new_fields) {
                        $update_section->fields()->createMany($new_fields);
                    }
                }
            }
            if ($new_sections) {
                $form->sections()->createMany($new_sections);
            }
        }

        $form->load($request->with ?: []);

        return new FormResource($form);
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
