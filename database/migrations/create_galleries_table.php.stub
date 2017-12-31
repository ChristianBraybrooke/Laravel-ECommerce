<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGalleriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');

            Schema::create('galleries', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->boolean('default')->nullable()->default(null);
                $table->timestamp('live_at')->nullable()->default(null);
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

            Schema::dropIfExists('galleries');

        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
