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
                   <el-button type="info" plain size="mini" @click="displayFilePicker('mainImgFilePicker')">Select File <i class="el-icon-document"></i></el-button>

                   <file-picker-modal v-if="productVariant"
                                      ref="mainImgFilePicker"
                                      :current-files="productVariant.main_img ? [productVariant.main_img] : undefined"
                                      v-on:filesChosen="handleFilesChosen"
                                      v-on:filesUnChosen="handleFilesUnChosen"
                                      name="Main Img"
                                      :selectable="1"
                                      picker-id="main_img"
                                      :open-on-mount="false">
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
          FilePickerModal: () => import('./FilePickerModal.vue'),
      },

      props: {
          model: {
              type: Object,
              required: true,
          },
      },

      data () {
          return {
              productVariant: {}
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('ProductVariantComponent.vue mounted');
          this.productVariant = this.model;
      },

      methods: {
        displayFilePicker(filePicker)
        {
            if(this.$refs[filePicker]) {
                this.$refs[filePicker].openModal();
            }
        },

        handleFilesChosen(data)
        {
            this.$set(this.productVariant, data.id, data.files);
        },

        handleFilesUnChosen(data)
        {
            this.$set(this.productVariant, data.id, data.files);
        },
      },
}
</script>

<style lang="css">
</style>
