<?php

use Faker\Generator as Faker;

$factory->define(config('ecommerce.models.product'), function (Faker $faker) {
    $name = $faker->words(3, true);
    return [
        'name' => $name,
        'use_variant_data' => $faker->boolean,
        'live_at' => $faker->dateTime(),
        'slug' => $name,
        'price' => $faker->numberBetween(10, 2000),
        'use_variant_customisation' => $faker->boolean,
        'can_customise' => $faker->boolean,
        'list_in_shop' => $faker->boolean,
        'featured' => $faker->boolean,
        'can_customise_width' => $faker->boolean,
        'can_customise_height' => $faker->boolean,
        'can_customise_depth' => $faker->boolean,
        'measurement_unit' => 'mm',
        'width' => $faker->numberBetween(10, 200),
        'height' => $faker->numberBetween(10, 200),
        'depth' => $faker->numberBetween(10, 200),
    ];
});

$factory->afterCreating(config('ecommerce.models.product'), function ($product, $faker) {
    $product->content()->updateOrCreate(
        ['content_name' => 'Main Content'],
        ['content' => $faker->paragraphs(2, true)]
    );
    $product->content()->updateOrCreate(
        ['content_name' => 'Snippet'],
        ['content' => $faker->paragraphs(1, true)]
    );
});
