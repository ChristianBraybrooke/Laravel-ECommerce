<?php

namespace ChrisBraybrooke\ECommerce;

use Illuminate\Support\ServiceProvider as LaravelServiceProvider;
use Illuminate\Support\Facades\Route;
use Artisan;
use ChrisBraybrooke\ECommerce\Contracts\Product as ProductContract;
use ChrisBraybrooke\ECommerce\Contracts\ProductCustomisation as ProductCustomisationContract;
use ChrisBraybrooke\ECommerce\Contracts\ProductCustomisationOption as ProductCustomisationOptionContract;
use ChrisBraybrooke\ECommerce\Contracts\Collection as CollectionContract;
use ChrisBraybrooke\ECommerce\Contracts\CollectionType as CollectionTypeContract;
use ChrisBraybrooke\ECommerce\Contracts\Order as OrderContract;
use ChrisBraybrooke\ECommerce\Contracts\Form as FormContract;
use ChrisBraybrooke\ECommerce\Contracts\FormField as FormFieldContract;
use ChrisBraybrooke\ECommerce\Contracts\FormSection as FormSectionContract;
use ChrisBraybrooke\ECommerce\Services\PaymentService;
use Illuminate\View\Compilers\BladeCompiler;
use Illuminate\Foundation\AliasLoader;
use Product;
use Illuminate\Support\Facades\View;
use Illuminate\Filesystem\Filesystem;

class ECommerceServiceProvider extends LaravelServiceProvider
{

    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    const VERSION = '0.0.24';

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    public function boot()
    {
        $this->handleConfigs();
        if (env('APP_ENV') === 'local') {
            $this->handleMigrations();
        }
        $this->handleSeeds();
        $this->handleViews();
        $this->handleRoutes();
        $this->handleTranslations();
        $this->registerModelBindings();
        $this->registerHelpers();

        $this->app->register('ChrisBraybrooke\ECommerce\AuthServiceProvider');
        $this->app->register('ChrisBraybrooke\ECommerce\EventServiceProvider');

        // Make public assets available
        $this->publishes([
            __DIR__.'/../public' => public_path('vendor/ecommerce'),
        ], 'ecommerce-admin');

        // If we are in the local env, publish assets automatically
        if (env('APP_ENV') === 'local') {
            Artisan::call('vendor:publish', [
               '--tag' => 'ecommerce-admin',
               '--force' => true
            ]);
        }
    }

    /**
     * Register the models and create aliases.
     *
     * @return void
     */
    protected function registerModelBindings()
    {
        $loader = AliasLoader::getInstance();
        $config = $this->app->config['ecommerce.models'];

        // Collection
        $this->app->bind(CollectionContract::class, $config['collection']);
        $loader->alias('Collection', $config['collection']);

        // CollectionType
        $this->app->bind(CollectionTypeContract::class, $config['collection_type']);
        $loader->alias('CollectionType', $config['collection_type']);

        // Content
        $loader->alias('Content', $config['content']);

        // Gallery
        $loader->alias('Gallery', $config['gallery']);

        // Product
        $this->app->bind(ProductContract::class, $config['product']);
        $loader->alias('Product', $config['product']);

        // ProductCustomisation
        $this->app->bind(ProductCustomisationContract::class, $config['product_customisation']);
        $loader->alias('ProductCustomisation', $config['product_customisation']);

        // ProductCustomisationOption
        $this->app->bind(ProductCustomisationOptionContract::class, $config['product_customisation_option']);
        $loader->alias('ProductCustomisationOption', $config['product_customisation_option']);

        // Order
        $this->app->bind(OrderContract::class, $config['order']);
        $loader->alias('Order', $config['order']);

        // Page
        $loader->alias('Page', $config['page']);

        // Shop
        $loader->alias('Shop', Shop::class);

        // Form
        $this->app->bind(FormContract::class, $config['form']);
        $loader->alias('Form', $config['form']);

        // FormField
        $this->app->bind(FormFieldContract::class, $config['form_field']);
        $loader->alias('FormField', $config['form_field']);

        // FormSection
        $this->app->bind(FormSectionContract::class, $config['form_section']);
        $loader->alias('FormSection', $config['form_section']);

        // Language
        $loader->alias('Language', $config['language']);

        // Currency
        $loader->alias('Currency', $config['currency']);
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->configure();
        $this->registerBladeExtensions();

        $this->app->bind(PaymentService::class, function ($app) {
            return new PaymentService(
                env('APP_ENV') === 'local' ? env('TEST_STRIPE_SECRET') : env('STRIPE_SECRET'),
                env('APP_ENV') === 'local' ? env('TEST_STRIPE_KEY') : env('STRIPE_KEY')
            );
        });
    }

