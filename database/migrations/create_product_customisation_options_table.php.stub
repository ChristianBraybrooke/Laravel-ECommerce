<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductCustomisationOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');

            Schema::create('product_customisation_options', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->boolean('default');
                $table->integer('product_customisation_id')->unsigned();
                $table->timestamps();

                $table->foreign('product_customisation_id')
                      ->references('id')->on('product_customisations')
                      ->onDelete('cascade')
                      ->onUpdate('cascade');
            });

        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');

            Schema::dropIfExists('product_customisation_options');

        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
