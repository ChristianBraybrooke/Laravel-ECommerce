<?php

namespace ChrisBraybrooke\ECommerce\Traits;

use App;
use Illuminate\Support\Facades\DB;

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

    /**
     * Sync multiple content objects
     *
     * @param Array $files
     * @return void
     */
    public function syncContent(array $content)
    {
        $sync_content = [];
        foreach ($content as $key => $content) {
            $content_value = is_array($content['content'] ?? '') ? json_encode($content['content']) : ($content['content'] ?? '');
            $sync_content[] = [
                'contentable_type' => get_class($this),
                'contentable_id' => $this->id,
                'content_name' => $content['content_name'] ?? '',
                'type' => $content['type'] ?? 'text',
                'lang' => $content['language'] ?? App::getLocale(),
                'content' => $content_value ?? '',
                'order' => $content['order'] ?? $key +1,
                'created_at' => now()->toDateTimeString(),
                'updated_at' => now()->toDateTimeString()
            ];
        }

        $db = DB::table('contents')
                ->where('contentable_type', get_class($this))
                ->where('contentable_id', $this->id)
                ->delete();

        DB::table('contents')->insert($sync_content);
    }
}
