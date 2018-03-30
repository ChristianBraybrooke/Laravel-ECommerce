<?php

namespace ChrisBraybrooke\ECommerce\Traits;

use ChrisBraybrooke\ECommerce\Models\Import;

trait Importable
{
    /**
     * Get any imports associated with the model.
     *
     * @param  string  $value
     * @return void
     */
    public function imports()
    {
        return $this->morphToMany(Import::class, 'model', 'import_to_models')
                    ->withTimestamps();
    }

    /**
     * If the model was imported, get the import object.
     *
     * @param  string  $value
     * @return void
     */
    public function getImportAttribute()
    {
        return $this->imports()->first();
    }
}
