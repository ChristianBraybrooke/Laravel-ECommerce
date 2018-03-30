<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;
use ChrisBraybrooke\ECommerce\Traits\HasMediaAttached;
use ChrisBraybrooke\ECommerce\Events\ImportCreated;
use ChrisBraybrooke\ECommerce\Events\ImportUpdated;
use Illuminate\Support\Facades\DB;

class Import extends Model
{
    use  ResponsableTrait, FormatDatesTrait, HasMediaAttached;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'import_to', 'user_id', 'rows_added', 'rows_not_added', 'status', 'import_data'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'import_data' => 'array',
    ];

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'created' => ImportCreated::class,
        'updated' => ImportUpdated::class,
    ];

    /**
     * Setup the relationship between import and the object
     *
     * @var $model
     * @return Illuminate\Support\Collection
     */
    public function models($model)
    {
        return $this->morphedByMany(config('ecommerce.models.' . $model), 'model', 'import_to_models')
                    ->withTimestamps();
    }

    /**
     * Retrieve all models associated with this import
     *
     * @return Illuminate\Support\Collection
     */
    public function allModels()
    {
        return DB::table('import_to_models')->select('*')->where('import_id', $this->id);
    }

    /**
     * Delete all models related to this import
     *
     * @return Bool
     */
    public function deleteAllModels()
    {
        $models = $this->allModels()->get();

        if ($models->count() > 0) {
            foreach ($models as $key => $model) {
                $model_type = $model->model_type;
                if (class_exists($model_type)) {
                    $found_model = $model_type::find($model->model_id);
                    optional($found_model)->delete();
                }
            }
            return true;
        }
        return false;
    }
}
