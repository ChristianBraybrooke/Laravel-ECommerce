<template lang="html">
    <div v-loading="loading">
        <product-page-layout :product="product"
                             :current-page="'/products/' + productId + '/customisations'"
                             :page-errors="productErrors">
            <template slot="page_content">


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

      name: 'ViewProductCustomisations',

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
              productErrors: {},
              collections: {},
              shopData: {},
              collectionErrors: {},
              productCollections: {},
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
                      with: ['media', 'variants.media', 'collectionTypes', 'customisations.options'],
                      include: ['live_at', 'slug']
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
