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
            $watermark = Storage::disk('public')->path('tco-watermark.png');

            $this->addMediaConversion("{$media->name}-web")
                  ->watermark($watermark)
                  ->watermarkPosition(Manipulations::POSITION_TOP_LEFT)
                  ->watermarkHeight(13, Manipulations::UNIT_PERCENT)
                  ->watermarkWidth(20, Manipulations::UNIT_PERCENT)
                  ->watermarkFit(Manipulations::FIT_FILL)
                  ->watermarkPadding(3, 3, Manipulations::UNIT_PERCENT);

            $this->addMediaConversion($media->thumbName())
                  ->watermark($watermark)
                  ->watermarkPosition(Manipulations::POSITION_TOP_LEFT)
                  ->watermarkHeight(20, Manipulations::UNIT_PERCENT)
                  ->watermarkWidth(30, Manipulations::UNIT_PERCENT)
                  ->watermarkPadding(3, 3, Manipulations::UNIT_PERCENT)
                  ->crop(Manipulations::CROP_CENTER, 500, 500);


            $this->addMediaConversion($media->headerName())
                  ->watermark($watermark)
                  ->watermarkPosition(Manipulations::POSITION_TOP_LEFT)
                  ->watermarkHeight(15, Manipulations::UNIT_PERCENT)
                  ->watermarkWidth(25, Manipulations::UNIT_PERCENT)
                  ->watermarkPadding(3, 3, Manipulations::UNIT_PERCENT)
                  ->crop(Manipulations::CROP_CENTER, 1770, 600);

            $this->addMediaConversion($media->panelName())
                  ->watermark($watermark)
                  ->watermarkPosition(Manipulations::POSITION_TOP_LEFT)
                  ->watermarkHeight(15, Manipulations::UNIT_PERCENT)
                  ->watermarkWidth(25, Manipulations::UNIT_PERCENT)
                  ->watermarkPadding(3, 3, Manipulations::UNIT_PERCENT)
                  ->crop(Manipulations::CROP_CENTER, 1300, 390);

            $this->addMediaConversion($media->listingName())
                  ->watermark($watermark)
                  ->watermarkPosition(Manipulations::POSITION_TOP_LEFT)
                  ->watermarkHeight(15, Manipulations::UNIT_PERCENT)
                  ->watermarkWidth(25, Manipulations::UNIT_PERCENT)
                  ->watermarkPadding(3, 3, Manipulations::UNIT_PERCENT)
                  ->crop(Manipulations::CROP_CENTER, 1000, 667);
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
