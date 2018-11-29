<template lang="html">

  <div v-loading="loading">

    <div v-if="mergedTableOptions.showHeader">

      <el-row align="middle">
        <el-col
          v-if="mergedTableOptions.showTitle"
          :sm="(mergedTableOptions.showNewBtn || mergedTableOptions.showRefreshBtn) ? 12 : 24"><h1 class="page_title">{{ capitalTypeNamePlural }}</h1></el-col>
        <el-col
          v-if="mergedTableOptions.bulkOptions.length === 0 && !mergedTableOptions.showTitle && mergedTableOptions.showSearch"
          :sm="12">
          <el-input
            v-if="mergedTableOptions.showSearch"
            v-model="search"
            placeholder="Search">
            <i
              slot="prefix"
              class="el-input__icon el-icon-search"/>
          </el-input>
        </el-col>
        <el-col :sm="mergedTableOptions.showTitle ? 12 : 24">
          <slot name="createButton">
            <el-button
              v-if="mergedTableOptions.showNewBtn"
              class="create_btn"
              type="primary"
              plain
              @click="handleCreateData">New {{ capitalTypeName }}</el-button>
          </slot>
          <el-button
            v-if="mergedTableOptions.showRefreshBtn"
            class="refresh_btn"
            type="info"
            plain
            @click="getData"><i class="el-icon-refresh"/></el-button>
        </el-col>
      </el-row>

      <hr
        v-if="mergedTableOptions.showHeadHr"
        class="page_hr">

    </div>

    <errors
      v-if="Object.keys(dataErrors).length > 0"
      :errors="dataErrors"/>

    <el-row
      v-if="mergedTableOptions.bulkOptions.length >= 1 || mergedTableOptions.showSearch && mergedTableOptions.showTitle"
      class="table_header">
      <el-col
        :lg="4"
        :md="8"
        :sm="12"
        :xs="16">
        <el-select
          v-model="bulkOptionValue"
          class="bulk_select"
          size="large"
          placeholder="Bulk actions">
          <el-option
            v-for="item in mergedTableOptions.bulkOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-col>
      <el-col
        :lg="2"
        :md="2"
        :sm="12"
        :xs="8">
        <el-button
          v-if="mergedTableOptions.bulkOptions.length >= 1"
          :disabled="bulkOptionsDisabled"
          class="apply_btn"
          type="success"
          plain
          @click="handleBulkOptionsApply">Apply</el-button>
      </el-col>
      <el-col
        :lg="{span: 8, offset: 10}"
        :md="{span: 8, offset: 6}"
        class="table_search_col">
        <el-input
          v-if="mergedTableOptions.showSearch"
          v-model="search"
          placeholder="Search">
          <i
            slot="prefix"
            class="el-input__icon el-icon-search"/>
        </el-input>
      </el-col>
    </el-row>

    <el-row
      class="table_meta"
      type="flex">
      <el-col>
        <small>Showing: <strong>{{ Data ? Data.length : '' }}</strong> of <strong>{{ paginationMeta.total }}</strong></small>
      </el-col>
    </el-row>

    <el-table
      :data="Data"
      :stripe="mergedTableOptions.stripe"
      :border="mergedTableOptions.stripe"
      :row-style="tableRowStyle"
      :row-class-name="tableRowClass"
      :cell-style="tableCellStyle"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @header-dragend="tableColWidthChanged">

      <el-table-column
        type="selection"
        width="55"/>

      <el-table-column
        v-for="(col, key) in mergedTableOptions.collumns"
        :key="key"
        :prop="col.prop"
        :width="getColumnWidth(col)"
        :formatter="col.formatter ? col.formatter : null"
        :label="col.label"
        sortable/>

      <el-table-column
        label="Actions">
        <template slot-scope="scope">

          <slot
            :row="scope.row"
            :delete="deleteData"
            :edit-path-formated="editPathFormated"
            name="actionButtons">
            <router-link
              v-if="mergedTableOptions.viewText"
              :to="{ path: editPathFormated + '/' + scope.row.id }">
              <el-button
                size="mini"
                class="action_btn view_btn">{{ mergedTableOptions.viewText }}
              </el-button>
            </router-link>

            <el-button
              v-if="mergedTableOptions.deleteText"
              size="mini"
              type="danger"
              class="action_btn delete_btn"
              @click="deleteData(scope.row)">{{ mergedTableOptions.deleteText }}
            </el-button>
          </slot>
        </template>
      </el-table-column>
    </el-table>

    <el-row class="table_footer">
      <el-col>
        <el-pagination
          :page-sizes="perPages"
          :page-size="paginationMeta.perPage"
          :total="paginationMeta.total"
          layout="sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"/>
      </el-col>
    </el-row>

    <el-dialog
      :title="'Create New ' + capitalTypeName"
      :visible.sync="dialogVisible"
      :width="fullModal ? '100%' : '70%'"
      :fullscreen="fullModal">

      <errors
        v-if="Object.keys(createErrors).length > 0"
        :errors="createErrors"/>

      <el-form
        ref="createForm"
        :rules="createFormRules"
        :model="createFormData"
        label-position="top"
        @submit.native.prevent
        @keyup.enter.native="createData">

        <slot
          :model="createFormData"
          name="createForm">

          <el-form-item
            :label="capitalTypeName + ' name'"
            prop="name">
            <el-input
              :autofocus="true"
              v-model="createFormData.name"
              auto-complete="off"/>
          </el-form-item>

          <el-form-item prop="live">
            <el-checkbox-group v-model="createFormData.live">
              <el-checkbox
                label="Live"
                name="live"/>
            </el-checkbox-group>
          </el-form-item>

        </slot>

      </el-form>

      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="clearCreateData">Cancel</el-button>
        <el-button
          type="primary"
          @click="createData">Create</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="queueModalTitle"
      :visible.sync="queueDialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      :close-on-press-escape="false"
      width="30%">

      <h1 style="text-align:center;"><i class="el-icon-loading"/></h1>
      <h3 style="text-align:center;">{{ queueModalMessage }}</h3>

      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="queueDialogVisible = false">Close</el-button>
        <el-button
          :disabled="queueModalBtnDisabled"
          type="primary"
          @click="handleQueueModalAction">{{ queueModalBtn }}</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import { mapActions } from 'vuex'
