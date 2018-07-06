<template lang="html">
    <div v-loading="loading">

        <iframe @load="print" v-if="!loading && printUrl" id="printLinkIframe" name="printLinkIframe" :src='printUrl' style="position:absolute;top:-9999px;left:-9999px;border:0px;overfow:none; z-index:-1"></iframe>

        <data-table type-name="order"
                    :full-modal="true"
                    :request-with="['content', 'payments']"
                    :request-includes="['payment.amount', 'payment.method', 'payment.refunded']"
                    :with-params="{withOutStatuses: ['STATUS_ESTIMATE', 'STATUS_DRAFT', 'STATUS_PROFORMA', 'STATUS_PAYMENT_FAILED', 'STATUS_CANCELLED']}"
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

                    <a :href="'mailto:' + props.row.customer.email + '?subject=Order Ref ' + props.row.ref_number + '&body=Hello ' + props.row.customer.first_name + ',%0A%0A'">
                        <el-button size="mini"
                                   plain
                                   class="action_btn view_btn">Email Customer
                        </el-button>
                    </a>

                    <a :href="mailToCourier(props.row)">
                        <el-button size="mini"
                                   plain
                                   class="action_btn view_btn">Email Courier
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
var forEach = require('lodash.foreach')
var findIndex = require('lodash.findindex')
import api from 'services/api-service'
import TableCollumn from 'components/TableCollumn'
import Payments from 'components/Payments'
import order_util from 'utils/order'

export default {

      name: 'Orders',

      components: {
          DataTable: () => import(/* webpackChunkName: "data-table" */'components/DataTable'),
          Payments: Payments,
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
                          width: '130px',
                          sortable: true,
                          label: 'Ref',
                          align: 'left',
                          resizable: false,
                          formatter: function(row, column, cellValue) {
                              var btn = null;

                              if (row.status === 'Processing') {
                                  btn = <el-button class="order_dispatch_btn" type="success" size="mini" on-click={() => this.dispatchOrder(row, 'Completed')}>Dispatch</el-button>
                              } else if (row.status === 'Completed') {
                                  btn = <el-button class="order_dispatch_btn" type="danger" size="mini" on-click={() => this.dispatchOrder(row, 'Processing')}>Reverse Dispatch</el-button>
                              }
                              return <div class="order_dispatch"><span class={btn ? 'order_dispatch_text' : ''}>{row.ref_number}</span>{btn}</div>
                          }.bind(this)
                      },
                      {
                          prop: 'name',
                          sortable: true,
                          label: 'Customer',
                          width: '150px',
                          formatter: function(row, column, cellValue) {
                              var lines = [];
                              var address = [];
                              forEach(row.shipping_address, (line, key) => {
                                  if(line) {
                                      address.push(line);
                                  }
                                  lines.push(<li>{line}</li>);
                              })
                              lines.push(<li on-click={() => this.copy(row.customer.email)} style="margin-top: 10px; cursor: copy;"><strong>{row.customer.email}</strong></li>)
                              lines.push(<li on-click={() => this.copy(row.customer.phone)} style="cursor: copy;"><strong>{row.customer.phone}</strong></li>)
                              return <el-popover trigger="hover" placement="top">
                                         <ul class="order_address_list table_col_list">{lines}</ul>
                                         <el-button size="mini" plain on-click={() => this.copy(address.join(', '))}>Copy Address</el-button>
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
                          width: '120px',
                          align: 'left',
                          resizable: false
                      },
                      {
                          prop: 'items',
                          sortable: true,
                          label: 'Products',
                          width: '100px',
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
                          width: '90px',
                          formatter: function(row, column, cellValue) {
                              return row.cart.currency ? row.cart.currency + row.cart.totals.Total : '-';
                          },
                          align: 'left',
                          resizable: false
                      },
                      {
                          prop: 'payment_amount',
                          sortable: true,
                          label: 'Payment',
                          width: '100px',
                          formatter: (row) => {
                              var payments = [];
                              row.payments.data.forEach((payment) => {
                                  if (!payment.refunded) {
                                      payments.push(<li>{this.formatPrice(payment.amount, row.cart.currency)} by <strong>{payment.method}</strong></li>)
                                  }
                              });
                              var payment_info = payments.length > 0 ? <ul class="order_items_list table_col_list">{payments}</ul> : <span>No Payment Information</span>;
                              return <el-popover trigger="hover" placement="top">
                                         {payment_info}
                                         <payments payments={row.payments.data}
                                                   order={row}
                                                   show-payments={false}
                                                   form-starting-amount={row.cart.totals.Total - row.payment_amount}
                                                   on-payment-processed={(payment) => this.paymentAdded(row, payment)}>
                                            {
                                                (props) => <el-button on-click={() => props.showModal()}
                                                                      type="success" size="mini"
                                                                      plain>Make Payment</el-button>
                                            }
                                         </payments>
                                         <div slot="reference"><strong>{this.formatPrice(order_util.paymentTotal(row.payments.data), row.cart.currency)}</strong></div>
                                     </el-popover>
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
                  var col_index = findIndex(this.tableOptions.collumns, ['prop', col.prop]);
                  col.formatter = function(row) { return <table-collumn col={col} row={row}/> };
                  if (col_index === -1) {
                      this.tableOptions.collumns.push(col);
                  } else {
                      this.tableOptions.collumns[col_index] = col;
                  }
              })
          }
          this.tableOptions.collumns.push(
              {
                  prop: 'status',
                  sortable: true,
                  label: 'Status',
                  width: '120px',
                  formatter: function(row, column, cellValue) {
                      var type = row.status == order_util.getStatusNameFromCode('STATUS_COMPLETED') ? 'success' : row.status == order_util.getStatusNameFromCode('STATUS_PROCESSING') ? 'danger' : 'info';
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

          processPayment(payment)
          {
              console.log(payment)
          },

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
          },

          dispatchOrder(row, status = 'Completed')
          {
              row.status = status;
              this.apiAction(row);
          },

          mailToCourier(row)
          {
              var delivery_details = []

              forEach(row.shipping_address, (line, key) => {
                  if(line) {
                      delivery_details.push(line);
                  }
              });

              return 'mailto:?subject=Order Ref '+ row.ref_number +'&body=Hello,%0A%0A The delivery details are as follows: %0A%0A' + delivery_details.join('%0A')
          },

          paymentAdded(row, payment)
          {
              var payments = this.simplePrice(order_util.paymentTotal(row.payments.data)) + this.simplePrice(payment.amount);
              var status_is_awaiting_payment = row.status === order_util.getStatusNameFromCode('STATUS_AWAITING_PAYMENT');
              var payments_are_more_than_total = payments >= this.simplePrice(row.cart.totals.Total);

              if (status_is_awaiting_payment && payments_are_more_than_total) {
                  row.status = order_util.getStatusNameFromCode('STATUS_PROCESSING');

                  this.loading = true;
                  api.persist('put', {
                        path: 'orders/' + row.id,
                        object: row
                    })
                    .then((data) => {
                        this.$message({
                          message: "Order Updated!",
                          type: 'success',
                          showClose: true,
                        });
                        this.loading = false;
                    })
                    .catch((error) => {
                        this.loading = false;
                    });

                }
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
.order_dispatch .order_dispatch_btn {
    display: none;
}
.order_dispatch:hover .order_dispatch_btn {
    display: initial;
}
.order_dispatch:hover .order_dispatch_text {
    display: none;
}
</style>
