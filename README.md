# Laravel ECommerce Package

## Laravel Setup
```sh
laravel new laravel-shop
php artisan make:auth
```

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
php artisan vendor:publish --tag=migrations

php artisan migrate
```

We use Laravel Passport under the hood, so make sure this middleware is in your web group and you install passport.

```sh
php artisan passport:install
```

```sh
'web' => [
    // Other middleware...
    \Laravel\Passport\Http\Middleware\CreateFreshApiToken::class,
],
```
