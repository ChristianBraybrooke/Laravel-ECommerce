<template lang="html">
    <div v-loading="loading">

        <iframe @load="print" v-if="!loading && printUrl" id="printLinkIframe" name="printLinkIframe" :src='printUrl' style="position:absolute;top:-9999px;left:-9999px;border:0px;overfow:none; z-index:-1"></iframe>

        <data-table type-name="order"
                    :full-modal="true"
                    request-with="content"
                    :table-options="tableOptions"
                    :create-form="ordersCreateForm"
                    v-on:createNew="handleCreateNew"
                    :create-form-rules="createFormRules">
          <template slot="createButton">
              <router-link :to="{ name: 'orders.step1'}">
                  <el-button class="create_btn" type="primary" plain>New Order</el-button>
              </router-link>
          </template>

          <template slot="actionButtons" slot-scope="props">
              <router-link :to="{ path: props.editPathFormated + '/' + props.row.id }" v-if="tableOptions.viewText">
                  <el-button
                    size="mini"
                    class="action_btn view_btn">{{ tableOptions.viewText }}
                  </el-button>
              </router-link>

              <a :href="'/ecommerce-templates/invoice-download?reports=' + props.row.id" target="_blank">
                  <el-button
                    size="mini"
                    type="success"
                    class="action_btn view_btn">Download PDF
                  </el-button>
              </a>
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
                          prop: 'created_at.date',
                          sortable: true,
                          label: 'Order Placed',
                          align: 'left',
                          resizable: true
                      },
                      {
                          prop: 'items',
                          sortable: true,
                          label: 'Order Summary',
                          align: 'left',
                          resizable: true,
                          formatter: function(row, column, cellValue) {
                              var items = [];
                              forEach(row.items, function (item) {
                                  items.push(<li>{item.quantity + ' * ' + item.name}</li>);
                              });

                              return <ul>{items}</ul>

                          },
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
