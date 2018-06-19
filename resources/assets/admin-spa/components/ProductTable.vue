<template lang="html">
    <div v-loading="loading">

        <el-table :data="order.items"
                  style="width: 100%">
            <el-table-column v-for="(collumn, key) in collumns"
                             :key="key"
                             :prop="collumn.prop"
                             :label="collumn.label"
                             :formatter="collumn.formatter ? collumn.formatter : null">
            </el-table-column>
        </el-table>


        <el-table :data="orderTotals"
                  v-show="orderTotals.length > 0"
                  style="width: 100%">
            <el-table-column v-for="(col, key) in totalSpan" :key="key">
            </el-table-column>
            <el-table-column prop="total"
                             label="">
            </el-table-column>
            <el-table-column prop="value"
                            label=""
                            :formatter="function(row, column, cellValue) { return row.total === 'Shipping' ? shippingRowFormatter(cellValue) : formatPrice(cellValue, shopData.currency) }">
            </el-table-column>
            <el-table-column v-if="editable">
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProductForm from 'components/ProductForm';
import orderUtil from 'utils/order';
var range = require('lodash.range');

var forEach = require('lodash.foreach');


export default {

      name: 'ProductTable',

      components: {
          Errors: () => import(/* webpackChunkName: "errors" */'components/Errors'),
          ProductForm: ProductForm,
      },

      props: {
          editable: {
              type: Boolean,
              required: false,
              default () {
                  return false;
              }
          },
          order: {
              type: Object,
              required: true,
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
              default() {
                  return [];
              }
          },
          setOptions: {
              type: Object,
              required: false,
              default () {
                  return this.defaultOptions;
              }
          }
      },

      data () {
          return {
              loading: false,
              mergedOptions: {},
              options: {},
              collumns: []
          }
      },

      computed: {
          ...mapGetters([
              'shopData',
          ]),

          totals()
          {
              return order.totals(this.order.items);
          },

          totalSpan()
          {
              var numberOfCollumns = this.collumns ? this.collumns.length : 0;
              numberOfCollumns = (numberOfCollumns > 2) ? (numberOfCollumns - (this.editable ? 3 : 2)) : 0;
              return [...Array(parseInt(numberOfCollumns)).keys()];
          },

          defaultCollumns()
          {
              var cols = [
                  {
                      prop: 'name',
                      label: 'Product',
                      formatter: function (row, column, cellValue) { return this.itemRowNameFormatter(row, column, cellValue) }.bind(this),
                  },
                  {
                      prop: 'price',
                      label: 'Price',
                      formatter: function (row, column, cellValue) { return this.formatPrice(row.price, this.shopData.currency) }.bind(this),
                  },
                  {
                      prop: 'quantity',
                      label: 'Quantity',
                      formatter: function (row, column, cellValue) { return row.quantity ? row.quantity : 1 }.bind(this),
                  },
                  {
                      prop: 'subtotal',
                      label: 'Sub-Total',
                      formatter: function (row, column, cellValue) { return this.formatPrice(orderUtil.productSubTotal(row), this.shopData.currency) }.bind(this),
                  },
                  {
                      prop: 'extras',
                      label: 'Extras',
                      formatter: function (row, column, cellValue) { return this.formatPrice(orderUtil.productExtras(row), this.shopData.currency) }.bind(this),
                  },
                  {
                      prop: 'total',
                      label: 'Total',
                      formatter: function (row, column, cellValue) { return this.formatPrice(orderUtil.productTotal(row), this.shopData.currency) }.bind(this),
                  },
              ];

              if (this.editable) {
                  cols.push(
                      {
                          prop: 'actions',
                          label: 'Actions',
                          formatter: function (row, column, cellValue) { return this.itemRowActionsFormatter(row, column, cellValue) }.bind(this),
                      }
                  )
              }

              return cols;
          },

          defaultOptions()
          {
              return {};
          }
      },

      watch: {

      },

      mounted () {
          console.log('ProductTable.vue Mounted');

          if(this.setCollumns.length == 0) {
              this.collumns = this.defaultCollumns;
          } else {
              this.collumns = this.setCollumns;
          }

          if(!this.setOptions) {
              this.options = this.defaultOptions;
          } else {
              this.options = this.setOptions;
          }

          Object.assign(this.mergedOptions, this.defaultOptions, this.options);
      },

      methods: {
          itemRowNameFormatter(row, column, cellValue)
          {
              if (this.objectHas(row, 'variant.name')) {
                  var row_name = <p><strong>{(row.variant.name + ' / ')}</strong>{row.name}</p>;
              } else {
                  var row_name = <p><strong>{row.name}</strong></p>;
              }

              if (row.options) {
                var items = [];
                forEach(row.options, function(value, key) {
                    var new_value = value ? value.name : value;
                    items.push(<li>{key}: {new_value}</li>);
                });

                return <div>{row_name} <ul class="order_item_options">{items}</ul></div>
              }
              return <div>{row_name}</div>;
          },

          itemRowActionsFormatter(row, column, cellValue)
          {
              return <span>
                         <product-form edit-form={true} product={row}></product-form>
                         <el-button size="mini" type="danger" on-click={ () => this.deleteRow(row) }>Delete</el-button>
                     </span>
          },

          shippingRowFormatter(value)
          {
              var options = [];
              forEach(range(0,250, 10), function (range) {
                  options.push(<el-option key={range} value={range} label={this.formatPrice(range, this.shopData.currency)}></el-option>);
              }.bind(this));

              return this.editable ? <el-select v-model={this.order.shipping_rate} size="mini" style="max-width: 100px;">{options}</el-select> : this.formatPrice(this.order.shipping_rate, this.shopData.currency);
          },

          deleteRow(row)
          {
              this.order.items.splice(this.order.items.indexOf(row), 1);
          }
      }
}
</script>

<style lang="css">
</style>
