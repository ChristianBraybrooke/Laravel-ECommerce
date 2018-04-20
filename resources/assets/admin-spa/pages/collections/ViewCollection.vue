<template lang="html">
    <div v-loading="loading">
        <el-breadcrumb class="breadcrumbs" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'collections' }">Collections</el-breadcrumb-item>
            <el-breadcrumb-item>{{ collection.name }}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row align="middle">
            <el-col :span="24"><h1 class="page_title">{{ collection.name }}</h1></el-col>
        </el-row>

        <errors v-if="Object.keys(collectionErrors).length > 0" :errors="collectionErrors"></errors>

        <el-row :gutter="40">
            <el-col :sm="24" :md="24" :lg="12" class="col_right_border">
                <el-form label-position="top" :model="collection" :rules="collectionFormRules" ref="collectionForm" label-width="120px" @keyup.enter.native="submitForm('collectionForm')">

                    <el-row :gutter="20">
                        <el-col :md="24">
                            <el-form-item v-if="collection.live_at" label="Live" prop="live_at.live">
                                <el-switch v-model="collection.live_at.live"
                                           active-color="#13ce66"
                                           inactive-color="#ff4949">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :md="12" :sm="24">
                            <el-form-item label="Name" prop="name">
                                <el-input :autofocus="true" v-model="collection.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :md="12" :sm="24">
                            <el-form-item label="Individual Name" prop="individual_name">
                                <el-input v-model="collection.individual_name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :md="24">
                            <el-form-item label="Slug / Url" prop="slug">
                                <el-input v-model="collection.slug">
                                    <template slot="prepend">{{ getSiteBaseURL }}</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="Header Img" prop="header_img">
                        <el-button type="info" plain size="mini" @click="displayFilePicker">Select File <i class="el-icon-document"></i></el-button>

                        <file-picker-modal v-if="showFilePicker"
                                           ref="filePicker"
                                           :current-files="collection.header_img ? [collection.header_img] : undefined"
                                           v-on:filesChosen="handleFilesChosen"
                                           v-on:filesUnChosen="handleFilesUnChosen"
                                           name="Header Img"
                                           :selectable="1"
                                           picker-id="header_img"
                                           :open-on-mount="collection.header_img ? false : true">
                        </file-picker-modal>

                    </el-form-item>

                    <hr class="page_hr">

                    <el-row :gutter="20">
                        <el-col :sm="24">
                            <el-form-item>
                                <el-button plain type="success" :loading="loading" @click="submitForm('collectionForm')">Update</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
            </el-col>
            <el-col :sm="24" :md="24" :lg="12" class="half_table_col">
                <data-table :type-name="collectionName"
                            :table-options="tableOptions"
                            :edit-path="'/collections/' + collectionId + '/types'"
                            :create-form-rules="createFormRules"
                            :base-url="'collections/' + collectionId + '/types'"
                            :bulk-update-url="'collections/' + collectionId + '/types/bulk'">
                </data-table>
            </el-col>
        </el-row>

    </div>


</template>

<script>
import api from "../../services/api-service.js";

export default {

  components: {
    Errors: () => import('../../components/Errors.vue'),
    DataTable: () => import('../../components/DataTable.vue'),
    FilePickerModal: () => import('../../components/FilePickerModal.vue')
  },

  props: {
      collectionId: {
          type: String,
          required: true,
      },
  },

  mounted() {
      console.log('ViewCollection.vue Mounted');
      this.getCollection();
  },

  computed: {

    collectionName()
    {
        return this.collection.individual_name ? this.collection.individual_name.toLowerCase() : 'collection';
    },

    uploadHeaders()
    {
        return {
            'Accept': 'application/json',
            'X-CSRF-TOKEN': window.laravel_token
        };
    },

    createFormRules()
    {
      return {
          name: [
            { required: true, message: 'The '+ this.collectionName +' name field is required', trigger: 'blur' },
          ],
      };
    },

    collectionFormRules()
    {
        return {
            name: [
              { required: true, message: 'The '+ this.collectionName +' name field is required', trigger: 'blur' },
            ],
            individual_name: [
              { required: true, message: 'The '+ this.collectionName +' individual name field is required', trigger: 'blur' },
            ],
            slug: [
              { required: true, message: 'The '+ this.collectionName +' slug field is required', trigger: 'blur' },
            ],
        };
    },

  },

  data() {
    return {
          tableOptions: {
          border: false,
          stripe: false,
          showSearch: true,
          showHeader: true,
          showNewBtn: true,
          showRefreshBtn: true,
          showHeadHr: false,
          showTitle: false,
          viewText: 'View',
          deleteText: 'Delete',
          bulkOptions: [
            {
              value: 'draft',
              label: 'Mark Draft'
            },
            {
              value: 'live',
              label: 'Mark Live'
            },
            {
              value: 'delete',
              label: 'Delete'
            },
          ],
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
        },
        showFilePicker: false,
        uploadFileList: [],
        collectionErrors: {},
        collection: {},
        collectionStore: {},
        loading: false,
    }
  },

  methods: {
    /**
     * Get information about this collection.
     *
     * @return void
     */
    getCollection()
    {
        api.get({
            path: 'collections/' + this.collectionId
        })
        .then(function (data) {
            this.collectionErrors = {};
            this.collection = data.data;
            if (data.data.header_img.url) {
                this.showFilePicker = true;
            }
            this.collectionStore.push(Vue.util.extend({}, data));
        }.bind(this))
        .catch(function (errors) {
            if (errors.code && errors.code === 404) {
                this.$router.push({path: 'not-found'});
            }

            this.collectionErrors = errors;
        }.bind(this));
    },

    submitForm(formName)
    {
        this.collectionErrors = {};
        this.loading = true;

        this.$refs[formName].validate((valid) => {
          if (valid) {
              api.persist('put', {
                  path: 'collections/' + this.collectionId,
                  object: this.collection
              })
              .then(function (data) {
                  this.loading = false;

                  this.collection = data.data;

                  this.$message({
                    message: this.collection.name + ' updated',
                    type: 'success',
                    showClose: true,
                  });

              }.bind(this))
              .catch(function (error) {
                  this.collectionErrors = error;
                  this.loading = false;

              }.bind(this));
          } else {
              this.loading = false;
              return false;
          }
        });
    },

    displayFilePicker()
    {
        this.showFilePicker = true;
        if(this.$refs.filePicker) {
            this.$refs.filePicker.openModal();
        }
    },

    handleFilesChosen(data)
    {
        this.$set(this.collection, data.id, data.files);
    },

    handleFilesUnChosen(data)
    {
        this.$set(this.collection, data.id, data.files);
    }

  }

}
</script>

<style lang="css">
</style>
