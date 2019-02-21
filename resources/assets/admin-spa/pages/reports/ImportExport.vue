<template lang="html">

  <div v-loading="loading">

    <el-row
      align="middle"
      type="flex">
      <el-col :span="12"><h1 class="page_title">Import / Export</h1></el-col>
    </el-row>

    <errors
      v-if="Object.keys(ImportExportErrors).length > 0"
      :errors="ImportExportErrors"/>

    <el-tabs v-model="currentTab">
      <el-tab-pane
        label="Import"
        name="import">
        <el-row>
          <el-col :lg="24">
            <el-button
              class=""
              type="info"
              size="small"
              plain
              @click="getImports"><i class="el-icon-refresh"/></el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :lg="12">
            <el-table
              :data="imports"
              :row-class-name="tableRowClassName"
              :stripe="true"
              size="mini"
              style="margin-bottom:50px;">
              <el-table-column
                prop="id"
                label="ID"/>
              <el-table-column
                prop="import_to"
                label="Import To"/>
              <el-table-column
                prop="status"
                label="Status"/>
              <el-table-column
                prop="rows_added"
                label="Rows Added"/>
              <el-table-column
                prop="created_at.human"
                label="Created At"/>

            </el-table>
          </el-col>
        </el-row>

        <el-form
          ref="importForm"
          :model="importForm"
          label-position="left"
          label-width="120px">

          <el-form-item
            :rules="[{ required: true, message: 'Import into field is required', trigger: 'blur' }]"
            label="Import Into"
            prop="import_into">
            <el-select
              v-model="importForm.import_into"
              class="config_select"
              placeholder="Select"
              size="small">
              <el-option
                label="Products"
                value="Product"/>
              <el-option
                label="CollectionTypes"
                value="CollectionType"/>
            </el-select>
          </el-form-item>

          <el-form-item
            :rules="[{ required: true, message: 'Import file is required', trigger: 'blur' }]"
            label="Choose File"
            prop="import_files">
            <file-picker-modal
              ref="websiteWatermarkPicker"
              :current-files="undefined"
              :show-btn="true"
              :selectable="1"
              name="File to Import"
              picker-id="import_files"
              @filesChosen="handleFilesChosen"
              @filesUnChosen="handleFilesUnChosen"/>

          </el-form-item>

          <el-button
            :loading="loading"
            plain
            type="success"
            @click="submitForm('importForm', 'imports')">Import</el-button>

        </el-form>

      </el-tab-pane>
      <el-tab-pane
        label="Export"
        name="export">
        <el-form
          ref="exportForm"
          :model="exportForm"
          label-position="left"
          label-width="120px">

          <el-form-item
            :rules="[{ required: true, message: 'Export type field is required', trigger: 'blur' }]"
            label="Export Type"
            prop="export_type">
            <el-select
              v-model="exportForm.export_type"
              class="config_select"
              placeholder="Select"
              size="small">
              <el-option
                label="Orders"
                value="Order"/>
            </el-select>
          </el-form-item>

          <el-form-item
            :rules="[{ required: true, message: 'Export date range field is required', trigger: 'blur' }]"
            label="Export Date Range"
            prop="export_date_range"
            size="small">
            <el-date-picker
              v-model="exportForm.export_date_range"
              :picker-options="dateRangeOptions"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date"
              format="dd/MM/yyyy"
              value-format="dd-MM-yyyy"
              placeholder="dd/MM/yyyy"/>
          </el-form-item>

          <el-button
            :loading="loading"
            plain
            type="success"
            @click="submitForm('exportForm', 'exports')">Export</el-button>

        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from 'services/api-service'
var throttle = require('lodash.throttle')

export default {

  name: 'ImportExport',

  components: {
    Errors: () => import(/* webpackChunkName: "errors" */'components/Errors'),
    FilePickerModal: () => import(/* webpackChunkName: "file-picker-modal" */'components/FilePickerModal')
  },

  props: {

  },

  data () {
    return {
      loading: false,
      ImportExportErrors: {},
      exportForm: {},
      currentTab: 'import',
      importForm: {},
      imports: [],
      dateRangeOptions: {
        shortcuts: [
          {
            text: 'Last week',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Last month',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Last 3 months',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },

  computed: {

  },

  watch: {

  },

  mounted () {
    console.log('ImportExport.vue Mounted.')
    this.getImports()
  },

  methods: {
    handleFilesChosen (data) {
      this.$set(this.importForm, data.id, data.files)
    },

    tableRowClassName ({ row, rowIndex }) {
      if (row.status === 'Failed') {
        return 'danger-row'
      } else if (row.status === 'Pending') {
        return 'warning-row'
      }
      return ''
    },

    handleFilesUnChosen (data) {
      this.$set(this.importForm, data.id, data.files)
    },

    getImports: throttle(function () {
      this.loading = true
      api.get({
        path: 'imports'
      })
        .then(function (data) {
          this.loading = false
          this.imports = data.data
        }.bind(this))
        .catch(function (error) {
          this.loading = false
          this.ImportExportErrors = error
        }.bind(this))
    }),

    submitForm (ref, path) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.loading = true
          this.ImportExportErrors = {}

          api.persist('post', {
            path: path,
            object: this[ref]
          })
            .then(function (data) {
              this.loading = false
              this.imports.unshift(data.data)
              this.importForm = {}

              if (ref === 'exportForm') {
                this.$alert('Click below to download the file.', 'Export Completed', {
                  confirmButtonText: 'Download',
                  callback: action => {
                    window.location.replace(data.data.url)
                  }
                })
              }
            }.bind(this))
            .catch(function (error) {
              this.loading = false
              this.ImportExportErrors = error
            }.bind(this))
        } else {

        }
      })
    }
  }

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
