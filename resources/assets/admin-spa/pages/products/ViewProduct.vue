<template lang="html">
    <div v-loading="loading">
        <product-page-layout :product="product"
                             :product-id="productId"
                             :current-page="'/products/' + productId"
                             :form="productForm"
                             :request-with="['collectionTypes', 'content']"
                             :request-includes="['live_at', 'slug', 'list_in_shop', 'featured']"
                             :page-errors="productErrors">
            <template slot="product_page"
                      slot-scope="props">

                <el-row type="flex">
                    <el-col :span="4">
                        <el-form-item v-if="props.productForm.live_at" label="Live" prop="live_at.live">
                            <el-switch v-model="props.productForm.live_at.live"
                                       active-color="#13ce66"
                                       inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="List In Shop" prop="list_in_shop">
                            <el-switch v-model="props.productForm.list_in_shop"
                                       active-color="#13ce66"
                                       inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="Featured" prop="featured">
                            <el-switch v-model="props.productForm.featured"
                                       active-color="#13ce66"
                                       inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :lg="12" :md="24">
                        <el-form-item label="Name" prop="name">
                            <el-input :autofocus="true" v-model="props.productForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="12" :md="24">
                        <el-form-item label="Slug / Url" prop="slug">
                            <el-input v-model="props.productForm.slug">
                                <template slot="prepend">{{ getSiteBaseURL }}products/</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row v-if="props.productForm.content" :gutter="20">
                    <template v-for="content in props.productForm.content.data">
                        <el-col :lg="12" :md="24">
                            <el-form-item :label="content.content_name" :prop="content.content_name">
                                <el-input type="textarea" :autosize="{ minRows: 5 }" :autofocus="true" v-model="content.content"></el-input>
                            </el-form-item>
                        </el-col>
                    </template>
                </el-row>

                <errors v-if="Object.keys(collectionErrors).length > 0" :errors="collectionErrors"></errors>

                <el-row :gutter="20">
                    <template v-for="collection in collections">
                        <el-col :md="6" :sm="12" :xs="24">
                            <el-form-item v-if="props.productForm.collections" :label="collection.name" :prop="'collections.data.collection_types_sync' + [collection.id]">
                                <el-select class="collection_type_select" v-model="props.productForm.collections.data.collection_types_sync[collection.id]" filterable multiple allow-create placeholder="Select">
                                    <el-option v-for="type in collection.types.data"
                                               :key="type.name"
                                               :label="type.name"
                                               :value="type.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </template>
                </el-row>

            </template>
        </product-page-layout>
    </div>
</template>

<script>
import api from "../../services/api-service.js";
var find = require('lodash.find');
var forEach = require('lodash.foreach');
var has = require('lodash.has');
var orderBy = require('lodash.orderby');

export default {

      name: 'ViewProduct',

      components: {
          ProductPageLayout: () => import('./ProductPageLayout.vue'),
          FilePickerModal: () => import('../../components/FilePickerModal.vue'),
          ProductVariantComponent: () => import('../../components/ProductVariantComponent'),
          ProductCustomisationComponent: () => import('../../components/ProductCustomisationComponent'),
      },

      props: {
          productId: {
              type: String,
              required: true,
          },
      },

      data () {
          return {
              loading: false,
              product: {},
              productForm: {},
              productErrors: {},
              collections: {},
              shopData: {},
              collectionErrors: {},
              productCollections: {},
              currentTab: 'basic',
          }
      },

      computed: {
          productFormRules()
          {
              return {
                  name: [
                    { required: true, message: 'The '+ this.product.name +' name field is required', trigger: 'blur' },
                  ],
                  slug: [
                    { required: true, message: 'The '+ this.product.name +' slug field is required', trigger: 'blur' },
                  ],
              };
          },

          orderedCusomisations()
          {
              return orderBy(this.product.customisations.data, ['order'], ['asc']);
          }
      },

      watch: {
          productForm: {
              handler: function(productForm) {
                  this.productForm = productForm;
              },
              deep: true
          },
      },

      mounted () {
          console.log('ViewProduct.vue mounted');
          // this.getProduct();
          this.getCollections();
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
                      with: ['collectionTypes', 'content'],
                      include: ['live_at', 'slug', 'list_in_shop', 'featured']
                  }
              })
              .then(function (data) {
                  this.loading = false;
                  this.product = data.data;
                  this.shopData = data.shop_data;
              }.bind(this))
              .catch(function (error) {
                  this.loading = false;
                  this.productErrors = error;
              }.bind(this));
          },

          /**
           * Get the collections with their types from the server.
           *
           * @return void
           */
           getCollections()
           {
               api.get({
                   path: 'collections',
                   params: {
                     with: 'types'
                   }
               })
               .then(function (data) {
                   this.collections = data.data;
               }.bind(this))
               .catch(function (error) {
                   this.collectionErrors = error;
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
              this.product.with = ['variants', 'collectionTypes', 'customisations.options'];
              this.product.include = ['live_at', 'slug'];

              this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.persist('put', {
                        path: 'products/' + this.productId,
                        object: this.product,
                    })
                    .then(function (data) {
                        this.loading = false;
                        this.product = data.data;
                        this.getCollections();
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

          inCollection(needle, haystack)
          {
              var found = find(haystack, function(o) {
                  return o.id === needle;
              });

              return found ? true : false;
          },

          displayFilePicker(filePicker)
          {
              if(this.$refs[filePicker]) {
                  this.$refs[filePicker].openModal();
              }
          },

          handleFilesChosen(data)
          {
              this.$set(this.product, data.id, data.files);
          },

          handleFilesUnChosen(data)
          {
              this.$set(this.product, data.id, data.files);
          },

          handleGalleryFilesChosen(data)
          {
              this.$set(this.product[data.id], 'data', data.files);
          },

          handleGalleryFilesUnChosen(data)
          {
              this.$set(this.product[data.id], 'data', data.files);
          },

          addVariant()
          {
              this.product.variants.data.push({});
          },

          addCustomisation()
          {
              this.product.customisations.data.push({
                options: {
                  data: [
                  ]
                }
              });
          },

          objectHas(haystack, needle)
          {
              return has(haystack, needle);
          },

          deleteCustomisation(customisation)
          {
              if (customisation.id) {

              } else {
                  this.product.customisations.data.splice(this.product.customisations.data.indexOf(customisation), 1);
              }
          },

          minimiseCustomisationCard(customisation)
          {
            var index = this.product.customisations.data.indexOf(customisation);

            var value = this.product.customisations.data[index].minimise ? false : true;

            this.$set(this.product.customisations.data[index], 'minimise', value);
          },
      },

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
