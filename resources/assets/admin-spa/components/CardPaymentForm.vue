<template lang="html">
  <div
    v-loading="loading"
    class="card_payment_form">

    <slot
      :model="model"
      name="before_form"/>

    <el-row :gutter="20">
      <el-col :md="{span:16, offset: 4}">
        <el-card class="secure_payment_form box-card">
          <div
            slot="header"
            class="clearfix">
            <span>Secure Payment Form</span>
          </div>
          <slot
            :model="model"
            :card-errors="cardErrors"
            name="form">
            <el-row :gutter="20">
              <el-col :md="{span: 12}">
                <el-form-item
                  :rules="[{required: true, message: 'Cardholder name is required.'}]"
                  label="Cardholder Name"
                  size="small"
                  prop="cardholder_name">
                  <el-input
                    v-model="model.cardholder_name"
                    placeholder=""/>
                </el-form-item>
              </el-col>

              <el-col :md="12">
                <el-form-item
                  label="Card Number"
                  size="small"
                  prop="card_number">
                  <div
                    ref="cardNumber"
                    class="stripe_input small"/>
                  <transition name="el-zoom-in-top">
                    <div
                      v-if="cardErrors.number"
                      class="el-form-item__error">
                      {{ cardErrors.number }}
                    </div>
                  </transition>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :md="{span:12}">
                <el-form-item
                  label="Card Expiry"
                  size="small"
                  prop="cardholder_expiry">
                  <div
                    ref="cardExpiry"
                    class="stripe_input small"/>
                  <transition name="el-zoom-in-top">
                    <div
                      v-if="cardErrors.date"
                      class="el-form-item__error">
                      {{ cardErrors.date }}
                    </div>
                  </transition>
                </el-form-item>
              </el-col>

              <el-col :md="12">
                <el-form-item
                  label="Card CVC"
                  size="small"
                  prop="cardholder_cvc">
                  <div
                    ref="cardCvc"
                    class="stripe_input small"/>
                  <transition name="el-zoom-in-top">
                    <div
                      v-if="cardErrors.cvc"
                      class="el-form-item__error">
                      {{ cardErrors.cvc }}
                    </div>
                  </transition>
                </el-form-item>
              </el-col>
            </el-row>
          </slot>
        </el-card>
      </el-col>
    </el-row>

    <slot
      :model="model"
      name="after_form"/>

    <el-row :gutter="20">
      <el-col :md="{span:16, offset: 4}">
        <slot
          :create-token="createToken"
          name="submit_button">
          <el-button
            :loading="loading"
            type="success"
            @click="createToken">Process Payment</el-button>
        </slot>
      </el-col>
    </el-row>

  </div>
</template>

<script>
let stripe = window.Stripe(window.ecommerceConfig.stripe_public_key)

let elements = stripe.elements()

