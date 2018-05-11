<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Menu;
use Illuminate\Http\Request;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Http\Resources\MenuResource;
use ChrisBraybrooke\ECommerce\Http\Resources\MenusResource;
use ChrisBraybrooke\ECommerce\Http\Requests\MenuRequest;
use Carbon\Carbon;
use Illuminate\Validation\Rule;

class ApiMenusController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $menus = Menu::with($request->with ?: [])->basicResponse();

        return new MenusResource($menus);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MenuRequest $request, Menu $menu)
    {
        $this->authorize('create', get_class($menu));

        $menu = $menu->create([
            'name' => $request->name,
        ]);

        return new MenuResource($menu);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Menu $menu)
    {
        $menu->load($request->with ?: []);

        return new MenuResource($menu);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function update(MenuRequest $request, Menu $menu)
    {
        $this->authorize('update', $menu);

        $page->update([
            'name' => $request->name,
        ]);

        if ($request->filled('content.data')) {
            foreach ($request->input('content.data') as $key => $content) {
                $menu->content()->updateOrCreate(
                    [
                        'content_name' => $content['content_name'],
                        'lang' => $content['language']
                    ],
                    ['content' => $content['content']]
                );
            }
        }

        $menu->load($request->with ?: []);

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
        $this->authorize('bulkUpdate', get_class(new Menu()));

        $actions = ['delete'];

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

        $menus = Menu::whereIn('id', $ids);

        switch ($request->action) {
            case 'delete':
                $menus->delete();
                break;
        }

        return [
            'errors' => [],
            'message' => 'Successfully updated ' . count($ids) . ' menus.'
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function destroy(Menu $menu)
    {
        $this->authorize('delete', $menu);

        $menu->delete();
    }
}
