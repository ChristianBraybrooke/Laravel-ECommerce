<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use ChrisBraybrooke\ECommerce\Models\Page;
use Illuminate\Http\Request;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Http\Resources\PageResource;
use ChrisBraybrooke\ECommerce\Http\Resources\PagesResource;
use ChrisBraybrooke\ECommerce\Http\Requests\PageRequest;
use Carbon\Carbon;

class ApiPagesController extends Controller
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
        $pages = Page::with($request->with ?: [])->basicResponse();

        return new PagesResource($pages);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PageRequest $request, Page $page)
    {
        $this->authorize('create', Page::class);

        $live = ($request->filled('live') && $request->live) ? Carbon::now()->subMinute()->toDateTimeString() : null;

        $page = $page->create([
            'name' => $request->name,
            'slug' => $request->slug,
            'live' => $request->live
        ]);

        return new PageResource($page);
    }

    /**
     * Display the specified resource.
     *
     * @param  \ChrisBraybrooke\ECommerce\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Page $page)
    {
        $page->load($request->with ?: []);

        return new PageResource($page);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \ChrisBraybrooke\ECommerce\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function update(PageRequest $request, Page $page)
    {
        $this->authorize('update', $page);

        $live = $request->filled('live_at.live') ? ($request->live_at['live'] ?
        Carbon::now()->subMinute()->toDateTimeString() : null) :
        $page->live_at['date'];

        $page->update([
            'name' => $request->name,
            'slug' => $request->slug ?: $page->slug,
            'live_at' => $live,
            'in_menu' => $request->in_menu ?: $page->in_menu
        ]);

        if ($request->filled('content.data')) {
            foreach ($request->input('content.data') as $key => $content) {
                $page->content()->updateOrCreate(
                    ['content_name' => $content['content_name']],
                    ['content' => $content['content']]
                );
            }
        }

        $page->load($request->with ?: []);

        return new PageResource($page);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \ChrisBraybrooke\ECommerce\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function destroy(Page $page)
    {
        $this->authorize('delete', $page);

        $page->delete();
    }
}
