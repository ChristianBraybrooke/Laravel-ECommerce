<?php

namespace ChrisBraybrooke\ECommerce\Traits;

use Illuminate\Database\Eloquent\Model;
use Order;

trait WatchesOrderStatus
{
    protected $oldStatus;

    protected static function bootWatchesOrderStatus()
    {
        static::updating(function (Model $model) {
            $old = $model->replicate()->setRawAttributes($model->getOriginal());
            $model->oldStatus = $old->status;
        });

        static::updated(function (Model $model) {
            if ($model->oldStatus !== $model->status) {
                $model->fireStatusChangeEvent($model->oldStatus);
            }
        });
    }
}
