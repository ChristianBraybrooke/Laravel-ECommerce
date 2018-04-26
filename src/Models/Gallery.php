<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;
use ChrisBraybrooke\ECommerce\Scopes\LiveScope;
use Spatie\MediaLibrary\Media;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\Interfaces\HasMediaConversions;
use Spatie\Image\Manipulations;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use File;

class Gallery extends Model implements HasMediaConversions
{
    use LogsActivity, ResponsableTrait, HasMediaTrait, FormatDatesTrait;
    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();
        static::addGlobalScope(new LiveScope);
    }
    /**
     * Register any media converstions that need to happen on upload.
     *
     * @param Media $media
     */
    public function registerMediaConversions(Media $media = null)
    {
        if ($media->isImage()) {
            $watermark_file = getMediaFromSetting('Website Watermark');
            $watermark = null;
            if ($watermark_file) {
                $watermark = $watermark_file->disk === 's3' ? $watermark_file->getUrl() : $watermark_file->getPath();
            }
            if (!File::exists($watermark)) {
                $watermark = null;
            }

            if ($watermark) {
                $this->addMediaConversion("{$media->name}-web")
                     ->watermark($watermark)
                     ->watermarkPosition(Manipulations::POSITION_TOP_LEFT)
                     ->watermarkHeight(13, Manipulations::UNIT_PERCENT)
                     ->watermarkWidth(20, Manipulations::UNIT_PERCENT)
                     ->watermarkFit(Manipulations::FIT_FILL)
                     ->watermarkPadding(3, 3, Manipulations::UNIT_PERCENT);
            } else {
                $this->addMediaConversion("{$media->name}-web");
            }

            if ($watermark) {
                $this->addMediaConversion($media->thumbName())
                     ->watermark($watermark)
                     ->watermarkPosition(Manipulations::POSITION_TOP_LEFT)
                     ->watermarkHeight(20, Manipulations::UNIT_PERCENT)
                     ->watermarkWidth(30, Manipulations::UNIT_PERCENT)
                     ->watermarkPadding(3, 3, Manipulations::UNIT_PERCENT)
                     ->crop(Manipulations::CROP_CENTER, 500, 500);
            } else {
                $this->addMediaConversion($media->thumbName())
                     ->crop(Manipulations::CROP_CENTER, 500, 500);
            }

            if ($watermark) {
                $this->addMediaConversion($media->squareName())
                     ->watermark($watermark)
                     ->watermarkPosition(Manipulations::POSITION_TOP_LEFT)
                     ->watermarkHeight(20, Manipulations::UNIT_PERCENT)
                     ->watermarkWidth(30, Manipulations::UNIT_PERCENT)
                     ->watermarkPadding(3, 3, Manipulations::UNIT_PERCENT)
                     ->crop(Manipulations::CROP_CENTER, 800, 800);
            } else {
                $this->addMediaConversion($media->squareName())
                     ->crop(Manipulations::CROP_CENTER, 800, 800);
            }

            if ($watermark) {
                $this->addMediaConversion($media->headerName())
                     ->watermark($watermark)
                     ->watermarkPosition(Manipulations::POSITION_TOP_LEFT)
                     ->watermarkHeight(15, Manipulations::UNIT_PERCENT)
                     ->watermarkWidth(25, Manipulations::UNIT_PERCENT)
                     ->watermarkPadding(3, 3, Manipulations::UNIT_PERCENT)
                     ->focalCrop(1770, 800, 0, 57);
            } else {
                $this->addMediaConversion($media->headerName())
                     ->focalCrop(1770, 800, 0, 57);
            }

            if ($watermark) {
                $this->addMediaConversion($media->panelName())
                     ->watermark($watermark)
                     ->watermarkPosition(Manipulations::POSITION_TOP_LEFT)
                     ->watermarkHeight(15, Manipulations::UNIT_PERCENT)
                     ->watermarkWidth(25, Manipulations::UNIT_PERCENT)
                     ->watermarkPadding(3, 3, Manipulations::UNIT_PERCENT)
                     ->crop(Manipulations::CROP_CENTER, 1300, 390);
            } else {
                $this->addMediaConversion($media->panelName())
                     ->crop(Manipulations::CROP_CENTER, 1300, 390);
            }

            if ($watermark) {
                $this->addMediaConversion($media->listingName())
                     ->watermark($watermark)
                     ->watermarkPosition(Manipulations::POSITION_TOP_LEFT)
                     ->watermarkHeight(15, Manipulations::UNIT_PERCENT)
                     ->watermarkWidth(25, Manipulations::UNIT_PERCENT)
                     ->watermarkPadding(3, 3, Manipulations::UNIT_PERCENT)
                     ->crop(Manipulations::CROP_CENTER, 1000, 667);
            } else {
                $this->addMediaConversion($media->listingName())
                     ->crop(Manipulations::CROP_CENTER, 1000, 667);
            }

            $this->addMediaConversion($media->advertName())
                  ->crop(Manipulations::CROP_CENTER, 1600, 300);
        }
    }
    /**
     * The attributes to log when changes are made.
     *
     * @var array
     */
    protected static $logAttributes = [
        'id', 'name', 'public', 'default'
    ];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'public'
    ];
    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'public'
    ];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'default' => 'boolean',
    ];
    /**
     * Set default event log message.
     *
     * @var array
     */
    public function getDescriptionForEvent(string $eventName): string
    {
        return "Gallery was: {$eventName}";
    }
}
