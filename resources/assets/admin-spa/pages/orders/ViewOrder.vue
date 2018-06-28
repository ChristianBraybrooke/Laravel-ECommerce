<template lang="html">
    <div v-loading="loading">

        <el-breadcrumb class="breadcrumbs" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'orders' }">Orders</el-breadcrumb-item>
            <el-breadcrumb-item v-if="order.invoice">{{ order.invoice.number }}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row align="middle">
            <el-col :sm="24" :lg="12">
                <h1 v-if="order.invoice" class="page_title">Order: {{ order.invoice.number }} <el-tag v-if="order.status" type="info" size="large">{{ order.status }}</el-tag></h1>
            </el-col>
            <el-col :sm="24" :lg="12">
                <el-button @click="preparePrint" size="small" style="float:right; margin-bottom:20px;" type="success" plain>Send Invoice</el-button>
                <el-button @click="preparePrint" size="small" style="float:right; margin-bottom:20px; margin-right:10px" type="success">Print Invoice</el-button>

                <iframe @load="printInvoice" v-if="!loading && printUrl" id="printLinkIframe" name="printLinkIframe" :src='printUrl' style="position:absolute;top:-9999px;left:-9999px;border:0px;overfow:none; z-index:-1"></iframe>
            </el-col>
        </el-row>

        <errors v-if="Object.keys(orderErrors).length > 0" :errors="orderErrors"></errors>

        <el-row :gutter="20">
            <el-col :span="24">
                <el-form v-if="orderStatuses" :model="order">
                    <el-select v-model="order.status" placeholder="Select">
                        <el-option
                          v-for="(status, key) in orderStatuses"
                          :key="key"
                          :label="status"
                          :value="key">
                        </el-option>
                    </el-select>

                    <el-form-item>
                      <el-button type="primary" size="small" :loading="loading" @click="updateOrder()">Save</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col>
                <content-component :content="formattedContent" :editable="false" :language-options="false" language="en" />
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-bottom: 30px;">
            <el-col :md="12">
                <div>
                    <el-radio-group v-model="order.needs_address" size="small">
                        <el-radio-button :label="true">Needs Address</el-radio-button>
                        <el-radio-button :label="false">No Address</el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20" v-if="order.needs_address">
            <el-col :md="24" :lg="12" style="margin-bottom: 50px;">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>Shipping Address <el-tag v-if="order.use_billing_for_shipping" size="mini">Using Billing</el-tag></span>
                    <el-button @click="edit_shipping = !edit_shipping" style="float: right; padding: 3px 0" type="text">{{ edit_shipping ? 'Cancel' : 'Edit'}}</el-button>
                  </div>

                  <div v-if="!edit_shipping" v-for="(line, key) in order.shipping_address" :key="key" class="text item">
                      <strong>{{ formatAddressLabel(key) }}:</strong> {{ line }}
                  </div>

                  <el-form v-if="edit_shipping" ref="editShippingForm" :model="order" label-width="120px" size="mini">
                      <el-form-item label="Use Billing Address" prop="use_billing_for_shipping">
                          <el-switch v-model="order.use_billing_for_shipping"
                                     active-color="#13ce66"
                                     inactive-color="#ff4949">
                          </el-switch>
                      </el-form-item>

                      <el-form-item :label="formatAddressLabel(key)" :key="key" :prop="order[key]" v-for="(line, key) in order.shipping_address">
                          <el-input :disabled="order.use_billing_for_shipping" v-model="order.shipping_address[key]" auto-complete="off" clearable></el-input>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" :loading="loading" @click="updateOrder()">Save</el-button>
                      </el-form-item>

                  </el-form>

                </el-card>
            </el-col>
            <el-col :md="24" :lg="12" style="margin-bottom: 50px;">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>Billing Address</span>
                    <el-button @click="edit_billing = !edit_billing"  style="float: right; padding: 3px 0" type="text">{{ edit_billing ? 'Cancel' : 'Edit'}}</el-button>
                  </div>

                  <div v-if="!edit_billing" v-for="(line, key) in order.billing_address" :key="key" class="text item">
                      <strong>{{ formatAddressLabel(key) }}:</strong> {{ line }}
                  </div>

                  <el-form v-if="edit_billing" ref="editShippingForm" :model="order.billing_address" label-width="120px" size="mini">
                      <el-form-item :label="formatAddressLabel(key)" :key="key" :prop="key" v-for="(line, key) in order.billing_address">
                          <el-input :autofocus="true" v-model="order.billing_address[key]" auto-complete="off" clearable></el-input>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" :loading="loading" @click="updateOrder()">Save</el-button>
                      </el-form-item>
                  </el-form>

                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-bottom: 50px;">
            <el-col :span="24">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>Customer Information</span>
                    <el-button style="float: right; padding: 3px 0" type="text">Edit</el-button>
                  </div>

                  <div class="text item" v-if="order.customer">
                      <strong>Name:</strong> {{ order.customer.full_name}}
                  </div>
                  <div class="text item" v-if="order.customer">
                      <strong>Email:</strong> {{ order.customer.email}}
                  </div>
                  <div class="text item" v-if="order.customer">
                      <strong>Phone:</strong> {{ order.customer.phone}}
                  </div>

                </el-card>
            </el-col>
        </el-row>

        <el-row v-if="order.items" :gutter="20" style="margin-bottom: 50px;">
            <el-col :span="24">
                <el-card class="box-card">

                    <product-table :editable="true" :order="order" :order-totals="orderTotals"/>


               </el-card>
            </el-col>
        </el-row>

        <el-row v-if="order.payments" :gutter="20">
            <el-col :span="24">
                <payments :payments="order.payments.data" :order="order" :on-payment-processed="onPaymentProcessed"/>
            </el-col>
        </el-row>

        <el-popover ref="deleteOrderPop"
                    placement="top"
                    width="160">
          <p>Delete Order?</p>
          <div style="text-align: right; margin: 0">
            <el-button type="primary" size="mini" @click="$refs.deleteOrderPop.doClose()" plain>cancel</el-button>
            <el-button type="danger" size="mini" @click="deleteOrder()">confirm</el-button>
          </div>
        </el-popover>

        <el-button style="margin-top: 40px;" size="small" plain v-popover:deleteOrderPop type="danger">Delete</el-button>



    </div>
