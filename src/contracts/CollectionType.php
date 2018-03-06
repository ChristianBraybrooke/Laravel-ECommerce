<?php

namespace ChrisBraybrooke\ECommerce\Contracts;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

interface CollectionType
{
    /**
     * The products that belong to this collection type.
     *
     * @return Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function collection(): BelongsTo;

    /**
     * Return the full url for the collection type
     *
     * @return Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function products(): BelongsToMany;
}