export default {

  name: 'CardPaymentForm',

  props: {
    model: {
      type: Object,
      required: true
    },
    onTokenCreation: {
      type: Function,
      required: false,
      default () {
        return function (hasError, tokenObject, errorObject) {}
      }
    },
    onFormSubmit: {
      type: Function,
      required: false,
      default () {
        return function () {}
      }
    },
    size: {
      type: String,
      required: false,
      default () {
        return ''
      }
    }
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
      cardCvcElement: undefined
    }
  },

  computed: {

  },

  watch: {

  },

  mounted () {
    console.log('CardPaymentForm.vue Mounted')
    this.setupStripe()
  },

  destroyed () {
    this.clearForm(true)
  },

  methods: {

    /**
         * Setup the stripe element on the page.
         *
         * @return void
         */
    setupStripe () {
      var isMini = this.size.includes('mini')
      var isSmall = this.size.includes('small')
      var isMedium = this.size.includes('medium')
      var color = '#606266'
      var placeholderColor = '#c0c4cc'

      var style = {
        base: {
          fontSize: isMini ? '12px' : isSmall ? '13px' : isMedium ? '14px' : '14px',
          color: color,
          fontSmoothing: 'antialiased',
          fontFamily: 'Helvetica Neue',
          '::placeholder': {
            color: placeholderColor
          }
        },
        'invalid': {
          'color': color
        }
      }

      // Create the card number element.
      this.cardNumberElement = elements.create('cardNumber', {
        style: style
      })
      this.cardNumberElement.mount(this.$refs.cardNumber)

      // Create the expiry date element.
      this.cardExpiryElement = elements.create('cardExpiry', {
        style: style
      })
      this.cardExpiryElement.mount(this.$refs.cardExpiry)

      // Create the cvc element.
      this.cardCvcElement = elements.create('cardCvc', {
        style: style
      })
      this.cardCvcElement.mount(this.$refs.cardCvc)

      this.listenForEvents()
    },

    /**
         * Listen for stripe events.
         *
         * @return void
         */
    listenForEvents () {
      // Card number change event.
      this.cardNumberElement.on('change', function (event, value) {
        // Switch brand logo.
        if (event.brand) {
          this.setBrandIcon(event.brand)
        }

        // Focus on next element.
        if (event.complete) {
          this.cardExpiryElement.focus()
        }

        this.setOutcome(event, 'number_change')
      }.bind(this))

      // Card expiry change event.
      this.cardExpiryElement.on('change', function (event) {
        // Focus on next element.
        if (event.complete) {
          this.cardCvcElement.focus()
        }

        this.setOutcome(event, 'expiry_change')
      }.bind(this))

      // Card cvc change event.
      this.cardCvcElement.on('change', function (event) {
        // Focus on next element.
        if (event.complete) {
          // $payment_submit.focus();
        }

        this.setOutcome(event, 'cvc_change')
      }.bind(this))
    },

    /**
         * Set the card brand icon.
         *
         * @var string brand
         * @return void
         */
    setBrandIcon (brand) {
      console.log(brand)
    },

    /**
         * Determine what happens on events.
         *
         * @var Object result
         * @var Mixed type
         * @return void
         */
    setOutcome (result, type = null) {
      // Hide card number error elements.
      if (type === 'number_change') {
        this.cardErrors.number = null
      }

      // Hide card expiry error elements.
      if (type === 'expiry_change') {
        this.cardErrors.date = null
      }

      // Hide card cvc error elements.
      if (type === 'cvc_change') {
        this.cardErrors.cvc = null
      }

      if (result.token) {
        // Tell the parent that a token has been created.
        this.onTokenCreation(false, result.token, {})
        this.$set(this.model, 'payment_token', result.token.id)

        this.clearForm()

        // Submit the form:
        this.loading = false
      } else if (result.error) {
        // Tell the parent that a token hasn't been created.
        this.onTokenCreation(true, {}, result.error)

        // Re-enable the submit button.
        this.loading = false

        // Display error
        this.handleError(result.error)
      }
    },

    /**
         * Determine what happens on error.
         *
         * @var Object error
         * @return void
         */
    handleError (error) {
      // The error was a validation_error
      if (error.type === 'validation_error' && error.code) {
        var code = error.code

        // Card Number error has occured.
        if (~code.indexOf('number')) {
          this.cardErrors.number = error.message
        }

        // Expiry error has occured.
        if (~code.indexOf('expiry')) {
          this.cardErrors.date = error.message
        }

        // CVC error has occured.
        if (~code.indexOf('cvc')) {
          this.cardErrors.cvc = error.message
        }
      } else {
        // Another type of error occured.

      }
    },

    clearForm (destroy = false) {
      var method = 'clear'
      if (destroy) {
        method = 'destroy'
      }
      this.cardNumberElement[method](this.$refs.cardNumber)
      this.cardExpiryElement[method](this.$refs.cardExpiry)
      this.cardCvcElement[method](this.$refs.cardCvc)
    },

    createToken () {
      this.onFormSubmit()
      this.loading = true
      stripe.createToken(this.cardNumberElement, {
        name: this.model.cardholder_name
      }).then(this.setOutcome)
    }
  }

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
    .el-card.secure_payment_form {
        margin: 20px 0px;
    }
</style>
