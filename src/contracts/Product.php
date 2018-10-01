<?php

namespace ChrisBraybrooke\ECommerce\Contracts;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

interface Product
{
    /**
     * The collection types that this product is associated with.
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function collectionTypes(): BelongsToMany;

    /**
     * The collection types that this product is associated with.
     *
     * @return Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function customisations(): HasMany;

    /**
      * Display any variants of this product.
     *
     * @return Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function variants(): HasMany;

    /**
      * Display any prices that this product.
     *
     * @return Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function prices(): HasMany;

    /**
     * If the product is a variant then what is a variant of
     *
     * @return Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function variant(): BelongsTo;

    /**
     * Get the Order Form.
     *
     * @return App\Form
     */
    public function orderForm(): HasOne;

    /**
     * Get the frontend Order Form.
     *
     * @return App\Form
     */
    public function frontendForm(): HasOne;

}
