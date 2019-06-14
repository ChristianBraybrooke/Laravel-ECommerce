<template lang="html">
  <el-dialog
    :visible.sync="showModal">
    <template v-if="!editForm">
      <div
        @click="clearChosenProductCategory">
        {{ chosenProductCategory.name }}
      </div>

      <div
        v-if="chosenProduct !== chosenProductVariant"
        @click="clearChosenProduct">
        {{ chosenProduct.name }}
      </div>

      <div
        @click="clearChosenProductVariant">
        {{ chosenProductVariant.name }}
      </div>

      <transition
        name="slide-fade"
        mode="out-in"
        appear>
        <product-category-selector
          v-if="step === 1 && !chosenProductCategory.id"
          ref="categorySelector"
          :product-categories="productCategories"
          @product-category-chosen="handleProductCategoryChosen"/>

        <product-selector
          v-if="step === 2"
          ref="productSelector"
          key="1"
          :products="chosenProductCategoryProducts"
          @product-chosen="handleProductChosen"/>

        <product-selector
          v-if="step === 3"
          ref="productVariantSelector"
          key="2"
          :products="chosenProductCategoryProductVariants"
          @product-chosen="handleProductVariantChosen" />

        <product-customisation-form
          v-if="step === 4"
          ref="ProductCustomisationForm"
          :product="chosenProductVariant" />
      </transition>

    </template>
  </el-dialog>
</template>
<script type="text/javascript">
import ProductCategorySelector from './ProductCategorySelector'
import ProductSelector from './ProductSelector'
import ProductCustomisationForm from './ProductCustomisationForm'

export default {
  name: 'ProductAddInnerModal',

  components: {
    ProductCategorySelector,
    ProductSelector,
    ProductCustomisationForm
  },

  props: {
    editForm: {
      type: Boolean,
      required: false,
      default: () => { return false }
    },

    productCategories: {
      type: Array,
      required: false,
      default: () => { return [] }
    }
  },

  data () {
    return {
      showModal: false,
      step: 1,
      chosenProductCategory: {},
      chosenProduct: {},
      chosenProductVariant: {}
    }
  },

  computed: {
    chosenProductCategoryProducts () {
      if (this.chosenProductCategory.products) {
        return this.chosenProductCategory.products.data
      }
      return []
    },

    chosenProductCategoryProductVariants () {
      if (this.chosenProduct.variants) {
        return this.chosenProduct.variants.data
      }
      return []
    }
  },

  methods: {
    openModal () {
      this.showModal = true
    },

    closeModal () {
      this.showModal = false
    },

    handleProductCategoryChosen (data) {
      this.chosenProductCategory = data.category
      this.step = 2
    },

    handleProductChosen (data) {
      this.chosenProduct = data.product
      if (this.chosenProduct.variants.data.length === 0) {
        this.handleProductVariantChosen({ product: this.chosenProduct })
      } else {
        this.step = 3
      }
    },

    handleProductVariantChosen (data) {
      this.chosenProductVariant = data.product
      this.step = 4
    },

    clearChosenProductCategory (navigate = true) {
      this.chosenProductCategory = {}
      this.clearChosenProduct(false)
      if (navigate) {
        this.step = 1
      }
    },

    clearChosenProduct (navigate = true) {
      this.chosenProduct = {}
      this.clearChosenProductVariant(false)
      if (navigate) {
        this.step = 2
      }
    },

    clearChosenProductVariant (navigate = true) {
      this.chosenProductVariant = {}
      if (navigate) {
        this.step = 3
      }
    }
  }
}
</script>
