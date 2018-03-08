<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Product;
use Illuminate\Http\Request;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Http\Resources\ProductResource;
use ChrisBraybrooke\ECommerce\Http\Resources\ProductsResource;
use ChrisBraybrooke\ECommerce\Http\Requests\ProductRequest;
use ChrisBraybrooke\ECommerce\ProductCustomisationOption;
use Collection;
use CollectionType;
use Carbon\Carbon;
use Illuminate\Validation\Rule;

class ApiProductsController extends Controller
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
        $products = Product::with($request->with ?: [])->basicResponse();

        return new ProductsResource($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request, Product $product)
    {
        // $this->authorize('create', Product::class);

        $live = ($request->filled('live') && $request->live) ? Carbon::now()->subMinute()->toDateTimeString() : null;

        $product = $product->create([
            'name' => $request->name,
            'slug' => $request->filled('slug') ? $request->slug : null,
            'live_at' => $live
        ]);

        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Product $product)
    {
        $product->load($request->with ?: []);

        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, Product $product)
    {
        $this->authorize('update products', $product);

        $live = $request->filled('live_at.live') ? ($request->live_at['live'] ? Carbon::now()->subMinute()->toDateTimeString() : null) : $product->live_at['date'];

        $product->update([
            'name' => $request->name,
            'price' => $request->price,
            'list_in_shop' => $request->list_in_shop,
            'featured' => $request->featured,
            'live_at' => $live,
        ]);

        if ($request->filled('content.data')) {
            foreach ($request->input('content.data') as $key => $content) {
                $product->content()->updateOrCreate(
                    ['content_name' => $content['content_name']],
                    ['content' => $content['content']]
                );
            }
        }

        if ($request->filled('variants.data')) {
            foreach ($request->input('variants.data') as $key => $variant) {
                $new_variant = $product->variants()->updateOrCreate(
                    ['name' => $variant['name']],
                    ['slug' => $variant['slug'], 'live_at' => $live]
                );

                if (isset($variant['main_img'])) {
                    if (!empty($variant['main_img'])) {
                        $main_img = $variant['main_img'];
                        if (is_array($main_img) && array_key_exists(0, $main_img)) {
                            $main_img = $variant['main_img'][0];
                        }
                        $new_variant->media()->sync([$main_img['id'] => ['media_location' => 'main_img']]);
                    } else {
                        $new_variant->media()->location('main_img')->detach();
                    }
                }
            }
        }

        if ($request->filled('customisations.data')) {
            foreach ($request->input('customisations.data') as $key => $customisation) {
                $new_customisation = $product->customisations()->updateOrCreate(
                    ['id' => isset($customisation['id']) ? $customisation['id'] : null],
                    [
                        'name' => $customisation['name'],
                        'order' => isset($customisation['order']) ? $customisation['order'] : 1
                    ]
                );

                if (isset($customisation['options']['data'])) {
                    foreach ($customisation['options']['data'] as $key => $option) {
                        $new_option = $new_customisation->options()->updateOrCreate(
                            ['id' => isset($option['id']) ? $option['id'] : null],
                            [
                              'name' => $option['name'],
                              'default' => isset($option['default']) ? $option['default'] : false,
                            ]
                        );

                        $new_option->syncMedia([
                            'main_img' => isset($option['main_img']) ? $option['main_img'] : null,
                            'selector_img' => isset($option['selector_img']) ? $option['selector_img'] : null
                        ]);
                    }
                }
            }
        }

        $product->syncMedia([
            'main_img' => $request->main_img,
            'gallery' => $request->input('gallery.data'),
            'customisation_base_img' => $request->customisation_base_img
        ]);

        if (!empty($request->input('collections.data.collection_types_sync'))) {
            $collectionTypesSync = $request->input('collections.data.collection_types_sync.*.*');
            $collectionsSync = $request->input('collections.data.collection_types_sync');

            $newCollectionTypeSync = [];
            foreach ($collectionsSync as $collectionId => $collectionTypes) {
                foreach ($collectionTypes as $key => $collectionType) {
                    if (is_string($collectionType)) {
                        $collection = Collection::find($collectionId);
                        $col = $collection->types->where('name', 'LIKE', $collectionType)->first();
                        if (empty($col)) {
                            $col = $collection->types()->create(['name' => $collectionType, 'individual_name' => null, 'slug' => null, 'live_at' => Carbon::now()->toDateTimeString()]);
                        }
                        $newCollectionTypeSync[] = $col->id;
                    } elseif (is_int($collectionType)) {
                        $newCollectionTypeSync[] = $collectionType;
                    }
                }
            }

            $product->collectionTypes()->sync($newCollectionTypeSync);
        }

        $product->load($request->with ?: []);

        return new ProductResource($product);
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
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $this->authorize('delete', $product);

        $product->delete();
    }
}
