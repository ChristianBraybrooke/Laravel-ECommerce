<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    $gender = $faker->boolean ? 'male' : 'female';
    return [
        'first_name' => $faker->firstName($gender),
        'last_name' => $faker->lastName($gender),
        'gender' => $gender,
        'dob' => $faker->date,
        'company' => $faker->company,
        'phone' => $faker->phoneNumber,
        'email' => $faker->unique()->safeEmail,
        'password' => bcrypt('password'),
        'timezone' => 'Europe/London',
        'language' => 'en_GB',
        'billing_address_line1' => $faker->streetAddress,
        'billing_address_line2' => $faker->streetAddress,
        'billing_address_town' => $faker->city ,
        'billing_address_county' => $faker->state,
        'billing_address_postcode' => $faker->postcode,
        'billing_address_country' => $faker->country,
        'shipping_address_line1' => $faker->streetAddress,
        'shipping_address_line2' => $faker->streetAddress,
        'shipping_address_town' => $faker->city ,
        'shipping_address_county' => $faker->state ,
        'shipping_address_postcode' => $faker->postcode ,
        'shipping_address_country' => $faker->country,
        'remember_token' => str_random(10),
    ];
});
