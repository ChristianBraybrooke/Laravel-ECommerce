<template lang="html">

    <div v-loading="loading">

        <el-row align="middle" type="flex">
            <el-col :span="12"><h1 class="page_title">Import / Export</h1></el-col>
        </el-row>

        <errors v-if="Object.keys(ImportExportErrors).length > 0" :errors="ImportExportErrors"></errors>

        <el-tabs v-model="currentTab">
            <el-tab-pane label="Import" name="import">


                <el-form label-position="left"
                         :model="importForm"
                         ref="importForm"
                         label-width="120px">

                    <el-form-item label="Import Into" prop="import_into" :rules="[{ required: true, message: 'Import into field is required', trigger: 'blur' }]">
                        <el-select class="config_select" v-model="importForm.import_into" placeholder="Select" size="small">
                            <el-option label="Products"
                                       value="products">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="Choose File" prop="import_files" :rules="[{ required: true, message: 'Import file is required', trigger: 'blur' }]">
                        <file-picker-modal ref="websiteWatermarkPicker"
                                           :current-files="undefined"
                                           :show-btn="true"
                                           v-on:filesChosen="handleFilesChosen"
                                           v-on:filesUnChosen="handleFilesUnChosen"
                                           name="File to Import"
                                           :selectable="1"
                                           picker-id="import_files">
                        </file-picker-modal>

                    </el-form-item>

                    <el-button plain type="success" :loading="loading" @click="submitForm('importForm', 'import')">Import</el-button>


                </el-form>



            </el-tab-pane>
            <el-tab-pane label="Export" name="export">

            </el-tab-pane>
        </el-tabs>

    </div>

</template>

<script>
import api from "../../services/api-service.js";

export default {

      name: 'ImportExport',

      components: {
          Errors: () => import('../../components/Errors'),
          FilePickerModal: () => import('../../components/FilePickerModal.vue')
      },

      props: {

      },

      data () {
          return {
              loading: false,
              ImportExportErrors: {},
              currentTab: 'import',
              importForm: {}
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('ImportExport.vue Mounted.')
      },

      methods: {
        handleFilesChosen(data)
        {
            this.$set(this.importForm, data.id, data.files);
        },

        handleFilesUnChosen(data)
        {
            this.$set(this.importForm, data.id, data.files);
        },
        submitForm(ref, path)
        {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.ImportExportErrors = {};

                    api.persist("post", {
                          path: path,
                          object: {
                              data: this.importForm
                          }
                      })
                      .then(function (data) {
                          this.loading = false;
                          this.importForm = {};
                      }.bind(this))
                      .catch(function (error) {
                          this.loading = false;
                          this.ImportExportErrors = error;
                      }.bind(this));
                } else {

                }
          });
        }
      },

}
</script>

<style lang="css">
</style>
