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


            <el-tabs v-model="activePaymentTab">
                <el-tab-pane label="Card" name="card">
                    <card-payment-form :form="order" :loading="loading" ref="paymentForm" :on-token-creation="onTokenCreation"/>
                </el-tab-pane>

                <el-tab-pane label="BACS" name="bacs">


                    <el-row :gutter="20">
                        <el-col :md="{span:8, offset: 4}">
                            <el-form-item label="Amount" size="small" prop="payment_amount">
                                <el-input :autofocus="true" v-model="order.payment_amount" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8">
                            <el-form-item label="Reference" size="small" prop="payment_reference">
                                <el-input :autofocus="true" v-model="order.payment_reference" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-tab-pane>

                <el-tab-pane label="Other" name="other">

                    <el-row :gutter="20">
                        <el-col :md="{span:8, offset: 4}">
                            <el-form-item label="Payment Method" size="small" prop="payment_method">
                                <el-input :autofocus="true" v-model="order.payment_method" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :md="{span:8, offset: 4}">
                            <el-form-item label="Amount" size="small" prop="payment_amount">
                                <el-input :autofocus="true" v-model="order.payment_amount" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8">
                            <el-form-item label="Reference" size="small" prop="payment_reference">
                                <el-input :autofocus="true" v-model="order.payment_reference" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-tab-pane>
            </el-tabs>





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
              activePaymentTab: 'card'
          }
      },

      computed: {
          ...mapGetters([
            'order',
            'orderTotals',
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

          processSubmit(ref)
          {
              this.loading = true;

              this.$refs[ref].validate((valid) => {
                  if (valid && this.activePaymentTab === 'card') {
                      this.$refs.paymentForm.createToken();
                  } else if (this.activePaymentTab !== 'card') {


                    this.order.payment_method = this.order.payment_method ? this.order.payment_method : this.activePaymentTab;
                    api.persist("post", {
                          path: "orders/" + this.order.id + "/payment",
                          object: this.order
                      })
                      .then(function (data) {
                          this.loading = false;
                          this.$router.push({name: 'orders.view', params: { orderId: this.order.id.toString() }})
                          this.resetOrder();
                          // this.data = data.data;
                      }.bind(this))
                      .catch(function (error) {
                          this.loading = false;
                          // this.errors = error;
                      }.bind(this));



                  } else {
                      return false;
                      this.loading = false;
                  }
              });

          },

          onTokenCreation(has_error, token_object, error_object)
          {
              if (!has_error && this.order.id) {
                  this.order.payment_method = 'stripe';
                  api.persist("post", {
                        path: "orders/" + this.order.id + "/payment",
                        object: this.order
                    })
                    .then(function (data) {
                        this.loading = false;
                        this.$router.push({name: 'orders.view', params: { orderId: this.order.id.toString() }})
                        this.resetOrder();
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
