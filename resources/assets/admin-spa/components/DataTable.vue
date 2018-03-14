<template lang="html">

    <div v-loading="loading">

        <div v-if="tableOptions.showHeader">

            <el-row align="middle">
              <el-col :sm="(tableOptions.showNewBtn || tableOptions.showRefreshBtn) ? 12 : 24" v-if="tableOptions.showTitle"><h1 class="page_title">{{ capitalTypeNamePlural }}</h1></el-col>
              <el-col v-if="tableOptions.bulkOptions.length === 0 && !tableOptions.showTitle && tableOptions.showSearch" :sm="12">
                  <el-input placeholder="Search"
                            v-if="tableOptions.showSearch"
                            v-model="search">
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
              </el-col>
              <el-col :sm="tableOptions.showTitle ? 12 : 24">
                <el-button v-if="tableOptions.showNewBtn" @click="handleCreateData" class="create_btn" type="primary" plain>New {{ capitalTypeName }}</el-button>
                <el-button v-if="tableOptions.showRefreshBtn" class="refresh_btn" @click="getData" type="info" plain><i class="el-icon-refresh"></i></el-button>
              </el-col>
            </el-row>

            <hr class="page_hr" v-if="tableOptions.showHeadHr">

        </div>

        <errors v-if="Object.keys(dataErrors).length > 0" :errors="dataErrors"></errors>

        <el-row class="table_header" v-if="tableOptions.bulkOptions.length >= 1 || tableOptions.showSearch && tableOptions.showTitle">
            <el-col :lg="4" :md="8" :sm="12" :xs="16">
              <el-select class="bulk_select" size="large" v-model="bulkOptionValue" placeholder="Bulk actions">
                <el-option
                  v-for="item in tableOptions.bulkOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item">
                </el-option>
              </el-select>
            </el-col>
            <el-col :lg="2" :md="2" :sm="12" :xs="8">
              <el-button @click="handleBulkOptionsApply" :disabled="bulkOptionsDisabled" class="apply_btn" type="success" plain v-if="tableOptions.bulkOptions.length >= 1">Apply</el-button>
            </el-col>
            <el-col :lg="{span: 8, offset: 10}" :md="{span: 8, offset: 6}" class="table_search_col">
                <el-input placeholder="Search"
                          v-if="tableOptions.showSearch"
                          v-model="search">
                          <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </el-col>
        </el-row>

        <el-row class="table_meta" type="flex">
            <el-col>
                <small>Showing: <strong>{{ Data ? Data.length : '' }}</strong> of <strong>{{ paginationMeta.total }}</strong></small>
            </el-col>
        </el-row>

        <el-table
            :data="Data"
            :stripe="tableOptions.stripe"
            :border="tableOptions.stripe"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @sort-change="handleSortChange">

            <el-table-column
                type="selection"
                width="55">
            </el-table-column>

            <template v-for="col in tableOptions.collumns">
                <el-table-column
                    :prop="col.prop"
                    :formatter="col.formatter ? col.formatter : null"
                    sortable
                    :label="col.label">
                </el-table-column>
            </template>

            <el-table-column
                label="Actions">
                <template slot-scope="scope">

                    <router-link :to="{ path: editPathFormated + '/' + scope.row.id }" v-if="tableOptions.viewText">
                        <el-button
                          size="mini"
                          class="action_btn view_btn">{{ tableOptions.viewText }}
                        </el-button>
                    </router-link>

                    <el-button
                      v-if="tableOptions.deleteText"
                      size="mini"
                      type="danger"
                      class="action_btn delete_btn"
                      @click="deleteData(scope.$index, scope.row)">{{ tableOptions.deleteText }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-row class="table_footer">
            <el-col>
                <el-pagination
                    :page-sizes="perPages"
                    :page-size="paginationMeta.perPage"
                    layout="sizes, prev, pager, next"
                    :total="paginationMeta.total"
                    v-on:size-change="handleSizeChange"
                    v-on:current-change="handlePageChange">
                </el-pagination>
            </el-col>
        </el-row>


        <el-dialog
            :title="'Create New ' + capitalTypeName"
            :visible.sync="dialogVisible"
            :width="fullModal ? '100%' : '40%'"
            :fullscreen="fullModal">

            <errors v-if="Object.keys(createErrors).length > 0" :errors="createErrors"></errors>

            <el-form label-position="top" :rules="createFormRules" ref="createForm" :model="createFormData" @submit.native.prevent @keyup.enter.native="createData">

              <slot name="createForm" :model="createFormData">

                <el-form-item :label="capitalTypeName + ' name'" prop="name">
                  <el-input :autofocus="true" v-model="createFormData.name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item prop="live">
                  <el-checkbox-group v-model="createFormData.live">
                    <el-checkbox label="Live" name="live"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>


              </slot>

            </el-form>

            <span slot="footer" class="dialog-footer">
              <el-button v-on:click="clearCreateData">Cancel</el-button>
              <el-button type="primary" v-on:click="createData">Create</el-button>
            </span>
        </el-dialog>

        <el-dialog
            :title="queueModalTitle"
            :visible.sync="queueDialogVisible"
            :close-on-click-modal="false"
            :show-close="false"
            :close-on-press-escape="false"
            width="30%">

            <h1 style="text-align:center;"><i class="el-icon-loading"></i></h1>
            <h3 style="text-align:center;">{{ queueModalMessage }}</h3>


            <span slot="footer" class="dialog-footer">
              <el-button @click="queueDialogVisible = false">Close</el-button>
              <el-button type="primary" :disabled="queueModalBtnDisabled" @click="handleQueueModalAction">{{ queueModalBtn }}</el-button>
            </span>
        </el-dialog>

    </div>


</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import api from '../services/api-service.js';
import router from '../router';
var throttle = require('lodash.throttle');
var bind = require('lodash.bind');
var findKey = require('lodash.findkey');



export default {
  name: 'DataTable',

  components: {
    Errors: () => import('./Errors.vue')
  },

  mounted() {
    console.log('DataTable.vue Mounted.');
    this.getData();
  },

  watch: {
    search: function (value) {
        this.handleSearchChange(value);
    }
  },

  props: {
      typeName: {
          type: String,
          required: true,
      },
      typeNamePlural: {
          type: String,
          required: false,
          default () {
              return this.typeName + 's'
          }
      },
      requestWith: {
          type: String,
          required: false,
          default () {

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
              return false;
          }
      },
      tableOptions: {
          type: Object,
          required: false,
          default() {
              return {
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
                          resizable: true
                      },
                      {
                          prop: 'name',
                          sortable: true,
                          label: 'Name',
                          align: 'left',
                          resizable: true
                      },
                      {
                          prop: 'created_at.human',
                          sortable: true,
                          label: 'Created',
                          align: 'left',
                          resizable: true
                      },
                      {
                          prop: 'live_at.live',
                          sortable: true,
                          label: 'Live',
                          align: 'left',
                          formatter: function(row, column, cellValue) {
                              return row.live_at.live ? <i class="el-icon-check"></i> : <i class="el-icon-close"></i>;
                          },
                          resizable: true
                      },
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
                      },
                  ],
              }
          }
      },
      createForm: {
          type: Object,
          required: false,
          default() {
              return {

              }
          }
      },
      createFormRules: {
          type: Object,
          required: false,
          default() {
              return {
                  name: [
                    { required: true, message: this.typeName + ' name is required', trigger: 'blur' },
                    { min: 3, max: 200, message: this.typeName + ' length should be more than 3 characters', trigger: 'blur' }
                  ],
              }
          }
      },
  },

  data() {
    return {
      Data: [],
      createFormData: this.createForm,
      paginationMeta: {
        total: 0,
        perPage: 0,
        orderBy: 'id',
        ascending: 0,
        currentPage: 1,
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
      createErrors: {},
    }
  },

  computed: {

      perPages()
      {
          var total = this.paginationMeta.total;
          return  (total <= 15 ) ? [15] : (total <= 30 ) ? [15, 30] : (total <= 100 ) ?  [15, 30, 100] : [15, 30, 100, 250];
      },

      bulkOptionsDisabled()
      {
          if (this.bulkSelected.length >= 1 && this.bulkOptionValue) {
            return false;
          }
          return true
      },

      editPathFormated()
      {
          return this.editPath ? this.editPath : this.typeNamePlural;
      },

      queueModalTitle()
      {
          if(this.bulkOptionValue) {
              // var str = this.bulkOptionValue;
              // str = str.replace(/_/g, ' ');
              // return this.capitalize(str);
          }

          return '';
      },

      queueModalMessage()
      {
          var key = findKey(this.tableOptions.bulkOptions, ['value', this.bulkOptionValue]);

          if (key) {
            return this.tableOptions.bulkOptions[key].queue_message;
          }

          return '';

      },

      queueModalBtn()
      {
          var key = findKey(this.tableOptions.bulkOptions, ['value', this.bulkOptionValue]);

          if (key) {
            return this.tableOptions.bulkOptions[key].queue_action;
          }

          return '';

      },

      capitalTypeName()
      {
          return this.capitalize(this.typeName);
      },

      capitalTypeNamePlural()
      {
          return this.capitalize(this.typeNamePlural)
      },
  },

  methods: {

    ...mapActions([
        'setShopData',
    ]),

    capitalize(str)
    {
        var lower = str.toLowerCase();
        return lower.replace(/(^| )(\w)/g, function(x) {
          return x.toUpperCase();
        });
    },

    /**
     * Retrieve the data from the server.
     *
     * @return void
     */
    getData: throttle(function ()
    {
        this.loading = true;
        this.dataErrors = {};

        api.get({
          path: this.baseUrl ? this.baseUrl : this.typeName,
          params: {
            with: this.requestWith,
            limit: this.paginationMeta.perPage,
            ascending: this.paginationMeta.ascending,
            orderBy: this.paginationMeta.orderBy,
            page: this.paginationMeta.currentPage,
            search: this.search
          }
        })
        .then(function (data) {
            this.Data = data.data;
            this.setShopData(data.shop_data)
            this.shopData = data.shop_data;
            this.paginationMeta = {
                total: data.meta.total,
                perPage: parseInt(data.meta.per_page),
                currentPage: data.meta.current_page
            };
            this.loading = false;
        }.bind(this))
        .catch(function (errors) {
            this.dataErrors = errors;
            this.loading = false;
        }.bind(this));
    }, 1000),

    /**
     * Update the data on the server.
     *
     * @param Object object
     * @param Bool modal
     * @return void
     */
    updateData(object, modal)
    {
        this.loading = true;

        api.persist('post', {
            path: this.bulkUpdateUrl ? this.bulkUpdateUrl : this.typeName + '/bulk',
            object: {
              data: object,
              action: this.bulkOptionValue,
            }
        })
        .then(function (data) {
            this.getData();

            this.$message({
              message: data.message,
              type: 'success',
              showClose: true,
            });

            if (modal) {
                this.queueDialogVisible = true;
            }

            this.loading = false;

        }.bind(this))
        .catch(function (errors) {
            this.dataErrors = errors;
            this.loading = false;
        }.bind(this))
    },
    
    /**
     * Delete data on the server.
     *
     * @param Int index
     * @param Object row
     * @return void
     */
    deleteData(index, row)
    {
        this.dataErrors = {};

        api.delete({
          path: (this.baseUrl ? this.baseUrl : this.typeName) + '/' + row.id,
        })
        .then(function () {
            this.Data.splice(this.Data.indexOf(row), 1);
            this.dataErrors = {};
            this.paginationMeta.total = this.paginationMeta.total - 1;

            this.$message({
              message: 'Successfully deleted '+ this.typeName +': ' + row.name,
              type: 'success',
              showClose: true,
            });


        }.bind(this))
        .catch(function (errors) {
            this.dataErrors = errors;
        }.bind(this))
    },

    /**
     * Clear the create form after submission or cancel.
     *
     * @return void
     */
    clearCreateData()
    {
        this.dialogVisible = false;
        this.createErrors = {};
        this.$refs.createForm.resetFields();
    },

    /**
     * Send the creat form data to the server.
     *
     * @return void
     */
    createData()
    {
        this.$refs.createForm.validate((valid) => {
          if (valid) {

            api.persist('post', {
              path: this.baseUrl ? this.baseUrl : this.typeName,
              object: this.createFormData
            })
            .then(function (data) {
                this.addModel(data);
                this.dialogVisible = false;
                this.clearCreateData();

                this.$message({
                  message: 'Successfully created '+ this.typeName +': ' + data.data.name,
                  type: 'success',
                  showClose: true,
                });

            }.bind(this))
            .catch(function (errors) {
                this.createErrors = errors;
            }.bind(this))

          } else {

          }
        });
    },

    /**
     * Add a modal to the table.
     *
     * @param Object data
     * @return void
     */
    addModel(data)
    {
      this.Data.unshift(data.data);

      if (this.Data) {
          if (this.Data.length > this.paginationMeta.perPage) {
            this.Data.splice(this.paginationMeta.perPage);
          }
      }

      this.paginationMeta.total = this.paginationMeta.total + 1;
    },

    /**
     * Handle a selection event on the table.
     *
     * @param Object evt
     * @return void
     */
    handleSelectionChange(evt)
    {
        this.bulkSelected = evt;
    },

    /**
     * Handle a size change event on the table.
     *
     * @param Int perPage
     * @return void
     */
    handleSizeChange(perPage)
    {
        this.paginationMeta.perPage = perPage;

        this.getData();
    },

    /**
     * Handle a page change event on the table.
     *
     * @param Int page
     * @return void
     */
    handlePageChange(page)
    {
        this.paginationMeta.currentPage = page;

        this.getData();
    },

    /**
     * Handle a sort change event on the table.
     *
     * @param Object change
     * @return void
     */
    handleSortChange(change)
    {
        console.log(change);
        this.paginationMeta.ascending = change.order === 'ascending' ? 1 : 0;
        this.paginationMeta.orderBy = change.prop ? change.prop : 'id';

        this.getData();
    },

    /**
     * Handle a search change event on the table.
     *
     * @param String value
     * @return void
     */
    handleSearchChange(value)
    {
        this.getData();
    },

    /**
     * Handle a bulk options apply event on the table.
     *
     * @return void
     */
    handleBulkOptionsApply()
    {
        var modal = false;

        if (this.bulkOptionValue.action) {
            this.bulkOptionValue.action(this.Data, this.shopData, this.bulkSelected);
        } else {
            this.updateData(this.bulkSelected, modal);
        }
    },

    /**
     * Handle a queue modal action.
     *
     * @return void
     */
    handleQueueModalAction()
    {

    },

    /**
     * Handle when the user clicks on the "create" btn.
     *
     * @return void
     */
    handleCreateData()
    {
        this.dialogVisible = true;
        this.$emit('createNew', this.Data);
    },

  }
}
</script>

<style lang="css">

</style>
