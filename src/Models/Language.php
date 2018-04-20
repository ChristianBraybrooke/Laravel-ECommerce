<?php

namespace ChrisBraybrooke\ECommerce\Models;

use Illuminate\Database\Eloquent\Model;
use ChrisBraybrooke\ECommerce\Contracts\Form as FormContract;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use ChrisBraybrooke\ECommerce\Traits\ResponsableTrait;
use ChrisBraybrooke\ECommerce\Traits\FormatDatesTrait;
use ChrisBraybrooke\ECommerce\Scopes\LiveScope;
use ChrisBraybrooke\ECommerce\Contracts\Language as LanguageContract;

class Language extends Model implements LanguageContract
{
    use ResponsableTrait, FormatDatesTrait;

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(new LiveScope);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'key', 'name', 'flag_key', 'default', 'ex_vat', 'vat'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'default' => 'boolean',
        'ex_vat' => 'boolean',
    ];

    /**
     * The currency that is associated with this language.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function currency(): BelongsTo
    {
        return $this->belongsTo(config('ecommerce.models.currency'));
    }
}
