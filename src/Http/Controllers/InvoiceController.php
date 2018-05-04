<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers;

use Illuminate\Http\Request;
use Order;
use PDF;

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

    /**
     * Download the invoice in the fomat asked for
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function download(Request $request)
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
            $orders = [];
        }

        $pdf = PDF::loadView('ecommerce::pdfs.invoice', ['orders' => $orders]);
        return $pdf->download('invoice.pdf');
    }
}
