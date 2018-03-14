<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers;

use Illuminate\Http\Request;
use Order;

class InvoiceController extends Controller
{
    /**
     * Return the invoice in the fomat asked for
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        if ($request->filled('reports')) {
            $orders = Order::orderBy('id', 'DESC')
                            ->when(is_array($request->reports), function ($query) use ($request) {
                                return $query->whereIn('id', $request->reports);
                            })
                            ->when(!is_array($request->reports), function ($query) use ($request) {
                                return $query->where('id', $request->reports);
                            })
                            ->get();
        } else {
            $orders = null;
        }

        return view('ecommerce::pdfs.invoice')->with(compact('orders'));
    }
}
