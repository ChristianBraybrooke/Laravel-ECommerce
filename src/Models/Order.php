<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;
use ChrisBraybrooke\ECommerce\Traits\HasMediaAttached;
use ChrisBraybrooke\ECommerce\Traits\HasContentAttached;
use ChrisBraybrooke\ECommerce\Events\OrderCreated;
use ChrisBraybrooke\ECommerce\Events\OrderUpdated;
use ChrisBraybrooke\ECommerce\Contracts\Order as OrderContract;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Cart;
use Setting;
use Product;
use ReflectionClass;
use Illuminate\Support\Facades\DB;

class Order extends Model implements OrderContract
{
    use  LogsActivity, ResponsableTrait, FormatDatesTrait, HasMediaAttached, HasContentAttached;

    public static $statuses = [
      'STATUS_DRAFT' => 'Draft',
      'STATUS_PROFORMA' => 'Pro-Forma',
      'STATUS_PROCESSING' => 'Processing',
      'STATUS_COMPLETED' => 'Completed',
      'STATUS_CANCELLED' => 'Canceled',
      'STATUS_REFUNDED' => 'Refunded',
      'STATUS_AWAITING_PAYMENT' => 'Awaiting Payment',
      'STATUS_PAYMENT_FAILED' => 'Failed Payment',
      'STATUS_ESTIMATE' => 'Estimate',
    ];


    /**
     * Get the order statuses.
     *
     * @var array
     */
    public function getStatuses()
    {
        $statuses = self::$statuses;

        if ($this->status === self::$statuses['STATUS_PROCESSING']) {
            $statuses = array_except(self::$statuses, ['STATUS_DRAFT']);
        }
        if ($this->status === self::$statuses['STATUS_COMPLETED']) {
            $statuses = array_except(self::$statuses, ['STATUS_DRAFT', 'STATUS_PROCESSING']);
        }

        $only_values = [];
        foreach ($statuses as $key => $status) {
            $only_values[$status] = $status;
        }
        return $only_values;
    }

    /**
     * Get the order status key from it's value.
     *
     * @var array
     */
    public function setStatusFromName($name = 'Draft')
    {
        $filtered = array_where(self::$statuses, function ($value, $key) use ($name) {
            return $value === $name;
        });

        if (!$filtered) {
            $filtered = array_where(self::$statuses, function ($value, $key) use ($name) {
                return $key === $name;
            });
        }

        if ($filtered) {
            return implode(array_keys($filtered));
        } else {
            return $this->setStatusFromName();
        }
    }

    /**
     * Scope a query to only include orders with a specific status.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param mixed $status
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithStatus($query, $status)
    {
        return $status ? $query->where('status', $this->setStatusFromName(ucfirst($status))) : $query;
    }

    /**
     * Scope a query to only include orders with a specific status.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param mixed $status
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithOutStatuses($query, $statuses)
    {
        if ($statuses) {
            $statuses = is_array($statuses) ? $statuses : [$statuses];

            foreach ($statuses as $key => $status) {
                $query->where('status', '!=', $this->setStatusFromName(ucfirst($status)));
            }
        }
        return $query;
    }

    /**
     * Scope a query to only include un-processed orders.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeProcessing($query)
    {
        return $query->where('status', 'STATUS_PROCESSING');
    }

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'created' => OrderCreated::class,
        'updated' => OrderUpdated::class,
    ];

    /**
     * The default content to create on creation
     *
     * @var array
     */
    public $defaultContent = [
        //
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'user_id', 'user_first_name', 'user_last_name', 'user_email', 'user_phone', 'billing_address_line1',
        'billing_address_line2', 'billing_address_town', 'billing_address_county', 'billing_address_postcode',
        'billing_address_country', 'use_billing_for_shipping', 'shipping_address_line1', 'shipping_address_line2',
        'shipping_address_town', 'shipping_address_county', 'shipping_address_postcode', 'shipping_address_country',
        'cart_id', 'payment_method', 'payment_id', 'payment_currency', 'payment_amount', 'payment_fee',
        'payment_source_id', 'payment_source_brand', 'payment_source_country', 'payment_source_last4',
        'payment_source_exp_month', 'payment_source_exp_year', 'status', 'cart_data', 'send_auto_emails', 'amount_paid',
        'delivery_cost', 'delivery_date', 'thank_you_email_sent', 'shipping_email_sent'
    ];

    /**
     * The attributes to log when changes are made.
     *
     * @var array
     */
    protected static $logAttributes = [
        'id', 'user_id', 'user_first_name', 'user_last_name', 'user_email', 'user_phone', 'billing_address_line1',
        'billing_address_line2', 'billing_address_town', 'billing_address_county', 'billing_address_postcode',
        'billing_address_country', 'use_billing_for_shipping', 'shipping_address_line1', 'shipping_address_line2',
        'shipping_address_town', 'shipping_address_county', 'shipping_address_postcode', 'shipping_address_country',
        'cart_id', 'payment_method', 'payment_id', 'payment_currency', 'payment_amount', 'payment_fee',
        'payment_source_id', 'payment_source_brand', 'payment_source_country', 'payment_source_last4',
        'payment_source_exp_month', 'payment_source_exp_year', 'status', 'cart_data', 'send_auto_emails', 'amount_paid',
        'delivery_cost', 'delivery_date', 'thank_you_email_sent', 'shipping_email_sent'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'cart_data' => 'collection',
        'use_billing_for_shipping' => 'boolean',
        'send_auto_emails' => 'boolean',
    ];

    /**
     * The attributes that should be appended.
     *
     * @var array
     */
    protected $appends = [
        'ref_number'
    ];

