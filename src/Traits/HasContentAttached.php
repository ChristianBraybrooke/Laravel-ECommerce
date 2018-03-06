<?php

namespace ChrisBraybrooke\ECommerce\Traits;

trait HasContentAttached
{
    /**
     * Return the content for the model
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function content()
    {
        return $this->morphMany(config('ecommerce.models.content'), 'contentable');
    }

    /**
     * Get content for a specific section
     *
     * @param String $type
     * @return App\Content
     */
    public function contentByName($type)
    {
        $content = $this->content
                    ->where('content_name', $type)
                    ->first();

        return $content ? $content->content : null;
    }
}
