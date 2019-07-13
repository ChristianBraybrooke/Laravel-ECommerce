<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Carbon\Carbon;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Http\Resources\DeliveryResource;
use Delivery;
use Illuminate\Http\Request;

class ApiDeliveriesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Update the delivery in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Delivery $delivery
     * @return  \Illuminate\Http\Response
     */
    public function update(Request $request, Delivery $delivery)
    {
        $this->validate($request, [
            'collection_date' => 'required',
            'planned_delivery_date' => 'required'
        ]);

        $delivery->update([
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
}