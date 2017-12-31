<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMediaToModelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');

            Schema::create('media_to_models', function (Blueprint $table) {
                $table->integer('media_id');
                $table->integer('model_id');
                $table->string('model_type');
                $table->string('media_location');
                $table->timestamps();
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

            Schema::dropIfExists('media_to_model');

        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
