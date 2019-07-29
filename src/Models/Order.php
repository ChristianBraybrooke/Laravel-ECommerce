<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;
use ChrisBraybrooke\ECommerce\Traits\WatchesOrderStatus;
use ChrisBraybrooke\ECommerce\Traits\HasMediaAttached;
use ChrisBraybrooke\ECommerce\Traits\HasContentAttached;
use ChrisBraybrooke\ECommerce\Events\OrderCreated;
use ChrisBraybrooke\ECommerce\Events\OrderUpdated;
use ChrisBraybrooke\ECommerce\Events\OrderUpdating;
use ChrisBraybrooke\ECommerce\Events\OrderStatusChanged;
use ChrisBraybrooke\ECommerce\Contracts\Order as OrderContract;
use ChrisBraybrooke\ECommerce\Jobs\CreateOrderInvoicePdf;
use ChrisBraybrooke\ECommerce\Jobs\SendOrderNotification;
use Illuminate\Database\Eloquent\Relations\HasMany;
use ChrisBraybrooke\ECommerce\Notifications\OrderCompleteNotification;
use Cart;
use Setting;
use Product;
use ReflectionClass;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\SoftDeletes;
use Notification;

class Order extends Model implements OrderContract
{
    use LogsActivity, ResponsableTrait, FormatDatesTrait, HasMediaAttached, HasContentAttached, SoftDeletes,
    WatchesOrderStatus;

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
     * Which collumns to use for search.
     *
     * @return array
     */
    private function responsableSearch()
    {
        return [
            'ref',
            'user_first_name',
            'user_last_name',
            'user_email',
            'user_phone',
            'billing_address_postcode',
            'billing_address_company',
            'shipping_address_postcode',
            'shipping_address_company'
        ];
    }

    /**
     * The default collumn to order results by.
     *
     * @return string
     */
    private function responsableOrderBy()
    {
        return "invoiced_at";
    }

    /**
     * Which collumns to use for search.
     *
     * @return array
     */
    private function responsableOrderByAlias()
    {
        return [
            'id' => 'id',
            'ref' => 'ref',
            'created_at' => 'created_at',
        ];
    }

    /**
     * The default direction of models.
     *
     * @return string
     */
    private function responsableDirection()
    {
        return "DESC";
    }

