<?php

namespace ChrisBraybrooke\ECommerce\Traits;

trait ResourceMergeTrait
{
    /**
     * Get the attributes to be merged into the API resource.
     *
     * @return Array
     */
    function getResourceAttributes()
    {
        if (isset(self::$withResource) && is_array(self::$withResource)) {
            return self::$withResource;
        }
        return [];
    }
}
