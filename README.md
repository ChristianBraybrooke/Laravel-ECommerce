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

## Setup:

```sh
php artisan vendor:publish --tag=migrations

php artisan vendor:publish --tag=ecommerce-config
php artisan vendor:publish --tag=ecommerce-migrations
php artisan vendor:publish --tag=ecommerce-admin

php artisan migrate
```

## Roles And Permissions:
```sh
php artisan vendor:publish --tag=ecommerce-seeds
```

In `database/seeds/DatabaseSeeder.php` add the RolesAndPermissionsSeeder class
```sh
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(RolesAndPermissionsSeeder::class)
    }
}
```

And then seed the database
```sh
php artisan migrate --seed
```

## Media:
```sh
php artisan vendor:publish --tag=config
```

After publishing the config files, be sure to change the media class to `ChrisBraybrooke\ECommerce\Models\Media`

```sh
/*
 * The class name of the media model that should be used.
 */
 'media_model' => ChrisBraybrooke\ECommerce\Models\Media::class,
```

## Users:

To ensure all roles / permissions work correctly, you will need to edit your `App/User.php` class so that it extends the Laravel Ecommerce User class.
```sh
use Illuminate\Notifications\Notifiable;
use ChrisBraybrooke\ECommerce\Models\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
}
```

You will then want to create your first admin user.
```sh
php artisan tinker

$user = new App\User
$user->name = 'Your Name'
$user->email = 'youremail@here.com'
$user->password = bcrypt('password')

$user->save()

$user->assignRole('admin')
```

We use Laravel Passport under the hood, so make sure you install passport to generate the relevent keys etc.

```sh
php artisan passport:install
```

You then need to add this middleware to your `app/Http/Kernel.php` web group. Make sure it is added after the `\App\Http\Middleware\EncryptCookies::class` middleware.

```sh
'web' => [
    // Other middleware...
    \Laravel\Passport\Http\Middleware\CreateFreshApiToken::class,
],
```

Finally in your `config/auth.php` config file, you should set the API driver to passport.

```sh
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'api' => [
        'driver' => 'passport',
        'provider' => 'users',
    ],
],
```
