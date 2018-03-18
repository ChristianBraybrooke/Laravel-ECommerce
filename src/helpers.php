<?php

use ChrisBraybrooke\ECommerce\Models\Media;

/**
 * Instantiate a new media object from a resource created by the api
 *
 * @param $resource
 * @return App\Media
 */
function instantiateMediaFromResource($resource)
{
    if (!empty($resource) &&
          isset($resource['id']) &&
          isset($resource['name']) &&
          isset($resource['file_name']) &&
          isset($resource['file_type']) &&
          isset($resource['url']) &&
          isset($resource['disk']) &&
          isset($resource['parent_type'])
       ) {
        return new Media([
          'id' => $resource['id'],
          'file_name' => $resource['file_name'],
          'name' => $resource['name'],
          'mime_type' => $resource['file_type'],
          'url' =>$resource['url'],
          'disk' => $resource['disk'],
          'model_type' => $resource['parent_type']
        ]);
    }
    return null;
}

/**
 * Return a media object from a value in settings
 *
 * @param $settingKey
 * @return App\Media
 */
function getMediaFromSetting($settingKey)
{
    $setting = Setting::get($settingKey) ?: null;

    if ($setting) {
        $mediaResource = isset($setting[0]['response']['data']) ? $setting[0]['response']['data'] : isset($setting[0]) ? $setting[0] : null;

        if ($mediaResource) {
            return instantiateMediaFromResource($mediaResource);
        }

        return null;
    }

    return null;
}

/**
 * Return a formated array for showing gtm product data
 *
 * @param $products array
 * @param $extra array
 * @return array
 */
function productGtmLoop($products = [], $extra = [])
{
    $gtm_products = [];
    foreach ($products as $key => $product) {
        $gtm_products[] = $product->gtm($key, $extra);
    }

    return $gtm_products;
}

/**
 * Return a formated price, set from the site settings.
 *
 * @param mixed $price
 * @return string
 */
function priceFormatter($price)
{
    $decimal_sep = Setting::get('Price Decimal Seperator') ?: '.';
    $thousand_sep = Setting::get('Price Thousand Seperator') ?: ',';
    $number_dec = (int)Setting::get('Price Numer of Decimals');

    return (string)number_format((float)str_replace(',', '', $price), $number_dec, $decimal_sep, $thousand_sep);
}

function checkoutInputHelper($field, $type, $user, $order, $order_prefix = '', $order_value = null)
{

    $field = $type . $field;
    $old = old($field);
    if (!empty($old)) {
        return $old;
    }

    if (is_null($order_value)) {
        if (isset($order->{$order_prefix . $field})) {
            return $order->{$order_prefix . $field};
        }
    } else {
        if (isset($order->{$order_value})) {
            return $order->{$order_value};
        }
    }

    if (isset($user->{$field})) {
        return $user->{$field};
    }
}

/**
 * Determine what is in the include section of the request.
 *
 * @param string $key
 * @return bool
 */
function requestIncludes($key)
{
    $include = request()->include;
    if (!is_array($include)) {
        $include = explode(',', str_replace(' ', '', $include));
    }
    return in_array($key, $include);
}
