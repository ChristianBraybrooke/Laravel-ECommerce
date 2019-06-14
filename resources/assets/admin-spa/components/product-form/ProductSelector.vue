<template>
  <div>
    <el-row
      :gutter="20">
      <el-col
        v-for="product in products"
        :key="product.id"
        :md="12"
        class="product_category_box_wrap">
        <div
          class="product_category_box_inner"
          @click="() => { chosenProduct = product }">
          {{ product.name }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'ProductSelector',

  props: {
    products: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      chosenProduct: {}
    }
  },

  watch: {
    chosenProduct (product) {
      this.$emit('product-chosen', { product: product })
    }
  }
}
</script>
