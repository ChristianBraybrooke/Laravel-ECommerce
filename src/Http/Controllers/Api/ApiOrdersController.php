<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use App\User;
use Carbon\Carbon;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Http\Requests\CheckoutRequest;
use ChrisBraybrooke\ECommerce\Http\Requests\OrderRequest;
use ChrisBraybrooke\ECommerce\Http\Requests\OrderUpdateRequest;
use ChrisBraybrooke\ECommerce\Http\Resources\DeliveryResource;
use ChrisBraybrooke\ECommerce\Http\Resources\OrderResource;
use ChrisBraybrooke\ECommerce\Http\Resources\OrdersResource;
use ChrisBraybrooke\ECommerce\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Order;

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
        $orders = Order::with($request->with ?: [])
                       ->withOutStatuses($request->withOutStatuses)
                       ->withStatus($request->withStatus)
                       ->basicResponse();

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

        $cart_data = formatOrderItems(
            $request->filled('items') ? $request->items : [],
            $request->input('cart.totals.Shipping'),
            $request->input('cart.totals.Discount')
        );

        $this->validate($request, [
            'ref' => [
                'required',
                Rule::unique('orders'),
            ]
        ]);

        $customerName = "{$request->input('customer.first_name')} {$request->input('customer.last_name')}";

        $order = $order->create([
          'user_id' => $request->has('customer.id') ? $request->input('customer.id') : null,
          'user_first_name' => $request->input('customer.first_name'),
          'user_last_name' => $request->input('customer.last_name'),
          'user_email' => $request->input('customer.email'),
          'user_phone' => $request->input('customer.phone'),
          'user_company' => $request->input('customer.company'),

          'billing_address_line1' => $request->input('billing_address.line_1'),
          'billing_address_line2' => $request->input('billing_address.line_2'),
          'billing_address_town' => $request->input('billing_address.town'),
          'billing_address_county' => $request->input('billing_address.county'),
          'billing_address_postcode' => $request->input('billing_address.postcode'),
          'billing_address_country' => $request->input('billing_address.country'),
          'billing_address_name' => $request->input('billing_address.name') ?: $customerName,
          'billing_address_company' => $request->input('billing_address.company') ?: $request->input('customer.company'),
          'use_billing_for_shipping' => $use_billing_for_shipping,

          'shipping_address_line1' => !$use_billing_for_shipping ? $request->input('shipping_address.line_1') : null,
          'shipping_address_line2' => !$use_billing_for_shipping ? $request->input('shipping_address.line_2') : null,
          'shipping_address_town' => !$use_billing_for_shipping ? $request->input('shipping_address.town') : null,
          'shipping_address_county' => !$use_billing_for_shipping ? $request->input('shipping_address.county') : null,
          'shipping_address_postcode' => !$use_billing_for_shipping ? $request->input('shipping_address.postcode') : null,
          'shipping_address_country' => !$use_billing_for_shipping ? $request->input('shipping_address.country') : null,
          'shipping_address_name' => !$use_billing_for_shipping ? ($request->input('shipping_address.name') ?: $customerName) : null,
          'shipping_address_company' => !$use_billing_for_shipping ? ($request->input('shipping_address.company') ?: $request->input('customer.company')) : null,

          'status' => $request->filled('status') ? $order->setStatusFromName($request->status) : $order->setStatusFromName('Draft'),

          'cart_data' => $cart_data,

          'ref' => $request->ref
        ]);

        if (!$request->filled('customer.id') && $request->filled('customer.email')) {
            $user = User::updateOrCreate(
                [
                    'email' => $request->input('customer.email')
                ],
                [
                    'first_name' => $request->input('customer.first_name'),
                    'last_name' => $request->input('customer.last_name'),
                    'company' => $request->input('customer.company'),
                    'phone' => $request->input('customer.phone'),
                    'password' => bcrypt(str_random(40)),
                    'billing_address_line1' => $request->input('billing_address.line_1'),
                    'billing_address_line2' => $request->input('billing_address.line_2'),
                    'billing_address_town' =>$request->input('billing_address.town') ,
                    'billing_address_county' => $request->input('billing_address.county'),
                    'billing_address_postcode' => $request->input('billing_address.postcode'),
                    'billing_address_country' => $request->input('billing_address.country'),
                    'shipping_address_line1' => $request->input('shipping_address.line1'),
                    'shipping_address_line2' => $request->input('shipping_address.line2'),
                    'shipping_address_town' => $request->input('shipping_address.town'),
                    'shipping_address_county' => $request->input('shipping_address.county'),
                    'shipping_address_postcode' => $request->input('shipping_address.postcode'),
                    'shipping_address_name' => $request->input('shipping_address.name'),
                    'shipping_address_company' => $request->input('shipping_address.company'),
                    'shipping_address_name' => $request->input('shipping_address.name'),
                    'shipping_address_company' => $request->input('shipping_address.company'),
                ]
            );
            $user->assignRole('customer');
            $order->update(['user_id' => $user->id]);
        } elseif ($request->filled('customer.id') && $request->input('save_billing_address')) {
            $user = User::find($request->input('customer.id'));

            if ($user) {
                $user->update([
                    'billing_address_line1' => $request->input('billing_address.line_1'),
                    'billing_address_line2' => $request->input('billing_address.line_2'),
                    'billing_address_town' =>$request->input('billing_address.town') ,
                    'billing_address_county' => $request->input('billing_address.county'),
                    'billing_address_postcode' => $request->input('billing_address.postcode'),
                    'billing_address_country' => $request->input('billing_address.country')
                ]);
            }
        }

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
        $cart_data = formatOrderItems(
            $request->filled('items') ? $request->items : [],
            $request->input('cart.totals.Shipping'),
            $request->input('cart.totals.Discount')
        );

        $this->validate($request, [
            'ref' => [
                'required',
                Rule::unique('orders')->ignore($order->id),
            ]
        ]);

        $customerName = "{$request->input('customer.first_name')} {$request->input('customer.last_name')}";

        $firstName = $request->filled('customer.full_name') ? str_before($request->input('customer.full_name'), ' ') : $request->input('customer.first_name');
        $lastName = $request->filled('customer.full_name') ? str_after($request->input('customer.full_name'), ' ') : $request->input('customer.last_name');

        $order->update([
            'status' => $request->filled('status') ? $order->setStatusFromName($request->status) : $order->getAttributes()['status'],
            'user_id' => $request->input('customer.id'),
            'user_first_name' => $firstName,
            'user_last_name' => $lastName,
            'user_email' => $request->input('customer.email'),
            'user_phone' => $request->input('customer.phone'),

            'billing_address_line1' => $request->input('billing_address.line_1'),
            'billing_address_line2' => $request->input('billing_address.line_2'),
            'billing_address_town' => $request->input('billing_address.town'),
            'billing_address_county' => $request->input('billing_address.county'),
            'billing_address_postcode' => $request->input('billing_address.postcode'),
            'billing_address_country' => $request->input('billing_address.country'),
            'billing_address_name' => $request->input('billing_address.name') ?: $customerName,
            'billing_address_company' => $request->input('billing_address.company') ?: $request->input('customer.company'),

            'shipping_address_line1' => $request->has('shipping_address.line_1') ? $request->input('shipping_address.line_1') : $order->shipping_address_line1,
            'shipping_address_line2' => $request->has('shipping_address.line_2') ? $request->input('shipping_address.line_2') : $order->shipping_address_line2,
            'shipping_address_town' => $request->has('shipping_address.town') ? $request->input('shipping_address.town') : $order->shipping_address_town,
            'shipping_address_county' => $request->has('shipping_address.county') ? $request->input('shipping_address.county') : $order->shipping_address_county,
            'shipping_address_postcode' => $request->has('shipping_address.postcode') ? $request->input('shipping_address.postcode') : $order->shipping_address_postcode,
            'shipping_address_country' => $request->has('shipping_address.country') ? $request->input('shipping_address.country') : $order->shipping_address_country,
            'shipping_address_name' => $request->has('shipping_address.name') ? ($request->input('shipping_address.name') ?: $customerName) : $order->shipping_address_name,
            'shipping_address_company' => $request->has('shipping_address.company') ? ($request->input('shipping_address.company') ?: $request->input('customer.company')) : $order->shipping_address_company,

            'use_billing_for_shipping' => $request->use_billing_for_shipping,

            'cart_data' => $cart_data,

            'ref' => $request->ref
        ]);

        if ($request->filled('content.data')) {
            foreach ($request->input('content.data') as $key => $content) {
                $order->content()->updateOrCreate(
                    [
                        'content_name' => $content['content_name'],
                        'lang' => $content['language'] ?? null,
                        'type' => $content['type'] ?? null,
                    ],
                    ['content' => $content['content']]
                );
            }
        }

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
     * Create a payment for the order.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function payment(Request $request, Order $order)
    {
        $this->validate($request, [
            'payment.id' => 'required'
        ]);

        $order->payments()->associate($request->input('payment.id'));

        return ['success' => true];
    }

    /**
     * Create a delivery for the order.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function delivery(Request $request, Order $order)
    {
        $this->validate($request, [
            'collection_date' => 'required',
            'planned_delivery_date' => 'required'
        ]);

        $delivery = $order->deliveries()->create([
          'notification_name' => $order->user_first_name,
          'notification_email' => $order->user_last_name,
          'notification_phone' => $order->user_email,
          'cost' => $request->cost ?: 0,
          'amount' => $request->amount ?: 0,
          'courrier_company' => $request->courrier_company,
          'courrier_name' => $request->courrier_name,
          'courrier_email' => $request->courrier_email,
          'courrier_phone' => $request->courrier_phone,
          'collection_date' => Carbon::parse($request->collection_date),
          'planned_delivery_date' => Carbon::parse($request->planned_delivery_date),
          'notes' => $request->notes,
          'courrier_notes' => $request->courrier_notes,
          'courrier_invoice_received_at' => $request->courrier_invoice_received_at ? Carbon::parse($request->courrier_invoice_received_at) : null,
        ]);

        return new DeliveryResource($delivery);
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
