<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Spatie\MediaLibrary\Media as BaseMedia;
use App\Traits\FormatDatesTrait;
use App\Traits\ResponsableTrait;
use Spatie\Activitylog\Traits\LogsActivity;
use File;
use Storage;

class Media extends BaseMedia
{
    use LogsActivity, ResponsableTrait, FormatDatesTrait;

    /**
     * Santize the original file name provided by the user
     *
     * @param String $name
     * @return String
     */
    public function sanitizeName($name)
    {
        return strtolower(str_replace(['#', '/', '\\', ' '], '-', $name));
    }

    /**
     * Generate the thumbnail file name
     *
     * @param String $name
     * @return String
     */
    public function thumbName($name = null)
    {
        $name = $name ?: $this->name;
        return $this->sanitizeName($name) . '-thumbnail';
    }

    /**
     * Generate the header file name
     *
     * @param String $name
     * @return String
     */
    public function headerName($name = null)
    {
        $name = $name ?: $this->name;
        return $this->sanitizeName($name) . '-header';
    }

    /**
     * Generate the panel file name
     *
     * @param String $name
     * @return String
     */
    public function panelName($name = null)
    {
        $name = $name ?: $this->name;
        return $this->sanitizeName($name) . '-panel';
    }

    /**
     * Generate the listing file name
     *
     * @param String $name
     * @return String
     */
    public function listingName($name = null)
    {
        $name = $name ?: $this->name;
        return $this->sanitizeName($name) . '-listing';
    }

    /**
     * Determine whether the file is an image
     *
     * @return Bool
     */
    public function isImage()
    {
        $type = $this->mime_type;

        return $type === 'image/pjpeg' || $type === 'image/jpeg' || $type === 'image/png' || $type === 'image/jpg';
    }

    /**
     * Get conversion url from a shortened conversion name.
     *
     * @param String $conversion
     * @return String
     */
    public function conversionUrl($conversion = '')
    {
        switch ($conversion) {
            case 'header':
                $mediaConversion = $this->headerName();
                break;

            case 'thumb':
                $mediaConversion = $this->thumbName();
                break;

            case 'panel':
                $mediaConversion = $this->panelName();
                break;

            case 'listing':
                $mediaConversion = $this->listingName();
                break;

            case 'optimised':
                $mediaConversion = "{$this->name}-web";
                break;

            default:
                $mediaConversion = $this->headerName();
                break;
        }

        return $this->getConversion($mediaConversion) ?: $this->getUrl();
    }

    /**
     * Get the various converstion url's if the exsist in the file system
     *
     * @param String $type
     * @return String || null
     */
    public function getConversion($type = null)
    {
        if ($this->isImage()) {
            $type = $type ?: $this->thumbName($this->name);
            $path = $this->getPath($type);

            return $this->getUrl($type);
        } elseif ($this->mime_type === 'application/pdf') {
            return Storage::disk('public')->url('pdf_icon.jpg');
        } else {
            return Storage::disk('public')->url('file_icon.jpg');
        }
    }

    /**
     * Add a location scope to the query
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLocation($query, $location)
    {
        return $query->where('media_to_models.media_location', $location);
    }
}
