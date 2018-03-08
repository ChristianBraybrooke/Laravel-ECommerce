<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Collection;
use Illuminate\Http\Request;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Http\Resources\CollectionResource;
use ChrisBraybrooke\ECommerce\Http\Resources\CollectionsResource;
use ChrisBraybrooke\ECommerce\Http\Requests\CollectionRequest;
use Auth;
use Carbon\Carbon;
use Illuminate\Validation\Rule;

class ApiCollectionsController extends Controller
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
        $collections = Collection::with($request->with ?: [])->basicResponse();

        return new CollectionsResource($collections);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CollectionRequest $request, Collection $collection)
    {
        $this->authorize('create', Collection::class);

        $live = ($request->filled('live') && $request->live) ? Carbon::now()->subMinute()->toDateTimeString() : null;

        $collection = $collection->create([
          'name' => $request->name,
          'slug' => $request->filled('slug') ? $request->slug : null,
          'individual_name' => $request->filled('individual_name') ? $request->individual_name : null,
          'live_at' => $live
        ]);

        return new CollectionResource($collection);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Collection  $collection
     * @return \Illuminate\Http\Response
     */
    public function show(Collection $collection)
    {
        return new CollectionResource($collection);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Collection  $collection
     * @return \Illuminate\Http\Response
     */
    public function update(CollectionRequest $request, Collection $collection)
    {
        $this->authorize('update', $collection);

        $live = $request->filled('live_at.live') ? ($request->live_at['live'] ? Carbon::now()->subMinute()->toDateTimeString() : null) : $collection->live_at['date'];

        if (is_null($live)) {
            $collection->types()->update([
                'live_at' => null
            ]);
        }

        $collection->update([
            'name' => $request->name ?: $collection->name,
            'individual_name' => $request->individual_name ?: $collection->individual_name,
            'slug' => $request->slug ?: $collection->slug,
            'live_at' => $live,
        ]);

        if ($request->filled('header_img')) {
            if (!empty($request->header_img)) {
                $header_img = $request->header_img;
                if (is_array($header_img) && array_key_exists(0, $header_img)) {
                    $header_img = $request->header_img[0];
                }
                $collection->media()->sync([$header_img['id'] => ['media_location' => 'header_img']]);
            } else {
                $collection->media()->location('header_img')->detach();
            }
        }

        return new CollectionResource($collection);
    }

    /**
     *  Bulk Update the many resources in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function bulkUpdate(Request $request)
    {
        $this->authorize('bulkUpdate', Collection::class);

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

        $collections = Collection::whereIn('id', $ids);

        switch ($request->action) {
            case 'delete':
                $collections->delete();
                break;

            case 'live':
                $collections->update([
                    'live_at' => Carbon::now()->subMinute()->toDateTimeString()
                ]);
                break;

            case 'draft':
                $collections->update([
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
     * @param  \App\Collection  $collection
     * @return \Illuminate\Http\Response
     */
    public function destroy(Collection $collection)
    {
        $this->authorize('delete', $collection);

        $collection->delete();
    }
}
