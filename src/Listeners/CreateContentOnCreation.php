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
        if (isset($event->model->defaultContent) && !empty($event->model->defaultContent)) {
            if ($all_languages->count() >= 1) {
                foreach ($all_languages as $key => $language) {
                    $contents = $this->formatContents($event, $language);

                    if ($contents) {
                        $event->model->content()->createMany($contents);
                    }
                }
            } else {
                $contents = $this->formatContents($event);

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
    public function formatContents($event, $language = null)
    {
        $contents = [];
        foreach ($event->model->defaultContent as $key => $content) {
            $contents[] = [
                'content_name' => $content['content_name'],
                'content' => $content['content'] ?? '',
                'lang' => optional($language)->key ?? 'en',
                'type' => $content['type'] ?? 'text',
                'order' => $content['order'] ?? null
            ];
        }

        return $contents;
    }
}
