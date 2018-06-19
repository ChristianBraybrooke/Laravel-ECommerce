<template lang="html">
    <div class="">
        <el-row :gutter="20">
            <el-col :lg="8" :md="24">
                <el-form-item label="Name" prop="name">
                    <el-input :autofocus="true" v-model="productCustomisationOption.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :lg="5" :md="24">
                <el-form-item label="Selector Img" prop="selector_img">

                    <file-picker-modal ref="customisationSelectorFile"
                                       :current-files="productCustomisationOption.selector_img ? [productCustomisationOption.selector_img] : undefined"
                                       v-on:filesChosen="handleFilesChosen"
                                       v-on:filesUnChosen="handleFilesUnChosen"
                                       :name="productCustomisationOption + ' Selector Img'"
                                       :selectable="1"
                                       :show-btn="true"
                                       picker-id="selector_img">
                    </file-picker-modal>

                </el-form-item>
            </el-col>
            <el-col :lg="5" :md="24">
                <el-form-item label="Main Img" prop="main_img">

                    <file-picker-modal ref="customisationOptionFile"
                                       :current-files="productCustomisationOption.main_img ? [productCustomisationOption.main_img] : undefined"
                                       v-on:filesChosen="handleFilesChosen"
                                       v-on:filesUnChosen="handleFilesUnChosen"
                                       :name="productCustomisationOption + ' Main Img'"
                                       :selectable="1"
                                       picker-id="main_img"
                                       :show-btn="true">
                    </file-picker-modal>

                </el-form-item>
            </el-col>
            <el-col :lg="3" :md="24">
                <el-form-item label="Default" prop="default">
                    <el-switch v-model="productCustomisationOption.default"
                               active-color="#13ce66"
                               inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
            </el-col>
            <el-col :lg="3" :md="24" class="customisation_option_delete_col">
                <el-form-item label="Actions">
                    <el-button class="customisation_option_delete_btn" type="danger" size="mini" @click="deleteOption(productCustomisationOption)">Delete</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {

      name: 'ProductCustomisationOptionComponent',

      components: {
          FilePickerModal: () => import(/* webpackChunkName: "file-picker-model" */'components/FilePickerModal'),
      },

      props: {
          model: {
              type: Object,
              required: true,
          },
      },

      data () {
          return {
              productCustomisationOption: {}
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('ProductCustomisationOptionComponent.vue mounted');
          this.productCustomisationOption = this.model;
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
              this.$set(this.productCustomisationOption, data.id, data.files);
          },

          handleFilesUnChosen(data)
          {
              this.$set(this.productCustomisationOption, data.id, data.files);
          },

          deleteOption(option)
          {
              this.$emit('optionDeleted', option);
          }
      },

}
</script>

<style lang="css">
</style>