import api from 'services/api-service.js'
import columnUtil from 'utils/collumn'
var throttle = require('lodash.throttle')
var findKey = require('lodash.findkey')

export default {
  name: 'DataTable',

  components: {
    Errors: () => import(/* webpackChunkName: "errors" */'components/Errors')
  },

  props: {
    typeName: {
      type: String,
      required: true
    },
    typeNamePlural: {
      type: String,
      required: false,
      default () {
        return this.typeName + 's'
      }
    },
    requestWith: {
      type: [String, Array],
      required: false,
      default () {

      }
    },
    requestIncludes: {
      type: [String, Array],
      required: false,
      default () {
        return []
      }
    },
    baseUrl: {
      type: String,
      required: false,
      default () {
        return this.typeNamePlural
      }
    },
    bulkUpdateUrl: {
      type: String,
      required: false,
      default () {

      }
    },
    editPath: {
      type: String,
      required: false,
      default () {
        return null
      }
    },
    fullModal: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    tableOptions: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    withParams: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    createForm: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    createFormRules: {
      type: Object,
      required: false,
      default () {
        return {
          name: [
            { required: true, message: this.typeName + ' name is required', trigger: 'blur' },
            { min: 3, max: 200, message: this.typeName + ' length should be more than 3 characters', trigger: 'blur' }
          ]
        }
      }
    }
  },

  data () {
    return {
      Data: [],
      createFormData: this.createForm,
      paginationMeta: {
        total: 0,
        perPage: 0,
        orderBy: 'id',
        ascending: 0,
        currentPage: 1
      },
      mergedTableOptions: {
        bulkOptions: []
      },
      defaultTableOptions: {
        border: true,
        stripe: true,
        showSearch: true,
        showHeader: true,
        showNewBtn: true,
        showRefreshBtn: true,
        showHeadHr: true,
        showTitle: true,
        viewText: 'View',
        deleteText: 'Delete',
        collumns: [
          {
            prop: 'id',
            sortable: true,
            label: 'ID',
            align: 'left',
            resizable: false
          },
          {
            prop: 'name',
            sortable: true,
            label: 'Name',
            align: 'left',
            resizable: false
          },
          {
            prop: 'created_at.human',
            sortable: true,
            label: 'Created',
            align: 'left',
            resizable: false
          },
          {
            prop: 'live_at.live',
            sortable: false,
            label: 'Live',
            align: 'left',
            formatter: function (row, column, cellValue) {
              return row.live_at.live ? <i class="el-icon-check"></i> : <i class="el-icon-close"></i>
            },
            resizable: true
          }
        ],
        bulkOptions: [
          {
            value: 'delete',
            label: 'Delete'
          },
          {
            value: 'draft',
            label: 'Mark Draft'
          },
          {
            value: 'live',
            label: 'Mark Live'
          }
        ]
      },
      shopData: {},
      queueModalBtnDisabled: true,
      queueDialogVisible: false,
      bulkOptionValue: null,
      bulkSelected: [],
      search: '',
      dataErrors: {},
      loading: false,
      dialogVisible: false,
      createErrors: {}
    }
  },

  computed: {

    perPages () {
      var total = this.paginationMeta.total
      return (total <= 15) ? [15] : (total <= 30) ? [15, 30] : (total <= 100) ? [15, 30, 100] : [15, 30, 100, 250]
    },

    bulkOptionsDisabled () {
      if (this.bulkSelected.length >= 1 && this.bulkOptionValue) {
        return false
      }
      return true
    },

    editPathFormated () {
      return this.editPath ? this.editPath : this.typeNamePlural
    },

    queueModalTitle () {
      if (this.bulkOptionValue) {
        // var str = this.bulkOptionValue;
        // str = str.replace(/_/g, ' ');
        // return this.capitalize(str);
      }

      return ''
    },

    queueModalMessage () {
      var key = findKey(this.mergedTableOptions.bulkOptions, ['value', this.bulkOptionValue])

      if (key) {
        return this.mergedTableOptions.bulkOptions[key].queue_message
      }

      return ''
    },

    queueModalBtn () {
      var key = findKey(this.mergedTableOptions.bulkOptions, ['value', this.bulkOptionValue])

      if (key) {
        return this.mergedTableOptions.bulkOptions[key].queue_action
      }

      return ''
    },

    capitalTypeName () {
      return this.capitalize(this.typeName)
    },

    capitalTypeNamePlural () {
      return this.capitalize(this.typeNamePlural)
    },

    colourRules () {
      return this.objectHas(this.ecommerceConfig, `col_colours.${this.typeNamePlural}`) ? this.ecommerceConfig.col_colours[this.typeNamePlural] : []
    },

    additonalCols () {
      return this.objectHas(this.ecommerceConfig, `aditional_cols.${this.typeNamePlural}`) ? this.ecommerceConfig.aditional_cols[this.typeNamePlural] : []
    },

    tableDataFromStorage () {
      var tableData = window.localStorage.getItem('commerceTableData')
      return tableData ? JSON.parse(tableData) : {}
    },

    thisTableDataFromStorage () {
      var newObj = {}
      newObj[this.typeName] = {}
      return this.tableDataFromStorage[this.typeName] ? this.tableDataFromStorage[this.typeName] : newObj
    }
  },

  watch: {
    search: function (value) {
      this.handleSearchChange(value)
    }
  },

  mounted () {
    console.log('DataTable.vue Mounted.')
    Object.assign(this.mergedTableOptions, this.defaultTableOptions, this.tableOptions)
    this.paginationMeta.perPage = this.thisTableDataFromStorage.perPage
    this.getData()
  },

  methods: {

    ...mapActions([
      'setShopData'
    ]),

    /**
     * Retrieve the data from the server.
     *
     * @return void
     */
    getData: throttle(function () {
      this.loading = true
      this.dataErrors = {}

      const params = Object.assign(this.withParams, {
        with: this.requestWith,
        include: this.requestIncludes,
        limit: this.paginationMeta.perPage,
        ascending: this.paginationMeta.ascending,
        orderBy: this.paginationMeta.orderBy,
        page: this.paginationMeta.currentPage,
        search: this.search
      })

      api.get({
        path: this.baseUrl ? this.baseUrl : this.typeName,
        params: params
      })
        .then(function (data) {
          this.Data = data.data
          this.setShopData(data.shop_data)
          this.shopData = data.shop_data
          this.paginationMeta = {
            total: data.meta.total,
            perPage: parseInt(data.meta.per_page),
            currentPage: data.meta.current_page
          }
          this.loading = false
        }.bind(this))
        .catch(function (errors) {
          this.dataErrors = errors
          this.loading = false
        }.bind(this))
    }, 1000),

    /**
     * Update the data on the server.
     *
     * @param Object object
     * @param Bool modal
     * @return void
     */
    updateData (object, modal) {
      this.loading = true

      api.persist('post', {
        path: this.bulkUpdateUrl ? this.bulkUpdateUrl : this.typeName + '/bulk',
        object: {
          data: object,
          action: this.bulkOptionValue
        }
      })
        .then(function (data) {
          this.getData()

          this.$message({
            message: data.message,
            type: 'success',
            showClose: true
          })

          if (modal) {
            this.queueDialogVisible = true
          }

          this.loading = false
        }.bind(this))
        .catch(function (errors) {
          this.dataErrors = errors
          this.loading = false
        }.bind(this))
    },

    /**
     * Delete data on the server.
     *
     * @param Int index
     * @param Object row
     * @return void
     */
    deleteData (row) {
      this.dataErrors = {}

      api.delete({
        path: (this.baseUrl ? this.baseUrl : this.typeName) + '/' + row.id
      })
        .then(function () {
          this.Data.splice(this.Data.indexOf(row), 1)
          this.dataErrors = {}
          this.paginationMeta.total = this.paginationMeta.total - 1

          this.$message({
            message: 'Successfully deleted ' + this.typeName + ': ' + row.name,
            type: 'success',
            showClose: true
          })
        }.bind(this))
        .catch(function (errors) {
          this.dataErrors = errors
        }.bind(this))
    },

    /**
     * Clear the create form after submission or cancel.
     *
     * @return void
     */
    clearCreateData () {
      this.dialogVisible = false
      this.createErrors = {}
      this.$refs.createForm.resetFields()
    },

    /**
     * Send the creat form data to the server.
     *
     * @return void
     */
    createData () {
      this.$refs.createForm.validate((valid) => {
        if (valid) {
          this.createFormData.with = this.requestWith
          this.createFormData.include = this.requestIncludes

          api.persist('post', {
            path: this.baseUrl ? this.baseUrl : this.typeName,
            object: this.createFormData
          })
            .then(function (data) {
              this.addModel(data)
              this.dialogVisible = false
              this.clearCreateData()

              this.$message({
                message: 'Successfully created ' + this.typeName + ': ' + data.data.name,
                type: 'success',
                showClose: true
              })
            }.bind(this))
            .catch(function (errors) {
              this.createErrors = errors
            }.bind(this))
        } else {

        }
      })
    },

    /**
     * Add a modal to the table.
     *
     * @param Object data
     * @return void
     */
    addModel (data) {
      this.Data.unshift(data.data)

      if (this.Data) {
        if (this.Data.length > this.paginationMeta.perPage) {
          this.Data.splice(this.paginationMeta.perPage)
        }
      }

      this.paginationMeta.total = this.paginationMeta.total + 1
    },

    /**
     * Handle a selection event on the table.
     *
     * @param Object evt
     * @return void
     */
    handleSelectionChange (evt) {
      this.bulkSelected = evt
    },

    /**
     * Handle a size change event on the table.
     *
     * @param Int perPage
     * @return void
     */
    handleSizeChange (perPage) {
      this.paginationMeta.perPage = perPage
      this.saveLocalData('perPage', perPage)
      this.getData()
    },

    /**
     * Handle a page change event on the table.
     *
     * @param Int page
     * @return void
     */
    handlePageChange (page) {
      this.paginationMeta.currentPage = page
      this.getData()
    },

    /**
     * Handle a sort change event on the table.
     *
     * @param Object change
     * @return void
     */
    handleSortChange (change) {
      console.log(change)
      this.paginationMeta.ascending = change.order === 'ascending' ? 1 : 0
      this.paginationMeta.orderBy = change.prop ? change.prop : 'id'

      this.getData()
    },

    /**
     * Handle a search change event on the table.
     *
     * @param String value
     * @return void
     */
    handleSearchChange (value) {
      this.paginationMeta.currentPage = 1
      this.getData()
    },

    /**
     * Handle a bulk options apply event on the table.
     *
     * @return void
     */
    handleBulkOptionsApply () {
      var modal = false

      if (this.bulkOptionValue.action) {
        this.bulkOptionValue.action(this.Data, this.shopData, this.bulkSelected)
      } else {
        this.updateData(this.bulkSelected, modal)
      }
    },

    /**
     * Handle a queue modal action.
     *
     * @return void
     */
    handleQueueModalAction () {

    },

    /**
     * Handle when the user clicks on the "create" btn.
     *
     * @return void
     */
    handleCreateData () {
      this.dialogVisible = true
      this.$emit('createNew', this.Data)
    },

    tableRowStyle ({ row, rowIndex }) {
      var rowColour = columnUtil.getRowColour(this.colourRules, row)

      return `background: ${rowColour}!important`
    },

    tableCellStyle ({ row, column, rowIndex, columnIndex }) {
      var colour = columnUtil.getColColour(this.additonalCols, column, row)
      return colour ? `background: ${colour}!important` : null
    },

    tableRowClass ({ row, rowIndex }) {
      var rowHasColour = columnUtil.getRowColour(this.colourRules, row)

      if (!rowHasColour) {
        return ''
      }
      return 'rowHasColour'
    },

    tableColWidthChanged (newWidth, oldWidth, column, event) {
      var thisTableData = this.thisTableDataFromStorage

      var newWidthColumn = {}
      newWidthColumn[column.property] = newWidth

      if (!thisTableData.columns) {
        thisTableData.columns = {}
      }

      thisTableData.columns = {
        ...thisTableData.columns,
        ...newWidthColumn
      }

      this.saveLocalData('columns', thisTableData.columns)
    },

    saveLocalData (key, value) {
      var tableData = this.tableDataFromStorage

      if (!tableData[this.typeName]) {
        tableData[this.typeName] = {}
      }
      tableData[this.typeName][key] = value

      window.localStorage.setItem('commerceTableData', JSON.stringify(tableData))
    },

    getColumnWidth (column) {
      var thisTableData = this.thisTableDataFromStorage

      if (thisTableData.columns) {
        if (thisTableData.columns[column.prop]) {
          return thisTableData.columns[column.prop]
        }
      }
      return column.width
    }

  }
}
</script>

<style lang="css">
.el-table--striped .el-table__body tr.rowHasColour.el-table__row--striped td {
    background-color: initial!important;
}
.el-table--enable-row-hover .el-table__body tr.rowHasColour:hover > td {
    background-color: initial!important;
}
.table_col_list {
    font-size: 12px;
    line-height: 1.2;
}
.inline_col_list {
    margin-block-start: 0;
    padding-inline-start: 0px;
}
.inline_col_list li:not(:first-child) {
    border-top: dashed 0.5px;
    padding-top: 5px;
    margin-top: 5px;
}
</style>