    /**
     * Register helpers file
     */
    public function registerHelpers()
    {
        // Load the helpers.php
        if (file_exists($file = __DIR__ . '/helpers.php')) {
            include_once($file);
        }
    }

    /**
     * Setup the configuration.
     *
     * @return void
     */
    protected function configure()
    {
        Shop::setData([
            'site_url' => (string)env('APP_URL'),
            'api_prefix' => (string)config('ecommerce.api_uri', 'api/ecommerce'),
            'theme_color' => (string)env('THEME_COLOR', '#409eff'),
            'api_version' => self::VERSION
        ]);
    }

    /**
     * Register any blade extensions.
     *
     * @return void
     */
    protected function registerBladeExtensions()
    {
        $this->app->afterResolving('blade.compiler', function (BladeCompiler $bladeCompiler) {
            $bladeCompiler->directive('ShopDataScript', function () {
                return "<?php echo '<script>window.ecommerceConfig = '. Shop::dumpData() .'</script>'; ?>";
            });
            $bladeCompiler->directive('ShopData', function ($value) {
                return "<?php echo Shop::dumpData()[$value]; ?>";
            });
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [
        ];
    }

    /**
     * Handle the config options and merge any overides.
     *
     * @return void
     */
    private function handleConfigs()
    {
        $configPath = __DIR__ . '/../config/ecommerce.php';

        $this->publishes([$configPath => config_path('ecommerce.php')], 'ecommerce-config');

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
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'ecommerce');

        $this->publishes([__DIR__.'/../resources/views' => base_path('resources/views/vendor/ecommerce')], 'ecommerce-views');

        View::composer('ecommerce::pdfs.*', function ($view) {
            $logo = getMediaFromSetting('Website Logo');
            $view->with(compact(['logo']));
        });
    }

    /**
     * Pull in the migration files.
     *
     * @return void
     */
    private function handleMigrations()
    {
        $files = new FileSystem();
        foreach ($files->glob('database/migrations/*_*.php') as $key => $file) {
            $files->requireOnce($file);
        }

        if (! class_exists('UpdateRolesTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/update_roles_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_update_roles_table.php'),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('UpdateUsersTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/update_users_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_update_users_table.php'),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateProductsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_products_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_products_table.php'),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateOrdersTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_orders_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_orders_table.php'),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateProductCustomisationsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_product_customisations_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_product_customisations_table.php'),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateProductCustomisationOptionsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_product_customisation_options_table.php.stub' =>
                database_path(
                    'migrations/' . date('Y_m_d_His', time()) . '_create_product_customisation_options_table.php'
                ),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreatePagesTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_pages_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_pages_table.php'),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateMediaToModelsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_media_to_models_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_media_to_models_table.php'),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateGalleriesTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_galleries_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_galleries_table.php'),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateContentsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_contents_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_contents_table.php'),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateCollectionsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_collections_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_collections_table.php'),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateCollectionTypesTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_collection_types_table.php.stub' =>
                database_path('migrations/'.date('Y_m_d_His', time()).'_create_collection_types_table.php'),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateCollectionTypeProductTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_collection_type_product_table.php.stub' =>
                database_path(
                    'migrations/'.date('Y_m_d_His', time()).'_create_collection_type_product_table.php'
                ),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateFormsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_forms_table.php.stub' =>
                database_path(
                    'migrations/'.date('Y_m_d_His', time()).'_create_forms_table.php'
                ),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateImportsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_imports_table.php.stub' =>
                database_path(
                    'migrations/'.date('Y_m_d_His', time()).'_create_imports_table.php'
                ),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateFormSectionsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_form_sections_table.php.stub' =>
                database_path(
                    'migrations/'.date('Y_m_d_His', time() + 1).'_create_form_sections_table.php'
                ),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateFormFieldsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_form_fields_table.php.stub' =>
                database_path(
                    'migrations/'.date('Y_m_d_His', time() + 2).'_create_form_fields_table.php'
                ),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateFormToModelsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_form_to_models_table.php.stub' =>
                database_path(
                    'migrations/'.date('Y_m_d_His', time()).'_create_form_to_models_table.php'
                ),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('AddOrderFormFieldToProductsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/add_order_form_field_to_products_table.php.stub' =>
                database_path(
                    'migrations/'.date('Y_m_d_His', time() + 1).'_add_order_form_field_to_products_table.php'
                ),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('AddFrontendFormFieldToProductsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/add_frontend_form_field_to_products_table.php.stub' =>
                database_path(
                    'migrations/'.date('Y_m_d_His', time() + 1).'_add_frontend_form_field_to_products_table.php'
                ),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateImportToModelsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_import_to_models_table.php.stub' =>
                database_path(
                    'migrations/'.date('Y_m_d_His', time()).'_create_import_to_models_table.php'
                ),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('AddDetailFieldsToOrdersTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/add_detail_fields_to_orders_table.php.stub' =>
                database_path(
                    'migrations/'.date('Y_m_d_His', time() + 1).'_add_detail_fields_to_orders_table.php'
                ),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('AddLangCollumnToContentsTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/add_lang_collumn_to_contents_table.php.stub' =>
                database_path(
                    'migrations/'.date('Y_m_d_His', time() + 1).'_add_lang_collumn_to_contents_table.php'
                ),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateLanguagesTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_languages_table.php.stub' =>
                database_path(
                    'migrations/'.date('Y_m_d_His', time() + 1).'_create_languages_table.php'
                ),
            ], 'ecommerce-migrations');
        }

        if (! class_exists('CreateCurrenciesTable')) {
            $this->publishes([
                __DIR__.'/../database/migrations/create_currencies_table.php.stub' =>
                database_path(
                    'migrations/'.date('Y_m_d_His', time() + 2).'_create_currencies_table.php'
                ),
            ], 'ecommerce-migrations');
        }
    }

    /**
     * Pull in the seed files.
     *
     * @return void
     */
    private function handleSeeds()
    {
        $files = new FileSystem();
        foreach ($files->glob('database/seeds/*_*.php') as $key => $file) {
            $files->requireOnce($file);
        }
        if (! class_exists('RolesAndPermissionsSeeder')) {
            $this->publishes([
                __DIR__.'/../database/seeds/RolesAndPermissionsSeeder.php.stub' =>
                database_path('seeds/RolesAndPermissionsSeeder.php'),
            ], 'ecommerce-seeds');
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
            'prefix' => 'ecommerce-templates',
            'namespace' => 'ChrisBraybrooke\ECommerce\Http\Controllers',
            'middleware' => ['web', 'auth']
        ], function () {
            $this->loadRoutesFrom(__DIR__.'/../routes/templates.php');
        });

        Route::group([
            'prefix' => config('ecommerce.api_uri', 'api/ecommerce'),
            'namespace' => 'ChrisBraybrooke\ECommerce\Http\Controllers\Api',
            'middleware' => ['bindings']
        ], function () {
            $this->loadRoutesFrom(__DIR__.'/../routes/api.php');
        });
    }
}
