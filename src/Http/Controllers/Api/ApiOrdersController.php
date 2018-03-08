<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use ChrisBraybrooke\ECommerce\Models\Order;
use Illuminate\Http\Request;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Http\Resources\OrdersResource;
use ChrisBraybrooke\ECommerce\Http\Resources\OrderResource;
use ChrisBraybrooke\ECommerce\Http\Requests\CheckoutRequest;
use ChrisBraybrooke\ECommerce\Http\Requests\OrderUpdateRequest;

class ApiOrdersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->except(['index', 'show']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $orders = Order::with($request->with ?: [])->basicResponse();

        return new OrdersResource($orders);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function store(CheckoutRequest $request, Order $order)
    {
        $use_billing_for_shipping = $request->has('same_shipping_address') && $request->same_shipping_address;

        $order = $order->create([
          'user_first_name' => $request->first_name,
          'user_last_name' => $request->last_name,
          'user_email' => $request->email,
          'user_phone' => $request->phone,

          'billing_address_line1' => $request->billing_address_line1,
          'billing_address_line2' => $request->billing_address_line2,
          'billing_address_town' => $request->billing_address_town,
          'billing_address_county' => $request->billing_address_county,
          'billing_address_postcode' => $request->billing_address_postcode,
          'billing_address_country' => $request->billing_address_country,
          'use_billing_for_shipping' => $use_billing_for_shipping,

          'shipping_address_line1' => !$use_billing_for_shipping ? $request->shipping_address_line1 : null,
          'shipping_address_line2' => !$use_billing_for_shipping ? $request->shipping_address_line2 : null,
          'shipping_address_town' => !$use_billing_for_shipping ? $request->shipping_address_town : null,
          'shipping_address_county' => !$use_billing_for_shipping ? $request->shipping_address_county : null,
          'shipping_address_postcode' => !$use_billing_for_shipping ? $request->shipping_address_postcode : null,
          'shipping_address_country' => !$use_billing_for_shipping ? $request->shipping_address_country : null,

          // 'payment_method' => 'stripe',
          // 'payment_id' => isset($payment->id) ? $payment->id : null,
          // 'payment_currency' => isset($payment->currency) ? $payment->currency : null,
          // 'payment_amount' => isset($payment->amount) ? $payment->amount : null,
          // 'payment_fee' => isset($payment->application_fee) ? $payment->application_fee : null,
          // 'payment_source_id' => isset($payment->source->id) ? $payment->source->id : null,
          // 'payment_source_brand' => isset($payment->source->brand) ? $payment->source->brand : null,
          // 'payment_source_country' => isset($payment->source->country) ? $payment->source->country : null,
          // 'payment_source_last4' => isset($payment->source->last4) ? $payment->source->last4 : null,
          // 'payment_source_exp_month' => isset($payment->source->exp_month) ? $payment->source->exp_month : null,
          // 'payment_source_exp_year' => isset($payment->source->exp_year) ? $payment->source->exp_year : null,

          'status' => 'Draft',
        ]);

        $order->load($request->with ?: []);

        return new OrderResource($order);
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Order $order)
    {
        $order->load($request->with ?: []);

        return new OrderResource($order);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(OrderUpdateRequest $request, Order $order)
    {
        $shipping = $request->shipping_address;
        $billing = $request->billing_address;

        $order->update([
            'status' => $request->status,

            'shipping_address_line1' => $shipping['Line 1'],
            'shipping_address_line2' => $shipping['Line 2'],
            'shipping_address_town' => $shipping['Town'],
            'shipping_address_county' => $shipping['County'],
            'shipping_address_postcode' => $shipping['Postcode'],
            'shipping_address_country' => $shipping['Country'],

            'billing_address_line1' => $billing['Line 1'],
            'billing_address_line2' => $billing['Line 2'],
            'billing_address_town' => $billing['Town'],
            'billing_address_county' => $billing['County'],
            'billing_address_postcode' => $billing['Postcode'],
            'billing_address_country' => $billing['Country'],

            'use_billing_for_shipping' => $request->use_billing_for_shipping,
        ]);

        $order->load($request->with ?: []);

        return new OrderResource($order);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }

    /**
     * Create a PDF invoice for the order.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function invoice(Request $request, Order $order)
    {
        //
    }
}
