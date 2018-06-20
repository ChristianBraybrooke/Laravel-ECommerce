<?php

namespace ChrisBraybrooke\ECommerce\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Language;

class CreateContentOnCreation
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        $all_languages = Language::all();

        $class_name = getClassName($event->model);
        $default_content = config("ecommerce.default_content.{$class_name}", []);

        if (!empty($default_content)) {
            if ($all_languages->count() >= 1) {
                foreach ($all_languages as $key => $language) {
                    $contents = $this->formatContents($event, $default_content, $language);

                    if ($contents) {
                        $event->model->content()->createMany($contents);
                    }
                }
            } else {
                $contents = $this->formatContents($event, $default_content);

                if ($contents) {
                    $event->model->content()->createMany($contents);
                }
            }
        }
    }

    /**
     * Format model contents.
     *
     * @param  Object  $event
     * @param  String  $language
     * @return Array
     */
    public function formatContents($event, $content, $language = null)
    {
        $contents = [];
        foreach ($content as $key => $content) {
            $content_inner = $content['content'] ?? null;
            if (($content['type'] ?? null) === 'json' && !empty($content_inner)) {
                $content_inner = json_encode($content_inner);
            }
            $contents[] = [
                'content_name' => $content['content_name'],
                'content' => $content_inner,
                'lang' => optional($language)->key ?? 'en',
                'type' => $content['type'] ?? 'text',
                'order' => $content['order'] ?? null
            ];
        }

        return $contents;
    }
}
