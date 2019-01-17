<?php

namespace ChrisBraybrooke\ECommerce\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use PDF;
use Gallery;
use ChrisBraybrooke\ECommerce\Scopes\LiveScope;

class CreateOrderInvoicePdf implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $order;
    protected $invoice_gallery = 'Invoices';

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($order)
    {
        $this->order = $order;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $random = str_random(20);
        $file_name = "app/public/invoice-{$this->order->id}-{$random}.pdf";
        $file_path = storage_path($file_name);

        $pdf = PDF::loadView('ecommerce::pdfs.invoice', ['orders' => $this->order, 'pdf' => true])->setPaper('a4');
        $pdf->save($file_path);

        $gallery = Gallery::withoutGlobalScope(LiveScope::class)->firstOrCreate(['name' => $this->invoice_gallery]);
        if ($gallery) {
            $invoice = $gallery->addMedia($file_path)->toMediaCollection($this->invoice_gallery);
            $this->order->media()->sync([$invoice->id => ['media_location' => 'invoice']]);
        }

        if (!$this->order->getOriginal('invoiced_at')) {
            $this->order->hasBeenInvoiced();
        }

        activity()
           ->performedOn($this->order)
           ->log("Invoice PDF Created");
    }
}
