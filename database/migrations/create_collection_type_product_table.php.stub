<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCollectionTypeProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');

            Schema::create('collection_type_product', function (Blueprint $table) {
                $table->integer('product_id')->unsigned();
                $table->integer('collection_type_id')->unsigned();
                $table->timestamps();

                $table->foreign('product_id')
                    ->references('id')->on('products')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');

                $table->foreign('collection_type_id')
                    ->references('id')->on('collection_types')
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

            Schema::dropIfExists('collection_name_product');

        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
