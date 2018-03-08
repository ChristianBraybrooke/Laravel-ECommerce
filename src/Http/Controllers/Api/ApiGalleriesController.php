<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\MediasResource;
use App\Http\Resources\GalleryResource;
use App\Http\Resources\GalleriesResource;
use App\Http\Requests\GalleryRequest;
use App\Gallery;

class ApiGalleriesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['index', 'show', 'media']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $galleries = Gallery::basicResponse();

        return new GalleriesResource($galleries);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GalleryRequest $request, Gallery $gallery)
    {
        $this->authorize('create', Gallery::class);

        $gallery = $gallery->create([
            'name' => $request->name,
        ]);

        return new GalleryResource($gallery);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Gallery $gallery)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Gallery $gallery
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Gallery $gallery)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Gallery $gallery)
    {
        $this->authorize('delete', $gallery);

        $gallery->delete();
    }

    /**
     * Get the media within a gallery.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Gallery $gallery
     * @return \Illuminate\Http\Response
     */
    public function media(Request $request, Gallery $gallery)
    {
        $media = $gallery->media()->basicResponse();

        return new MediasResource($media);
    }
}
