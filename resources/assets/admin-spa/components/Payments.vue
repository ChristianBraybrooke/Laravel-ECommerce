<template lang="html">

    <div :loading="loading">
        <el-button type="success" plain style="margin-bottom: 20px;" @click="showModal = true">Add Payment</el-button>
        <payment-details v-for="payment in payments" :payment="payment" :key="payment.id"/>



        <el-dialog title="Add Payment"
                   :close-on-click-modal="false"
                   :before-close="closeAndClearModal"
                   :visible.sync="showModal">


                <payment-form :model="payment" :order="order"/>

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
      },

}
</script>

<style lang="css">
</style>
