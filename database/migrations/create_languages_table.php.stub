<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLanguagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');

            Schema::create('languages', function (Blueprint $table) {
                $table->increments('id');
                $table->string('key')->nullable()->default(null);
                $table->string('name')->nullable()->default(null);
                $table->string('flag_key')->nullable()->default(null);
                $table->integer('currency_id')->unsigned()->nullable()->default(null);
                $table->boolean('default')->nullable()->default(null);
                $table->boolean('ex_vat')->nullable()->default(null);
                $table->integer('vat')->nullable()->default(null);
                $table->timestamp('live_at')->nullable()->default(null);
                $table->timestamps();

                $table->foreign('currency_id')
                    ->references('id')->on('currencies')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');
            });

        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('languages');
    }
}
