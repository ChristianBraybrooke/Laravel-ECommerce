<?php

/**
 * Your package config would go here
 */

return [

  'web_uri' => env('ECOMMERCE_WEB_URI', 'admin'),

  'web_middleware' => env('ECOMMERCE_WEB_MIDDLEWARE', 'web'),

  'api_uri' => env('ECOMMERCE_API_URI', 'api/ecommerce'),

  'theme_color' => env('THEME_COLOR', '#409eff'),

  'models' => [

      //
      'collection' => ChrisBraybrooke\ECommerce\Models\Collection::class,

      //
      'collection_type' => ChrisBraybrooke\ECommerce\Models\CollectionType::class,

      //
      'content' => ChrisBraybrooke\ECommerce\Models\Content::class,

      //
      'gallery' => ChrisBraybrooke\ECommerce\Models\Gallery::class,

      //
      'log' => ChrisBraybrooke\ECommerce\Models\Log::class,

      //
      'media' => ChrisBraybrooke\ECommerce\Models\Media::class,

      //
      'order' => ChrisBraybrooke\ECommerce\Models\Order::class,

      //
      'page' => ChrisBraybrooke\ECommerce\Models\Page::class,

      //
      'permission' => ChrisBraybrooke\ECommerce\Models\Permission::class,

      //
      'product' => ChrisBraybrooke\ECommerce\Models\Product::class,

      //
      'product_customisation' => ChrisBraybrooke\ECommerce\Models\ProductCustomisation::class,

      //
      'product_customisation_option' => ChrisBraybrooke\ECommerce\Models\ProductCustomisationOption::class,

      //
      'role' => ChrisBraybrooke\ECommerce\Models\Role::class,

      //
      'form' => ChrisBraybrooke\ECommerce\Models\Form::class,

      //
      'form_field' => ChrisBraybrooke\ECommerce\Models\FormField::class,

      //
      'form_section' => ChrisBraybrooke\ECommerce\Models\FormSection::class,

      //
      'menu' => ChrisBraybrooke\ECommerce\Models\Menu::class,

      //
      'language' => ChrisBraybrooke\ECommerce\Models\Language::class,

      //
      'currency' => ChrisBraybrooke\ECommerce\Models\Currency::class,

      //
      'payment' => ChrisBraybrooke\ECommerce\Models\Payment::class,
  ],

  'shop_data' => [

      //
      'collection_mappings' => ['Home Header Collection', 'Home Panels Collection', 'Product Categories Collection'],

      //
      'site_images' => ['Website Logo', 'Website Logo Inverse'],

      //
      'aditional_cols' => [],
  ],

  'default_content' => [

      'orders' => [],
      'products' => [
          ['content_name' => 'Main Content', 'content' => '', 'type' => 'quill'],
          ['content_name' => 'Snippet', 'content' => '', 'type' => 'text']
      ],
  ],

];
