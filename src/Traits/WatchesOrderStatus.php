<?php

namespace ChrisBraybrooke\ECommerce\Traits;

use Illuminate\Database\Eloquent\Model;

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
                $this->handleOrderStatusChange($model)
            }
        });
    }

    private function handleOrderStatusChange(Model $model)
    {
        // Status has changed to processing.
        // if ($model->getOriginal('status') !== Order::$statuses['STATUS_PROCESSING'] && $event->model->status === Order::$statuses['STATUS_PROCESSING']) {
        //
        // }
    }
}
