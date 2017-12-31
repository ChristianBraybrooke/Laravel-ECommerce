<?php

namespace ChrisBraybrooke\ECommerce;

use Illuminate\Support\ServiceProvider as LaravelServiceProvider;
use Illuminate\Support\Facades\Route;

class ECommerceServiceProvider extends LaravelServiceProvider {

    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot()
    {
        $this->handleConfigs();
        $this->handleMigrations();
        $this->handleSeeds();
        // $this->handleViews();
        // $this->handleTranslations();
        $this->handleRoutes();
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        // Bind any implementations.
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [];
    }

    /**
     * Handle the config options and merge any overides.
     *
     * @return void
     */
    private function handleConfigs()
    {
        $configPath = __DIR__ . '/../config/ecommerce.php';

        $this->publishes([$configPath => config_path('ecommerce.php')], 'config');

        $this->mergeConfigFrom($configPath, 'ecommerce');
    }

    /**
     * Handle the translations and merge any overides.
     *
     * @return void
     */
    private function handleTranslations()
    {
        $this->loadTranslationsFrom(__DIR__.'/../lang', 'ecommerce');
    }

    /**
     * Load the view files.
     *
     * @return void
     */
    private function handleViews()
    {
        $this->loadViewsFrom(__DIR__.'/../views', 'ecommerce');

        $this->publishes([__DIR__.'/../views' => base_path('resources/views/vendor/ecommerce')]);
    }

    /**
     * Pull in the migration files.
     *
     * @return void
     */
    private function handleMigrations()
    {
        if (! class_exists('UpdateRolesTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/update_roles_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_update_roles_table.php'),
            ], 'migrations');
        }

        if (! class_exists('CreateProductsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_products_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_products_table.php'),
            ], 'migrations');
        }

        if (! class_exists('CreateProductCustomisationsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_product_customisations_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_product_customisations_table.php'),
            ], 'migrations');
        }

        if (! class_exists('CreateProductCustomisationOptionsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_product_customisation_options_table.php.stub' =>
                database_path(
                    'migrations/' . date('Y_m_d_His', time()) . '_create_product_customisation_options_table.php'
                ),
            ], 'migrations');
        }

        if (! class_exists('CreatePagesTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_pages_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_pages_table.php'),
            ], 'migrations');
        }

        if (! class_exists('CreateMediaToModelsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_media_to_models_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_media_to_models_table.php'),
            ], 'migrations');
        }

        if (! class_exists('CreateGalleriesTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_galleries_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_galleries_table.php'),
            ], 'migrations');
        }

        if (! class_exists('CreateContentsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_contents_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_contents_table.php'),
            ], 'migrations');
        }

        if (! class_exists('CreateCollectionsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_collections_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_collections_table.php'),
            ], 'migrations');
        }

        if (! class_exists('CreateCollectionTypesTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_collection_types_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_collection_types_table.php'),
            ], 'migrations');
        }

        if (! class_exists('CreateCollectionTypeProductTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_collection_type_product_table.php.stub' =>
                database_path(
                    'migrations/'.date('Y_m_d_His', time()).'_create_collection_type_product_table.php'
                ),
            ], 'migrations');
        }
    }

    /**
     * Pull in the seed files.
     *
     * @return void
     */
    private function handleSeeds()
    {
        if (! class_exists('RolesAndPermissionsSeeder')) {
            $this->publishes([
                __DIR__.'/../database/seeds/RolesAndPermissionsSeeder.php.stub' =>
                database_path('seeds/RolesAndPermissionsSeeder.php'),
            ], 'seeds');
        }
    }

    /**
     * Register the web and api routes.
     *
     * @return void
     */
    private function handleRoutes()
    {
        Route::group([
            'prefix' => config('ecommerce.web_uri', 'admin'),
            'namespace' => 'ChrisBraybrooke\ECommerce\Http\Controllers',
            'middleware' => config('ecommerce.web_middleware', 'web'),
        ], function () {
            $this->loadRoutesFrom(__DIR__.'/../routes/web.php');
        });

        Route::group([
            'prefix' => config('ecommerce.api_uri', 'api/ecommerce'),
            'namespace' => 'ChrisBraybrooke\ECommerce\Http\Controllers\API',
            'middleware' => config('ecommerce.api_middleware', 'auth:api'),
        ], function () {
            $this->loadRoutesFrom(__DIR__.'/../routes/api.php');
        });
    }
}
