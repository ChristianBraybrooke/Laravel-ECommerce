<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers;

use Illuminate\Http\Request;
use Order;
use PDF;

class DeliveryNoteController extends Controller
{
    /**
     * Return the invoice in the fomat asked for
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        if ($request->filled('orders')) {
            $orders = Order::orderBy('id', 'DESC')
                            ->when(is_array($request->orders), function ($query) use ($request) {
                                return $query->whereIn('id', $request->orders);
                            })
                            ->when(!is_array($request->orders), function ($query) use ($request) {
                                return $query->where('id', $request->orders);
                            })
                            ->get();
        } else {
            $orders = null;
        }

        return view('ecommerce::pdfs.delivery-note')->with(compact('orders'));
    }

    /**
     * Download the invoice in the fomat asked for
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function download(Request $request)
    {
        if ($request->filled('orders')) {
            $orders = Order::orderBy('id', 'DESC')
                            ->when(is_array($request->orders), function ($query) use ($request) {
                                return $query->whereIn('id', $request->orders);
                            })
                            ->when(!is_array($request->orders), function ($query) use ($request) {
                                return $query->where('id', $request->orders);
                            })
                            ->get();
        } else {
            $orders = collect([]);
        }

        $firstOrder = optional($orders->first());
        $pdfName = strtolower("order-{$firstOrder->id}-{$firstOrder->status}");

        $pdf = PDF::loadView('ecommerce::pdfs.delivery-note', ['orders' => $orders])
                  ->setPaper('a4')
                  ->setOrientation('portrait')
                  ->setOption('print-media-type', true)
                  ->setOption('images', true)
                  ->setOption('lowquality', true)
                  ->setOption('image-dpi', 300)
                  ->setOption('image-quality', 50);
        return $pdf->download("{$pdfName}.pdf");
    }
}
