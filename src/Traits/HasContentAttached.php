<?php

namespace ChrisBraybrooke\ECommerce\Traits;

use App;

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
    public function contentByName($type, $lang = null)
    {
        if (!$lang) {
            $lang = App::getLocale();
        }
        $content = $this->content
                        ->where('lang', $lang)
                        ->where('content_name', $type)
                        ->first();

        return $content ? $content->content : null;
    }
}
