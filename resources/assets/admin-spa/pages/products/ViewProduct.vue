<template lang="html">
    <div v-loading="loading">

        <el-breadcrumb class="breadcrumbs" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'products' }">Products</el-breadcrumb-item>
            <el-breadcrumb-item>{{ product.name }}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row align="middle" type="flex">
            <el-col :span="12"><h1 class="page_title">{{ product.name }}</h1></el-col>
        </el-row>

        <errors v-if="Object.keys(productErrors).length > 0" :errors="productErrors"></errors>

        <el-row type="flex">
            <el-col :md="24">
                <el-form label-position="top"
                         :model="product"
                         :rules="productFormRules"
                         ref="productForm"
                         label-width="120px"
                         @keyup.enter.native="submitForm('productForm')">

                    <el-tabs v-model="currentTab">
                        <el-tab-pane label="Basic Info" name="basic">
                            <template v-if="currentTab === 'basic'">
                                <el-row type="flex">
                                    <el-col :span="4">
                                        <el-form-item v-if="product.live_at" label="Live" prop="live_at.live">
                                            <el-switch v-model="product.live_at.live"
                                                       active-color="#13ce66"
                                                       inactive-color="#ff4949">
                                            </el-switch>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-form-item label="List In Shop" prop="list_in_shop">
                                            <el-switch v-model="product.list_in_shop"
                                                       active-color="#13ce66"
                                                       inactive-color="#ff4949">
                                            </el-switch>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-form-item label="Featured" prop="featured">
                                            <el-switch v-model="product.featured"
                                                       active-color="#13ce66"
                                                       inactive-color="#ff4949">
                                            </el-switch>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="20">
                                    <el-col :lg="12" :md="24">
                                        <el-form-item label="Name" prop="name">
                                            <el-input :autofocus="true" v-model="product.name"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :lg="12" :md="24">
                                        <el-form-item label="Slug / Url" prop="slug">
                                            <el-input v-model="product.slug">
                                                <template slot="prepend">{{ getSiteBaseURL }}products/</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row v-if="product.content" :gutter="20">
                                    <template v-for="content in product.content.data">
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
                                            <el-form-item v-if="product.collections" :label="collection.name" :prop="'collections.data.collection_types_sync' + [collection.id]">
                                                <el-select class="collection_type_select" v-model="product.collections.data.collection_types_sync[collection.id]" filterable multiple allow-create placeholder="Select">
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
                        </el-tab-pane>
                        <el-tab-pane label="Pricing" name="pricing">
                            <template v-if="currentTab === 'pricing'">
                                <el-row :gutter="20">
                                    <el-col :lg="12" :md="24">
                                        <el-form-item label="Price" prop="price">
                                            <el-input :autofocus="true" v-model="product.price">
                                                <template slot="prepend">{{ shopData ? shopData.currency : '' }}</template>
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="Images" name="images">
                            <template v-if="currentTab === 'images'">
                                <el-row :gutter="20">
                                    <el-col :span="12">
                                        <el-form-item label="Main Img" prop="main_img">
                                            <el-button type="info" plain size="mini" @click="displayFilePicker('mainImgFilePicker')">Select File <i class="el-icon-document"></i></el-button>

                                            <file-picker-modal v-if="product.id"
                                                               ref="mainImgFilePicker"
                                                               :current-files="product.main_img ? [product.main_img] : undefined"
                                                               v-on:filesChosen="handleFilesChosen"
                                                               v-on:filesUnChosen="handleFilesUnChosen"
                                                               name="Main Img"
                                                               :selectable="1"
                                                               picker-id="main_img"
                                                               :open-on-mount="false">
                                            </file-picker-modal>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="Gallery" prop="gallery" v-if="product.gallery">
                                            <file-picker-modal v-if="product.gallery.data"
                                                               ref="galleryFilePicker"
                                                               :current-files="product.gallery.data ? product.gallery.data  : undefined"
                                                               v-on:filesChosen="handleGalleryFilesChosen"
                                                               v-on:filesUnChosen="handleGalleryFilesUnChosen"
                                                               name="Gallery"
                                                               picker-id="gallery"
                                                               :show-btn="true"
                                                               :open-on-mount="false">
                                            </file-picker-modal>

                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="Customisations" name="customisations">
                            <template v-if="currentTab === 'customisations'">
                                <template v-if="product.customisations && currentTab === 'customisations'">
                                    <el-card :class="customisation.minimise ? 'product_variant_card box-card' : 'product_variant_card minimised box-card'" v-for="customisation in orderedCusomisations" :key="customisation.id">
                                        <div slot="header" class="clearfix">
                                          <span>{{ customisation.name ? customisation.name : 'New Customisation' }}</span>
                                          <el-button style="float: right; padding: 4px 8px; margin-left: 5px;" @click="minimiseCustomisationCard(customisation)" type="primary">
                                          {{ customisation.minimise ? 'Minimise' : 'Maximise' }}</el-button>
                                          <el-button style="float: right; padding: 4px 8px" @click="deleteCustomisation(customisation)" type="danger">Delete</el-button>
                                          <el-input-number style="float: right; margin-top: -2px;" v-model="customisation.order" size="mini"></el-input-number>
                                        </div>
                                        <product-customisation-component v-if="customisation.minimise ? true : false" :model="customisation"></product-customisation-component>

                                    </el-card>
                                </template>

                                <el-button type="primary" icon="el-icon-plus" @click="addCustomisation" plain>Add Customisation</el-button>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="Variants" name="variants">
                            <template v-if="currentTab === 'variants'">
                                <template v-if="product.variants && currentTab === 'variants'">
                                    <el-card class="product_variant_card box-card" v-for="variant in product.variants.data" :key="variant.id">
                                        <product-variant-component :model="variant"></product-variant-component>
                                    </el-card>
                                </template>
                                <el-button type="primary" icon="el-icon-plus" @click="addVariant" plain>Add Variant</el-button>
                            </template>
                        </el-tab-pane>
                    </el-tabs>

                    <hr class="page_hr">

                    <el-row :gutter="20">
                        <el-col :sm="24">
                            <el-form-item>
                                <el-button plain type="success" :loading="loading" @click="submitForm('productForm')">Update</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
            </el-col>
        </el-row>

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
          Errors: () => import('../../components/Errors.vue'),
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

      },

      mounted () {
          console.log('ViewProduct.vue mounted');
          this.getProduct();
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
                      with: ['media', 'variants.media', 'collectionTypes', 'customisations.options']
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
