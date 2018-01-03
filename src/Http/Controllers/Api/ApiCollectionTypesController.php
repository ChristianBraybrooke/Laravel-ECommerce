<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use ChrisBraybrooke\ECommerce\Models\CollectionType;
use ChrisBraybrooke\ECommerce\Models\Collection;
use Illuminate\Http\Request;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Http\Resources\CollectionTypesResource;
use ChrisBraybrooke\ECommerce\Http\Resources\CollectionTypeResource;
use ChrisBraybrooke\ECommerce\Http\Requests\CollectionTypeRequest;
use Carbon\Carbon;
use Illuminate\Validation\Rule;

class ApiCollectionTypesController extends Controller
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
    public function index(Request $request, Collection $collection)
    {
        $types = $collection->types()->with($request->with ?: [])->basicResponse();

        return new CollectionTypesResource($types);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CollectionTypeRequest $request, Collection $collection)
    {
        $this->authorize('create', CollectionType::class);

        $live = ($request->filled('live') && $request->live) ? Carbon::now()->subMinute()->toDateTimeString() : null;

        $collectionType = $collection->types()->create([
          'name' => $request->name,
          'slug' => $request->filled('slug') ? $request->slug : null,
          'individual_name' => $request->filled('individual_name') ? $request->individual_name : null,
          'live_at' => $live
        ]);

        return new CollectionTypeResource($collectionType);
    }

    /**
     * Display the specified resource.
     *
     * @param  \ChrisBraybrooke\ECommerce\CollectionType  $collectionType
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Collection $collection, CollectionType $type)
    {
        $type->load($request->with ?: []);
        return new CollectionTypeResource($type);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \ChrisBraybrooke\ECommerce\CollectionType  $collectionType
     * @return \Illuminate\Http\Response
     */
    public function update(CollectionTypeRequest $request, Collection $collection, CollectionType $type)
    {
        $this->authorize('update', $type);

        $live = $request->filled('live_at.live') ? ($request->live_at['live'] ?
        Carbon::now()->subMinute()->toDateTimeString() : null) :
        $type->live_at['date'];

        $type->update([
            'name' => $request->name ?: $type->name,
            'individual_name' => $request->individual_name ?: $type->individual_name,
            'slug' => $request->slug ?: $type->slug,
            'meta' => $request->meta ? array_merge($type->meta, $request->meta) : $type->meta,
            'live_at' => $live,
        ]);

        if ($request->filled('content.data')) {
            foreach ($request->input('content.data') as $key => $content) {
                $type->content()->updateOrCreate(
                    ['content_name' => $content['content_name']],
                    ['content' => $content['content']]
                );
            }
        }

        if ($request->filled('main_img')) {
            if (!empty($request->main_img)) {
                $main_img = $request->main_img;
                if (is_array($main_img) && array_key_exists(0, $main_img)) {
                    $main_img = $request->main_img[0];
                }
                $type->media()->sync([$main_img['id'] => ['media_location' => 'main_img']]);
            } else {
                $type->media()->location('main_img')->detach();
            }
        }

        $type->load($request->with ?: []);

        return new CollectionTypeResource($type);
    }

    /**
     *  Bulk Update the many resources in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function bulkUpdate(Request $request, Collection $collection)
    {
        $this->authorize('bulkUpdate', CollectionType::class);

        $actions = ['delete', 'live', 'draft', 'print_queue'];

        $this->validate($request, [
          'data' => 'array|required',
          'action' => [
              'required',
              Rule::in($actions)
          ],
        ]);

        $ids = [];
        foreach ($request->data as $key => $data) {
            $ids[] = $data['id'];
        }

        $types = CollectionType::whereIn('id', $ids);

        switch ($request->action) {
            case 'delete':
                $types->delete();
                break;

            case 'live':
                $types->update([
                    'live_at' => Carbon::now()->subMinute()->toDateTimeString()
                ]);
                break;

            case 'draft':
                $types->update([
                    'live_at' => null
                ]);
                break;
        }

        return [
            'errors' => [],
            'message' => 'Successfully updated ' . count($ids) . ' collections.'
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \ChrisBraybrooke\ECommerce\CollectionType  $collectionType
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Collection $collection, CollectionType $type)
    {
        $this->authorize('delete', $type);

        $type->delete();
    }
}
