<template lang="html">
    <div v-loading="loading">

        <el-breadcrumb v-if="collectionType.collection" class="breadcrumbs" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'collections' }">Collections</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'collections.view', params: { collectionId: collectionType.collection.id.toString() } }">{{ collectionType.collection.name }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ collectionType.name }}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row align="middle" type="flex">
            <el-col :span="12">
                <h1 class="page_title">{{ collectionType.name }}</h1>
            </el-col>
        </el-row>

        <errors v-if="Object.keys(collectionTypeErrors).length > 0" :errors="collectionTypeErrors"></errors>

        <el-row type="flex">
            <el-col :md="24">
                <el-form label-position="top"
                         :model="collectionType"
                         :rules="collectionTypeFormRules"
                         ref="collectionTypeForm"
                         label-width="120px">

                    <el-row type="flex">
                       <el-col :span="24">
                           <el-form-item v-if="collectionType.live_at" label="Live" prop="live_at.live">
                               <el-switch v-model="collectionType.live_at.live"
                                          active-color="#13ce66"
                                          inactive-color="#ff4949">
                               </el-switch>
                           </el-form-item>
                       </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :lg="8" :md="12" :sm="24">
                            <el-form-item label="Name" prop="name">
                                <el-input :autofocus="true" v-model="collectionType.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="8" :md="12" :sm="24">
                            <el-form-item label="Individual Name" prop="individual_name">
                                <el-input v-model="collectionType.individual_name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :lg="8" :md="24">
                            <el-form-item label="Slug / Url" prop="slug">
                                <el-input v-model="collectionType.slug">
                                    <template slot="prepend">{{ getSiteBaseURL}}{{ this.collectionType.collection ? this.collectionType.collection.slug : '' }}/</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row v-if="collectionType.content" :gutter="20">
                        <content-component v-if="collectionType.content" :content="collectionType.content"/>
                    </el-row>

                    <el-row :gutter="20">

                        <el-col :md="6">

                            <el-form-item label="Main Img" prop="main_img">
                                <file-picker-modal v-if="objectHas(collectionType, 'main_img')"
                                                   ref="filePickerMain"
                                                   :show-btn="true"
                                                   :current-files="collectionType.main_img ? [collectionType.main_img] : undefined"
                                                   v-on:filesChosen="handleFilesChosen"
                                                   v-on:filesUnChosen="handleFilesUnChosen"
                                                   name="Main Img"
                                                   :selectable="1"
                                                   picker-id="main_img"
                                                   :open-on-mount="false">
                                </file-picker-modal>
                            </el-form-item>

                        </el-col>

                        <el-col :md="6">

                            <el-form-item label="Secondary Img" prop="secondary_img">
                                <file-picker-modal v-if="objectHas(collectionType, 'secondary_img')"
                                                   ref="filePickerSecondary"
                                                   :show-btn="true"
                                                   :current-files="collectionType.secondary_img ? [collectionType.secondary_img] : undefined"
                                                   v-on:filesChosen="handleFilesChosen"
                                                   v-on:filesUnChosen="handleFilesUnChosen"
                                                   name="Secondary Img"
                                                   :selectable="1"
                                                   picker-id="secondary_img"
                                                   :open-on-mount="false">
                                </file-picker-modal>
                            </el-form-item>

                        </el-col>

                        <el-col :md="6">

                            <el-form-item label="Third Img" prop="third_img">
                                <file-picker-modal v-if="objectHas(collectionType, 'third_img')"
                                                   ref="filePickerThird"
                                                   :show-btn="true"
                                                   :current-files="collectionType.third_img ? [collectionType.third_img] : undefined"
                                                   v-on:filesChosen="handleFilesChosen"
                                                   v-on:filesUnChosen="handleFilesUnChosen"
                                                   name="Third Img"
                                                   :selectable="1"
                                                   picker-id="third_img"
                                                   :open-on-mount="false">
                                </file-picker-modal>
                            </el-form-item>

                        </el-col>

                    </el-row>

                    <el-row :gutter="20" v-if="collectionType.meta">
                        <template v-for="spec in collectionType.meta.specifications">
                            <el-col :md="12">
                               <el-form-item label="Specification" prop="key">
                                  <el-input :autofocus="true" v-model="spec.key"></el-input>
                               </el-form-item>
                            </el-col>
                            <el-col :md="12">
                               <template v-for="value in spec.values">
                                   <el-form-item label="Specification Value" prop="value">
                                      <el-input :autofocus="true" v-model="value.value"></el-input>
                                   </el-form-item>
                                </template>

                               <el-button type="primary" plain @click="addSpecificationValue(spec, 'specifications')">Add Specification Value</el-button>
                            </el-col>
                        </template>

                        <el-button type="primary" plain @click="addSpecification('specifications')">Add Specification</el-button>
                    </el-row>


                    <el-row :gutter="20" v-if="collectionType.meta">
                        <template v-for="option in collectionType.meta.options">
                            <el-col :md="12">
                               <el-form-item label="Option Type" prop="key">
                                  <el-input :autofocus="true" v-model="option.key"></el-input>
                               </el-form-item>
                            </el-col>
                            <el-col :md="12">

                                <template v-for="(value, optKey) in option.values">
                                    <el-col :md="12">
                                       <el-form-item label="Option Name" prop="name">
                                          <el-input :autofocus="true" v-model="value.value.name"></el-input>
                                       </el-form-item>
                                    </el-col>
                                    <el-col :md="12">
                                       <el-form-item label="Option Text" prop="text">
                                          <el-input :autofocus="true" v-model="value.value.text"></el-input>
                                       </el-form-item>
                                    </el-col>
                                    <el-col :md="24">

                                      <el-form-item label="Option File" prop="file">

                                          <file-picker-modal v-if="value.value"
                                                             :ref="'metaOptionFile_' + optKey"
                                                             :current-files="value.value.file ? [value.value.file] : undefined"
                                                             v-on:filesChosen="handleOptionFilesChosen"
                                                             v-on:filesUnChosen="handleOptionFilesUnChosen"
                                                             :name="value.value.name"
                                                             :selectable="1"
                                                             :show-btn="true"
                                                             :picker-id="{ option: option, value: value }"
                                                             :open-on-mount="false">
                                          </file-picker-modal>
                                      </el-form-item>

                                    </el-col>
                                </template>


                               <el-button type="primary" plain @click="addSpecificationValue(option, 'options', { value: { name: '', file: null } })">Add Option Value</el-button>
                            </el-col>
                        </template>

                        <el-button type="primary" plain @click="addSpecification('options', { value: { name: '', file: null, __fileDialogOpen: false } })">Add Option</el-button>
                    </el-row>


                    <el-row :gutter="20" v-if="collectionType.meta">
                       <el-col :md="8">
                           <el-form-item label="Featured Color" prop="meta.featured_colour">
                               <el-color-picker v-model="collectionType.meta.featured_colour"></el-color-picker>
                           </el-form-item>
                       </el-col>
                    </el-row>

                    <hr class="page_hr">

                    <el-row :gutter="20">
                        <el-col :sm="24">
                            <el-form-item>
                                <el-button plain type="success" :loading="loading" @click="submitForm('collectionTypeForm')">Update</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
            </el-col>
        </el-row>


    </div>