</template>

<script>
import api from "services/api-service";
import { mapActions, mapGetters } from 'vuex';
var forEach = require('lodash.foreach');
var filter = require('lodash.filter');

export default {

      name: 'ViewOrder',

      components: {
          Errors: () => import(/* webpackChunkName: "errors" */'components/Errors'),
          ProductTable: () => import(/* webpackChunkName: "product-table" */'components/ProductTable'),
          Payments: () => import(/* webpackChunkName: "payments" */'components/Payments'),
          ContentComponent: () => import(/* webpackChunkName: "content-component" */'components/ContentComponent')
      },

      props: {
          orderId: {
              type: String,
              required: true,
          },
      },

      data () {
          return {
              orderErrors: {},
              loading: false,
              order: {
                  shipping_rate: 0
              },
              shopData: {},
              edit_billing: false,
              edit_shipping: false,
              shippingForm: {},
              invoiceLoaded: false,
              orderStatuses: {},
              printUrl: null,
              deliveryDateOptions: {
                shortcuts: [
                    {
                      text: 'Today',
                      onClick(picker) {
                        picker.$emit('pick', new Date());
                      }
                    }
                ]
              },
          }
      },

      computed: {
          orderAmount() {
              return this.shopData.currency + this.order.amount / 100;
          },

          formattedContent()
          {
              if (this.objectHas(this.order, 'content.data')) {
                  return filter(this.order.content.data, ['language', 'en']);
              }
              return [];
          },

          orderTotals() {
              var totals = [];
              forEach(this.order.cart.totals, function(value, key) {
                  totals.push({
                      'total': key,
                      'value': value
                  })
              }.bind(this));

              return totals;
          }
      },

      watch: {

      },

      mounted () {
          console.log('ViewOrders.vue mounted')
          this.getOrder();
      },

      methods: {

          ...mapActions([
              'setShopData',
          ]),

          formatAddressLabel(val)
          {
            return this.capitalize(val.replace(/_/g, " "));
          },

          /**
           * Get the order information from the server.
           *
           * @return void
           */
          getOrder()
          {
              this.orderErrors = {};
              this.loading = true;

              api.get({
                  path: 'orders/' + this.orderId,
                  params: {
                      with: ['content', 'payments'],
                      include: [ 'payment.reference', 'payment.method', 'payment.currency', 'payment.amount', 'payment.fee', 'payment.source' ]
                  }
              })
              .then(function (data) {
                  this.loading = false;
                  this.order = data.data;
                  this.orderStatuses = data.statuses;
                  this.shopData = data.shop_data;
                  this.setShopData(data.shop_data);
              }.bind(this))
              .catch(function (error) {
                  this.loading = false;
                  this.orderErrors = error;
              }.bind(this));
          },

          /**
           * Update the order.
           *
           * @return void
           */
          updateOrder()
          {
              this.orderErrors = {};
              this.loading = true;
              this.order.with = ['content', 'payments'];

              api.persist('put', {
                  path: 'orders/' + this.orderId,
                  object: this.order
              })
              .then(function (data) {
                  this.loading = false;
                  this.order = data.data;
                  this.shopData = data.shop_data;
                  this.orderStatuses = data.statuses;
                  this.setShopData(data.shop_data);
                  this.edit_billing = false;
                  this.edit_shipping = false;
              }.bind(this))
              .catch(function (error) {
                  this.loading = false;
                  this.orderErrors = error;
              }.bind(this));
          },

          /**
           * Delete the order.
           *
           * @return void
           */
          deleteOrder()
          {
              this.loading = true;
              api.delete({
                  path: 'orders/' + this.order.id,
              })
              .then(function () {
                  this.loading = false;

                  this.$message({
                    message: 'Successfully deleted order',
                    type: 'success',
                    showClose: true,
                  });

                  this.$router.push({ name: 'orders'});
              }.bind(this))
              .catch(function () {
                  this.loading = false;
              }.bind(this));
          },

          preparePrint()
          {
              this.printUrl = this.shopData.url + '/ecommerce-templates/invoice?reports=' + this.order.id;
          },

          printInvoice()
          {
              if(navigator.userAgent.match(/opera/i) || navigator.userAgent.match(/trident/i) || (navigator.userAgent.match(/msie/i) && window.addEventListener)) {
                  window.open(
                    this.printUrl,
                    '_blank'
                  );
      				} else {
                  frames['printLinkIframe'].focus();
                  frames['printLinkIframe'].print();
              }

              this.printUrl = null;
          },

          onPaymentProcessed(payment)
          {
              console.log(payment)
              this.order.payments.data.push(payment);
          }

      },

}
</script>

<style lang="css">
</style>
