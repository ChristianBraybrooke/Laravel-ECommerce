<template lang="html">
    <div>

        <file-picker-modal :visible="showFilePicker"
                           :current-files="undefined"
                           @update:files="val => insertQuillImage(val)"
                           @closed:modal="val => fileModalClosed()"
                           :show-btn="false"
                           :show-preview="false"
                           name="content"
                           picker-id="image"/>

        <el-form-item :label="contentLabel" :prop="content.content_name">
            <quill-editor v-model="content.content"
                          v-if="content.type === 'quill'"
                          :ref="'quillEditor' + content.content_name"
                          :options="editorOptions">
            </quill-editor>

            <template v-else-if="content.type === 'json'">
                <el-row :gutter="20">
                    <el-col :md="{span: 22, offset: 2}">
                        <el-row v-for="(jsonContent, json_key) in content.content" :key="json_key">

                            <span style="display:block;">{{ inputLabel(json_key) }}</span>

                            <div v-if="json_key.toUpperCase().includes('DATE')">
                                <el-date-picker v-model="content.content[json_key]"
                                                type="date"
                                                size="small"
                                                style="width: 100%; max-width: 300px;"
                                                placeholder="Pick a date"
                                                format="dd/MM/yyyy"
                                                value-format="dd-MM-yyy">
                                </el-date-picker>

                                <el-popover placement="top"
                                            width="160"
                                            v-if="editable"
                                            :ref="'json_content_delete_confirm_' + json_key">
                                    <p>Delete content?</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="$refs['json_content_delete_confirm_' + json_key][0].doClose()">Cancel</el-button>
                                        <el-button type="primary" size="mini" @click="deleteJsonContent(json_key)">Confirm</el-button>
                                    </div>
                                    <el-button plain class="mini_delete" slot="reference" size="mini" type="danger" icon="el-icon-error"></el-button>
                                </el-popover>
                            </div>

                            <div v-else-if="json_key.toUpperCase().includes('NUMBER') || json_key.toUpperCase().includes('VALUE') || json_key.toUpperCase().includes('AMOUNT')" style="width:100%;">
                                <el-input-number v-model="content.content[json_key]" :controls="false" size="small"></el-input-number>

                                <el-popover placement="top"
                                            width="160"
                                            v-if="editable"
                                            :ref="'json_content_delete_confirm_' + json_key">
                                    <p>Delete content?</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="$refs['json_content_delete_confirm_' + json_key][0].doClose()">Cancel</el-button>
                                        <el-button type="primary" size="mini" @click="deleteJsonContent(json_key)">Confirm</el-button>
                                    </div>
                                    <el-button plain class="mini_delete" slot="reference" size="mini" type="danger" icon="el-icon-error"></el-button>
                                </el-popover>

                            </div>
                            <div v-else-if="json_key.toUpperCase().includes('COST')" style="width: 100%;">
                                <span class="currency --small">{{ shopData.currency }}</span><el-input-number size="small"
                                                                                                              v-model="content.content[json_key]"
                                                                                                              :controls="false"
                                                                                                              :precision="3">
                                </el-input-number>

                                <el-popover placement="top"
                                            width="160"
                                            v-if="editable"
                                            :ref="'json_content_delete_confirm_' + json_key">
                                    <p>Delete content?</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="$refs['json_content_delete_confirm_' + json_key][0].doClose()">Cancel</el-button>
                                        <el-button type="primary" size="mini" @click="deleteJsonContent(json_key)">Confirm</el-button>
                                    </div>
                                    <el-button plain class="mini_delete" slot="reference" size="mini" type="danger" icon="el-icon-error"></el-button>
                                </el-popover>
                            </div>
                            <div v-else-if="(json_key.toUpperCase().includes('GALLERY') || json_key.toUpperCase().includes('FILES') || json_key.toUpperCase().includes('IMAGES'))">
                                <file-picker-modal :current-files="(content.content[json_key] && content.content[json_key][0]) ? content.content[json_key] : undefined"
                                                   @update:files="val => content.content[json_key] = val"
                                                   :show-btn="true"
                                                   :name="capitalize(json_key.replace(/_/g, ' '))"
                                                   :picker-id="json_key">
                                </file-picker-modal>
                                <el-popover placement="top"
                                            width="160"
                                            v-if="editable"
                                            :ref="'json_content_delete_confirm_' + json_key">
                                    <p>Delete content?</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="$refs['json_content_delete_confirm_' + json_key][0].doClose()">Cancel</el-button>
                                        <el-button type="primary" size="mini" @click="deleteJsonContent(json_key)">Confirm</el-button>
                                    </div>
                                    <el-button plain class="mini_delete" slot="reference" size="mini" type="danger" icon="el-icon-error"></el-button>
                                </el-popover>
                            </div>
                            <div v-else-if="(json_key.toUpperCase().includes('IMAGE') || json_key.toUpperCase().includes('FILE'))">
                                <file-picker-modal :current-files="(content.content[json_key] && content.content[json_key][0]) ? [content.content[json_key][0]] : undefined"
                                                   @update:files="val => content.content[json_key] = val"
                                                   :show-btn="true"
                                                   :name="capitalize(json_key.replace(/_/g, ' '))"
                                                   :selectable="1"
                                                   :picker-id="json_key">
                                </file-picker-modal>
                                <el-popover placement="top"
                                            width="160"
                                            v-if="editable"
                                            :ref="'json_content_delete_confirm_' + json_key">
                                    <p>Delete content?</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="$refs['json_content_delete_confirm_' + json_key][0].doClose()">Cancel</el-button>
                                        <el-button type="primary" size="mini" @click="deleteJsonContent(json_key)">Confirm</el-button>
                                    </div>
                                    <el-button plain class="mini_delete" slot="reference" size="mini" type="danger" icon="el-icon-error"></el-button>
                                </el-popover>
                            </div>
                            <div v-else-if="(json_key.toUpperCase().includes('CHECK') || json_key.toUpperCase().includes('CHECKBOX'))">
                                <el-checkbox v-model="content.content[json_key]"></el-checkbox>
                            </div>
                            <div v-else-if="json_key.toUpperCase().includes('MULTI')">
                                <content-inner :show-section-title="false"
                                               :on-delete-content="deleteJsonContent"
                                               :content="{content_name: json_key, content: content.content[json_key], type: 'json'}"
                                               :content-key="json_key"
                                               :editable="true"
                                               :language-options="false"/>
                            </div>
                            <div v-else>
                                <el-input v-model="content.content[json_key]" size="small" style="width: 100%; max-width: 300px;"></el-input>
                                <el-popover placement="top"
                                            v-if="editable"
                                            width="160"
                                            :ref="'json_content_delete_confirm_' + json_key">
                                    <p>Delete content?</p>
                                    <div style="text-align: right; margin: 0">
                                        <el-button size="mini" type="text" @click="$refs['json_content_delete_confirm_' + json_key][0].doClose()">Cancel</el-button>
                                        <el-button type="primary" size="mini" @click="deleteJsonContent(json_key)">Confirm</el-button>
                                    </div>
                                    <el-button plain class="mini_delete" slot="reference" size="mini" type="danger" icon="el-icon-error"></el-button>
                                </el-popover>
                            </div>
                        </el-row>
                        <div>
                            <el-button v-if="editable" plain class="mini_add" slot="reference" size="mini" type="success" @click="addJsonContent()">Add Content</el-button>
                        </div>
                    </el-col>
                </el-row>
            </template>

            <el-input v-else size="small" :type="content.type === 'textarea' ? 'textarea' : ''" :autofocus="true" v-model="content.content"></el-input>

            <el-popover placement="top"
                        v-if="editable"
                        width="160"
                        ref="content_delete_confirm">
                <p>Delete content?</p>
                <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="$refs['content_delete_confirm'].doClose()">Cancel</el-button>
                    <el-button type="primary" size="mini" @click="deleteContent(contentKey)">Confirm</el-button>
                </div>
                <el-button slot="reference" size="mini" type="danger">Delete</el-button>
            </el-popover>

        </el-form-item>
    </div>
