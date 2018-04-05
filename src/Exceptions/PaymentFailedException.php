<?php

namespace ChrisBraybrooke\ECommerce\Exceptions;

use Exception;
use Illuminate\Support\MessageBag;

class PaymentFailedException extends Exception
{

    /**
     * Render the exception as an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function render($request)
    {
        $errors = new MessageBag();

        // add your error messages:
        $errors->add('stripeToken', $this->message);

        return $errors;
    }
}
