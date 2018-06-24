<template lang="html">
    <div v-loading="loading">

        <iframe @load="print" v-if="!loading && printUrl" id="printLinkIframe" name="printLinkIframe" :src='printUrl' style="position:absolute;top:-9999px;left:-9999px;border:0px;overfow:none; z-index:-1"></iframe>

        <data-table type-name="order"
                    :full-modal="true"
                    request-with="content"
                    :with-params="{withOutStatuses: ['quote', 'estimate']}"
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

                <el-popover trigger="hover" placement="top">

                    <router-link :to="{ path: props.editPathFormated + '/' + props.row.id }" v-if="tableOptions.viewText">
                        <el-button size="mini"
                                   type="success"
                                   class="action_btn view_btn">{{ tableOptions.viewText }}
                        </el-button>
                    </router-link>

                    <a :href="'mailto:' + props.row.customer.email + '?subject=Order Ref ' + props.row.ref_number + '&body=Hello ' + props.row.customer.first_name + ','">
                        <el-button size="mini"
                                   plain
                                   class="action_btn view_btn">Email Customer
                        </el-button>
                    </a>

                    <a :href="'/ecommerce-templates/invoice-download?reports=' + props.row.id" target="_blank">
                        <el-button size="mini"
                                   plain
                                   class="action_btn view_btn">Download PDF
                        </el-button>
                    </a>

                    <el-button size="mini"
                               type="danger"
                               @click="props.delete(props.row)"
                               class="action_btn view_btn">Delete
                    </el-button>

                  <div slot="reference">
                      <el-button size="mini">Actions</el-button>
                  </div>
                </el-popover>

            </template>
        </data-table>
    </div>
</template>

<script>
var forEach = require('lodash.foreach');
import api from 'services/api-service';
import TableCollumn from 'components/TableCollumn';

export default {

      name: 'Orders',

      components: {
          DataTable: () => import(/* webpackChunkName: "data-table" */'components/DataTable'),
          TableCollumn,
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
                          prop: 'ref_number',
                          sortable: true,
                          label: 'Ref',
                          align: 'left',
                          resizable: false
                      },
                      {
                          prop: 'name',
                          sortable: true,
                          label: 'Customer',
                          formatter: function(row, column, cellValue) {
                              var lines = [];
                              var address = [];
                              forEach(row.shipping_address, (line, key) => {
                                  if(line) {
                                      address.push(line);
                                  }
                                  lines.push(<li>{line}</li>);
                              })
                              return <el-popover trigger="hover" placement="top">
                                         <ul class="order_address_list table_col_list">{lines}</ul>
                                         <el-button size="mini" plain on-click={() => this.copy(address.join(', '))}>Copy</el-button>
                                         <div slot="reference"><strong>{row.customer.first_name} {row.customer.last_name}</strong></div>
                                     </el-popover>
                              // return <div><ul class="order_address_list table_col_list">{lines}</ul><el-button size="mini" plain on-click={() => this.copy(address.join(', '))}>Copy</el-button></div>
                          }.bind(this),
                          align: 'left',
                          resizable: false
                      },
                      {
                          prop: 'created_at.date',
                          sortable: true,
                          label: 'Order Placed',
                          align: 'left',
                          resizable: false
                      },
                      {
                          prop: 'items',
                          sortable: true,
                          label: 'Summary',
                          align: 'left',
                          resizable: false,
                          formatter: function(row, column, cellValue) {
                              var items = [];
                              var total = [];
                              forEach(row.items, function (item) {
                                  var real_quantity = Array(item.quantity).fill().map((_, i) => i * i);
                                  real_quantity.forEach(() => {
                                      total.push(item.name)
                                  })
                                  items.push(<li>{item.quantity + ' * ' + item.name}</li>);
                              });

                              return <el-popover trigger="hover" placement="top">
                                         <ul class="order_items_list table_col_list">{items}</ul>
                                         <div slot="reference"><strong>{total.length} items</strong></div>
                                     </el-popover>
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
                          resizable: false
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
          console.log('Orders.vue mounted');

          if(this.objectHas(ecommerceConfig, 'aditional_cols.orders')) {
              forEach(ecommerceConfig.aditional_cols.orders, col => {
                  col.formatter = function(row) { return <table-collumn col={col} row={row}/> };
                  this.tableOptions.collumns.push(col);
              })
          }
          this.tableOptions.collumns.push(
              {
                  prop: 'status',
                  sortable: true,
                  label: 'Status',
                  formatter: function(row, column, cellValue) {
                      var type = row.status == 'Completed' ? 'success' : row.status == 'Processing' ? 'danger' : 'info';
                      var config = this.ecommerceConfig;

                      var options = [];
                      forEach(config.orders.statuses, (status, key) => {
                          options.push(<el-option label={status} value={status}></el-option>);
                      });

                      return <el-popover trigger="hover" placement="top">
                          <el-select on-change={() => this.apiAction(row)} v-model={row.status} size="mini" placeholder="Select">
                              {options}
                          </el-select>

                          <div slot="reference">
                              <el-tag type={type} size="medium">{ row.status }</el-tag>
                          </div>
                      </el-popover>
                  }.bind(this),
                  align: 'left',
                  resizable: false
              },
          )

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
          },

          apiAction(row)
          {
              api.persist('put', {
                    path: 'orders/' + row.id,
                    object: row
                })
                .then(function (data) {
                    this.$message({
                      message: "Status Updated!",
                      type: 'success',
                      showClose: true,
                    });
                }.bind(this))
                .catch(function (error) {
                    this.$message({
                      message: "Error updating status.",
                      type: 'error',
                      showClose: true,
                    });
                }.bind(this));
          }

      },

}
</script>

<style lang="css">
ul.order_address_list {
    list-style: none;
    -webkit-margin-before: 0;
    -webkit-padding-start: 0;
}
</style>
