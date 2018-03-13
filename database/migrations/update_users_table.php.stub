<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('gender')->nullable();
            $table->date('dob')->nullable();
            $table->string('company')->nullable();
            $table->string('phone')->nullable();
            $table->string('timezone')->nullable();
            $table->string('language')->nullable();
            $table->string('stripe_id')->nullable();
            $table->text('last_login')->nullable();
            $table->text('marketing_preferences')->nullable();
            $table->string('billing_address_line1')->nullable()->default(null);
            $table->string('billing_address_line2')->nullable()->default(null);
            $table->string('billing_address_town')->nullable()->default(null);
            $table->string('billing_address_county')->nullable()->default(null);
            $table->string('billing_address_postcode')->nullable()->default(null);
            $table->string('billing_address_country')->nullable()->default(null);
            $table->string('shipping_address_line1')->nullable()->default(null);
            $table->string('shipping_address_line2')->nullable()->default(null);
            $table->string('shipping_address_town')->nullable()->default(null);
            $table->string('shipping_address_county')->nullable()->default(null);
            $table->string('shipping_address_postcode')->nullable()->default(null);

            $table->string('payment_source_id')->nullable()->default(null);
            $table->string('payment_source_brand')->nullable()->default(null);
            $table->string('payment_source_country')->nullable()->default(null);
            $table->string('payment_source_last4')->nullable()->default(null);
            $table->string('payment_source_exp_month')->nullable()->default(null);
            $table->string('payment_source_exp_year')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('first_name');
            $table->dropColumn('last_name');
            $table->dropColumn('gender');
            $table->dropColumn('dob');
            $table->dropColumn('company');
            $table->dropColumn('phone');
            $table->dropColumn('timezone');
            $table->dropColumn('language');
            $table->dropColumn('stripe_id');
            $table->dropColumn('last_login');
            $table->dropColumn('marketing_preferences');
            $table->dropColumn('billing_address_line1')->nullable()->default(null);
            $table->dropColumn('billing_address_line2')->nullable()->default(null);
            $table->dropColumn('billing_address_town')->nullable()->default(null);
            $table->dropColumn('billing_address_county')->nullable()->default(null);
            $table->dropColumn('billing_address_postcode')->nullable()->default(null);
            $table->dropColumn('billing_address_country')->nullable()->default(null);
            $table->dropColumn('shipping_address_line1')->nullable()->default(null);
            $table->dropColumn('shipping_address_line2')->nullable()->default(null);
            $table->dropColumn('shipping_address_town')->nullable()->default(null);
            $table->dropColumn('shipping_address_county')->nullable()->default(null);
            $table->dropColumn('shipping_address_postcode')->nullable()->default(null);

            $table->dropColumn('payment_source_id')->nullable()->default(null);
            $table->dropColumn('payment_source_brand')->nullable()->default(null);
            $table->dropColumn('payment_source_country')->nullable()->default(null);
            $table->dropColumn('payment_source_last4')->nullable()->default(null);
            $table->dropColumn('payment_source_exp_month')->nullable()->default(null);
            $table->dropColumn('payment_source_exp_year')->nullable()->default(null);
        });
    }
}
