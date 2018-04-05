<?php

namespace ChrisBraybrooke\ECommerce\Contracts;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

interface FormField
{
    /**
      * The form section that this field belongs to.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function section(): BelongsTo;
}
