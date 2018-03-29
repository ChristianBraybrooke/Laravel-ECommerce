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
        $this->attributes['slug'] = $this->formatSlug($value ?: $this->attributes['name']);
    }

    /**
     * Format the slug and check if unique.
     *
     * @param  string  $value
     * @return String
     */
    public function formatSlug($value)
    {
        $slug = str_slug($value);

        $other_slugs = self::withoutGlobalScopes()
                           ->where('slug', 'like', $slug . '%')
                           ->get();

        if ($other_slugs->count() >= 1) {
            $slug = $slug . '-' . ($other_slugs->count() + 1);
        }

        return $slug;
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
