<template lang="html">
    <div v-loading="loading">
        <el-breadcrumb class="breadcrumbs" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'products' }">Products</el-breadcrumb-item>
            <el-breadcrumb-item>{{ productForm.name }}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row align="middle" type="flex">
            <el-col :span="12"><h1 class="page_title">{{ productForm.name }}</h1></el-col>
        </el-row>

        <page-layout :page-errors="productErrors"
                     :current-page="currentPage"
                     :pages="[
                        {
                          name: 'Basic Information',
                          index: '/products/' + productId,
                        },
                        {
                          name: 'Pricing',
                          index: '/products/' + productId + '/pricing',
                        },
                        {
                          name: 'Images',
                          index: '/products/' + productId + '/images',
                        },
                        {
                          name: 'Customisations',
                          index: '/products/' + productId + '/customisations',
                        },
                        {
                          name: 'Variants',
                          index: '/products/' + productId + '/variants',
                        },
                        {
                          name: 'Order Information',
                          index: '/products/' + productId + '/ordering',
                        },
                     ]">

                <template slot="page_content">

                    <el-form label-position="top"
                             :model="productForm"
                             :rules="formRules"
                             ref="productForm"
                             label-width="120px">

                        <slot name="product_page" :product-form="productForm"></slot>

                        <hr class="page_hr">

                        <el-row :gutter="20">
                            <el-col :sm="24">
                                <el-form-item>
                                    <el-button plain type="success" :loading="loading" @click="submitForm('productForm')">Update</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-form>

                </template>

        </page-layout>
    </div>
</template>

<script>
import api from "../../services/api-service.js";
var find = require('lodash.find');
var forEach = require('lodash.foreach');
var has = require('lodash.has');
var orderBy = require('lodash.orderby');

export default {

      name: 'ViewProductPageLayout',

      components: {
          PageLayout: () => import('../PageLayout.vue'),
      },

      props: {
          productId: {
              type: String,
              required: true,
          },
          currentPage: {
              required: true,
              type: String
          },
          form: {
              type: Object,
              required: false,
              default() {
                  return {

                  }
              }
          },
          formLoaded: {
              type: Function,
              required: false,
              default() {
                  return function (data) {}
              }
          },
          formRules: {
              type: Object,
              required: false,
              default() {
                  return {

                  }
              }
          },
          requestWith: {
              type: Array,
              required: false,
              default() {
                  return [];
              }
          },
          requestIncludes: {
              type: Array,
              required: false,
              default() {
                  return [];
              }
          }
      },

      data () {
          return {
              productForm: this.form,
              productErrors: {},
              loading: false,
          }
      },

      computed: {
          //
      },

      watch: {
          //
      },

      mounted () {
          console.log('ProductPageLayout.vue mounted');
          this.getProduct();
      },

      methods: {

          /**
           * Get the product information from the server.
           *
           * @return void
           */
          getProduct()
          {
              this.productErrors = {};
              this.loading = true;

              api.get({
                  path: 'products/' + this.productId,
                  params: {
                      with: this.requestWith,
                      include: this.requestIncludes
                  }
              })
              .then(function (data) {
                  this.loading = false;
                  this.productForm = data.data;
                  this.formLoaded(data.data);
              }.bind(this))
              .catch(function (error) {
                  this.loading = false;
                  this.productErrors = error;
              }.bind(this));
          },

          /**
           * Validate the form and submit to the server.
           *
           * @return void
           */
          submitForm(formName)
          {
              this.productErrors = {};
              this.loading = true;
              this.productForm.with = this.requestWith;
              this.productForm.include = this.requestIncludes;

              this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.persist('put', {
                        path: 'products/' + this.productId,
                        object: this.productForm,
                    })
                    .then(function (data) {
                        this.loading = false;
                        this.productForm = data.data;
                        // this.getCollections();
                    }.bind(this))
                    .catch(function (error) {
                        this.loading = false;
                        this.productErrors = error;
                    }.bind(this));
                } else {
                    this.loading = false;
                    return false;
                }
              });
          },

      }

}
</script>

<style lang="css" scoped>
.collection_type_select {
    width: 100%;
}
.product_variant_card {
    margin: 30px 0px;
}
.product_variant_card.minimised .el-card__body {
    padding: 0px!important;
}
</style>
