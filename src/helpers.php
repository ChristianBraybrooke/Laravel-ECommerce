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
          'url' => $resource['url'],
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

function getResourceValue($self, $value)
{
    return requestIncludes($value) ? optional($self)->$value : null;
}

/**
 * Dynamically work out a sum.
 *
 * @param String $op
 * @param Int $a
 * @param Int $b
 * @return Int
 */
function operators($op, $a, $b)
{
    $operators = [
        '+' => (int)($a) + (int)($b),
        '-' => (int)($a) - (int)($b)
    ];
    return $operators[$op];
}

/**
 * Turn a camel case string into words.
 *
 * @param String $string
 * @param String $uc
 * @return String
 */
function camelCaseToWords($string, $uc = false)
{
    $pattern = '/(.*?[a-z]{1})([A-Z]{1}.*?)/';
    $replace = '${1} ${2}';
    $words = preg_replace($pattern, $replace, $string);
    if ($uc) {
        $words = ucwords($words);
    }

    return $words ?: $string;
}

/**
 * Return the id for a collection mapped to something.
 *
 * @param String $name
 * @return Int
 */
function getCollectionMap($name)
{
    return Setting::get("{$name} Collection");
}

/**
 * Return the name of the class.
 *
 * @param String $class
 * @param Boolean $plural
 * @return String
 */
function getClassName($class, $plural = true)
{
    $expoloded = explode("\\", get_class($class));
    $last = strtolower(last($expoloded));

    if ($plural) {
        return str_plural($last);
    }
    return $last;
}

function formatOrderItems($request_items = [], $shipping_rate = 0, $discount_rate = 0)
{
    $items = [];
    $order_extras = 0;
    $order_subtotal = 0;
    $order_vat = 0;
    $order_discount = (int)$discount_rate;
    $order_shipping = (int)$shipping_rate;


    foreach ($request_items as $key => $item) {
        $quantity = (int)$item['quantity'] ?? 1;
        $price = (float)str_replace(',', '', $item['price']);
        $order_subtotal = $order_subtotal + ($price * $quantity);

        $options = [];
        foreach (($item['options'] ?? []) as $key => $option) {
            if (isset($option['price_mutator']) && isset($option['price_value']) && $option['price_mutator'] && $option['price_value']) {
                $order_extras = $order_extras + (operators($option['price_mutator'], 0, $option['price_value']) * $quantity);
            }
            $options[$key] = $option['name'] ?? $option;
        }

        $items[] = [
            'id' => $item['id'],
            'name' => $item['name'],
            'variant' => $item['variant'] ?? null,
            'qty' => $quantity,
            'price' => $price,
            'options' => $options,
            'subtotal' => ($price * $quantity),
        ];
    }

    $total_ex_vat = $order_subtotal + $order_extras + $order_shipping;
    $discount_amount = $total_ex_vat * ((float)$order_discount / 100);
    $total_ex_vat = $total_ex_vat - $discount_amount;
    $order_vat = $total_ex_vat * 0.2;
    $order_total = $total_ex_vat + $order_vat;

    $cart_data = [
        'items' => $items,
        'extras' => $order_extras,
        'sub_total' => $order_subtotal,
        'shipping' => $order_shipping,
        'discount' => $order_discount,
        'tax' => $order_vat,
        'total' => $order_total
    ];

    return $cart_data;
}
