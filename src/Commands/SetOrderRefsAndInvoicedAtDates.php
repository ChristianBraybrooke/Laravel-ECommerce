<?php

namespace ChrisBraybrooke\ECommerce\Commands;

use Illuminate\Console\Command;
use Order;

class SetOrderRefsAndInvoicedAtDates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ecommerce:set-order-refs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Set job refs that havent yet been assigned.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("Setting orders up...");

        foreach (Order::whereNull('ref')->get() as $key => $order) {
            $order->ref = $order->id;

            if ($order->status !== Order::$statuses['STATUS_ESTIMATE'] || $order->status !== Order::$statuses['STATUS_PROFORMA']) {
                if (!$order->getOriginal('invoiced_at')) {
                    $order->invoiced_at = $order->created_at['carbon']->toDateTimeString();
                }
            }

            $order->save();
        }
    }
}