    /**
     * Get the order statuses.
     *
     * @var array
     */
    public function getStatuses()
    {
        $statuses = static::$statuses;

        if ($this->status === static::$statuses['STATUS_PROCESSING']) {
            $statuses = array_except(static::$statuses, ['STATUS_DRAFT']);
        }
        if ($this->status === static::$statuses['STATUS_COMPLETED']) {
            $statuses = array_except(static::$statuses, ['STATUS_DRAFT', 'STATUS_PROCESSING']);
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
        $filtered = array_where(static::$statuses, function ($value, $key) use ($name) {
            return $value === $name;
        });

        if (!$filtered) {
            $filtered = array_where(static::$statuses, function ($value, $key) use ($name) {
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
    public function scopeWithStatus($query, $statuses)
    {
        if ($statuses) {
            $statuses = is_array($statuses) ? $statuses : [$statuses];

            foreach ($statuses as $key => $status) {
                $query->orWhere('status', $this->setStatusFromName(ucfirst($status)));
            }
        }
        return $query;
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
        'updating' => OrderUpdating::class
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
        'delivery_cost', 'delivery_date', 'thank_you_email_sent', 'shipping_email_sent', 'billing_address_name',
        'billing_address_company', 'shipping_address_name', 'shipping_address_company', 'ref', 'invoiced_at',
        'deleted_at'
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
        'delivery_cost', 'delivery_date', 'thank_you_email_sent', 'shipping_email_sent', 'billing_address_name',
        'billing_address_company', 'shipping_address_name', 'shipping_address_company', 'ref', 'invoiced_at',
        'deleted_at'
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
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at', 'invoiced_at'];

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
        $end = $this->ref;

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

    public function deliveries(): HasMany
    {
        return $this->hasMany(config('ecommerce.models.delivery'));
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
            'name' => ucfirst($this->{$type . '_address_name'}),
            'company' => ucfirst($this->{$type . '_address_company'}),
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
                    'order_options' => $item['order_options'] ?? [],
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
            'VAT' => priceFormatter($cart['tax'] ?? 0),
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
            'number' => $prefix . $this->ref,
            'issued_at' => $this->created_at['carbon']->toFormattedDateString(),
            'due_by' => $this->created_at['carbon']->addDays(7)->toFormattedDateString(),
        ];
    }

    /**
     * Retrieve the invoice pdf
     *
     * @return mixed
     */
    public function getInvoicePdfAttribute()
    {
        return $this->mediaByLocation('invoice')->first();
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
        return isset(static::$statuses[$value]) ? static::$statuses[$value] : null;
    }

    /**
     * Get the name for the invoice.
     *
     * @return string
     */
    public function invoiceName()
    {
        return ($this->status == static::$statuses['STATUS_PROFORMA']) ? 'Pro-Forma Invoice' : (($this->status === static::$statuses['STATUS_ESTIMATE']) ? 'Estimate' : 'Invoice');
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

    /**
     * Create the inoice PDF for this order and then send to the customer.
     *
     * @return \App\Order
     */
    public function createInvoiceAndSend()
    {
        CreateOrderInvoicePdf::withChain([
            new SendOrderNotification($this),
        ])->dispatch($this);

        return $this;
    }

    /**
     * Mark this order as been invoiced.
     *
     * @return \App\Order
     */
    public function hasBeenInvoiced()
    {
        $this->update(['invoiced_at' => now()->toDateTimeString()]);
    }

    /**
     * Fire an event when the order status is changed.
     *
     * @param string $oldStatus
     * @return void
     */
    public function fireStatusChangeEvent($oldStatus)
    {
        event(new OrderStatusChanged($this, $oldStatus));
    }

    /**
     * Check if the order has been fully paid for.
     *
     * @return bool
     */
    public function isFullyPaid()
    {
        return $this->payment_amount == $this->cart['totals']['Total'];
    }

    /**
     * Update the order status
     *
     * @param string $status
     * @return \App\Order
     */
    public function updateStatus($status)
    {
        if (!static::$statuses[$status]) {
            abort(404, 'Order status not found!');
        }

        $this->update(['status' => $status]);

        return $this;
    }

    /**
     * Send a notification to the customer when the order is complete.
     *
     * @param string $status
     * @return \App\Order
     */
    public function sendCompleteNotification()
    {
        Notification::route('mail', $this->user_email)
            ->notify(new OrderCompleteNotification($this));

        activity()
            ->performedOn($this)
            ->log("Order complete email sent to {$this->user_email}");
    }

    /**
     * Format the invoiced_at attribute.
     *
     * @var array
     * @return array
     */
    public function getInvoicedAtAttribute($value)
    {
        return $value ? $this->dateAdapter($value) : $this->created_at;
    }

    /**
     * Put together the mail message for a new order.
     *
     * @param  \Illuminate\Notifications\Messages\MailMessage $mailMessage
     * @param  \App\User $notifiable  [description]
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function newOrderMailMessage($mailMessage, $notifiable)
    {
        return $mailMessage->subject(config('app.name', 'TCO') . ' Order Confirmation - ' . $this->ref)
            ->greeting("Order #{$this->ref} Confirmed!")
            ->line('Thank you for placing an order with '  . config('app.name', 'TCO'))
            ->line("Please find your invoice for {$this->cart['currency']}{$this->cart['totals']['Total']} attached below.")
            ->action('View Invoice', optional($this->invoicePdf)->getFullUrl())
            ->line('Thank you for shoping with us!');
    }

    /**
     * Put together the mail message for when an order is completed and ready for delivery.
     *
     * @param  \Illuminate\Notifications\Messages\MailMessage $mailMessage
     * @param  \App\User $notifiable  [description]
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function orderCompleteMailMessage($mailMessage, $notifiable)
    {
        return $mailMessage->subject(config('app.name', 'TCO') . ' Order Complete - ' . $this->ref)
            ->greeting("Order {$this->invoice['number']} Completed!")
            ->line('Your ' . config('app.name', 'TCO') . ' order has been marked as complete.')
            ->line('This means that your order is almost with you, and somebody will be in touch about delivery.')
            ->line("Please find your invoice for {$this->cart['currency']}{$this->cart['totals']['Total']} attached below.")
            ->action('View Invoice', optional($this->invoicePdf)->getFullUrl())
            ->line('Thank you for shoping with us!');
    }
}
