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
        'name'
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
