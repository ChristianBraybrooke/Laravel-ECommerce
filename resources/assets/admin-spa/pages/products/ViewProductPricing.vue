<template lang="html">
    <div>
        <product-page-layout :product-id="productId"
                             :current-page="'/products/' + productId + '/pricing'"
                             :request-includes="['price']">

            <template slot="product_page"
                      slot-scope="props">

                <el-row :gutter="20">
                    <el-col :lg="12" :md="24">
                        <el-form-item label="Price" prop="price">
                            <el-input :autofocus="true" v-model="props.productForm.price">
                                <template slot="prepend">{{ shopData ? shopData.currency : '' }}</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </template>
        </product-page-layout>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

      name: 'ViewProductPricing',

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
              //
          }
      },

      computed: {
          ...mapGetters([
            'shopData',
          ]),
      },

      watch: {

      },

      mounted () {
          console.log('ViewProductPricing.vue mounted');
      },

      methods: {
          //
      }
}
</script>

<style lang="css" scoped>

</style>
