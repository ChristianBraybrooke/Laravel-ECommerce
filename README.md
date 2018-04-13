# Laravel ECommerce Package

## Installation

Only installation on a fresh Laravel app is reccomended:

```sh
composer require chrisbraybrooke/laravel-ecommerce
```

Setup:

```sh
php artisan vendor:publish --tag=ecommerce-config
php artisan vendor:publish --tag=ecommerce-migrations
php artisan vendor:publish --tag=ecommerce-admin
php artisan vendor:publish --tag=migration

php artisan migrate

php artisan passport:install
```

We use Laravel Passport under the hood, so make sure this middleware is in your web group.

```sh
'web' => [
    // Other middleware...
    \Laravel\Passport\Http\Middleware\CreateFreshApiToken::class,
],
```
