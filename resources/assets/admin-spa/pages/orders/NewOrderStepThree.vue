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


        <ul>
          <li v-for="(total, key) in orderTotals" :key="key"><strong>{{ total.total }}</strong> {{ shopData.currency }}{{ total.value }}</li>
        </ul>

        <el-form label-position="top" ref="orderForm" :model="order" @submit.native.prevent>


            <el-row :gutter="20">
                <el-col :md="12">
                    <h5>Payment Information</h5>
                </el-col>
            </el-row>

            <payment-form :order="order" :show-none-option="true" :starting-amount="orderTotal" :on-payment-processed="onPaymentProcessed"/>



        </el-form>

    </div>
</template>

<script>
import api from 'services/api-service';
import { mapActions, mapGetters } from 'vuex';

export default {

      name: 'orderStepThree',

      components: {
          PaymentForm: () => import(/* webpackChunkName: "payment-form" */'components/PaymentForm'),
          Errors: () => import(/* webpackChunkName: "errors" */'components/Errors'),
      },

      props: {

      },

      data () {
          return {
              loading: false,
              orderErrors: {},
              activePaymentTab: 'card'
          }
      },

      computed: {
          ...mapGetters([
            'order',
            'orderTotals',
            'orderTotal',
            'shopData'
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
          if (!this.order.id) {
              this.$router.push({name: 'orders.step1'});
          }
      },

      methods: {

          ...mapActions([
              'resetOrder'
          ]),

          onPaymentProcessed(payment)
          {
              this.$router.push({name: 'orders.view', params: { orderId: this.order.id.toString() }})
              this.resetOrder();
          },

      }
}
</script>

<style lang="scss">

</style>
