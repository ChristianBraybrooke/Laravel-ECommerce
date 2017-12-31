<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCollectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');

            Schema::create('collections', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name')->nullable();
                $table->string('individual_name')->nullable();
                $table->boolean('in_menu')->nullable();
                $table->string('slug')->nullable();
                $table->timestamp('live_at')->nullable()->default(null);
                $table->string('index_template')->nullable()->default(null);
                $table->string('single_template')->nullable()->default(null);
                $table->text('meta')->nullable()->default(null);
                $table->text('default_type_meta')->nullable()->default(null);
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

            Schema::dropIfExists('collections');

        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
