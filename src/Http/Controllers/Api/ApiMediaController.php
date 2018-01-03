<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Http\Resources\MediaResource;
use Validator;
use Auth;
use Image;
use ChrisBraybrooke\ECommerce\Models\Media;
use Illuminate\Support\Facades\Storage;
use ChrisBraybrooke\ECommerce\Models\Gallery;

class ApiMediaController extends Controller
{
    protected $folder = 'uploads';
    protected $disk = 's3';

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Handle file upload and store it in the file system.
     *
     * @param Request $request
     * @return Response
     */
    public function upload(Request $request)
    {
        $gallery = $this->validateAndReturnModel($request);

        $file = $gallery->addMediaFromRequest('file')
                       ->sanitizingFileName(function ($fileName) {
                          return strtolower(str_replace(['#', '/', '\\', ' '], '-', $fileName));
                       })
                       ->toMediaCollection($request->img_collection ?: 'uploads');

        return new MediaResource($file);

        activity()
           ->causedBy(Auth::User())
           ->performedOn($gallery)
           ->log("Image added: ");
    }

    /**
     * Associate a file with a particular gallery.
     *
     * @param Collection $data
     * @param Illuminate\Database\Eloquent\Model || null
     */
    public function validateAndReturnModel($data)
    {
        $validator = Validator::make($data->all(), [
          'file' => 'required|file|max:10240',
          'gallery' => 'required|exists:galleries,id'
        ]);

        $validator->validate();

        $gallery = Gallery::find($data->gallery);

        return $gallery;
    }

    /**
     * Delete a media item.
     *
     * @param Request $request
     * @param Media $media
     * @return Response
     */
    public function delete(Request $request, Media $media)
    {
        $media->delete();
    }
}
