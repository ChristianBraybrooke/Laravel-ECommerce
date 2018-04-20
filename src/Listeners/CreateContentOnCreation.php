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
        if (isset($event->model->defaultContent) && !empty($event->model->defaultContent)) {
            foreach (Language::all() as $key => $language) {
                $lang_contents = [];
                foreach ($event->model->defaultContent as $key => $content) {
                    $lang_contents[] = [
                        'content_name' => $content['content_name'],
                        'content' => $content['content'],
                        'lang' => $language->key,
                        'type' => $content['type'] ?? 'text',
                        'order' => $content['order'] ?? null
                    ];
                }
                $event->model->content()->createMany($lang_contents);
            }
        }
    }
}
