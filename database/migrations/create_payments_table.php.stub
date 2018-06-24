<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('order_id')->nullable()->unsigned();
            $table->string('reference');
            $table->string('method')->nullable()->default(null);
            $table->string('currency')->nullable()->default(null);
            $table->string('amount')->nullable()->default(null);
            $table->string('fee')->nullable()->default(null);
            $table->string('source_id')->nullable()->default(null);
            $table->string('source_brand')->nullable()->default(null);
            $table->string('source_country')->nullable()->default(null);
            $table->string('source_last4')->nullable()->default(null);
            $table->string('source_exp_month')->nullable()->default(null);
            $table->string('source_exp_year')->nullable()->default(null);
            $table->timestamps();

            $table->foreign('order_id')
                ->references('id')->on('orders')
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
        Schema::dropIfExists('payments');
    }
}
