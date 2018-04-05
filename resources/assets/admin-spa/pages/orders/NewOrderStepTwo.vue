<template lang="html">
    <div v-loading="loading">

        <el-breadcrumb class="breadcrumbs" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'orders' }">Orders</el-breadcrumb-item>
          <el-breadcrumb-item>New Order</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'orders.step1' }">Step 1</el-breadcrumb-item>
          <el-breadcrumb-item>Step 2</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row align="middle" type="flex">
            <el-col :span="12"><h1 class="page_title">New Order <span v-if="order.id"> - #{{ order.id }}</span></h1></el-col>
        </el-row>

        <el-row v-if="order.items" :gutter="20" style="margin-top: 20px; margin-bottom: 20px;">
            <el-col :span="12">
                <el-button size="small" @click="handleAddProductBtnClick" type="primary">Add Product(s)</el-button>
            </el-col>
            <el-form :model="order">
                <el-col :span="12">
                    <el-form-item label="Shipping Rate">
                        <el-select v-model="order.shipping_rate" size="mini">
                            <el-option v-for="range in shippingRange" :key="range" :value="range"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>

        <el-row v-if="order.items" :gutter="20">
            <el-col :span="24">
                <el-table :data="order.items"
                          style="width: 100%">
                    <el-table-column prop="name"
                                     label="Product"
                                     :formatter="itemRowNameFormatter">
                    </el-table-column>
                    <el-table-column prop="price"
                                     :formatter="function(row, column, cellValue) { return shopData.currency + (formattedPrice(row) ? formattedPrice(row)['Base Price'] : 0) }"
                                     label="Price">
                    </el-table-column>
                    <el-table-column prop="qty"
                                     :formatter="function(row, column, cellValue) { return row.quantity ? row.quantity : 1 }"
                                     label="Quantity">
                    </el-table-column>
                    <el-table-column prop="subtotal"
                                     :formatter="function(row, column, cellValue) { return shopData.currency + (formattedPrice(row) ? formattedPrice(row)['Sub-Total'] : 0) }"
                                     label="Sub-Total">
                    </el-table-column>
                    <el-table-column prop="total"
                                     :formatter="function(row, column, cellValue) { return shopData.currency + (formattedPrice(row) ? formattedPrice(row)['Extras'] : 0) }"
                                     label="Extras">
                    </el-table-column>
                    <el-table-column prop="total"
                                     :formatter="function(row, column, cellValue) { return shopData.currency + (formattedPrice(row) ? formattedPrice(row)['Total'] : 0) }"
                                     label="Total">
                    </el-table-column>
                    <el-table-column
                        label="Actions">
                        <template slot-scope="scope">
                            <el-button size="mini"
                                       plain
                                       type="primary"
                                       class="action_btn"
                                       @click="editRow(scope.$index, scope.row)">Edit
                            </el-button>
                            <el-button size="mini"
                                       type="danger"
                                       class="action_btn delete_btn"
                                       @click="deleteRow(scope.$index, scope.row)">Delete
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>


                <el-table :data="orderTotals"
                          style="width: 100%">
                    <el-table-column>
                    </el-table-column>
                    <el-table-column>
                    </el-table-column>
                    <el-table-column>
                    </el-table-column>
                    <el-table-column>
                    </el-table-column>
                    <el-table-column>
                    </el-table-column>
                    <el-table-column prop="total"
                                     label="">
                    </el-table-column>
                    <el-table-column prop="value"
                                    label=""
                                    :formatter="function(row, column, cellValue) { return shopData.currency + cellValue }">
                    </el-table-column>
                </el-table>

            </el-col>
        </el-row>

        <el-dialog :title="(addProductForm.edit ? 'Edit' : 'Add') + ' Product'"
                   :close-on-click-modal="false"
                   :before-close="closeAndClearModal"
                   :visible.sync="showProductModal"
                   width="70%">

            <div v-loading="loading">

                <errors v-if="Object.keys(productAddErrors).length > 0" :errors="productAddErrors"></errors>

                <el-form label-position="top" ref="addProductForm" :model="addProductForm" @submit.native.prevent>

                    <div class="form_option_section" v-if="!addProductForm.edit">
                        <el-row :gutter="20">
                            <el-col :md="12">
                                <h5>Product Type</h5>
                            </el-col>
                        </el-row>

                        <el-row :gutter="20">
                            <el-col :md="{span:16, offset: 4}">
                                <el-form-item label="Choose Product" size="small" prop="product">
                                    <el-cascader :options="products"
                                                 style="width: 100%;"
                                                 @change="handleProductChange"
                                                 @active-item-change="requestProductVariants"
                                                 :props="productProps">
                                    </el-cascader>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>

                    <template v-if="addProductForm.product.options && addProductForm.product.order_form">

                        <template v-if="addProductForm.product.order_form.sections" v-for="section in addProductForm.product.order_form.sections.data">
                            <template v-if="section.fields">
                                <el-row :gutter="20" v-if="section.fields.data.length > 0">
                                    <el-col :md="12">
                                        <h5>{{ section.name }}</h5>
                                    </el-col>
                                </el-row>

                                <div v-if="section.fields.data.length > 0" class="form_option_section">
                                    <el-row :gutter="20" v-for="field in section.fields.data" :key="field.id">
                                        <el-col :md="{span:16, offset: 4}">
                                            <el-form-item :label="field.name" size="small" :prop="'product.options[' + field.name + ']'">
                                                <el-input v-if="field.type === 'text'" v-model="addProductForm.product.options[field.name]"></el-input>
                                                <el-select v-if="field.type === 'select'" v-model="addProductForm.product.options[field.name]">
                                                    <el-option v-for="option in field.options"
                                                               :key="option.id"
                                                               :value="option"
                                                               :label="optionLabel(option)"></el-option>
                                                </el-select>

                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>

                            </template>
                        </template>
                    </template>

                    <div v-if="addProductForm.product.id" class="form_option_section">
                        <el-row :gutter="20">
                            <el-col :md="12">
                                <h5>Quantity</h5>
                            </el-col>
                        </el-row>

                        <el-row :gutter="20">
                            <el-col :md="{span:16, offset: 4}">
                                <el-form-item label="Quantity" size="small" prop="product.quantity">
                                    <el-select v-model="addProductForm.product.quantity">
                                        <el-option v-for="range in quantityRange" :key="range" :value="range"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>

                    <div v-if="addProductForm.product.id" class="form_option_section">
                        <el-row :gutter="20">
                            <el-col :md="12">
                                <h5>Price</h5>
                            </el-col>
                        </el-row>

                        <el-row :gutter="20">
                            <el-col :md="{span:16, offset: 4}">
                                <p v-for="(value, key) in formattedPrice(addProductForm.product)"><strong>{{ key }}:</strong> {{ shopData.currency }}{{ value }}</p>
                            </el-col>
                        </el-row>
                    </div>

                </el-form>

                <span slot="footer" class="dialog-footer">
                  <el-button v-on:click="closeAndClearModal(null)">{{ addProductForm.edit ? 'Discard Changes' : 'Cancel' }}</el-button>
                  <el-button v-if="!addProductForm.edit" type="primary" v-on:click="addProductToTable()">Add Product</el-button>
                  <el-button v-if="addProductForm.edit" type="primary" v-on:click="editProductOnTable()">Save Changes</el-button>
                </span>

            </div>
        </el-dialog>

        <el-row :gutter="20" style="margin-top: 40px;">
            <el-col :md="{span:24}">
                <el-button @click="processSubmit(false)" type="primary" plain>Save Changes</el-button>
                <el-button @click="processSubmit()" type="primary">Process Payment</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import api from '../../services/api-service.js';
