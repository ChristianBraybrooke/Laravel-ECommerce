<?php

namespace ChrisBraybrooke\ECommerce\Contracts;

use Illuminate\Database\Eloquent\Relations\HasMany;

interface ProductCustomisation
{
    /**
     * The product customisation options that this product customisation is associated with.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function options(): HasMany;
}
