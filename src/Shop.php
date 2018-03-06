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
        return self::$data ? collect(self::$data) : collect([]);
    }
}
