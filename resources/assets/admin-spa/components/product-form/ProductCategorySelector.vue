<template>
  <div>
    <el-row
      :gutter="20">
      <el-col
        v-for="category in productCategories"
        :key="category.id"
        :md="12"
        class="product_category_box_wrap">
        <div
          class="product_category_box_inner"
          @click="() => { chosenProductCategory = category }">
          {{ category.name }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'ProductCategorySelector',

  props: {
    productCategories: {
      type: Array,
      required: false,
      default: () => { return [] }
    }
  },

  data () {
    return {
      chosenProductCategory: {}
    }
  },

  watch: {
    chosenProductCategory (category) {
      this.$emit('product-category-chosen', { category: category })
    }
  },

  methods: {
    //
  }
}
</script>
<style type="text/css">
  .product_category_box_inner {
      padding: 10px 5px;
      background: #efefef;
      margin: 10px 0px;
      cursor: pointer;
  }
</style>
