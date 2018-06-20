<template lang="html">
    <div>

        <product-page-layout :product-id="productId"
                             :current-page="'/products/' + productId + '/variants'"
                             :request-with="['variants.media']"
                             :form="{variants: {data: []}}"
                             :request-includes="['slug']">

            <template slot="product_page"
                      slot-scope="props">

                <template v-if="props.productForm.variants">
                    <el-card class="product_variant_card box-card" v-for="variant in props.productForm.variants.data" :key="variant.id">
                        <product-variant-component :model="variant"></product-variant-component>
                    </el-card>
                </template>

                <el-button type="primary" class="add_variant_btn" icon="el-icon-plus" @click="props.productForm.variants.data.push({main_img: {}})" plain>Add Variant</el-button>
            </template>

        </product-page-layout>

    </div>
</template>

<script>

export default {

      name: 'ViewProductVariants',

      components: {
          ProductPageLayout: () => import(/* webpackChunkName: "product-page-layout" */'./ProductPageLayout'),
          ProductVariantComponent: () => import(/* webpackChunkName: "product-variant-component" */'components/ProductVariantComponent'),
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
.product_variant_card {
    margin-top: 40px;
}
.add_variant_btn {
    margin-top: 40px;
}
</style>
