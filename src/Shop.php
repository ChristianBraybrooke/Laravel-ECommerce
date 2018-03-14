<?php

namespace ChrisBraybrooke\ECommerce;

class Shop
{
    public static $data;

    /**
     * Set the shop data
     *
     * @return void
     */
    public static function setData(array $data)
    {
        static::$data = $data;
    }

    /**
     * Dump the shop data - used in views
     *
     * @return collection
     */
    public static function dumpData()
    {
        $additional_data = config('ecommerce.shopData');
        return self::$data ? collect(
            is_array($additional_data) ?
            array_merge(self::$data, $additional_data) :
            self::$data
        ) : collect([]);
    }
}
