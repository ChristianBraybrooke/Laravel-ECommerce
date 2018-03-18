<template lang="html">
    <div v-loading="loading">

        <el-breadcrumb class="breadcrumbs" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'orders' }">Orders</el-breadcrumb-item>
          <el-breadcrumb-item>New Order</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'orders.step1' }">Step 1</el-breadcrumb-item>
          <el-breadcrumb-item>Step 2</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row v-if="order.items" :gutter="20" style="margin-top: 20px; margin-bottom: 20px;">
            <el-col :span="24">
                <el-button size="small" @click="handleAddProductBtnClick" type="primary">Add Product(s)</el-button>
            </el-col>
        </el-row>

        <el-row v-if="order.items" :gutter="20">
            <el-col :span="24">
                <el-table :data="order.items"
                          style="width: 100%">
                    <el-table-column prop="name"
                                     label="Product">
                    </el-table-column>
                    <el-table-column prop="price"
                                     :formatter="function(row, column, cellValue) { return order.cart.currency + row.price }"
                                     label="Price">
                    </el-table-column>
                    <el-table-column prop="qty"
                                     label="Quantity">
                    </el-table-column>
                    <el-table-column prop="subtotal"
                                     :formatter="function(row, column, cellValue) { return order.cart.currency + row.price }"
                                     label="Total">
                    </el-table-column>
                </el-table>

            </el-col>
        </el-row>

        <el-dialog title="Add Product"
                   :close-on-click-modal="false"
                   :before-close="closeAndClearModal"
                   :visible.sync="showProductModal"
                   width="70%">

            <div v-loading="loading">

                <errors v-if="Object.keys(productAddErrors).length > 0" :errors="productAddErrors"></errors>

                <el-form label-position="top" ref="addProductForm" :model="addProductForm" @submit.native.prevent>

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

                    <hr>

                </el-form>

                <span slot="footer" class="dialog-footer">
                  <el-button v-on:click="closeAndClearModal(null)">Cancel</el-button>
                  <el-button type="primary" v-on:click="">Add Product</el-button>
                </span>

            </div>
        </el-dialog>

    </div>
</template>

<script>
import api from '../../services/api-service.js';
import { mapActions, mapGetters } from 'vuex';
var findIndex = require('lodash.findindex');
var forEach = require('lodash.foreach');
var throttle = require('lodash.throttle');
var last = require('lodash.last');

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
                  product: null
              },
              productAddErrors: {},
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
          ]),
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
      },

      methods: {

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
              this.addProductForm.product = last(val);
              console.log(this.findProductById(last(val)));
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
                      include: ['blank_variants']
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
                      include: ['blank_variants']
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
      }
}
</script>

<style lang="css">
</style>
