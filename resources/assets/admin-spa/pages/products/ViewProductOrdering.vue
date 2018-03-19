<template lang="html">
    <div>

        <product-page-layout :product-id="productId"
                             :current-page="'/products/' + productId + '/ordering'">

            <template slot="product_page"
                      slot-scope="props">

            </template>

        </product-page-layout>

    </div>
</template>

<script>

export default {

      name: 'ViewProductOrdering',

      components: {
          ProductPageLayout: () => import('./ProductPageLayout.vue'),
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
          console.log('ViewProductOrdering.vue mounted');
      },

      methods: {
          //
      },

}
</script>

<style lang="css" scoped>

</style>
