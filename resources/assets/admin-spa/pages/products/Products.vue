<template lang="html">
  <data-table
    :table-options="tableOptions"
    :request-includes="['live_at', 'created_at', 'price', 'can_customise', 'list_in_shop', 'featured', 'width', 'height', 'depth', 'sku']"
    :create-form="productsCreateForm"
    type-name="product"
    bulk-update-url="products/bulk"
    request-with="variant">

    <template
      slot="createForm"
      slot-scope="props">

      <el-form-item
        label="Product Name"
        prop="name">
        <el-input
          :autofocus="true"
          v-model="productsCreateForm.name"
          auto-complete="off"/>
      </el-form-item>

    </template>

  </data-table>
</template>

<script>
export default {

  components: {
    DataTable: () => import(/* webpackChunkName: "data-table" */'components/DataTable')
  },

  data () {
    return {
      productsCreateForm: {

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
        deleteText: 'Delete',
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
            label: 'Name',
            align: 'left',
            formatter: function (row, column, cellValue) {
              if (!row.variant) {
                return <strong>{row.name}</strong>
              } else {
                return <span><strong>{row.variant.name}</strong> / {row.name}</span>
              }
            },
            resizable: true
          },
          {
            prop: 'sku',
            sortable: true,
            label: 'SKU',
            align: 'left',
            resizable: true
          },
          {
            prop: 'width',
            sortable: false,
            label: 'Measurements',
            align: 'left',
            resizable: true,
            formatter: (row, collumn, cellValue) => {
              return `W:${row.width} * H:${row.height} * D:${row.depth}`
            }
          },
          {
            prop: 'price',
            sortable: true,
            label: 'Price',
            align: 'left',
            resizable: true,
            formatter: (row, collumn, cellValue) => {
              return this.formatPrice(cellValue, '£')
            }
          },
          {
            prop: 'can_customise',
            sortable: true,
            label: 'Customisable',
            align: 'left',
            resizable: true,
            formatter: (row, collumn, cellValue) => {
              if (cellValue) {
                return <i class="el-icon-check"></i>
              }
            }
          },
          {
            prop: 'list_in_shop',
            sortable: true,
            label: 'In Shop',
            align: 'left',
            resizable: true,
            formatter: (row, collumn, cellValue) => {
              if (cellValue) {
                return <i class="el-icon-check"></i>
              }
            }
          },
          {
            prop: 'featured',
            sortable: true,
            label: 'Featured',
            align: 'left',
            resizable: true,
            formatter: (row, collumn, cellValue) => {
              if (cellValue) {
                return <i class="el-icon-check"></i>
              }
            }
          },
          {
            prop: 'created_at.human',
            sortable: true,
            label: 'Created',
            align: 'left',
            resizable: true
          },
          {
            prop: 'live_at.live',
            sortable: true,
            label: 'Live',
            align: 'left',
            formatter: function (row, column, cellValue) {
              return row.live_at.live ? <i class="el-icon-check"></i> : <i class="el-icon-close"></i>
            },
            resizable: true
          }
        ],
        bulkOptions: [
          {
            value: 'delete',
            label: 'Delete'
          },
          {
            value: 'draft',
            label: 'Mark Draft'
          },
          {
            value: 'live',
            label: 'Mark Live'
          }
        ]
      }
    }
  },

  watch: {
    productsCreateForm: function (value) {
      this.$emit('input', this.internalValue)
    }
  },

  mounted () {
    console.log('Products.vue Mounted.')
  }

}
</script>

<style lang="css">
</style>
