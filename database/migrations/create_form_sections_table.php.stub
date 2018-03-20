<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFormSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('form_sections', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('form_id')->unsigned()->nullable()->default(null);
            $table->string('name');
            $table->string('description')->nullable()->default(null);
            $table->integer('order')->nullable()->default(null);
            $table->boolean('editable')->default(false);
            $table->timestamps();

            $table->foreign('form_id')
                  ->references('id')->on('forms')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('form_sections');
    }
}
