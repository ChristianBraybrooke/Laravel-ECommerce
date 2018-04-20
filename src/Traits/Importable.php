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

    /**
    * Format the meta being added to the object.
    *
    * @var Array $row
    * @var ChrisBraybrooke\ECommerce\Models\Import $import
    * @var String $starts_with
    * @return array
    */
    public function formatImportMeta($row, $import, $starts_with = 'meta_')
    {
        $meta = [];
        foreach ($row as $key => $field) {
            if (starts_with($key, $starts_with)) {
                $new_key = str_replace_first($starts_with, '', $key);
                if (str_contains($new_key, '_')) {
                    $meta[str_before($new_key, '_')][str_after($new_key, '_')] = $field;
                } else {
                    $meta[$new_key] = $field;
                }
            }
        }
        return $meta;
    }
}
