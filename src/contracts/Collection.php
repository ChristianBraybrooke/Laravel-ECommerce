<?php

namespace ChrisBraybrooke\ECommerce\Contracts;

use Illuminate\Database\Eloquent\Relations\HasMany;

interface Collection
{
    /**
      * The collection types within this collection.
     *
     * @return Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function types(): HasMany;
}
