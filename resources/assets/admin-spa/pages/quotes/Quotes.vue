<template lang="html">
  <data-table
    :with-params="{withStatus: 'quote'}"
    :table-options="tableOptions"
    :request-includes="['created_at']"
    :create-form="{}"
    type-name="quote"
    base-url="orders"
    edit-path="orders"
    bulk-update-url="orders/bulk"
    request-with="content"/>
</template>

<script>
export default {

  name: 'Quotes',

  components: {
    DataTable: () => import(/* webpackChunkName: "data-table" */'components/DataTable')
  },

  props: {

  },

  data () {
    return {
      tableOptions: {
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
            formatter: function (row, column, cellValue) {
              return row.customer.full_name
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
            formatter: function (row, column, cellValue) {
              var items = []
              row.items.forEach((item) => {
                items.push(<li>{item.quantity + ' * ' + item.name}</li>)
              })

              return <ul>{items}</ul>
            }
          },
          {
            prop: 'amount',
            sortable: true,
            label: 'Total',
            formatter: function (row, column, cellValue) {
              return row.cart.currency ? row.cart.currency + row.cart.totals.Total : '-'
            },
            align: 'left',
            resizable: true
          },
          {
            prop: 'status',
            sortable: true,
            label: 'Status',
            formatter: function (row, column, cellValue) {
              var type = row.status === 'Completed' ? 'success' : row.status === 'Processing' ? 'danger' : 'info'

              return <el-tag type={type} size="medium">{ row.status }</el-tag>
            },
            align: 'left',
            resizable: true
          }
        ]
      }
    }
  },

  computed: {

  },

  watch: {

  },

  mounted () {
    console.log('Qoutes.vue mounted.')
  },

  methods: {

  }

}
</script>

<style lang="css">
</style>
