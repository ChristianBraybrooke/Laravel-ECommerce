<?php

namespace ChrisBraybrooke\ECommerce\Http\Controllers\Api;

use Carbon\Carbon;
use ChrisBraybrooke\ECommerce\Http\Controllers\Controller;
use ChrisBraybrooke\ECommerce\Models\Export;
use Illuminate\Http\Request;
use Order;

class ApiExportsController extends Controller
{
    public function export(Request $request)
    {
        $this->validate($request, [
            'export_date_range' => 'array|required',
            'export_type' => 'required'
        ]);
        $data = [];
        if ($request->export_type === 'Order') {
            $data = Order::where('created_at', '>', Carbon::parse($request->export_date_range[0]))
                           ->where('created_at', '<', Carbon::parse($request->export_date_range[1]))
                           ->with(['payments'])
                           ->get();
        }

        $export = Export::create([
            'export_type' => $request->export_type,
            'user_id' => auth()->id(),
            'status' => 'Complete',
            'export_data' => $data,
        ]);

        return ['data' => ['id' => $export->id, 'url' => $export->downloadUrl]];
    }
}
