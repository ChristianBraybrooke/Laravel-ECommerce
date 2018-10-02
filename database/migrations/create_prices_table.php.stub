<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');

            Schema::create('prices', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('amount')->nullable()->default(null);
                $table->integer('discount_amount')->nullable()->default(null);
                $table->string('lang');
                $table->integer('product_id')->unsigned();
                $table->integer('currency_id')->unsigned();
                $table->timestamps();

                $table->foreign('product_id')
                    ->references('id')->on('products')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');

                $table->foreign('currency_id')
                    ->references('id')->on('currencies')
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

            Schema::dropIfExists('prices');

        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
