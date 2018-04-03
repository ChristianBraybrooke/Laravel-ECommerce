<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use ChrisBraybrooke\ECommerce\Models\Order;
use Illuminate\Http\Request;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Http\Resources\OrdersResource;
use ChrisBraybrooke\ECommerce\Http\Resources\OrderResource;
use ChrisBraybrooke\ECommerce\Http\Requests\CheckoutRequest;
use ChrisBraybrooke\ECommerce\Http\Requests\OrderUpdateRequest;
use ChrisBraybrooke\ECommerce\Http\Requests\OrderRequest;

class ApiOrdersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
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
    public function store(OrderRequest $request, Order $order)
    {
        $use_billing_for_shipping = $request->has('use_billing_for_shipping') && $request->use_billing_for_shipping;

        $order = $order->create([
          'user_first_name' => $request->input('customer.first_name'),
          'user_last_name' => $request->input('customer.last_name'),
          'user_email' => $request->input('customer.email'),
          'user_phone' => $request->input('customer.phone'),

          'billing_address_line1' => $request->input('billing_address.line_1'),
          'billing_address_line2' => $request->input('billing_address.line_2'),
          'billing_address_town' => $request->input('billing_address.town'),
          'billing_address_county' => $request->input('billing_address.county'),
          'billing_address_postcode' => $request->input('billing_address.postcode'),
          'billing_address_country' => $request->input('billing_address.country'),
          'use_billing_for_shipping' => $use_billing_for_shipping,

          'shipping_address_line1' => !$use_billing_for_shipping ? $request->input('shipping_address.line_1') : null,
          'shipping_address_line2' => !$use_billing_for_shipping ? $request->input('shipping_address.line_2') : null,
          'shipping_address_town' => !$use_billing_for_shipping ? $request->input('shipping_address.town') : null,
          'shipping_address_county' => !$use_billing_for_shipping ? $request->input('shipping_address.county') : null,
          'shipping_address_postcode' => !$use_billing_for_shipping ? $request->input('shipping_address.postcode') : null,
          'shipping_address_country' => !$use_billing_for_shipping ? $request->input('shipping_address.country') : null,

          'status' => $request->filled('status') ? $order->setStatusFromName($request->status) : $order->setStatusFromName('Draft'),
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
    public function update(OrderRequest $request, Order $order)
    {

        $order->update([
            'status' => $request->filled('status') ? $order->setStatusFromName($request->status) : $order->getAttributes()['status'],

            'user_first_name' => $request->input('customer.first_name'),
            'user_last_name' => $request->input('customer.last_name'),
            'user_email' => $request->input('customer.email'),
            'user_phone' => $request->input('customer.phone'),

            'billing_address_line1' => $request->input('billing_address.line_1'),
            'billing_address_line2' => $request->input('billing_address.line_2'),
            'billing_address_town' => $request->input('billing_address.town'),
            'billing_address_county' => $request->input('billing_address.county'),
            'billing_address_postcode' => $request->input('billing_address.postcode'),
            'billing_address_country' => $request->input('billing_address.country'),

            'shipping_address_line1' => $request->filled('shipping_address.line_1') ? $request->input('shipping_address.line_1') : $order->shipping_address_line1,
            'shipping_address_line2' => $request->filled('shipping_address.line_2') ? $request->input('shipping_address.line_2') : $order->shipping_address_line2,
            'shipping_address_town' => $request->filled('shipping_address.town') ? $request->input('shipping_address.town') : $order->shipping_address_town,
            'shipping_address_county' => $request->filled('shipping_address.county') ? $request->input('shipping_address.county') : $order->shipping_address_county,
            'shipping_address_postcode' => $request->filled('shipping_address.postcode') ? $request->input('shipping_address.postcode') : $order->shipping_address_postcode,
            'shipping_address_country' => $request->filled('shipping_address.country') ? $request->input('shipping_address.country') : $order->shipping_address_country,

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
        $order->delete();
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
