<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use ChrisBraybrooke\ECommerce\Contracts\FormField as FormFieldContract;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FormField extends Model implements FormFieldContract
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'type', 'rules', 'options', 'append', 'prepend'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'rules' => 'array',
        'options' => 'array',
    ];

    public function section(): BelongsTo
    {
        return $this->BelongsTo(config('ecommerce.models.form_section'));
    }
}
