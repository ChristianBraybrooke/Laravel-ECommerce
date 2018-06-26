<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');

            Schema::create('imports', function (Blueprint $table) {
                $table->increments('id');
                $table->string('import_to');
                $table->integer('user_id')->nullable()->unsigned();
                $table->integer('rows_added')->nullable();
                $table->integer('rows_not_added')->nullable();
                $table->string('status')->nullable();
                $table->text('import_data')->nullable()->default(null);
                $table->timestamps();

                $table->foreign('user_id')
                    ->references('id')->on('users')
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

            Schema::dropIfExists('imports');

        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
