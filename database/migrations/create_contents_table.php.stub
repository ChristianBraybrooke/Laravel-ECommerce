<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');

            Schema::create('contents', function (Blueprint $table) {
                $table->increments('id');
                $table->string('contentable_type');
                $table->integer('contentable_id');
                $table->string('content_name');
                $table->text('content')->nullable()->default(null);
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

            Schema::dropIfExists('contents');
            
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
