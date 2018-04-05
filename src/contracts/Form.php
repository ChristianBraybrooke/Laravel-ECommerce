<?php

namespace ChrisBraybrooke\ECommerce\Contracts;

use Illuminate\Database\Eloquent\Relations\HasMany;

interface Form
{
    /**
      * The sections that are inside the form.
     *
     * @return Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function sections(): HasMany;
}
