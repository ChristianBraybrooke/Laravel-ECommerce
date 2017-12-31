<?php

namespace ChrisBraybrooke\ECommerce\Traits;

trait HasColours
{
    /**
     * Convert a hex colour in an RGBA colour
     *
     * @param String $colour
     * @param String $opacity
     * @return String
     */
    public function hexToRgba($colour, $opacity = false)
    {
        $default = 'rgb(0,0,0)';

        //Return default if no color provided
        if (empty($colour)) {
            return $default;
        }

        //Sanitize $colour if "#" is provided
        if ($colour[0] == '#') {
            $colour = substr($colour, 1);
        }

        //Check if color has 6 or 3 characters and get values
        if (strlen($colour) == 6) {
                $hex = array($colour[0] . $colour[1], $colour[2] . $colour[3], $colour[4] . $colour[5]);
        } elseif (strlen($colour) == 3) {
                $hex = array($colour[0] . $colour[0], $colour[1] . $colour[1], $colour[2] . $colour[2]);
        } else {
                return $default;
        }

        //Convert hexadec to rgb
        $rgb =  array_map('hexdec', $hex);

        //Check if opacity is set(rgba or rgb)
        if ($opacity) {
            if (abs($opacity) > 1) {
                $opacity = 1.0;
            }
            $output = 'rgba('.implode(",", $rgb).','.$opacity.')';
        } else {
            $output = 'rgb('.implode(",", $rgb).')';
        }

        //Return rgb(a) color string
        return $output;
    }

    /**
     * Get a colour value from the model
     *
     * @param String $type
     * @param String $opacity
     * @return String
     */
    public function getColour($type, $opacity = false)
    {
        $colour = $this->getMetaByKey("{$type}_colour");

        return $colour ? $this->hexToRgba($colour, $opacity) : null;
    }
}
