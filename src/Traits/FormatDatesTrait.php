<?php

namespace ChrisBraybrooke\ECommerce\Traits;

use Carbon\Carbon;

trait FormatDatesTrait
{

    /**
     * Format the created_at attribute.
     *
     * @var array
     * @return array
     */
    public function getCreatedAtAttribute($value)
    {
        return $this->dateAdapter($value);
    }

    /**
     * Format the updated_at attribute.
     *
     * @var array
     * @return array
     */
    public function getUpdatedAtAttribute($value)
    {
        return $this->dateAdapter($value);
    }

    /**
     * Format the live_at attribute.
     *
     * @var array
     * @return array
     */
    public function getLiveAtAttribute($value)
    {
         $live = $this->dateAdapter($value);

         $live['live'] = ($live['date'] && $live['date'] < Carbon::now()->toDateTimeString());

         return $live;
    }

    /**
     * Format the date into an array.
     *
     * @var string
     * @return array
     */
    public function dateAdapter($value)
    {
        if (!empty($value)) {
            $date = Carbon::createFromFormat('Y-m-d H:i:s', $value);
        }

        return [
            'carbon' => isset($date) ? $date : null,
            'date' => $value ? $date->format('d-m-Y') : null,
            'timezone' => $value ? $date->timezone : null,
            'human' => $value ? $date->diffForHumans(Carbon::now(), true) . ' ago' : null,
        ];
    }
}
