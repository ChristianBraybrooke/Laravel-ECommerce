<?php

namespace ChrisBraybrooke\ECommerce\Traits;

trait SluggableTrait
{
    /**
     * Set the collection's slug.
     *
     * @param  string  $value
     * @return void
     */
    public function setSlugAttribute($value)
    {
        $value = str_slug($value ?: $this->attributes['name']);

        $this->attributes['slug'] = $value;
    }

    /**
     * Set the collection's individual name.
     *
     * @param  string  $value
     * @return void
     */
    public function setIndividualNameAttribute($value)
    {
        $value = $value ?: str_singular($this->attributes['name']);

        $this->attributes['individual_name'] = $value;
    }
}
