<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Form;
use FormSection;
use FormField;
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
    public function update(FormRequest $request, Form $form)
    {
        $form->update([
            'name' => $request->has('name') ? $request->name : $form->name
        ]);

        if ($request->has('sections.data')) {
            $iterated_sections = [];
            $iterated_fields = [];

            $sections = $form->sections()
                             ->with('fields')
                             ->get();

            foreach ($request->input('sections.data') as $key => $section) {
                if (!isset($section['id'])) {
                    $update_section = $form->sections()->create([
                        'name' => isset($section['name']) ? $section['name'] : null,
                        'order' => isset($section['order']) ? $section['order'] : null,
                    ]);
                } elseif (!empty($section['id'])) {
                    $update_section = $sections->where('id', $section['id'])->first();
                    $update_section->update([
                        'name' => isset($section['name']) ? $section['name'] : null,
                        'order' => isset($section['order']) ? $section['order'] : null,
                    ]);
                }

                $fields = [];
                if (isset($section['fields']['data'])) {
                    foreach ($section['fields']['data'] as $key => $field) {
                        $fields[] = [
                            'id' => isset($field['id']) ? $field['id'] : null,
                            'name' => isset($field['name']) ? $field['name'] : null,
                            'type' => isset($field['type']) ? $field['type'] : null,
                            'rules' => isset($field['rules']) ? $field['rules'] : [],
                            'options' => isset($field['options']) ? $field['options'] : [],
                        ];
                    }
                }
                $iterated_sections[] = $update_section['id'];
                $iterated_fields[$update_section['id']] = $fields;
            }
        }

        $iterated_fields_with_ids = [];
        foreach ($iterated_fields as $section_id => $section_fields) {
            foreach ($section_fields as $key => $field) {
                if (!is_null($field['id'])) {
                    FormField::where('id', $field['id'])->first()->update([
                        'name' => $field['name'],
                        'type' => $field['type'],
                        'rules' => $field['rules'],
                        'options' => $field['options'],
                    ]);
                } else {
                    $field = FormField::create([
                        'form_section_id' => $section_id,
                        'name' => $field['name'],
                        'type' => $field['type'],
                        'rules' => $field['rules'],
                        'options' => $field['options'],
                    ]);
                }
                $iterated_fields_with_ids[] = $field['id'];
            }
        }

        FormField::whereNotIn('id', $iterated_fields_with_ids)
                 ->whereIn('form_section_id', $iterated_sections)
                 ->delete();
        $form->sections()
             ->whereNotIn('id', $iterated_sections)
             ->delete();

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
