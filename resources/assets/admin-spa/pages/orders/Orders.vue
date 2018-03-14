<template lang="html">
    <div v-loading="loading">

        <iframe @load="print" v-if="!loading && printUrl" id="printLinkIframe" name="printLinkIframe" :src='printUrl' style="position:absolute;top:-9999px;left:-9999px;border:0px;overfow:none; z-index:-1"></iframe>

        <data-table type-name="order"
                    :full-modal="true"
                    :table-options="tableOptions"
                    :create-form="ordersCreateForm"
                    v-on:createNew="handleCreateNew"
                    :create-form-rules="createFormRules">

          <template slot="createForm"
                    slot-scope="props">

                    <el-row :gutter="20">
                        <el-col :md="12">
                            <el-form-item label="Customer First Name" prop="first_name">
                              <el-input :autofocus="true" v-model="ordersCreateForm.first_name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="12">
                            <el-form-item label="Customer Last Name" prop="last_name">
                              <el-input :autofocus="true" v-model="ordersCreateForm.last_name" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :md="12">
                            <el-form-item label="Customer Email" prop="email">
                              <el-input :autofocus="true" v-model="ordersCreateForm.email" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :md="12">
                            <el-form-item label="Customer Phone" prop="phone">
                              <el-input :autofocus="true" v-model="ordersCreateForm.phone" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20" style="margin-top:50px;">

                        <el-col :md="12">
                            <el-form-item label="Billing Address Line 1" prop="billing_address_line1">
                              <el-input :autofocus="true" v-model="ordersCreateForm.billing_address_line1" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :md="12">
                            <el-form-item label="Billing Address Line 2" prop="billing_address_line2">
                              <el-input :autofocus="true" v-model="ordersCreateForm.billing_address_line2" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :md="12">
                            <el-form-item label="Billing Address Town" prop="billing_address_town">
                              <el-input :autofocus="true" v-model="ordersCreateForm.billing_address_town" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :md="12">
                            <el-form-item label="Billing Address County" prop="billing_address_county">
                              <el-input :autofocus="true" v-model="ordersCreateForm.billing_address_county" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :md="12">
                            <el-form-item label="Billing Address Postcode" prop="billing_address_postcode">
                              <el-input :autofocus="true" v-model="ordersCreateForm.billing_address_postcode" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :md="12">
                            <el-form-item label="Billing Address Country" prop="billing_address_country">
                              <el-input :autofocus="true" v-model="ordersCreateForm.billing_address_country" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>

                    <el-row :gutter="20" style="margin-top:50px;">
                        <el-col :md="24">
                            <el-form-item label="Shipping Address Same As Billing" prop="same_shipping_address">
                                <el-switch v-model="ordersCreateForm.same_shipping_address"
                                           active-color="#13ce66"
                                           inactive-color="#ff4949">
                                </el-switch>
                            </el-form-item>
                        </el-col>

                        <el-col v-if="!ordersCreateForm.same_shipping_address" :md="12">
                            <el-form-item label="Shipping Address Line 1" prop="shipping_address_line1">
                              <el-input :autofocus="true" v-model="ordersCreateForm.shipping_address_line1" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col v-if="!ordersCreateForm.same_shipping_address" :md="12">
                            <el-form-item label="Shipping Address Line 2" prop="shipping_address_line2">
                              <el-input :autofocus="true" v-model="ordersCreateForm.shipping_address_line2" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col v-if="!ordersCreateForm.same_shipping_address" :md="12">
                            <el-form-item label="Shipping Address Town" prop="shipping_address_town">
                              <el-input :autofocus="true" v-model="ordersCreateForm.shipping_address_town" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col v-if="!ordersCreateForm.same_shipping_address" :md="12">
                            <el-form-item label="Shipping Address County" prop="shipping_address_county">
                              <el-input :autofocus="true" v-model="ordersCreateForm.shipping_address_county" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col v-if="!ordersCreateForm.same_shipping_address" :md="12">
                            <el-form-item label="Shipping Address Postcode" prop="shipping_address_postcode">
                              <el-input :autofocus="true" v-model="ordersCreateForm.shipping_address_postcode" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col v-if="!ordersCreateForm.same_shipping_address" :md="12">
                            <el-form-item label="Shipping Address Country" prop="shipping_address_country">
                              <el-input :autofocus="true" v-model="ordersCreateForm.shipping_address_country" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>

                    <el-row :gutter="20" style="margin-top:50px;">
                        <el-col :md="12">
                            <el-form-item v-if="products" label="Products" prop="products">
                                <el-select style="width:100%;" class="collection_type_select" v-model="ordersCreateForm.products" filterable multiple allow-create placeholder="Select">
                                    <el-option v-for="product in products"
                                               :key="product.id"
                                               :label="product.name"
                                               :value="product.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

          </template>

        </data-table>
    </div>
