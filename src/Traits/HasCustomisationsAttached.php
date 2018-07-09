<?php

namespace ChrisBraybrooke\ECommerce\Traits;

use Illuminate\Support\Facades\DB;
use ProductCustomisationOption;

trait HasCustomisationsAttached
{
    public function syncCustomisations(array $customisations)
    {
        $updated_options = [];
        $customisation_ids = [];

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
            $updated_options[] = $this->syncCustomisationOptions($options, $new_customisation->id);
        }

        // $db = DB::table('product_customisation_options')
        //         ->whereIn('product_customisation_id', $customisation_ids)
        //         ->delete();
        //
        // $db = DB::table('product_customisation_options')->insert($updated_options);
    }

    public function syncCustomisationOptions(array $options, $customisation_id)
    {
        $updated_options = [];

        foreach ($options as $key => $option) {
            if ($option['id'] ?? false) {
                $updated_options[] = $this->formatSyncedCustomisationOption($option, $customisation_id);
            } else {
                $option = ProductCustomisationOption::create([
                    'name' => $option['name'] ?? null,
                    'default' => $option['default'] ?? false,
                    'product_customisation_id' => $customisation_id,
                ]);
                $updated_options[] = $this->formatSyncedCustomisationOption($option, $customisation_id);
            }
            $this->syncCustomisationOptionsMedia($option);
        }

        return $updated_options;
    }

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

    public function customisationOptionsFileLocations()
    {
        return ['main_img', 'selector_img'];
    }
}
