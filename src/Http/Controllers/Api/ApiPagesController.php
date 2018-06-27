<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Page;
use Illuminate\Http\Request;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Http\Resources\PageResource;
use ChrisBraybrooke\ECommerce\Http\Resources\PagesResource;
use ChrisBraybrooke\ECommerce\Http\Requests\PageRequest;
use Carbon\Carbon;
use Illuminate\Validation\Rule;

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
        $this->authorize('create', get_class($page));

        $live = ($request->filled('live') && $request->live) ? Carbon::now()->subMinute()->toDateTimeString() : null;

        $page = $page->create([
            'name' => $request->name,
            'slug' => $request->has('slug') ? $request->slug : $request->name,
            'live_at' => $live
        ]);

        return new PageResource($page);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Page  $page
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
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function update(PageRequest $request, Page $page)
    {
        $this->authorize('update', $page);

        $live = $request->filled('live_at.live') ? ($request->live_at['live'] ? Carbon::now()->subMinute()->toDateTimeString() : null) : optional($page->live_at['carbon'])->toDateTimeString();

        $page->update([
            'name' => $request->name,
            'slug' => $request->has('slug') ? $request->slug : $page->slug,
            'live_at' => $live,
            'in_menu' => $request->in_menu ?: $page->in_menu
        ]);

        if ($request->filled('content.data')) {
            foreach ($request->input('content.data') as $key => $content) {
                $page->content()->updateOrCreate(
                    [
                        'content_name' => $content['content_name'],
                        'lang' => $content['language']
                    ],
                    ['content' => $content['content']]
                );
            }
        }

        $page->syncMedia([
            'main_img' => $request->filled('main_img') ? $request->main_img : null
        ]);

        $page->load($request->with ?: []);

        return new PageResource($page);
    }

    /**
     *  Bulk Update the many resources in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function bulkUpdate(Request $request)
    {
        $this->authorize('bulkUpdate', get_class(new Page()));

        $actions = ['delete', 'live', 'draft'];

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

        $pages = Page::whereIn('id', $ids);

        switch ($request->action) {
            case 'delete':
                $pages->delete();
                break;

            case 'live':
                $pages->update([
                    'live_at' => Carbon::now()->subMinute()->toDateTimeString()
                ]);
                break;

            case 'draft':
                $pages->update([
                    'live_at' => null
                ]);
                break;
        }

        return [
            'errors' => [],
            'message' => 'Successfully updated ' . count($ids) . ' pages.'
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function destroy(Page $page)
    {
        $this->authorize('delete', $page);

        $page->delete();
    }
}
