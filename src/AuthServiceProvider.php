<?php

namespace ChrisBraybrooke\ECommerce;

use Product;
use Collection;
use CollectionType;
use Gallery;
use Page;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot(
        Product $product,
        Collection $collection,
        CollectionType $collection_type,
        Gallery $gallery,
        Page $page
    ) {
        $this->policies = [
            'App\User' => 'ChrisBraybrooke\ECommerce\Policies\UsersPolicy',
            get_class($product) => 'ChrisBraybrooke\ECommerce\Policies\ProductsPolicy',
            get_class($collection) => 'ChrisBraybrooke\ECommerce\Policies\CollectionsPolicy',
            get_class($collection_type) => 'ChrisBraybrooke\ECommerce\Policies\CollectionTypesPolicy',
            get_class($gallery) => 'ChrisBraybrooke\ECommerce\Policies\GalleriesPolicy',
            get_class($page) => 'ChrisBraybrooke\ECommerce\Policies\PagesPolicy'
        ];

        $this->registerPolicies();

        Passport::routes();
    }
}