</template>

<script>
var forEach = require('lodash.foreach');
import api from '../../services/api-service.js';

export default {

      name: 'Orders',

      components: {
          DataTable: () => import('../../components/DataTable.vue')
      },

      props: [

      ],

      data () {
          return {
              loading: false,
              products: {},
              invoiceLoaded: false,
              printUrl: null,
              ordersCreateForm: {},
              createFormRules: {
                  customer_first_name: [
                    { required: true, message: 'The first name is required', trigger: 'blur' },
                    { min: 3, max: 200, message: 'The first name length should be more than 3 characters', trigger: 'blur' }
                  ],
                  customer_last_name: [
                    { required: true, message: 'The last name is required', trigger: 'blur' },
                    { min: 3, max: 200, message: 'The last name length should be more than 3 characters', trigger: 'blur' }
                  ],
                  customer_email: [
                    { required: true, message: 'The email is required', trigger: 'blur' },
                    { min: 3, max: 200, message: 'The email length should be more than 3 characters', trigger: 'blur' }
                  ],
              },
              tableOptions: {
                  border: true,
                  stripe: true,
                  showSearch: true,
                  showHeader: true,
                  showNewBtn: true,
                  showRefreshBtn: true,
                  showHeadHr: true,
                  showTitle: true,
                  viewText: 'View',
                  deleteText: '',
                  collumns: [
                      {
                          prop: 'id',
                          sortable: true,
                          label: 'ID',
                          align: 'left',
                          resizable: true
                      },
                      {
                          prop: 'name',
                          sortable: true,
                          label: 'Customer Name',
                          formatter: function(row, column, cellValue) {
                              return row.customer.full_name;
                          },
                          align: 'left',
                          resizable: true
                      },
                      {
                          prop: 'amount',
                          sortable: true,
                          label: 'Total',
                          formatter: function(row, column, cellValue) {
                              return row.cart.currency ? row.cart.currency + row.cart.totals.Total : '-';
                          },
                          align: 'left',
                          resizable: true
                      },
                      {
                          prop: 'created_at.human',
                          sortable: true,
                          label: 'Order Placed',
                          align: 'left',
                          resizable: true
                      },
                      {
                          prop: 'status',
                          sortable: true,
                          label: 'Status',
                          formatter: function(row, column, cellValue) {
                              var type = row.status == 'Completed' ? 'success' : row.status == 'Processing' ? 'danger' : 'info';

                              return <el-tag type={type} size="medium">{ row.status }</el-tag>;
                          },
                          align: 'left',
                          resizable: true
                      },
                  ],
                  bulkOptions: [
                      {
                        value: 'completed',
                        label: 'Mark Complete',
                      },
                      {
                        value: 'print',
                        label: 'Print Invoice(s)',
                        action: function(data, shopData, bulkSelected) {
                            var ids = [];
                            forEach(bulkSelected, function(value, key) {
                                var sep = key === 0 ? '?' : '&';
                                ids.push(sep + 'reports[' + key + ']=' + value.id);
                            }.bind(this));

                            var url = shopData.url + '/ecommerce-templates/invoice' + ids.join('');

                            this.printUrl = url;
                        }.bind(this)
                      },
                  ],
              }
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('Orders.vue mounted')
      },

      methods: {

          /**
           * Open the print dialog.
           *
           * @return void
           */
          print()
          {
              frames['printLinkIframe'].focus();
              frames['printLinkIframe'].print();

              this.printUrl = null;
          },

          handleCreateNew(data)
          {
              this.loading = true;

              api.get({
                path: 'products',
                params: {
                  limit:'1000',
                }
              })
              .then(function (data) {
                  this.products = data.data;
                  this.loading = false;
              }.bind(this))
              .catch(function (errors) {
                  this.loading = false;
              }.bind(this));
          }

      },

}
</script>

<style lang="css">
</style>
