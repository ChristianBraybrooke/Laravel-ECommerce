<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');

            Schema::create('pages', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->integer('parent_id')->unsigned()->nullable();
                $table->boolean('in_menu')->nullable();
                $table->integer('menu_order')->nullable()->default(null);
                $table->string('slug')->nullable();
                $table->timestamp('live_at')->nullable()->default(null);
                $table->text('meta')->nullable()->default(null);
                $table->string('template')->nullable()->default(null);
                $table->softDeletes();
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

            Schema::dropIfExists('pages');

        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
