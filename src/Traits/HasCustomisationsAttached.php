<?php

namespace ChrisBraybrooke\ECommerce\Traits;

use Illuminate\Support\Facades\DB;
use ProductCustomisationOption;

trait HasCustomisationsAttached
{
    /**
     * The entry point into this trait, start the sync of customisations.
     *
     * @param array $customisations
     * @return void
     */
    public function syncCustomisations(array $customisations)
    {
        $updated_options = [];
        $customisation_ids = [];
        $option_ids = [];
        $all_images = [];

        foreach ($customisations as $key => $customisation) {
            $new_customisation = $this->customisations()->updateOrCreate(
                ['id' => $customisation['id'] ?? null],
                [
                    'name' => $customisation['name'] ?? '',
                    'order' => $customisation['order'] ?? 1
                ]
            );
            $customisation_ids[] = $new_customisation->id;

            $options = $customisation['options']['data'] ?? [];
            $options = $this->syncCustomisationOptions($options, $new_customisation->id);
            foreach ($options['updated_options'] as $key => $option) {
                $updated_options[] = $option;
                $customisation_ids[] = $option['id'];
            }
            foreach ($options['all_images'] as $key => $option) {
                $all_images[] = $option;
            }
        }

        $db = DB::table('product_customisation_options')
                ->whereIn('product_customisation_id', $customisation_ids)
                ->delete();

        $db = DB::table('product_customisation_options')->insert($updated_options);

        $db = DB::table('media_to_models')
                ->whereIn('model_id', $customisation_ids)
                ->where('model_type', get_class(new ProductCustomisationOption()))
                ->delete();

        $db = DB::table('media_to_models')->insert($all_images);
    }

    /**
     * Format, sync and create customisation options.
     *
     * @param array $options
     * @param int $customisation_id
     * @return array
     */
    public function syncCustomisationOptions(array $options, $customisation_id)
    {
        $updated_options = [];
        $all_images = [];

        foreach ($options as $key => $option) {
            if ($option['id'] ?? false) {
                $updated_options[] = $this->formatSyncedCustomisationOption($option, $customisation_id);
            } else {
                $id = DB::table('product_customisation_options')->insertGetId(
                    [
                        'name' => $option['name'] ?? null,
                        'default' => $option['default'] ?? false,
                        'product_customisation_id' => $customisation_id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
                $option['id'] = $id;
                $option['created_at']['carbon'] = now();
                $updated_options[] = $this->formatSyncedCustomisationOption($option, $customisation_id);
            }
            foreach ($this->syncCustomisationOptionsMedia($option) as $key => $image) {
                $all_images[] = $image;
            };
        }

        return [
            'updated_options' => $updated_options,
            'all_images' => $all_images,
        ];
    }

    /**
     * Format customisation options ready for a mass insert into the DB.
     *
     * @param array $option
     * @param int $customisation_id
     * @return array
     */
    public function formatSyncedCustomisationOption($option, $customisation_id)
    {
        $created_at = null;
        if (is_array($option['created_at'])) {
            $created_at = optional($option['created_at']['carbon'])->toDateTimeString() ?: ($option['created_at']['carbon']['date'] ?? now()->toDateTimeString());
        }
        $created_at = $created_at ? $created_at : now()->toDateTimeString();

        $formatted_option = [
            'name' => $option['name'] ?? null,
            'default' => $option['default'] ?? false,
            'product_customisation_id' => $customisation_id,
            'updated_at' => now()->toDateTimeString(),
            'created_at' => $created_at,
        ];

        if ($option['id'] ?? false) {
            $formatted_option['id'] = $option['id'];
        }
        return $formatted_option;
    }

    /**
     * Format the media foreach of the options.
     *
     * @param array $option
     * @return array
     */
    public function syncCustomisationOptionsMedia($option)
    {
        $all_images = [];
        foreach ($this->customisationOptionsFileLocations() as $key => $image_location) {
            $image_id = $option[$image_location][0]['id'] ?? $option[$image_location]['id'] ?? null;
            if ($image_id) {
                $all_images[] = [
                    'media_id' => $image_id,
                    'model_id' => $option['id'] ?? null,
                    'model_type' => get_class(new ProductCustomisationOption()),
                    'media_location' => $image_location,
                    'created_at' => $option[$image_location]['created_at']['carbon']['date'] ?? now()->toDateTimeString(),
                    'updated_at' => now()->toDateTimeString()
                ];
            }
        }
        return $all_images;
    }

    /**
     * Get the media location names.
     *
     * @return array
     */
    public function customisationOptionsFileLocations()
    {
        return ['main_img', 'selector_img'];
    }
}
