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
            'effects_price' => $request->filled('effects_price') ? $request->effects_price : false,
            'is_order_form' => $request->filled('is_order_form') ? $request->is_order_form : false,
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
            'name' => $request->has('name') ? $request->name : $form->name,
            'effects_price' => $request->filled('effects_price') ? $request->effects_price : $form->effects_price,
            'is_order_form' => $request->filled('is_order_form') ? $request->is_order_form : $form->is_order_form,
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
                        'key' => isset($section['key']) ? $section['key'] : null,
                        'order' => isset($section['order']) ? $section['order'] : null,
                    ]);
                } elseif (!empty($section['id'])) {
                    $update_section = $sections->where('id', $section['id'])->first();
                    $update_section->update([
                        'name' => isset($section['name']) ? $section['name'] : null,
                        'key' => isset($section['name']) ? $section['key'] : null,
                        'order' => isset($section['order']) ? $section['order'] : null,
                    ]);
                }

                $fields = [];
                if (isset($section['fields']['data'])) {
                    foreach ($section['fields']['data'] as $key => $field) {
                        $fields[] = [
                            'id' => $field['id'] ?? null,
                            'key' => $field['key'] ?? null,
                            'hidden_from_frontend' => $field['hidden_from_frontend'] ?? false,
                            'hidden_from_pdfs' => $field['hidden_from_pdfs'] ?? false,
                            'hidden_from_pdfs_detail' => $field['hidden_from_pdfs_detail'] ?? false,
                            'hidden_from_pdfs_admin' => $field['hidden_from_pdfs_admin'] ?? false,
                            'name' => $field['name'] ?? null,
                            'order' => $field['order'] ?? null,
                            'description' => $field['description'] ?? null,
                            'append' => $field['append'] ?? null,
                            'prepend' => $field['prepend'] ?? null,
                            'type' => $field['type'] ?? null,
                            'rules' => $field['rules'] ?? [],
                            'options' => $field['options'] ?? [],
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
                        'key' => $field['key'],
                        'hidden_from_frontend' => $field['hidden_from_frontend'],
                        'hidden_from_pdfs' => $field['hidden_from_pdfs'],
                        'hidden_from_pdfs_detail' => $field['hidden_from_pdfs_detail'],
                        'hidden_from_pdfs_admin' => $field['hidden_from_pdfs_admin'],
                        'name' => $field['name'],
                        'order' => $field['order'],
                        'description' => $field['description'],
                        'type' => $field['type'],
                        'rules' => $field['rules'],
                        'append' => $field['append'],
                        'prepend' => $field['prepend'],
                        'options' => $field['options'],
                    ]);
                } else {
                    $field = FormField::create([
                        'form_section_id' => $section_id,
                        'key' => $field['key'],
                        'hidden_from_frontend' => $field['hidden_from_frontend'],
                        'hidden_from_pdfs' => $field['hidden_from_pdfs'],
                        'hidden_from_pdfs_detail' => $field['hidden_from_pdfs_detail'],
                        'hidden_from_pdfs_admin' => $field['hidden_from_pdfs_admin'],
                        'name' => $field['name'],
                        'order' => $field['order'],
                        'description' => $field['description'],
                        'type' => $field['type'],
                        'rules' => $field['rules'],
                        'append' => $field['append'],
                        'prepend' => $field['prepend'],
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
