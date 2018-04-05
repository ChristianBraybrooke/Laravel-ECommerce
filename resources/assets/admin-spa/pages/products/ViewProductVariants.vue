<template lang="html">
    <div>

        <product-page-layout :product-id="productId"
                             :current-page="'/products/' + productId + '/variants'"
                             :request-with="['variants.media']"
                             :request-include="['slug']">

            <template slot="product_page"
                      slot-scope="props">

                <template v-if="props.productForm.variants">
                    <el-card class="product_variant_card box-card" v-for="variant in props.productForm.variants.data" :key="variant.id">
                        <product-variant-component :model="variant"></product-variant-component>
                    </el-card>
                </template>

                <el-button type="primary" icon="el-icon-plus" @click="props.productForm.variants.data.push({})" plain>Add Variant</el-button>
            </template>

        </product-page-layout>

    </div>
</template>

<script>

export default {

      name: 'ViewProductVariants',

      components: {
          ProductPageLayout: () => import('./ProductPageLayout.vue'),
          ProductVariantComponent: () => import('../../components/ProductVariantComponent'),
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
          //
      },

      watch: {
          //
      },

      mounted () {
          console.log('ViewProductVariants.vue mounted');
      },

      methods: {
          //
      },

}
</script>

<style lang="css" scoped>

</style>
