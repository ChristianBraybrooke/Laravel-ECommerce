<template lang="html">
    <div class="card_payment_form" v-loading="loading">

        <el-row :gutter="20">
            <el-col :md="{span:8, offset: 4}">
                <el-form-item label="Cardholder Name" size="small" prop="cardholder_name" :rules="[{required: true, message: 'Cardholder name is required.', trigger: 'blur,change'}]">
                    <el-input v-model="form.cardholder_name" placeholder=""></el-input>
                </el-form-item>
            </el-col>

            <el-col :md="8">
                <el-form-item label="Card Number" size="small" prop="card_number" :rules="[{required: true, message: 'Card Number is required.', trigger: 'blur,change'}]">
                    <div class="stripe_input small" ref="cardNumber"></div>
                    <transition name="el-zoom-in-top">
                        <div class="el-form-item__error" v-if="cardErrors.number">
                            {{ cardErrors.number }}
                        </div>
                    </transition>
                </el-form-item>
            </el-col>
        </el-row>


        <el-row :gutter="20">
            <el-col :md="{span:8, offset: 4}">
                <el-form-item label="Card Expiry" size="small" prop="customer.company">
                    <div class="stripe_input small" ref="cardExpiry"></div>
                    <transition name="el-zoom-in-top">
                        <div class="el-form-item__error" v-if="cardErrors.date">
                            {{ cardErrors.date }}
                        </div>
                    </transition>
                </el-form-item>
            </el-col>

            <el-col :md="8">
                <el-form-item label="Card CVC" size="small" prop="customer.company">
                    <div class="stripe_input small" ref="cardCvc"></div>
                    <transition name="el-zoom-in-top">
                        <div class="el-form-item__error" v-if="cardErrors.cvc">
                            {{ cardErrors.cvc }}
                        </div>
                    </transition>
                </el-form-item>
            </el-col>
        </el-row>


    </div>
</template>

<script>
let stripe = Stripe('pk_test_uAzfSI4OCDnMzvadYJWuFpfZ'),
    elements = stripe.elements(),
    card = undefined;

export default {

      name: 'CardPaymentForm',

      components: {

      },

      props: {
          form: {
              type: Object,
              required: true
          },
          onTokenCreation: {
              type: Function,
              required: false,
              default () {
                  return function (has_error, token_object, error_object) {};
              },
          },
          size: {
              type: String,
              required: false,
              default () {
                  return '';
              },
          },
      },

      data () {
          return {
              cardErrors: {
                  number: null,
                  date: null,
                  cvc: null
              },
              loading: false,
              cardNumberElement: undefined,
              cardExpiryElement: undefined,
              cardCvcElement: undefined,
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('CardPaymentForm.vue Mounted');
          this.setupStripe();
      },

      methods: {

        /**
         * Setup the stripe element on the page.
         *
         * @return void
         */
        setupStripe()
        {
            var is_mini = this.size.includes('mini');
            var is_small = this.size.includes('small');
            var is_medium = this.size.includes('medium');
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

            this.listenForEvents();
        },

        /**
         * Listen for stripe events.
         *
         * @return void
         */
        listenForEvents()
        {
            // Card number change event.
            this.cardNumberElement.on('change', function(event, value) {
                // Switch brand logo.
                if (event.brand) {
                    this.setBrandIcon(event.brand);
                }

                console.log(event)
                console.log(this.cardNumberElement)
                if(!event.empty) {
                    this.$set(this.form, 'card_number', '4444');
                } else {
                    this.$set(this.form, 'card_number', null);
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

        /**
         * Set the card brand icon.
         *
         * @var string brand
         * @return void
         */
        setBrandIcon(brand)
        {
            console.log(brand);
        },

        /**
         * Determine what happens on events.
         *
         * @var Object result
         * @var Mixed type
         * @return void
         */
        setOutcome(result, type = null)
        {
            // Hide card number error elements.
            if (type == 'number_change') {
                this.cardErrors.number = null;
            }

            // Hide card expiry error elements.
            if (type == 'expiry_change') {
                this.cardErrors.date = null;
            }

            // Hide card cvc error elements.
            if (type == 'cvc_change') {
                this.cardErrors.cvc = null;
            }

            if (result.token) {
              // Tell the parent that a token has been created.
              this.onTokenCreation(false, result.token, {});
              this.$set(this.form, 'payment_token', result.token.id);

              // Submit the form:
              this.loading = false;

            } else if (result.error) {
              // Tell the parent that a token hasn't been created.
              this.onTokenCreation(true, {}, result.error);

              // Re-enable the submit button.
              this.loading = false;

              // Display error
              this.handleError(result.error);
            }
        },

        /**
         * Determine what happens on error.
         *
         * @var Object error
         * @return void
         */
        handleError(error) {
            // The error was a validation_error
            if (error.type === 'validation_error' && error.code) {

                var code = error.code;

                // Card Number error has occured.
                if (~code.indexOf("number")) {
                    this.cardErrors.number = error.message;
                }

                // Expiry error has occured.
                if (~code.indexOf("expiry")) {
                    this.cardErrors.date = error.message;
                }

                // CVC error has occured.
                if (~code.indexOf("cvc")) {
                    this.cardErrors.cvc = error.message;
                }
            } else {
              // Another type of error occured.

            }
        },

        createToken()
        {
            this.loading = true;
            stripe.createToken(this.cardNumberElement, {
                name: 'Christian Braybrooke'
            }).then(this.setOutcome);
        },
      },

}
</script>

<style lang="scss" scoped>
    @import '../sass/_variables.scss';

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
        display: inherit;
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
