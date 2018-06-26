<?php

namespace ChrisBraybrooke\ECommerce\Services;

use Stripe\Stripe;
use Stripe\Charge;
use Stripe\Customer;
use Exception;
use ChrisBraybrooke\ECommerce\Exceptions\PaymentFailedException;
use Auth;
use App\User;

class PaymentService
{

    private $stripe_private_key;
    private $stripe_public_key;
    private $error_message = 'There was a problem processing the payment. You have not been charged, please try again.';

    public function __construct($stripe_private_key, $stripe_public_key)
    {
        Stripe::setApiKey($stripe_private_key);

        $this->stripe_private_key = $stripe_private_key;
        $this->stripe_public_key = $stripe_public_key;
    }

    /**
    * Retrieve the public key. Will use test key if in local env.
    *
    * @return String
    */
    public function getPublicKey()
    {
        return $this->stripe_public_key;
    }

    /**
    * Retrieve the webhook secret key.
    *
    * @return String
    */
    public function getWebhookKey()
    {
        return env('STRIPE_WH_SECRET');
    }

    /**
    * Retrieve the private key. Will use test key if in local env.
    *
    * @return String
    */
    private function getPrivateKey()
    {
        return $this->stripe_private_key;
    }

    /**
    * Create a new charge using the information provided.
    *
    * @return String
    */
    public function createCharge(array $details)
    {
        try {
            return Charge::create([
                'source' => $details['token'],
                'amount' => $details['amount'],
                'currency' => strtolower($details['currency']),
                'customer' => $details['stripe_id'] ?? (Auth::check() && Auth::user()->stripe_id ?: null),
            ]);
        } catch (Stripe_CardError $e) {
            report($e);
            if ($details['order'] ?? false) {
                $this->updateOrderStatus($details['order'], 'STATUS_PAYMENT_FAILED');
            }
            throw new PaymentFailedException($e->getMessage());
        } catch (Stripe_InvalidRequestError $e) {
          // Invalid parameters were supplied to Stripe's API
            report($e);
            if ($details['order'] ?? false) {
                $this->updateOrderStatus($details['order'], 'STATUS_PAYMENT_FAILED');
            }
            throw new PaymentFailedException($e->getMessage());
        } catch (Stripe_AuthenticationError $e) {
            // Authentication with Stripe's API failed
            report($e);
            if ($details['order'] ?? false) {
                $this->updateOrderStatus($details['order'], 'STATUS_PAYMENT_FAILED');
            }
            throw new PaymentFailedException($e->getMessage());
        } catch (Stripe_ApiConnectionError $e) {
            report($e);
            if ($details['order'] ?? false) {
                $this->updateOrderStatus($details['order'], 'STATUS_PAYMENT_FAILED');
            }
            throw new PaymentFailedException($e->getMessage());
        } catch (Stripe_Error $e) {
            // Display a very generic error to the user
            report($e);
            if ($details['order'] ?? false) {
                $this->updateOrderStatus($details['order'], 'STATUS_PAYMENT_FAILED');
            }
            throw new PaymentFailedException($e->getMessage());
        } catch (Exception $e) {
          // Something else happened, completely unrelated to Stripe
            report($e);
            if ($details['order'] ?? false) {
                $this->updateOrderStatus($details['order'], 'STATUS_PAYMENT_FAILED');
            }
            throw new PaymentFailedException($e->getMessage());
        }
    }

    public function updateOrderStatus($order, $status)
    {
        return $order->update(['status' => $status]);
    }

    /**
    * Setup a customer on stripe for a user.
    *
    * @param User $user
    * @param Boolean $attach
    * @return Object
    */
    public function createCustomer(User $user, $attach = true)
    {
        $customer = null;
        try {
            $customer = Customer::create([
                'description' => $user->name,
                'email' => $user->email,
                'metadata' => [
                    'company' => $user->company
                ]
            ]);
            if ($attach) {
                $user->update([
                    'stripe_id' => $customer->id
                ]);
            }
        } catch (\Exception $e) {
            report($e);
        }
        return $customer;
    }
}
