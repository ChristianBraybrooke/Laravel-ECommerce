<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers;

use ChrisBraybrooke\ECommerce\Exports\OrderExport;
use ChrisBraybrooke\ECommerce\Models\Export;
use Maatwebsite\Excel\Facades\Excel;

class ExportDownloadController extends Controller
{
    public function __invoke(Export $export)
    {
        return Excel::download(new OrderExport($export), 'orders.xlsx');
    }
}
