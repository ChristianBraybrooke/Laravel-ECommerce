<template lang="html">

    <div v-loading="loading">

        <el-row align="middle" type="flex">
            <el-col :span="12"><h1 class="page_title">Import / Export</h1></el-col>
        </el-row>

        <errors v-if="Object.keys(ImportExportErrors).length > 0" :errors="ImportExportErrors"></errors>

        <el-tabs v-model="currentTab">
            <el-tab-pane label="Import" name="import">
                <el-row>
                    <el-col :lg="24">
                        <el-button class="" @click="getImports" type="info" size="small" plain><i class="el-icon-refresh"></i></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :lg="12">
                        <el-table :data="imports"
                                  size="mini"
                                  :row-class-name="tableRowClassName"
                                  style="margin-bottom:50px;"
                                  :stripe="true">
                            <el-table-column
                              prop="id"
                              label="ID">
                            </el-table-column>
                            <el-table-column
                              prop="import_to"
                              label="Import To">
                            </el-table-column>
                            <el-table-column
                              prop="status"
                              label="Status">
                            </el-table-column>
                            <el-table-column
                              prop="rows_added"
                              label="Rows Added">
                            </el-table-column>
                            <el-table-column
                              prop="created_at.human"
                              label="Created At">
                            </el-table-column>

                        </el-table>
                    </el-col>
                </el-row>

                <el-form label-position="left"
                         :model="importForm"
                         ref="importForm"
                         label-width="120px">

                    <el-form-item label="Import Into" prop="import_into" :rules="[{ required: true, message: 'Import into field is required', trigger: 'blur' }]">
                        <el-select class="config_select" v-model="importForm.import_into" placeholder="Select" size="small">
                            <el-option label="Products"
                                       value="Product">
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

                    <el-button plain type="success" :loading="loading" @click="submitForm('importForm', 'imports')">Import</el-button>


                </el-form>

            </el-tab-pane>
            <el-tab-pane label="Export" name="export">

            </el-tab-pane>
        </el-tabs>

    </div>

</template>

<script>
import api from "../../services/api-service.js";
var throttle = require('lodash.throttle');

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
              importForm: {},
              imports: [],
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('ImportExport.vue Mounted.');
          this.getImports();
      },

      methods: {
        handleFilesChosen(data)
        {
            this.$set(this.importForm, data.id, data.files);
        },

        tableRowClassName({row, rowIndex}) {
            if (row.status === 'Failed') {
                return 'danger-row';
            } else if (row.status === 'Pending') {
                return 'warning-row';
            }
            return '';
        },

        handleFilesUnChosen(data)
        {
            this.$set(this.importForm, data.id, data.files);
        },

        getImports: throttle(function ()
        {
            this.loading = true;
            api.get({
                  path: 'imports',
              })
              .then(function (data) {
                  this.loading = false;
                  this.imports = data.data;
              }.bind(this))
              .catch(function (error) {
                  this.loading = false;
                  this.ImportExportErrors = error;
              }.bind(this));
        }),

        submitForm(ref, path)
        {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    this.ImportExportErrors = {};

                    api.persist("post", {
                          path: path,
                          object: this.importForm
                      })
                      .then(function (data) {
                          this.loading = false;
                          this.imports.unshift(data.data);
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

<style lang="scss">
    @import "../../sass/variables";

    .danger-row, .danger-row td {
        background: $--color-danger-light!important;
    }
    .warning-row, .warning-row td {
        background: $--color-warning-light!important;
    }
</style>