</template>

<script>
import api from "services/api-service";
var has = require('lodash.has');


export default {

      name: 'ViewCollectionType',

      components: {
          Errors: () => import(/* webpackChunkName: "errors" */'components/Errors'),
          FilePickerModal: () => import(/* webpackChunkName: "file-picker-modal" */'components/FilePickerModal'),
          ContentComponent: () => import(/* webpackChunkName: "content-component" */'components/ContentComponent'),
      },

      props: {
          collectionId: {
              type: String,
              required: true,
          },
          editorOption: {
            modules: {
              toolbar: [
                  ['bold', 'italic', 'underline', 'strike'],
                  ['blockquote'],

                  [{ 'header': 1 }, { 'header': 2 }],

                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],

                  [{ 'align': [] }],
                  ['clean'],
                  ['link', 'video']
              ]
            }
          },
          typeId: {
              type: String,
              required: true,
          },
      },

      data () {
          return {
              loading: false,
              collectionTypeErrors: {},
              collectionType: {},
          }
      },

      computed: {
          typeName()
          {
              return this.collectionType.individual_name ? this.collectionType.individual_name.toLowerCase() : 'collection type';
          },
          collectionTypeFormRules()
          {
              return {
                  name: [
                    { required: true, message: 'The '+ this.typeName +' name field is required', trigger: 'blur' },
                  ],
                  individual_name: [
                    { required: true, message: 'The '+ this.typeName +' individual name field is required', trigger: 'blur' },
                  ],
                  slug: [
                    { required: true, message: 'The '+ this.typeName +' slug field is required', trigger: 'blur' },
                  ],
              };
          },
      },

      watch: {

      },

      mounted () {
          console.log('ViewCollectionType.vue Mounted');
          this.getCollectionType();
      },

      methods: {
          objectHas(haystack, needle)
          {
              return has(haystack, needle);
          },

          getCollectionType()
          {

              this.loading = true;
              this.collectionTypeErrors = {};

              api.get({
                  path: 'collections/' + this.collectionId + '/types/' + this.typeId,
                  params: {
                      with: ['collection', 'media', 'content'],
                      include: ['individual_name', 'slug', 'live_at'],
                  },
              })
              .then(function (data) {
                  this.loading = false;
                  this.collectionType = data.data;

                  if (this.collectionType.meta.options) {
                      this.collectionType.meta.options.forEach(function (option) {
                          option.value.forEach(function (value) {
                              if (value.value.__fileDialogOpen === true) {
                                  value.value.__fileDialogOpen = false;
                              }
                          }.bind(this));
                      }.bind(this));
                  }
              }.bind(this))
              .catch(function (error) {
                  this.loading = false;
                  this.collectionTypeErrors = error;
              }.bind(this));
          },

          submitForm(formName)
          {
              this.collectionTypeErrors = {};
              this.collectionType.with = ['collection', 'media', 'content'];
              this.collectionType.include = ['individual_name', 'slug', 'live_at'];
              this.loading = true;

              this.$refs[formName].validate((valid) => {
                if (valid) {
                    api.persist('put', {
                        path: 'collections/' + this.collectionId + '/types/' + this.typeId,
                        object: this.collectionType,
                    })
                    .then(function (data) {
                        this.loading = false;

                        this.collectionType = data.data;

                        this.$message({
                          message: this.collectionType.name + ' updated',
                          type: 'success',
                          showClose: true,
                        });

                    }.bind(this))
                    .catch(function (error) {
                        this.collectionTypeErrors = error;
                        this.loading = false;

                    }.bind(this));
                } else {
                    this.loading = false;
                    return false;
                }
              });
          },

          displayFilePicker(filePicker)
          {
              if(this.$refs[filePicker]) {
                  this.$refs[filePicker].openModal();
              }
          },

          handleFilesChosen(data)
          {
              this.$set(this.collectionType, data.id, data.files);
          },

          handleFilesUnChosen(data)
          {
              this.$set(this.collectionType, data.id, data.files);
          },

          handleOptionFilesChosen(data)
          {
              var optionsIndex = this.collectionType.meta.options.indexOf(data.id.option);
              var value = this.collectionType.meta.options[optionsIndex].values[this.collectionType.meta.options[optionsIndex].values.indexOf(data.id.value)];

              value.value.file = data.files[0];

          },

          handleOptionFilesUnChosen(data)
          {
              var optionsIndex = this.collectionType.meta.options.indexOf(data.id.option);
              var value = this.collectionType.meta.options[optionsIndex].values[this.collectionType.meta.options[optionsIndex].values.indexOf(data.id.value)];

              value.value.file = data.files;
          },

          addSpecification(meta, set = null)
          {
              if (!set) {
                  set = { value: '' };
              }
              if(!this.collectionType.meta[meta]) {
                  this.$set(this.collectionType.meta, meta, []);
              }
              this.collectionType.meta[meta].push({
                key: '',
                values: [
                    set
                ],
              })
          },

          addSpecificationValue(value, meta, set = null)
          {
            if (!set) {
                set = { value: '' };
            }
            this.collectionType.meta[meta][this.collectionType.meta[meta].indexOf(value)].values.push(set);
          }
      },

}
</script>

<style lang="css">
</style>