import { mapActions, mapGetters } from 'vuex';
var findIndex = require('lodash.findindex');
var forEach = require('lodash.foreach');
var throttle = require('lodash.throttle');
var last = require('lodash.last');
var range = require('lodash.range');

export default {

      name: 'NewOrderStepTwo',

      components: {
          Errors: () => import('../../components/Errors.vue'),
      },

      props: {

      },

      data () {
          return {
              loading: false,
              showProductModal: false,
              addProductForm: {
                  edit: false,
                  product: {
                    quantity: 1,
                  },
              },
              productAddErrors: {},
              operators: {
                  '+': function(a, b) { return parseInt(a) + parseInt(b) },
                  '-': function(a, b) { return parseInt(a) - parseInt(b) },
              },
              products: [],
              productProps: {
                  value: 'id',
                  label: 'name',
                  children: 'variants'
              }
          }
      },

      computed: {
          ...mapGetters([
            'order',
            'shopData',
            'orderTotals'
          ]),

          quantityRange()
          {
              return range(1,251);
          },

          shippingRange()
          {
              return range(0,250, 10);
          },
      },

      watch: {
          order: {
              handler: function(order) {
                  this.$store.commit('SET_ORDER', order);
              },
              deep: true
          },
      },

      mounted () {
          console.log('NewOrderStepTwo.vue Mounted');
          if (!this.order.id) {
              this.$router.push({name: 'orders.step1'});
          }
      },

      methods: {

          ...mapActions([
              'deleteOrderItem',
              'editOrderItem'
          ]),

          formattedPrice(product)
          {
              var base_price = parseInt(product.price);
              var base_with_extras = base_price;
              var extras = 0;
              forEach(product.options, function(option) {
                  if (option.price_mutator && option.price_value) {
                      base_with_extras = this.operators[option.price_mutator](base_with_extras, option.price_value);
                      extras = this.operators[option.price_mutator](extras, option.price_value);
                  }
              }.bind(this));

              var quantity = product.quantity ? product.quantity : 1;
              var total = base_with_extras * quantity;
              extras = extras * quantity;
              return {
                  'Base Price': base_price,
                  'Sub-Total': base_price * quantity,
                  'Extras':  extras,
                  'Total': total
              };
          },

          /**
           * Check the user wants to close the modal and then clear everything
           *
           * @param Mixed done
           * @return void
           */
          closeAndClearModal(done)
          {
              this.$confirm('Are you sure to close the product selector?')
                .then(_ => {
                    this.productAddErrors = {};
                    this.$refs.addProductForm.resetFields();
                    this.addProductForm = {
                        edit: false,
                        product: {
                          quantity: 1,
                        },
                    }
                    if (done) {
                        done();
                    } else {
                        this.showProductModal = false;
                    }
                })
                .catch(_ => {});
          },

          /**
           * Set the product on the form data model
           *
           * @param Array val
           * @return void
           */
          handleProductChange(val)
          {
              var chosenProduct = this.findProductById(last(val));
              this.addProductForm.product = chosenProduct;
              this.$set(this.addProductForm.product, 'options', {});
          },

          /**
           * Retrieve the product variants from the server
           *
           * @param Int val
           * @return void
           */
          requestProductVariants: throttle(function (val)
          {
              var productIndex = this.getIndexFromId(val);
              this.loading = true;
              api.get({
                  path: 'products/' + val + '/variants',
                  params: {
                      include: ['blank_variants', 'type', 'options', 'price', 'effects_price'],
                      with: ['orderForm.sections.fields']
                  }
              })
              .then(function (data) {
                  this.loading = false;
                  this.products[productIndex].variants = data.data;
              }.bind(this))
              .catch(function (error) {
                  this.loading = false;
              }.bind(this));
          },1000),

          /**
           * Do everything that needs to be done when the user adds a product
           *
           * @return void
           */
          handleAddProductBtnClick()
          {
              this.showProductModal = true;
              this.loading = true;

              api.get({
                  path: 'products',
                  params: {
                      no_variants: true,
                      include: ['blank_variants', 'type', 'options', 'price', 'effects_price'],
                      with: ['orderForm.sections.fields']
                  }
              })
              .then(function (data) {
                  this.loading = false;
                  this.products = data.data;
              }.bind(this))
              .catch(function (error) {
                  this.loading = false;
              }.bind(this))
          },

          getIndexFromId(id)
          {
              if (id) {
                  var productIndex = findIndex(this.products, function(p) {
                                          return p.id === parseInt(id);
                                      });
                  return productIndex === -1 ? null : productIndex;
              }

              return null;
          },

          findProductById(id)
          {
              var product = null;
              if (id) {
                  forEach(this.products, function(p) {
                      if (p.id === parseInt(id)) {
                          product = p;
                      } else {
                          forEach(p.variants, function(v) {
                              if (v.id === parseInt(id)) {
                                  product = v;
                              }
                          });
                      }
                  })
              }
              return product;
          },

          addProductToTable()
          {
              this.$store.commit('ADD_PRODUCT_TO_ORDER', this.addProductForm.product);
              this.showProductModal = false;
          },

          editProductOnTable()
          {
              this.editOrderItem(this.addProductForm.product);
              this.showProductModal = false;
          },

          deleteRow(index, row)
          {
              this.deleteOrderItem(row);
          },

          editRow(index, row)
          {
              this.addProductForm.edit = true;
              this.addProductForm.product = row;
              this.showProductModal = true;
          },

          optionLabel(option)
          {
              if (option.price_mutator && option.price_value) {
                return option.name + ' (' + option.price_mutator + ' £' + option.price_value + ')'
              }
              return option.name;
          },

          itemRowNameFormatter(row, column, cellValue)
          {
              var row_name = <p>{row.variant.name ? (row.variant.name + ' / ') : ''}<strong>{row.name}</strong></p>;

              if (row.options) {
                var items = [];
                forEach(row.options, function(value, key) {
                    var new_value = value.name ? value.name : value;
                    items.push(<li>{key}: {new_value}</li>);
                });

                return <div>{row_name} <ul class="order_item_options">{items}</ul></div>
              }
              return <div>{row_name}</div>;
          },

          processSubmit(navigate = true)
          {
              this.loading = true;
              api.persist('put', {
                  path: "orders/" + this.order.id,
                  object: this.order,
              })
              .then(function(data) {
                  this.loading = false;
                  if (navigate) {
                      this.$router.push({name: 'orders.step3'});
                  }
              }.bind(this))
              .catch(function(error) {
                  this.loading = false;
              }.bind(this))
          },


      }
}
</script>

<style lang="scss">
  @import '../../sass/_variables.scss';

  .form_option_section {
      border-bottom: dashed 2px $--border-color-light;
      padding: 10px 0px;
      margin-bottom: 10px;
  }
  ul.order_item_options {
      list-style: circle;
      font-size: 13px;
      padding: 0px 25px;
  }
</style>
