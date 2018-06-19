<template lang="html">
    <div>
        <product-page-layout :product-id="productId"
                             :current-page="'/products/' + productId"
                             :request-with="['collectionTypes', 'content']"
                             :request-includes="['live_at', 'slug', 'list_in_shop', 'featured']"
                             :form-rules="productFormRules">
            <template slot="product_page"
                      slot-scope="props">

                <el-row type="flex">
                    <el-col :span="4">
                        <el-form-item v-if="props.productForm.live_at" label="Live" prop="live_at.live" size="small">
                            <el-switch v-model="props.productForm.live_at.live"
                                       active-color="#13ce66"
                                       inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="List In Shop" prop="list_in_shop" size="small">
                            <el-switch v-model="props.productForm.list_in_shop"
                                       active-color="#13ce66"
                                       inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="Featured" prop="featured" size="small">
                            <el-switch v-model="props.productForm.featured"
                                       active-color="#13ce66"
                                       inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :lg="12" :md="24">
                        <el-form-item label="Name" prop="name" size="small">
                            <el-input :autofocus="true" v-model="props.productForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :lg="12" :md="24">
                        <el-form-item label="Slug / Url" prop="slug" size="small">
                            <el-input v-model="props.productForm.slug">
                                <template slot="prepend">{{ getSiteBaseURL }}products/</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row v-if="props.productForm.content" :gutter="20">
                    <template v-for="content in props.productForm.content.data">
                        <el-col :lg="12" :md="24">
                            <el-form-item :label="content.content_name" :prop="content.content_name" size="small">
                                <el-input type="textarea" :autosize="{ minRows: 5 }" :autofocus="true" v-model="content.content"></el-input>
                            </el-form-item>
                        </el-col>
                    </template>
                </el-row>

                <errors v-if="Object.keys(collectionErrors).length > 0" :errors="collectionErrors"></errors>

                <el-row :gutter="20">
                    <template v-for="collection in collections">
                        <el-col :md="6" :sm="12" :xs="24">
                            <el-form-item v-if="props.productForm.collections && collections" :label="collection.name" :prop="'collections.data.collection_types_sync' + [collection.id - 1]" size="small">
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
import api from "services/api-service";

export default {

      name: 'ViewProduct',

      components: {
          ProductPageLayout: () => import(/* webpackChunkName: "product-page-layout" */'./ProductPageLayout'),
      },

      props: {
          productId: {
              type: String,
              required: true,
          },
      },

      data () {
          return {
              collections: {},
              collectionErrors: {},
          }
      },

      computed: {
          productFormRules()
          {
              return {
                  name: [
                    { required: true, message: 'The product name field is required', trigger: 'blur' },
                  ],
                  slug: [
                    { required: true, message: 'The product slug field is required', trigger: 'blur' },
                  ],
              };
          },
      },

      watch: {
          //
      },

      mounted () {
          console.log('ViewProduct.vue mounted');
          this.getCollections();
      },

      methods: {

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
