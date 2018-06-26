<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Illuminate\Http\Request;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Http\Resources\PaymentResource;
use ChrisBraybrooke\ECommerce\Services\PaymentService;
use Payment;
use Carbon\Carbon;
use Order;

class ApiPaymentsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function store(Request $request, Payment $payment, PaymentService $payment_service)
    {
        $this->validate($request, $payment->validationRules(), $payment->validationMessages());

        $source = [];
        $currency = $request->payment_currency ?: 'GBP';
        $reference = $request->payment_reference ?: 'Payment On ' . now()->toDateTimeString();
        $fee = $request->payment_fee;

        if ($request->payment_method === 'card') {
            $stripe_payment = $payment_service->createCharge([
                'token' => $request->payment_token,
                'amount' => ($request->payment_amount * 100),
                'currency' => 'GBP',
            ]);

            if ($stripe_payment) {
                $reference = $stripe_payment->id;
                $source = [
                    'id' => isset($stripe_payment->source->id) ? $stripe_payment->source->id : null,
                    'brand' => isset($stripe_payment->source->brand) ? $stripe_payment->source->brand : null,
                    'country' => isset($stripe_payment->source->country) ? $stripe_payment->source->country : null,
                    'last4' => isset($stripe_payment->source->last4) ? $stripe_payment->source->last4 : null,
                    'exp_month' => isset($stripe_payment->source->exp_month) ? $stripe_payment->source->exp_month : null,
                    'exp_year' => isset($stripe_payment->source->exp_year) ? $stripe_payment->source->exp_year : null,
                ];
            }
        }

        $payment = $payment->create([
            'order_id' => $request->input('order.id'),
            'reference' => $reference,
            'method' => $request->payment_method,
            'currency' => $currency,
            'amount' => $request->payment_amount,
            'fee' => $fee,
            'source_id' => $source['id'] ?? null,
            'source_brand' => $source['brand'] ?? null,
            'source_country' => $source['country'] ?? null,
            'source_last4' => $source['last4'] ?? null,
            'source_exp_month' => $source['exp_month'] ?? null,
            'source_exp_year' => $source['exp_year'] ?? null,
        ]);

        return new PaymentResource($payment);
    }
}
