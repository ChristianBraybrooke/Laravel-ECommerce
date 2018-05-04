<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCurrenciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');

            Schema::create('currencies', function (Blueprint $table) {
                $table->increments('id');
                $table->string('key')->nullable()->default(null);
                $table->string('name')->nullable()->default(null);
                $table->boolean('default')->nullable()->default(null);
                $table->timestamp('live_at')->nullable()->default(null);
                $table->timestamps();
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
        Schema::dropIfExists('currencies');
    }
}
