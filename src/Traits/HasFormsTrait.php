<?php

namespace ChrisBraybrooke\ECommerce\Traits;

trait HasFormsTrait
{
    /**
     * Setup the relationship between forms and the object
     *
     * @return ChrisBraybrooke\ECommerce\Models\Form
     */
    public function forms()
    {
        return $this->morphToMany(config('ecommerce.models.form'), 'model', 'forms_to_models')
                    ->withTimestamps()
                    ->withPivot('form_location');
    }

    /**
     * Setup the relationship between forms and the object and query by location
     *
     * @param String $location
     * @return ChrisBraybrooke\ECommerce\Models\Form
     */
    public function formByLocation($location)
    {
        return $this->forms
                    ->where('pivot.form_location', $location);
    }
}
