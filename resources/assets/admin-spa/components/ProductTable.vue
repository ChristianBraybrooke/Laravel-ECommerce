<template lang="html">
    <div v-loading="loading">

        <el-table :data="products"
                  style="width: 100%">
            <el-table-column v-for="(collumn, key) in collumns"
                             :key="key"
                             :prop="collumn.prop"
                             :label="collumn.label"
                             :formatter="collumn.formatter ? collumn.formatter : null">
              <template v-if="collumn.template">
                  <template slot-scope="scope">
                      {{ collumn.template(scope) }}
                  </template>
              </template>
            </el-table-column>
        </el-table>


        <el-table :data="orderTotals"
                  style="width: 100%">
            <el-table-column v-for="(col, key) in totalSpan" :key="key">
            </el-table-column>
            <el-table-column prop="total"
                             label="">
            </el-table-column>
            <el-table-column prop="value"
                            label=""
                            :formatter="function(row, column, cellValue) { return formatPrice(cellValue, shopData.currency) }">
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import order from '../utils/order';

var forEach = require('lodash.foreach');

export default {

      name: 'ProductTable',

      components: {
          Errors: () => import('./Errors.vue'),
          productForm: () => import('./productForm.vue'),
      },

      props: {
          editable: {
              type: Boolean,
              required: false,
              default () {
                  return false;
              }
          },
          products: {
              type: Array,
              required: true,
          },
          collumns: {
              type: Array,
              required: false,
              default() {
                  return this.defaultCollumns;
              }
          },
          options: {
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
              defaultOptions: {},
              defaultCollumns: [
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
                      formatter: function (row, column, cellValue) { return this.formatPrice(order.productSubTotal(row), this.shopData.currency) }.bind(this),
                  },
                  {
                      prop: 'extras',
                      label: 'Extras',
                      formatter: function (row, column, cellValue) { return this.formatPrice(order.productExtras(row), this.shopData.currency) }.bind(this),
                  },
                  {
                      prop: 'total',
                      label: 'Total',
                      formatter: function (row, column, cellValue) { return this.formatPrice(order.productTotal(row), this.shopData.currency) }.bind(this),
                  },
                  {
                      prop: 'actions',
                      label: 'Actions',
                      template: function (scope) { return this.itemRowActionsFormatter(scope) }.bind(this),
                  },
              ]
          }
      },

      computed: {
          ...mapGetters([
              'shopData',
              'orderTotals'
          ]),

          totals()
          {
              return order.totals(this.products);
          },

          totalSpan()
          {
              var numberOfCollumns = this.collumns ? this.collumns.length : 0;
              numberOfCollumns = (numberOfCollumns > 2) ? (numberOfCollumns - 2) : 0;
              return [...Array(parseInt(numberOfCollumns)).keys()];
          }
      },

      watch: {

      },

      mounted () {
          console.log('ProductTable.vue Mounted');
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

          itemRowActionsFormatter(scope)
          {
              // return <product-form edit-form={true} product={scope.row}></product-form>
          },
      }
}
</script>

<style lang="css">
</style>