    public function getRefNumberAttribute()
    {
        $start = 'INV';
        if ($this->status === 'Estimate') {
            $start = 'EST';
        }
        $date = optional($this->created_at['carbon'])->format('dmy');
        $end = $this->id;

        return "{$start}-{$date}-{$end}";
    }

    /**
     * Set default event log message.
     *
     * @var String
     */
    public function getDescriptionForEvent(string $eventName): string
    {
        return "Order was: {$eventName}";
    }

    public function payments(): HasMany
    {
        return $this->HasMany(config('ecommerce.models.payment'));
    }

    /**
     * Format the address into a normalised format
     *
     * @param string $type
     * @return array
     */
    protected function formatAddress($type)
    {
        return [
            'Name' => $this->customer['full_name'],
            'line_1' => ucfirst($this->{$type . '_address_line1'}),
            'line_2' => ucfirst($this->{$type . '_address_line2'}),
            'town' => ucfirst($this->{$type . '_address_town'}),
            'county' => ucfirst($this->{$type . '_address_county'}),
            'postcode' => ucwords($this->{$type . '_address_postcode'}),
            'country' => ucfirst($this->{$type . '_address_country'}),
        ];
    }

    /**
     * Get the billing_address att
     *
     * @return string
     */
    public function getBillingAddressAttribute()
    {
        return $this->formatAddress('billing');
    }

    /**
     * Get the shipping_address att
     *
     * @return string
     */
    public function getShippingAddressAttribute()
    {
        return $this->formatAddress($this->use_billing_for_shipping ? 'billing' : 'shipping');
    }

    /**
     * Format the items in the order and spit out as an array
     *
     * @return array
     */
    public function getItemsAttribute()
    {
        $items = [];

        if (isset($this->cart_data['items'])) {
            foreach ($this->cart_data['items'] as $key => $item) {
                $items[] = [
                    'id' => $item['id'] ?? null,
                    'name' => $item['name'] ?? null,
                    'variant' => $item['variant'] ?? null,
                    'quantity' => $item['qty'] ?? null,
                    'price' => priceFormatter($item['price'] ?? 0),
                    'options' => $item['options'] ?? null,
                    'order_form' => $item['order_form'] ?? null,
                    'tax' => priceFormatter($item['tax'] ?? 0),
                    'subtotal' => priceFormatter($item['subtotal'] ?? 0)
                ];
            }
        }

        return $items;
    }

    /**
     * Format the cart
     *
     * @return array
     */
    public function getCartAttribute()
    {
        $cart = $this->cart_data;

        $totals = [
            'Sub Total' => priceFormatter($cart['sub_total'] ?? 0),
            'Extras' => priceFormatter($cart['extras'] ?? 0),
            'Shipping' => priceFormatter($cart['shipping'] ?? 0),
            'Discount' => $cart['discount'] ?? 0,
            'Tax' => priceFormatter($cart['tax'] ?? 0),
            'Total' => priceFormatter($cart['total'] ?? 0),
        ];
        return [
            'currency' => $cart['currency'] ?? Setting::get('Currency'),
            'totals' => $totals,
        ];
    }

    /**
     * Format the invoice attribute
     *
     * @return array
     */
    public function getInvoiceAttribute()
    {
        $prefix = Setting::get('Invoice Number Prefix');
        return [
            'name' => $this->invoiceName(),
            'number' => $prefix . $this->id,
            'issued_at' => $this->created_at['carbon']->toFormattedDateString(),
            'due_by' => $this->created_at['carbon']->addDays(7)->toFormattedDateString(),
        ];
    }

    /**
     * Format the customer attribute
     *
     * @return array
     */
    public function getCustomerAttribute()
    {
        return [
            'id' => $this->user_id,
            'first_name' => ucfirst($this->user_first_name),
            'last_name' => ucfirst($this->user_last_name),
            'full_name' => ucfirst($this->user_first_name) . ' ' . ucfirst($this->user_last_name),
            'email' => $this->user_email,
            'phone' => $this->user_phone,
        ];
    }

    /**
     * Format the payment information
     *
     * @param $value
     * @return string
     */
    public function getPaymentMethodAttribute($value)
    {
        return $value === 'stripe' ?
        $this->payment_source_brand . ' **** **** **** ' . $this->payment_source_last4 : ucfirst($value);
    }

    /**
     * Format the amount paid
     *
     * @param $value
     * @return string
     */
    public function getPaymentAmountAttribute($value)
    {
        if ($value) {
            return $value;
        }

        if ($this->relationLoaded('payments')) {
            $payments = $this->payments;
        } else {
            $payments = DB::table('payments')
                          ->select('amount')
                          ->where('order_id', $this->id)
                          ->get();
        }

        $amount = 0;
        foreach ($this->payments as $key => $payment) {
            $amount = $amount + floatval(str_replace(',', '', $payment->amount));
        }
        return $amount;
    }

    /**
     * Format the status information
     *
     * @param $value
     * @return string
     */
    public function getStatusAttribute($value)
    {
        return isset(self::$statuses[$value]) ? self::$statuses[$value] : null;
    }

    /**
     * Get the name for the invoice.
     *
     * @return string
     */
    public function invoiceName()
    {
        return ($this->status === self::$statuses['STATUS_PROFORMA']) ? 'Pro-Forma Invoice' : ($this->status === self::$statuses['STATUS_ESTIMATE']) ? 'Quote' : 'Invoice';
    }

    public function getNeedsAddressAttribute()
    {
        foreach ($this->billing_address as $key => $address) {
            if (!empty(str_replace(" ", "", $address))) {
                return true;
            }
        }

        foreach ($this->shipping_address as $key => $address) {
            if (!empty(str_replace(" ", "", $address))) {
                return true;
            }
        }

        return false;
    }
}
