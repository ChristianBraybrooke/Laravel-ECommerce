<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFormFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('form_fields', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('form_section_id')->unsigned()->nullable()->default(null);
            $table->string('type');
            $table->string('name');
            $table->string('description')->nullable()->default(null);
            $table->text('rules')->nullable()->default(null);
            $table->text('options')->nullable()->default(null);
            $table->string('append')->nullable()->default(null);
            $table->string('prepend')->nullable()->default(null);
            $table->integer('order')->nullable()->default(null);
            $table->timestamps();

            $table->foreign('form_section_id')
                  ->references('id')->on('form_sections')
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
        Schema::dropIfExists('form_fields');
    }
}
