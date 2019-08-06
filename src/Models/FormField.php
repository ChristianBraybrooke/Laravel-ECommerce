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
        'name', 'type', 'rules', 'options', 'append', 'prepend', 'form_section_id', 'description', 'order', 'key',
        'hidden_from_frontend', 'hidden_from_pdfs', 'hidden_from_pdfs_detail', 'hidden_from_pdfs_admin'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'rules' => 'array',
        'options' => 'array',
        'hidden_from_frontend' => 'boolean',
        'hidden_from_pdfs' => 'boolean',
        'hidden_from_pdfs_detail' => 'boolean',
        'hidden_from_pdfs_admin' => 'boolean',
    ];

    public function section(): BelongsTo
    {
        return $this->BelongsTo(config('ecommerce.models.form_section'));
    }
}
