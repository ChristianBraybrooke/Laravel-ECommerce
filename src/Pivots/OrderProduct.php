<?php

namespace ChrisBraybrooke\ECommerce\Pivots;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Form;

class OrderProduct extends Pivot
{
    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $subtotal = $model->calculateSubTotal($model->unit_price, $model->qty);
            $total = $model->calculateTotal($subtotal, $model->extras);
            $model->sub_total = $subtotal * 100;
            $model->total = $total * 100;
            $model->status = 'STATUS_ADDED';
        });
    }

    /**
     * The collumns that are available on the pivot table in addition to the required ones.
     *
     * @return array
     */
    public static function collumns()
    {
        return [
            'id', 'form_id', 'order', 'customisation_data', 'unit_price', 'qty', 'sub_total',
            'extras', 'total', 'status'
        ];
    }

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'customisation_data' => 'array'
    ];

    /**
     * Get the form that was used for this product when placing the order.
     *
     * @return Form
     */
    public function orderForm()
    {
        return $this->belongsTo(Form::class, 'form_id', 'id');
    }

    /**
     * Format the unit price before returning.
     *
     * @param  int $val
     * @return int
     */
    public function getUnitPriceAttribute($val)
    {
        return $val / 100;
    }

    /**
     * Format the unit price attribute before saving.
     *
     * @param int $val
     * @return void
     */
    public function setUnitPriceAttribute($val)
    {
        $this->attributes['unit_price'] = $val * 100;
    }

    /**
     * Format the sub total before returning.
     *
     * @param  int $val
     * @return int
     */
    public function getSubTotalAttribute($val)
    {
        return $val / 100;
    }

    /**
     * Format the extras before returning.
     *
     * @param  int $val
     * @return int
     */
    public function getExtrasAttribute($val)
    {
        return $val / 100;
    }

    /**
     * Format the extras attribute before saving.
     *
     * @param int $val
     * @return void
     */
    public function setExtrasAttribute($val)
    {
        $this->attributes['extras'] = $val * 100;
    }

    /**
     * Format the total before returning.
     *
     * @param  int $val
     * @return int
     */
    public function getTotalAttribute($val)
    {
        return $val / 100;
    }

    /**
     * Check the subtotal
     *
     * @param  int $val
     * @return int
     */
    protected function calculateSubTotal($unitPrice, $qty)
    {
        return $unitPrice * $qty;
    }

    protected function calculateTotal($subtotal, $extras)
    {
        return $subtotal + $extras;
    }

    /**
     * Format the customisation data available.
     *
     * @return collection
     */
    public function getFormattedCustomisationDataAttribute()
    {
        $formatted = [];
        foreach ($this->customisation_data as $key => $data) {
            $formatted[$key] = [
               'value' => $data['value'] ?? null,
               'name' => $data['name'] ?? null,
               'type' => $data['type'] ?? null,
               'appends' => $data['appends'] ?? null,
               'prepends' =>$data['prepends'] ?? null,
               'order' =>$data['order'] ?? null,
               'group' =>$data['group'] ?? null,
            ];
        }
        return collect($formatted);
    }
}
