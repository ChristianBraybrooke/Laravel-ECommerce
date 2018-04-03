<template lang="html">
    <div v-loading="loading">

        <el-breadcrumb class="breadcrumbs" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'orders' }">Orders</el-breadcrumb-item>
          <el-breadcrumb-item>New Order</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'orders.step1' }">Step 1</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'orders.step2' }">Step 2</el-breadcrumb-item>
          <el-breadcrumb-item>Step 3</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row align="middle" type="flex">
            <el-col :span="12"><h1 class="page_title">New Order <span v-if="order.id"> - #{{ order.id }}</span></h1></el-col>
        </el-row>

        <errors v-if="Object.keys(orderErrors).length > 0" :errors="orderErrors"></errors>

        <el-form :rules="formRules" label-position="top" ref="paymentForm" :model="order" @submit.native.prevent>


          <el-row :gutter="20">
              <el-col :md="12">
                  <h5>Payment Information</h5>
              </el-col>
          </el-row>

          <el-row :gutter="20">
              <el-col :md="{span:8, offset: 4}">
                  <el-form-item label="Cardholder Name" size="small" prop="customer.company" :required="true">
                      <el-input v-model="order.customer.first_name" placeholder=""></el-input>
                  </el-form-item>
              </el-col>

              <el-col :md="8">
                  <el-form-item label="Card Number" size="small" prop="card_number" :required="true">
                      <div class="stripe_input small" ref="cardNumber"></div>
                      <div class="el-form-item__error">
                              card_number is required
                            </div>
                  </el-form-item>
              </el-col>
          </el-row>


          <el-row :gutter="20">
              <el-col :md="{span:8, offset: 4}">
                  <el-form-item label="Card Expiry" size="small" prop="customer.company">
                      <div class="stripe_input small" ref="cardExpiry"></div>
                  </el-form-item>
              </el-col>

              <el-col :md="8">
                  <el-form-item label="Card CVC" size="small" prop="customer.company">
                      <div class="stripe_input small" ref="cardCvc"></div>
                  </el-form-item>
              </el-col>
          </el-row>

          <el-row :gutter="20" style="margin-top: 40px;">
              <el-col :md="{span:24}">
                  <el-button @click="processSubmit('paymentForm')" type="success" plain>Complete Payment</el-button>
              </el-col>
          </el-row>


        </el-form>

    </div>
</template>

<script>
import api from '../../services/api-service.js';
import { mapActions, mapGetters } from 'vuex';

let stripe = Stripe('pk_test_uAzfSI4OCDnMzvadYJWuFpfZ'),
    elements = stripe.elements(),
    card = undefined;

