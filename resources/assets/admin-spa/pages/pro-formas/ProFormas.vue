<template lang="html">
    <data-table type-name="pro-forma"
                base-url="orders"
                edit-path="pro-forma"
                bulk-update-url="orders/bulk"
                :with-params="{withStatus: ['STATUS_PROFORMA', 'STATUS_DRAFT', 'STATUS_CANCELLED', 'STATUS_AWAITING_PAYMENT', 'STATUS_PAYMENT_FAILED']}"
                request-with="content"
                :table-options="tableOptions"
                :request-includes="['created_at']"
                :create-form="{}">

        <template slot="createButton">
            <router-link :to="{ name: 'estimates.new'}">
                <el-button class="create_btn" type="primary" plain>New Pro-Forma</el-button>
            </router-link>
        </template>

        <template slot="actionButtons" slot-scope="props">

            <el-popover trigger="hover" placement="top">

                <router-link :to="{ path: props.editPathFormated + '/' + props.row.id }">
                    <el-button size="mini"
                               type="success"
                               class="action_btn view_btn">View
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
</template>

<script>
var forEach = require('lodash.foreach');

export default {

      name: 'ProFormas',

      components: {
          DataTable: () => import(/* webpackChunkName: "data-table" */'components/DataTable'),
      },

      props: {

      },

      data () {
          return {
              loading: false,
              errors: {},
              tableOptions: {
                  collumns: [
                      {
                          prop: 'ref_number',
                          sortable: true,
                          label: 'Ref',
                          align: 'left',
                          resizable: true
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
                          label: 'Created',
                          align: 'left',
                          resizable: true
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
                          resizable: true
                      },
                      // {
                      //     prop: 'invoice',
                      //     sortable: true,
                      //     label: 'Create Invoice',
                      //     formatter: function(row, column, cellValue) {
                      //         return <el-button on-click={() => this.createInvoice(row)} type="success" size="mini" class="action_btn" plain>Create Invoice</el-button>;
                      //     }.bind(this),
                      //     align: 'left',
                      //     resizable: true
                      // },
                  ],
              }
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('ProFormas.vue mounted!')
      },

      methods: {

      },

}
</script>

<style lang="css">
</style>
