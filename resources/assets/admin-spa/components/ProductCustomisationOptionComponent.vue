<template lang="html">
  <div class="">
    <el-row :gutter="20">
      <el-col
        :lg="8"
        :md="24">
        <el-form-item
          label="Name"
          prop="name">
          <el-input
            :autofocus="true"
            v-model="productCustomisationOption.name"/>
        </el-form-item>
      </el-col>
      <el-col
        :lg="5"
        :md="24">
        <el-form-item
          label="Selector Img"
          prop="selector_img">

          <file-picker-modal
            v-if="objectHas(productCustomisationOption, 'selector_img')"
            ref="customisationSelectorFile"
            :current-files="objectHas(productCustomisationOption, 'selector_img.id') ? [productCustomisationOption.selector_img] : undefined"
            :name="productCustomisationOption + ' Selector Img'"
            :selectable="1"
            :show-btn="true"
            picker-id="selector_img"
            @filesChosen="handleFilesChosen"
            @filesUnChosen="handleFilesUnChosen"/>

        </el-form-item>
      </el-col>
      <el-col
        :lg="5"
        :md="24">
        <el-form-item
          label="Main Img"
          prop="main_img">

          <file-picker-modal
            v-if="objectHas(productCustomisationOption, 'main_img')"
            ref="customisationOptionFile"
            :current-files="objectHas(productCustomisationOption, 'main_img.id') ? [productCustomisationOption.main_img] : undefined"
            :name="productCustomisationOption + ' Main Img'"
            :selectable="1"
            :show-btn="true"
            picker-id="main_img"
            @filesChosen="handleFilesChosen"
            @filesUnChosen="handleFilesUnChosen"/>

        </el-form-item>
      </el-col>
      <el-col
        :lg="3"
        :md="24">
        <el-form-item
          label="Default"
          prop="default">
          <el-switch
            v-model="productCustomisationOption.default"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
        </el-form-item>
      </el-col>
      <el-col
        :lg="3"
        :md="24"
        class="customisation_option_delete_col">
        <el-form-item label="Actions">
          <el-button
            class="customisation_option_delete_btn"
            type="danger"
            size="mini"
            @click="deleteOption(productCustomisationOption)">Delete</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

  name: 'ProductCustomisationOptionComponent',

  components: {
    FilePickerModal: () => import(/* webpackChunkName: "file-picker-model" */'components/FilePickerModal')
  },

  props: {
    model: {
      type: Object,
      required: true
    }
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
    console.log('ProductCustomisationOptionComponent.vue mounted')
    this.productCustomisationOption = this.model
  },

  methods: {
    displayFilePicker (filePicker) {
      if (this.$refs[filePicker]) {
        this.$refs[filePicker].openModal()
      }
    },

    handleFilesChosen (data) {
      this.$set(this.productCustomisationOption, data.id, data.files)
    },

    handleFilesUnChosen (data) {
      this.$set(this.productCustomisationOption, data.id, data.files)
    },

    deleteOption (option) {
      this.$emit('optionDeleted', option)
    }
  }

}
</script>

<style lang="css">
</style>
