<?php

namespace ChrisBraybrooke\ECommerce\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;
use Auth;

class LiveScope implements Scope
{
    /**
     * If the user is not logged in and has permission don't show records that aren't live.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        $model_name = str_replace("_", " ", $model->getTable());

        if (Auth::guard('api')->check() && Auth::guard('api')->user()->can("read draft {$model_name}")) {
            $builder;
        } elseif (Auth::check() && Auth::user()->can("read draft {$model_name}")) {
            $builder;
        } else {
            $builder->where('live_at', '<', Carbon::now()->toDateTimeString());
        }
    }
}
