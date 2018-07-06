<template lang="html">

    <div :loading="loading">

        <slot :showModal="displayModal">
            <el-button type="success" plain style="margin-bottom: 20px;" @click="showModal = true">Add Payment</el-button>
        </slot>

        <payment-details v-if="showPayments" :payments="payments"/>

        <el-dialog title="Add Payment"
                   v-if="showModal"
                   :close-on-click-modal="false"
                   :append-to-body="true"
                   :before-close="closeAndClearModal"
                   :visible.sync="showModal">


                <payment-form :starting-amount="formStartingAmount" :model="payment" :order="order" :on-payment-processed="clearModal"/>

        </el-dialog>


    </div>

</template>

<script>
export default {

      name: 'Payments',

      components: {
          PaymentDetails: () => import(/* webpackChunkName: "payment-details" */'components/PaymentDetails'),
          PaymentForm: () => import(/* webpackChunkName: "payment-form" */'components/PaymentForm'),
      },

      props: {
          payments: {
              type: Array,
              required: true,
          },
          order: {
              type: Object,
              required: true,
          },
          onPaymentProcessed: {
              type: Function,
              required: false,
              default () {
                  return function (payment) {};
              }
          },
          showPayments: {
              type: Boolean,
              required: false,
              default () {
                  return true
              }
          },
          formStartingAmount: {
              required: false,
              type: [String, Number],
              default () {
                  return null
              }
          }
      },

      data () {
          return {
              loading: false,
              showModal: false,
              payment: {}
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('Payments.vue mounted!')
      },

      methods: {
          closeAndClearModal()
          {
              this.$confirm('Are you sure to close the payment form?')
                .then(_ => {
                    this.showModal = false;
                })
                .catch(_ => {});
          },

          clearModal(payment)
          {
              this.onPaymentProcessed(payment);
              this.$emit('payment-processed', payment)
              this.order.payments.data.push(payment);
              this.showModal = false;
          },

          displayModal()
          {
              this.showModal = true;
          }
      },

}
</script>

<style lang="css">
</style>
