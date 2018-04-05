<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use ChrisBraybrooke\ECommerce\Contracts\Form as FormContract;
use Illuminate\Database\Eloquent\Relations\HasMany;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;

class Form extends Model implements FormContract
{
    use ResponsableTrait, FormatDatesTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'is_order_form', 'effects_price'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_order_form' => 'boolean',
        'effects_price' => 'boolean',
    ];

    public function sections(): HasMany
    {
        return $this->HasMany(config('ecommerce.models.form_section'));
    }

    /**
     * Get all of the posts for the country.
     */
    public function fields()
    {
        return $this->hasManyThrough(config('ecommerce.models.form_field'), config('ecommerce.models.form_section'));
    }
}