export default {

      name: 'orderStepThree',

      components: {
          Errors: () => import('../../components/Errors.vue'),
      },

      props: {

      },

      data () {
          return {
              loading: false,
              orderErrors: {},
              formRules: {

              },
              cardNumberElement: undefined,
              cardExpiryElement: undefined,
              cardCvcElement: undefined,
          }
      },

      computed: {
          ...mapGetters([
            'order',
          ]),
      },

      watch: {
          order: {
              handler: function(order) {
                  this.$store.commit('SET_ORDER', order);
              },
              deep: true
          },
      },

      mounted () {
          console.log('orderStepThree.vue Mounted');
          this.setupStripe();
      },

      methods: {

          setupStripe()
          {
              var is_mini = this.$refs.cardNumber.className.includes('mini');
              var is_small = this.$refs.cardNumber.className.includes('small');
              var is_medium = this.$refs.cardNumber.className.includes('medium');
              var color = '#606266';
              var placeholder_color = '#c0c4cc';

              var style = {
                  base: {
                    fontSize: is_mini ? '12px' : is_small ? '13px' : is_medium ? '14px' : '14px',
                    color: color,
                    fontSmoothing: 'antialiased',
                    fontFamily: 'Helvetica Neue',
                    '::placeholder': {
                      color: placeholder_color
                    },
                  },
                  'invalid': {
                      'color': color,
                  },
              };

              // Create the card number element.
              this.cardNumberElement = elements.create('cardNumber', {
                  style: style,
              });
              this.cardNumberElement.mount(this.$refs.cardNumber);

              // Create the expiry date element.
              this.cardExpiryElement = elements.create('cardExpiry', {
                  style: style
              });
              this.cardExpiryElement.mount(this.$refs.cardExpiry);

              // Create the cvc element.
              this.cardCvcElement = elements.create('cardCvc', {
                  style: style
              });
              this.cardCvcElement.mount(this.$refs.cardCvc);


              // Card number change event.
              this.cardNumberElement.on('change', function(event) {
                  // Switch brand logo.
                  if (event.brand) {
                      this.setBrandIcon(event.brand);
                  }

                  // Focus on next element.
                  if (event.complete) {
                      this.cardExpiryElement.focus();
                  }

                  this.setOutcome(event, 'number_change');
              }.bind(this));

              // Card expiry change event.
              this.cardExpiryElement.on('change', function(event) {
                  // Focus on next element.
                  if (event.complete) {
                      this.cardCvcElement.focus();
                  }

                  this.setOutcome(event, 'expiry_change');
              }.bind(this));

              // Card cvc change event.
              this.cardCvcElement.on('change', function(event) {
                  // Focus on next element.
                  if (event.complete) {
                      // $payment_submit.focus();
                  }

                  this.setOutcome(event, 'cvc_change');
              }.bind(this));

          },

          setBrandIcon(brand)
          {
              //
          },

          setOutcome(result, type = null)
          {
              console.log(result)
              // $successElement.hide();
              // $errorElement.hide();

              // $payment_submit.removeClass('disabled');

              // Hide card number error elements.
              if (type == 'number_change') {
                  this.orderErrors = {};
              }

              // Hide card expiry error elements.
              if (type == 'expiry_change') {
                  this.orderErrors = {};
              }

              // Hide card cvc error elements.
              if (type == 'cvc_change') {
                  this.orderErrors = {};
              }

              if (result.token) {
                // Insert the token ID into the form so it gets submitted to the server.
                console.log(result.token)

                // Submit the form:
                this.loading = false;

              } else if (result.error) {
                // Re-enable the submit button.
                this.loading = false;

                // Display error
                this.handleError(result.error);
              }
          },

          handleError(error) {
              console.log(error);
              // The error was a validation_error
              if (error.type === 'validation_error' && error.code) {

                  var code = error.code;

                  this.orderErrors = {
                      message: 'There were payment errors.',
                      errors: {
                          'Payment': [error.message],
                      },
                      code: error.code
                  };

                  // Card Number error has occured.
                  if (~code.indexOf("number")) {

                  }

                  // Expiry error has occured.
                  if (~code.indexOf("expiry")) {

                  }

                  // CVC error has occured.
                  if (~code.indexOf("cvc")) {

                  }
              } else {
                // Another type of error occured.

              }
          },

          processSubmit(ref)
          {
              this.loading = true;
              stripe.createToken(this.cardNumberElement, {
                  name: 'Christian Braybrooke'
              }).then(this.setOutcome);
          },

      }
}
</script>

<style lang="scss">
@import '../../sass/_variables.scss';

@function stripe-padding-calc($height, $font-size){
  @return (($height - $font-size) / 2) - 1
}

.stripe_input {
    -webkit-appearance: none;
    background-color: $--input-fill;
    background-image: none;
    border-radius: $--input-border-radius;
    border: $--input-border;
    border-color: $--input-border-color;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    font-size: $--input-font-size;
    line-height: 1;
    outline: none;
    padding: stripe-padding-calc($--input-height, $--input-font-size) 15px;
    -webkit-transition: $--border-transition-base;
    transition: $--border-transition-base;
    width: 100%;
    height: $--input-height;
}
.stripe_input:hover {
    cursor: text;
    border: $--input-border;
    border-color: $--input-border-color-hover;
}
.stripe_input.StripeElement--focus {
    border: $--input-border;
    border-color: $--input-focus-border;
}
.stripe_input.StripeElement--invalid {
    border: $--input-border;
    border-color: $--color-danger;
}
.stripe_input.StripeElement--complete {
    border: $--input-border;
    border-color: $--color-success;
}

.stripe_input.medium {
    font-size: $--input-medium-font-size;
    height: $--input-medium-height;
    padding: stripe-padding-calc($--input-medium-height, $--input-medium-font-size) 15px;
}
.stripe_input.small {
    font-size: $--input-small-font-size;
    height: $--input-small-height;
    padding: stripe-padding-calc($--input-small-height, $--input-small-font-size) 15px;
}
.stripe_input.mini {
    font-size: $--input-mini-font-size;
    height: $--input-mini-height;
    padding: stripe-padding-calc($--input-mini-height, $--input-mini-font-size) 15px;
}
</style>
