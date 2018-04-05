<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use ChrisBraybrooke\ECommerce\Contracts\FormSection as FormSectionContract;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FormSection extends Model implements FormSectionContract
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'order', 'editable'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'editable' => 'boolean',
    ];

    public function form(): BelongsTo
    {
        return $this->BelongsTo(config('ecommerce.models.form'));
    }

    public function fields(): HasMany
    {
        return $this->HasMany(config('ecommerce.models.form_field'));
    }

}
