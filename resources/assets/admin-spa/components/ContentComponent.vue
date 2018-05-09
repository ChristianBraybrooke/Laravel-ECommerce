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

        <el-tabs v-model="activeContentTab" v-if="content">
            <el-tab-pane v-for="(content, key) in groupedByLangContent" :key="key" :label="(key ? key : 'Content')" :name="(key ? key : 'Content')">
                <el-row :gutter="20" v-if="key === activeContentTab">
                    <el-col :sm="24" v-for="content in content" :key="content.id">
                        <el-form-item :label="content.content_name + ' (' + (content.language ? content.language : '') + ')'" :prop="content.content_name">
                            <quill-editor v-model="content.content"
                                          v-if="content.type === 'quill'"
                                          :ref="'quillEditor' + content.content_name"
                                          :options="editorOption">
                            </quill-editor>

                            <el-input v-else :type="content.type === 'textarea' ? 'textarea' : ''" :autofocus="true" v-model="content.content"></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
var groupBy = require('lodash.groupby');
var orderBy = require('lodash.orderby');
var forEach = require('lodash.foreach');

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';


export default {

      name: 'ContentComponent',

      components: {
          quillEditor,
          FilePickerModal: () => import('./FilePickerModal.vue'),
      },

      props: {
          content: {
              required: true,
              type: Object
          }
      },

      data () {
          var self = this;
          return {
              loading: false,
              activeContentTab: 'en',
              showFilePicker: false,
              quillInstance: null,
              quillSelection: null,
              editorOption: {
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
          }
      },

      computed: {

          groupedByLangContent()
          {
              var orderedContent = orderBy(this.content.data, ['order'], ['asc']);
              return groupBy(orderedContent, 'language');
          },
      },

      watch: {

      },

      mounted () {
          console.log('ContentComponent.vue Mounted');
      },

      methods: {

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
            this.showFilePicker = val;
            this.quillInstance = null;
            this.quillSelection = null;
        },
      }
}
</script>

<style lang="css">
</style>
