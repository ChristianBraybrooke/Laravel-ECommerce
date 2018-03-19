<?php

namespace ChrisBraybrooke\ECommerce\Traits;

trait HasMediaAttached
{
    /**
     * Setup the relationship between media and the object
     *
     * @return ChrisBraybrooke\ECommerce\Models\Media
     */
    public function media()
    {
        return $this->morphToMany(config('ecommerce.models.media'), 'model', 'media_to_models')
                    ->withTimestamps()
                    ->withPivot('media_location');
    }

    /**
     * Setup the relationship between media and the object
     *
     * @param String $location
     * @return ChrisBraybrooke\ECommerce\Models\Media
     */
    public function mediaByLocation($location)
    {
        return $this->media
                    ->where('pivot.media_location', $location);
    }

    /**
     * Get a media conversion url if it exsists
     *
     * @param String $conversion
     * @param String $location
     * @return String
     */
    public function mediaConversionUrl($conversion = '', $location = 'main_img')
    {
        $media = $this->mediaByLocation($location)->first();

        if ($media) {
            return $media->conversionUrl($conversion);
        }

        return null;
    }

    /**
     * Sync multiple media objects
     *
     * @param Array $files
     * @return void
     */
    public function syncMedia(array $files)
    {
        $sync_files = [];
        foreach ($files as $location => $location_files) {
            if (is_array($location_files) && !isset($location_files['id'])) {
                foreach ($location_files as $key => $file) {
                    $sync_files[$file['id']] = ['media_location' => $location];
                }
            } elseif (isset($location_files['id'])) {
                $sync_files[$location_files['id']] = ['media_location' => $location];
            }
        }

        $this->media()->sync($sync_files);
    }
}
