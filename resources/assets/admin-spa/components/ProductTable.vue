<template lang="html">
  <div v-loading="loading">

    <el-table
      :data="order.products"
      style="width: 100%">
      <el-table-column
        v-for="(collumn, key) in collumns"
        :key="key"
        :min-width="collumn.minWidth"
        :prop="collumn.prop"
        :label="collumn.label"
        :formatter="collumn.formatter ? collumn.formatter : null"/>
    </el-table>

    <el-table
      v-show="orderTotals.length > 0"
      :data="orderTotals"
      style="width: 100%">
      <el-table-column
        v-for="(col, key) in totalSpan"
        :key="key"/>
      <el-table-column
        prop="total"
        label=""/>
      <el-table-column
        :formatter="totalValueFormatter"
        prop="value"
        label=""/>
      <el-table-column v-if="editable"/>
    </el-table>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductForm from 'components/ProductForm'
import NewProductForm from 'components/NewProductForm'
import orderUtil from 'utils/order'

import range from 'lodash.range'
import forEach from 'lodash.foreach'
import groupBy from 'lodash.groupby'

export default {

  name: 'ProductTable',

  components: {
    Errors: () => import(/* webpackChunkName: "errors" */'components/Errors'),
    ProductForm: ProductForm,
    NewProductForm: NewProductForm
  },

  props: {
    editable: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    order: {
      type: Object,
      required: true
    },
    orderTotals: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    setCollumns: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    setOptions: {
      type: Object,
      required: false,
      default () {
        return this.defaultOptions
      }
    },
    onProductUpdate: {
      type: Function,
      required: false,
      default: () => {}
    }
  },

  data () {
    return {
      loading: false,
      mergedOptions: {},
      options: {},
      collumns: [],
      discount_rate: 0,
      shipping_rate: 0
    }
  },

  computed: {
    ...mapGetters([
      'shopData'
    ]),

    totals () {
      return this.order.totals(this.order.products)
    },

    totalSpan () {
      var numberOfCollumns = this.collumns ? this.collumns.length : 0
      numberOfCollumns = (numberOfCollumns > 2) ? (numberOfCollumns - (this.editable ? 3 : 2)) : 0
      return [...Array(parseInt(numberOfCollumns)).keys()]
    },

    defaultCollumns () {
      var cols = [
        {
          prop: 'name',
          label: 'Product',
          minWidth: 500,
          formatter: function (row, column, cellValue) { return this.itemRowNameFormatter(row, column, cellValue) }.bind(this)
        },
        {
          prop: 'price',
          label: 'Price',
          formatter: function (row, column, cellValue) { return this.formatPrice(row.totals.unit_price, this.shopData.currency) }.bind(this)
        },
        {
          prop: 'quantity',
          label: 'Quantity',
          formatter: function (row, column, cellValue) { return row.quantity ? row.quantity : 1 }
        },
        {
          prop: 'subtotal',
          label: 'Sub-Total',
          formatter: function (row, column, cellValue) { return this.formatPrice(orderUtil.productSubTotal(row), this.shopData.currency) }.bind(this)
        },
        {
          prop: 'extras',
          label: 'Extras',
          formatter: function (row, column, cellValue) { return this.formatPrice(orderUtil.productExtras(row), this.shopData.currency) }.bind(this)
        },
        {
          prop: 'total',
          label: 'Total',
          formatter: function (row, column, cellValue) { return this.formatPrice(orderUtil.productTotal(row), this.shopData.currency) }.bind(this)
        }
      ]

      if (this.editable) {
        cols.push(
          {
            prop: 'actions',
            label: 'Actions',
            minWidth: 250,
            formatter: function (row, column, cellValue) { return this.itemRowActionsFormatter(row, column, cellValue) }.bind(this)
          }
        )
      }

      return cols
    },

    defaultOptions () {
      return {}
    }
  },

  mounted () {
    if (this.setCollumns.length === 0) {
      this.collumns = this.defaultCollumns
    } else {
      this.collumns = this.setCollumns
    }

    if (!this.setOptions) {
      this.options = this.defaultOptions
    } else {
      this.options = this.setOptions
    }

    Object.assign(this.mergedOptions, this.defaultOptions, this.options)
  },

  methods: {
    itemRowNameFormatter (row, column, cellValue) {
      var rowName = null
      if (this.objectHas(row, 'product.variant.name')) {
        rowName = <p><strong>{(row.product.variant.name + ' / ')}</strong>{row.product.name}</p>
      } else {
        rowName = <p><strong>{row.product.name}</strong></p>
      }

      if (row.customisation_data) {
        var items = []
        var formattedCustomisationData = groupBy(row.customisation_data, 'group')
        forEach(formattedCustomisationData, (group, groupName) => {
          var groupData = []
          forEach(group, (value, key) => {
            if (this.objectHas(value, 'value')) {
              if (value.value) {
                groupData.push(<div>{value.label}: <el-tag class="order_item_option" size="mini" type="info">{value.prepends}{value.value}{value.appends}</el-tag></div>)
              }
            }
          })
          if (groupData.length !== 0) {
            items.push(<li><span class="order_item_options_title">{groupName}</span><span class="order_item_options_content"> {groupData}</span></li>)
          }
        })

        return <div>{rowName} <ul class="order_item_options">{items}</ul></div>
      }
      return <div>{rowName}</div>
    },

    loopOverItemOptions (options) {
      var newValue = []
      forEach(options, (value, key) => {
        if (value) {
          newValue.push(<li>{key}: {value}</li>)
        }
      })
      return <ul>{newValue}</ul>
    },

    itemRowActionsFormatter (row, column, cellValue) {
      return <span>
        <new-product-form edit-form={true} table-index={this.order.products.indexOf(row)} product={row} button={{ icon: 'el-icon-edit', text: '', size: 'mini' }} on-product-update={this.handleProductUpdate}></new-product-form>
        <el-button size="mini" type="danger" icon="el-icon-delete" on-click={ () => this.deleteRow(row) }></el-button>
      </span>
    },

    handleProductUpdate (obj) {
      this.onProductUpdate(obj)
    },

    shippingRowFormatter (value) {
      var options = []
      forEach(range(0, 510, 10), function (range) {
        options.push(<el-option key={range} value={range} label={this.formatPrice(range, this.shopData.currency)}></el-option>)
      }.bind(this))

      return this.editable ? <el-select v-model={this.order.totals.shipping} size="mini" style="max-width: 100px;">{options}</el-select> : this.formatPrice(this.order.totals.Shipping, this.shopData.currency)
    },

    discountRowFormatter (value) {
      var options = []
      forEach(range(0, 101), function (range) {
        options.push(<el-option key={range} value={range} label={range + '%'}></el-option>)
      })

      return this.editable ? <el-select v-model={this.order.totals.discount} size="mini" style="max-width: 100px;">{options}</el-select> : `${this.order.totals.discount}%`
    },

    deleteRow (row) {
      this.order.products.splice(this.order.products.indexOf(row), 1)
    },

    totalValueFormatter (row, col, value) {
      var formatter = null
      switch (row.total) {
        case 'Shipping':
          formatter = this.shippingRowFormatter(value)
          break
        case 'Discount':
          formatter = this.discountRowFormatter(value)
          break
        default:
          formatter = this.formatPrice(value, this.shopData.currency)
      }
      return formatter
    }
  }
}
</script>

<style lang="css">
  .order_item_option {
      margin-right: 5px;
  }
  span.order_item_options_content {
      display: block;
  }
  ul.order_item_options {
      list-style: none;
  }
  span.order_item_options_title {
      font-weight: bold;
  }
  ul.order_item_options li {
      padding: 10px 0px;
  }
</style>
