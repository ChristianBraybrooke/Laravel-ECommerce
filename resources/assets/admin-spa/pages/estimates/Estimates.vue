<template lang="html">
    <data-table type-name="estimate"
                base-url="orders"
                edit-path="orders"
                bulk-update-url="orders/bulk"
                :with-params="{withStatus: 'estimate'}"
                request-with="content"
                :table-options="tableOptions"
                :request-includes="['created_at']"
                :create-form="{}">

    </data-table>
</template>

<script>
import api from 'services/api-service'
export default {

      name: 'Estimates',

      components: {
          DataTable: () => import(/* webpackChunkName: "data-table" */'components/DataTable'),
      },

      props: {

      },

      data () {
          return {
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
                          label: 'Created',
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
                              row.items.forEach((item) => {
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
                      {
                          prop: 'invoice',
                          sortable: true,
                          label: 'Create Invoice',
                          formatter: function(row, column, cellValue) {
                              return <el-button on-click={() => this.createInvoice(row)} type="success" size="mini" class="action_btn" plain>Create Invoice</el-button>;
                          }.bind(this),
                          align: 'left',
                          resizable: true
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
          console.log('Estimates.vue mounted.')
      },

      methods: {

          createInvoice(val)
          {
              val.status = 'Awaiting Payment';
              api.persist("put", {
                    path: "orders/" + val.id,
                    object: val
                })
                .then(data => {

                    this.$router.push({ name: 'orders.view', params: { orderId: val.id.toString() }})
                    // this.loading = false;
                    // this.data = data.data;
                })
                .catch(error => {
                    // this.loading = false;
                    // this.errors = error;
                });
          }

      },

}
</script>

<style lang="css">
</style>
