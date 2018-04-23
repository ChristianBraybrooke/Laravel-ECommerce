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
                $meta[ucwords(str_replace('_', ' ', $new_key))] = $field;
            }
        }
        return $meta;
    }

    /**
    * Format the content being added to the object.
    *
    * @var Array $contents
    * @return array
    */
    public function formatImportContent($contents)
    {
        $formatted_contents = [];
        $i = count($this->defaultContent ?? []);
        foreach ($contents as $name => $content) {
            $i++;
            $content_is_array = is_array($content) ? true :  false;
            $formatted_contents[] = [
                'content_name' => ucfirst($name),
                'content' => $content_is_array ? json_encode($content) : $content,
                'lang' => $row['language'] ?? 'en',
                'type' => $content_is_array ? 'meta' : 'text',
                'order' => $i
            ];
        }
        return $formatted_contents;
    }
}
