<?php

namespace ChrisBraybrooke\ECommerce\Models;

use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;
use ChrisBraybrooke\ECommerce\Traits\HasMediaAttached;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use Illuminate\Database\Eloquent\Model;

class Export extends Model
{
    use ResponsableTrait, HasMediaAttached, FormatDatesTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'export_type', 'user_id', 'status', 'export_data'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'export_data' => 'collection',
    ];

    /**
     * Product the export download url
     *
     * @return string
     */
    public function getDownloadUrlAttribute()
    {
        return route('exports.download', [$this]);
    }

    /**
     * Get the formatted order data ready for export
     *
     * @return collection
     */
    public function getFormattedOrderDataAttribute()
    {
        $data = $this->export_data->map(function ($order) {
            $payments = collect($order['payments']);

            return [
                'Ref' => $order['id'],
                'User ID' => $order['user_id'],
                'Status' => $order['status'],
                'Customer Name' => $order['user_first_name'] . $order['user_last_name'],
                'Customer Email' => $order['user_email'],
                'Customer Phone' => $order['user_phone'],
                'Total Payments' => $payments->count(),
                'Total Refunded Payments' => $payments->where('refunded', true)->count(),
                'Total Payment Amount' => $payments->sum(function ($payment) {
                    return $payment['refunded'] ? 0 : (float)$payment['amount'];
                }),
                'Total Refund Amount' => $payments->sum(function ($payment) {
                    return $payment['refunded'] ? (float)$payment['amount'] : 0;
                }),
                'Payment Methods' => ucwords(implode(', ', $payments->pluck('method')->toArray())),
                'Invoiced At' => $order['invoiced_at']['date'] ?? null,
                'Created At' => $order['created_at']['date'] ?? null,
                'Billing Address Name' => $order['billing_address_name'],
                'Billing Address Company' => $order['billing_address_company'],
                'Billing Address Line 1' => $order['billing_address_line1'],
                'Billing Address Line 2' => $order['billing_address_line2'],
                'Billing Address Town' => $order['billing_address_town'],
                'Billing Address County' => $order['billing_address_county'],
                'Billing Address PostCode' => $order['billing_address_postcode'],
                'Billing Address Country' => $order['billing_address_country'],
                'Use Billing As Shipping' => $order['use_billing_for_shipping'],
                'Shipping Address Name' => $order['shipping_address_name'],
                'Shipping Address Company' => $order['shipping_address_company'],
                'Shipping Address Line 1' => $order['shipping_address_line1'],
                'Shipping Address Line 2' => $order['shipping_address_line2'],
                'Shipping Address Town' => $order['shipping_address_town'],
                'Shipping Address County' => $order['shipping_address_county'],
                'Shipping Address PostCode' => $order['shipping_address_postcode'],
                'Shipping Address Country' => $order['shipping_address_country']
            ];
        });
        return $data;
    }
}
