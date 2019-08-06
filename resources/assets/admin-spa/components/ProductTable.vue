<template lang="html">
  <div v-loading="loading">

    <el-table
      :data="order.items"
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

var range = require('lodash.range')
var forEach = require('lodash.foreach')

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
      return this.order.totals(this.order.items)
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
          minWidth: 350,
          formatter: function (row, column, cellValue) { return this.itemRowNameFormatter(row, column, cellValue) }.bind(this)
        },
        {
          prop: 'price',
          label: 'Price',
          formatter: function (row, column, cellValue) { return this.formatPrice(row.price, this.shopData.currency) }.bind(this)
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
            minWidth: 200,
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
    console.log('ProductTable.vue Mounted')

    // this.shipping_rate = this.order.cart.totals.Shipping;
    // this.discount_rate = this.order.discount_rate;

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
      if (this.objectHas(row, 'variant.name')) {
        rowName = <p><strong>{(row.variant.name + ' / ')}</strong>{row.name}</p>
      } else {
        rowName = <p><strong>{row.name}</strong></p>
      }

      if (row.options) {
        var items = []
        forEach(row.options, (value, key) => {
          var newValue = value

          if (newValue) {
            if (value.value && typeof value.value === 'object') {
              newValue = this.loopOverItemOptions(value.value)
            } else if (typeof value === 'object' && value.value && value.name) {
              newValue = value.value
            } else if (value && typeof value === 'object') {
              newValue = this.loopOverItemOptions(value)
            } else {
              newValue = value.name ? value.name : value
            }
          }

          var extra = ''
          if (value) {
            var priceMutator = value.priceMutator ? value.priceMutator : ''
            var priceValue = value.priceValue ? this.formatPrice(value.priceValue, this.shopData.currency) : ''
            if (priceMutator && priceValue) {
              extra = <span style="font-size: 11px;">({priceMutator} {priceValue})</span>
            }
          }
          if (newValue) {
            items.push(<tr><td class="key">{key}:</td><td class="value"><el-tag color="white" size="medium">{newValue} {extra}</el-tag></td></tr>)
          }
        })

        return <div>{rowName} <table class="order_item_options">{items}</table></div>
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
        <new-product-form edit-form={true} table-index={this.order.items.indexOf(row)} product={row} button={{ text: 'Edit Product', size: 'mini' }} on-product-update={this.handleProductUpdate}></new-product-form>
        <el-button size="mini" type="danger" on-click={ () => this.deleteRow(row) }>Delete</el-button>
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

      return this.editable ? <el-select v-model={this.order.cart.totals.Shipping} size="mini" style="max-width: 100px;">{options}</el-select> : this.formatPrice(this.order.cart.totals.Shipping, this.shopData.currency)
    },

    discountRowFormatter (value) {
      var options = []
      forEach(range(0, 101), function (range) {
        options.push(<el-option key={range} value={range} label={range + '%'}></el-option>)
      })

      return this.editable ? <el-select v-model={this.order.cart.totals.Discount} size="mini" style="max-width: 100px;">{options}</el-select> : `${this.order.cart.totals.Discount}%`
    },

    deleteRow (row) {
      this.order.items.splice(this.order.items.indexOf(row), 1)
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
  table.order_item_options {
    margin-left: 20px;
  }
  table.order_item_options tr {
    background-color: transparent;
  }
  table.order_item_options td {
    border-bottom: 0;
  }
  table.order_item_options td.key {
    padding: 0 20px 0 0;
    white-space: nowrap;
    display: flex;
    align-items: flex-start;
  }
  table.order_item_options td.value {
    padding: 0;
  }
  table.order_item_options .el-tag {
    height: 100%;
    white-space: normal;
    word-break: break-word;
  }
</style>
