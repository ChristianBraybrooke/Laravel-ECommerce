<?php

namespace ChrisBraybrooke\ECommerce\Exceptions;

use Exception;
use Illuminate\Validation\ValidationException;

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
        $error = \Illuminate\Validation\ValidationException::withMessages([
           'stripeToken' => [$this->message],
        ]);
        throw $error;
    }
}
