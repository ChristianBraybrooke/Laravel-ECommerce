<?php

namespace ChrisBraybrooke\ECommerce\Contracts;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

interface FormSection
{
    /**
      * The form that this section belongs to.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function form(): BelongsTo;

    /**
      * The form fields that this section has.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function fields(): HasMany;
}
