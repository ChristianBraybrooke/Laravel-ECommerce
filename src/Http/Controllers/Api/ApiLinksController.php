<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Page;
use Collection;
use CollectionType;
use Product;
use Illuminate\Http\Request;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;

class ApiLinksController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display all of the available links.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $pages = Page::select('id', 'name')->get();
        $collections = Collection::select('id', 'name')->get();
        $collection_types = CollectionType::select('id', 'name')->get();
        $products = Product::select('id', 'name')->get();

        return ['data' => [
            'Pages' => $pages,
            'Collections' => $collections,
            'Collection Types' => $collection_types,
            'Products' => $products,
        ]];
    }
}
