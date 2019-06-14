<template lang="html">
  <div class="product_add_modal">
    <el-button
      :loading="loading"
      :size="mergedButton.size"
      :plain="mergedButton.plain"
      :class="mergedButton.class"
      :type="mergedButton.type"
      :icon="mergedButton.icon"
      @click="openModal">{{ (loading ? mergedButton.loading : mergedButton.text) }}
    </el-button>

    <product-add-inner-modal
      ref="innerModal"
      :product-categories="productCategories"/>

  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import api from 'services/api-service'
import ProductAddInnerModal from './ProductAddInnerModal'

export default {
  name: 'ProductAddModal',

  components: {
    ProductAddInnerModal
  },

  props: {
    button: {
      type: Object,
      required: false,
      default: () => { return {} }
    },

    productCategoriesIncludes: {
      type: Array,
      required: false,
      default: () => { return [] }
    },

    productCategoriesWith: {
      type: Array,
      required: false,
      default: () => { return [] }
    }
  },

  data () {
    return {
      loading: true,
      productCategories: []
    }
  },

  computed: {
    ...mapGetters([
      'shopData'
    ]),

    defaultProductCategoriesIncludes () {
      return ['type', 'options', 'price', 'effects_price', 'no_shop_data', 'description', 'order', 'rules', 'order_options']
    },

    mergedProductCategoriesIncludes () {
      return [
        ...this.defaultProductCategoriesIncludes,
        ...this.productCategoriesIncludes
      ]
    },

    defaultProductCategoriesWith () {
      return ['types.products.variants.orderForm.sections.fields', 'types.products.variants.variant', 'types.products.orderForm.sections.fields']
    },

    mergedProductCategoriesWith () {
      return [
        ...this.defaultProductCategoriesWith,
        ...this.productCategoriesWith
      ]
    },

    defaultButton () {
      return {
        text: 'Add Product',
        loading: 'Loading Products',
        type: 'success',
        size: 'large',
        plain: false,
        class: '',
        icon: ''
      }
    },

    mergedButton () {
      return {
        ...this.defaultButton,
        ...this.button
      }
    }
  },

  mounted () {
    this.getProductCategories()
  },

  methods: {
    getProductCategories () {
      if (this.shopData.collection_mappings_values) {
        var productCatId = this.shopData.collection_mappings_values['Product Categories Collection']
        api.get({
          path: 'collections/' + productCatId,
          params: { include: this.mergedProductCategoriesIncludes, with: this.mergedProductCategoriesWith }
        })
          .then((data) => {
            this.productCategories = data.data.types.data
            this.loading = false
          })
          .catch((error) => {
            this.loading = false
            this.errors = error
          })
      }
    },

    openModal () {
      this.$refs.innerModal.openModal()
    }
  }
}
</script>
