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
        $this->attributes['slug'] = $this->formatSlug($value);
    }

    /**
     * Format the slug and check if unique.
     *
     * @param  string  $value
     * @return String
     */
    public function formatSlug($value)
    {
        $slug = $value ? str_slug($value) : '';

        if ($slug) {
            $other_slugs = self::withoutGlobalScopes()
                               ->where('slug', 'like', $slug . '%')
                               ->where('id', '!==', $this->id)
                               ->get();
        } else {
            $other_slugs = self::withoutGlobalScopes()
                               ->whereNull('slug')
                               ->where('id', '!==', $this->id)
                               ->get();
        }

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
