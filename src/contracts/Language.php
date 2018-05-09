<?php

namespace ChrisBraybrooke\ECommerce\Contracts;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

interface Language
{
    /**
     * The currency that is associated with this language.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function currency(): BelongsTo;
}