</template>

<script>
var forEach = require('lodash.foreach');

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { mapActions, mapGetters } from 'vuex';

import { quillEditor } from 'vue-quill-editor';
export default {

      name: 'ContentInner',

      components: {
          quillEditor,
          FilePickerModal: () => import(/* webpackChunkName: "file-picker-modal" */'components/FilePickerModal'),
          ContentInner: () => import(/* webpackChunkName: "content-inner" */'components/ContentInner'),
      },

      props: {
          content: {
              required: true,
              type: Object
          },
          contentKey: {
              required: true,
              type: [Number, String]
          },
          editable: {
              required: false,
              type: Boolean,
              default () {
                  return false
              }
          },
          languageOptions: {
              required: false,
              type: Boolean,
              default () {
                  return true
              }
          },
          showSectionTitle: {
              required: false,
              type: Boolean,
              default () {
                  return true
              }
          },
          onDeleteContent: {
              required: false,
              type: Function,
              default () {
                  return function (contentKey) {};
              }
          }
      },

      data () {
          var self = this;
          return {
              editorOptions: {
                modules: {
                  toolbar: {
                      container: ["image", "bold", "italic", "underline", "strike", { 'header': 1 }, { 'header': 2 }, "blockquote", { 'list': 'ordered'}, { 'list': 'bullet' }, { 'align': [] }],

                      handlers: {
                        'image': function(value) {
                            self.quillSelection = this.quill.getSelection();
                            self.showFilePicker = true;
                            self.quillInstance = this;
                        }
                      }
                  },
                }
              },
              showFilePicker: false,
              quillInstance: null,
              quillSelection: null,
          }
      },

      computed: {
          ...mapGetters([
            'shopData',
          ]),

          contentLabel()
          {
              var content_name = this.content.content_name.replace("multi", "");
              return this.showSectionTitle ? (content_name + (this.anguageOptions ? ' (' + (this.content.language ? this.content.language : '') + ')' : '')) : '';
          },
      },

      watch: {

      },

      mounted () {
          console.log('ContentInner.vue mounted!')
      },

      methods: {
          deleteJsonContent(json_key)
          {
              this.$delete(this.content.content, json_key);
          },

          inputLabel(json_key)
          {
              if (typeof json_key === 'string') {
                  return this.capitalize(
                             json_key.replace(/_/g, ' ')
                                     .replace('multi', '')
                                     .replace('Multi', '')
                                     .replace('checkbox', '')
                                     .replace('Checkbox', '')
                         )
              }
          },

          addJsonContent()
          {
              this.$prompt('Content Name', 'Content Name', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                inputValidator: function (val) { return val ? true : false },
                inputErrorMessage: 'Name is required.'
              }).then(value => {
                  var content = this.content.content
                  var inner_content = value.value.toUpperCase().includes('MULTI') ? {} : '';
                  this.$set(this.content.content, value.value, inner_content);
              });
          },

          deleteContent()
          {
              this.onDeleteContent(this.contentKey);
          },

          insertQuillImage(files)
          {
              forEach(files, function(file) {
                  this.quillInstance.quill.insertEmbed(this.quillSelection.index, 'image', file.url);
              }.bind(this));

              this.quillInstance = null;
              this.quillSelection = null;
          },

          fileModalClosed()
          {
              this.showFilePicker = false;
              this.quillInstance = null;
              this.quillSelection = null;
          }
      },

}
</script>

<style lang="css">
</style>
