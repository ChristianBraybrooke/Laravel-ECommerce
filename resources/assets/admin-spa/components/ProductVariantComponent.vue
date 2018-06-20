<template lang="html">
    <div class="">
        <el-row :gutter="20">
            <el-col :lg="12" :md="24">
                <el-form-item label="Name" prop="name">
                    <el-input :autofocus="true" v-model="productVariant.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :lg="12" :md="24">
                <el-form-item label="Slug / Url" prop="slug">
                    <el-input v-model="productVariant.slug">
                        <template slot="prepend">{{ getSiteBaseURL }}products/</template>
                    </el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row :gutter="20">
           <el-col :md="24">
               <el-form-item label="Main Img" prop="main_img">
                   <file-picker-modal v-if="productVariant.main_img"
                                      :current-files="productVariant.main_img.id ? [productVariant.main_img] : undefined"
                                      @update:files="val => productVariant.main_img = val"
                                      :show-btn="true"
                                      name="Main Img"
                                      :selectable="1"
                                      picker-id="main_img">
                   </file-picker-modal>
               </el-form-item>
           </el-col>
        </el-row>
    </div>
</template>

<script>
export default {

      name: 'ProductVariantComponent',

      components: {
          FilePickerModal: () => import(/* webpackChunkName: "file-picker-modal" */'components/FilePickerModal'),
      },

      props: {
          model: {
              type: Object,
              required: true,
          },
      },

      data () {
          return {
              productVariant: {
                  main_img: []
              }
          }
      },

      mounted () {
          console.log('ProductVariantComponent.vue mounted');
          this.productVariant = this.model;
      },
}
</script>

<style lang="css">
</style>
