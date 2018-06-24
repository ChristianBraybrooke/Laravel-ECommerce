<?php

namespace ChrisBraybrooke\ECommerce\Contracts;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

interface Order
{
    /**
     * The payments associated with the order.
     *
     * @return Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function payments(): HasMany;
}
