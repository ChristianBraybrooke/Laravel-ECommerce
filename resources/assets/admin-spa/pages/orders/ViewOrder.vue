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
                <el-button @click="preparePrint" style="float:right; margin-bottom:20px" type="success" plain>Print Invoice</el-button>

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
            <el-col :md="24" :lg="12" style="margin-bottom: 50px;">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>Shipping Address <el-tag v-if="order.use_billing_for_shipping" size="mini">Using Billing</el-tag></span>
                    <el-button @click="edit_shipping = !edit_shipping" style="float: right; padding: 3px 0" type="text">{{ edit_shipping ? 'Cancel' : 'Edit'}}</el-button>
                  </div>

                  <div v-if="!edit_shipping" v-for="(line, key) in order.shipping_address" :key="line" class="text item">
                      <strong>{{ key }}:</strong> {{ line }}
                  </div>

                  <el-form v-if="edit_shipping" ref="editShippingForm" :model="order" label-width="120px" size="mini">
                      <el-form-item label="Use Billing Address" prop="use_billing_for_shipping">
                          <el-switch v-model="order.use_billing_for_shipping"
                                     active-color="#13ce66"
                                     inactive-color="#ff4949">
                          </el-switch>
                      </el-form-item>

                      <el-form-item :label="key" :key="line" :prop="order[key]" v-for="(line, key) in order.shipping_address">
                          <el-input :disabled="order.use_billing_for_shipping" :autofocus="true" v-model="order.shipping_address[key]"></el-input>
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

                  <div v-if="!edit_billing" v-for="(line, key) in order.billing_address" :key="line" class="text item">
                      <strong>{{ key }}:</strong> {{ line }}
                  </div>

                  <el-form v-if="edit_billing" ref="editShippingForm" :model="order.billing_address" label-width="120px" size="mini">
                      <el-form-item :label="key" :key="line" :prop="key" v-for="(line, key) in order.billing_address">
                          <el-input :autofocus="true" v-model="order.billing_address[key]"></el-input>
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

        <el-row v-if="order.items" :gutter="20">
            <el-col :span="24">
                <el-card class="box-card">
                    <el-table :data="order.items"
                              style="width: 100%">
                        <el-table-column prop="name"
                                         label="Product">
                        </el-table-column>
                        <el-table-column prop="price"
                                         :formatter="function(row, column, cellValue) { return order.cart.currency + row.price }"
                                         label="Price">
                        </el-table-column>
                        <el-table-column prop="qty"
                                         label="Quantity">
                        </el-table-column>
                        <el-table-column prop="subtotal"
                                         :formatter="function(row, column, cellValue) { return order.cart.currency + row.subtotal }"
                                         label="Total">
                        </el-table-column>
                    </el-table>

                    <el-table :data="orderTotals"
                              style="width: 100%">
                        <el-table-column>
                        </el-table-column>
                        <el-table-column>
                        </el-table-column>
                        <el-table-column prop="total"
                                         label="">
                        </el-table-column>
                        <el-table-column prop="value"
                                        label="">
                        </el-table-column>
                    </el-table>

               </el-card>
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
import api from "../../services/api-service.js";
import { mapActions, mapGetters } from 'vuex';
var forEach = require('lodash.foreach');

export default {

      name: 'ViewOrder',

      components: {
          Errors: () => import('../../components/Errors.vue'),
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
              order: {},
              shopData: {},
              edit_billing: false,
              edit_shipping: false,
              shippingForm: {},
              invoiceLoaded: false,
              orderStatuses: {},
              printUrl: null,
          }
      },

      computed: {
          orderAmount() {
              return this.shopData.currency + this.order.amount / 100;
          },

          orderTotals() {
              var totals = [];
              forEach(this.order.cart.totals, function(value, key) {
                  totals.push({
                      'total': key,
                      'value': this.order.cart.currency + value
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
              this.printUrl = this.shopData.url + '/templates/invoice?reports=' + this.order.id;
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
          }

      },

}
</script>

<style lang="css">
</style>
