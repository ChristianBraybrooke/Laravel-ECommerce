<template lang="html">
  <div>
    <product-page-layout
      :product-id="productId"
      :current-page="'/products/' + productId + '/customisations'"
      :request-with="['customisations.options']">

      <template
        slot="product_page"
        slot-scope="props">
        <template v-if="props.productForm.customisations">
          <el-card
            v-for="customisation in orderedCusomisations(props.productForm.customisations.data)"
            :class="customisation.minimise ? 'product_variant_card box-card' : 'product_variant_card minimised box-card'"
            :key="customisation.id">
            <div
              slot="header"
              class="clearfix">
              <span>{{ customisation.name ? customisation.name : 'New Customisation' }}</span>
              <el-button
                style="float: right; padding: 4px 8px; margin-left: 5px;"
                type="primary"
                @click="minimiseCustomisationCard(customisation, props.productForm.customisations.data)">
                {{ customisation.minimise ? 'Minimise' : 'Maximise' }}</el-button>
              <el-button
                style="float: right; padding: 4px 8px"
                type="danger"
                @click="deleteCustomisation(customisation, props.productForm.customisations.data)">Delete</el-button>
              <el-input-number
                v-model="customisation.order"
                style="float: right; margin-top: -2px;"
                size="mini"/>
            </div>
            <product-customisation-component
              v-if="customisation.minimise ? true : false"
              :model="customisation"/>

          </el-card>
        </template>

        <el-button
          type="primary"
          icon="el-icon-plus"
          plain
          @click="addCustomisation(props.productForm.customisations.data)">Add Customisation</el-button>
      </template>
    </product-page-layout>
  </div>
</template>

<script>
var orderBy = require('lodash.orderby')

export default {

  name: 'ViewProductCustomisations',

  components: {
    ProductPageLayout: () => import(/* webpackChunkName: "product-page-layout" */'./ProductPageLayout'),
    ProductCustomisationComponent: () => import(/* webpackChunkName: "product-customisation-component" */'components/ProductCustomisationComponent')
  },

  props: {
    productId: {
      type: String,
      required: true
    }
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

  },

  mounted () {
    console.log('ViewProductCustomisations.vue mounted')
  },

  methods: {

    /**
           * List the customisations in the order specified by the user
           *
           * @param Array customisations
           * @return Array
           */
    orderedCusomisations (customisations) {
      return customisations.length >= 1 ? orderBy(customisations, ['order'], ['asc']) : []
    },

    /**
           * Add a customisation to the customisations
           *
           * @param Array customisations
           * @return void
           */
    addCustomisation (customisations) {
      customisations.push({
        options: {
          data: [
          ]
        }
      })
    },

    /**
           * Delete a customisation from the customisations
           *
           * @param Object customisation
           * @param Array customisations
           * @return void
           */
    deleteCustomisation (customisation, customisations) {
      customisations.splice(customisations.indexOf(customisation), 1)
    },

    /**
           * Maximise or minimise the customisation card
           *
           * @param Object customisation
           * @param Array customisations
           * @return void
           */
    minimiseCustomisationCard (customisation, customisations) {
      var index = customisations.indexOf(customisation)

      var value = !customisations[index].minimise

      this.$set(customisations[index], 'minimise', value)
    }
  }

}
</script>

<style lang="css" scoped>
    .product_variant_card {
        margin: 30px 0px;
    }
    .product_variant_card.minimised .el-card__body {
        padding: 0px!important;
    }
</style>
