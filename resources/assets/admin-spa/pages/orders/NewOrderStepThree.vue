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

        <el-form label-position="top" ref="orderForm" :model="order" @submit.native.prevent>


            <el-row :gutter="20">
                <el-col :md="12">
                    <h5>Payment Information</h5>
                </el-col>
            </el-row>


            <card-payment-form :form="order" :loading="loading" ref="paymentForm" :on-token-creation="onTokenCreation"/>

            <el-row :gutter="20" style="margin-top: 40px;">
                <el-col :md="{span:24}">
                    <el-button @click="processSubmit('orderForm')" type="success" plain>Complete Payment</el-button>
                </el-col>
            </el-row>


        </el-form>

    </div>
</template>

<script>
import api from '../../services/api-service.js';
import { mapActions, mapGetters } from 'vuex';

export default {

      name: 'orderStepThree',

      components: {
          CardPaymentForm: () => import('../../components/CardPaymentForm.vue'),
          Errors: () => import('../../components/Errors.vue'),
      },

      props: {

      },

      data () {
          return {
              loading: false,
              orderErrors: {},
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
          if (!this.order.id) {
              this.$router.push({name: 'orders.step1'});
          }
      },

      methods: {

          processSubmit(ref)
          {
              this.$refs[ref].validate((valid) => {
                  if (valid) {
                      this.loading = true;
                      this.$refs.paymentForm.createToken();
                  } else {
                      return false;
                  }
              });

          },

          onTokenCreation(has_error, token_object, error_object)
          {
              if (!has_error && this.order.id) {
                  api.persist("post", {
                        path: "orders/" + this.order.id + "/payment",
                        object: this.order
                    })
                    .then(function (data) {
                        this.loading = false;
                        this.$router.push({name: 'orders.view', params: { orderId: this.order.id }})
                        // this.data = data.data;
                    }.bind(this))
                    .catch(function (error) {
                        this.loading = false;
                        // this.errors = error;
                    }.bind(this));
              }
          }

      }
}
</script>

<style lang="scss">

</style>
