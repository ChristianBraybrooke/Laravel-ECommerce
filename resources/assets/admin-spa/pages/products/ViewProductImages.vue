<template lang="html">
  <div>
    <product-page-layout
      :product-id="productId"
      :current-page="'/products/' + productId + '/images'"
      :request-with="['media']">
      <template
        slot="product_page"
        slot-scope="props">

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="Main Img"
              prop="main_img">
              <file-picker-modal
                v-if="props.productForm.id"
                ref="mainImgFilePicker"
                :current-files="props.productForm.main_img ? [props.productForm.main_img] : undefined"
                :show-btn="true"
                :name="props.productForm.name + ' Main Img'"
                :selectable="1"
                picker-id="main_img"
                @update:files="val => props.productForm.main_img = val"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="Gallery"
              prop="gallery">
              <file-picker-modal
                v-if="props.productForm.gallery"
                ref="galleryFilePicker"
                :current-files="props.productForm.gallery.data ? props.productForm.gallery.data : undefined"
                :name="props.productForm.name + ' Gallery'"
                :show-btn="true"
                picker-id="gallery"
                @update:files="val => props.productForm.gallery.data = val"/>
            </el-form-item>
          </el-col>
        </el-row>

      </template>
    </product-page-layout>
  </div>
</template>

<script>

export default {

  name: 'ViewProductImages',

  components: {
    ProductPageLayout: () => import(/* webpackChunkName: "product-page-layout" */'./ProductPageLayout'),
    FilePickerModal: () => import(/* webpackChunkName: "file-picker-modal" */'components/FilePickerModal')
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
    console.log('ViewProductImages.vue mounted')
  },

  methods: {
    //
  }

}
</script>

<style lang="css" scoped>

</style>
