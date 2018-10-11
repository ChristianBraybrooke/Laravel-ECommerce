<template lang="html">
  <div>

    <file-picker-modal
      :visible="showFilePicker"
      :current-files="undefined"
      :show-btn="false"
      :show-preview="false"
      name="content"
      picker-id="image"
      @update:files="val => insertQuillImage(val)"
      @closed:modal="val => fileModalClosed()"/>

    <el-form-item
      :label="contentLabel"
      :prop="content.content_name">
      <quill-editor
        v-if="content.type === 'quill'"
        v-model="content.content"
        :ref="'quillEditor' + content.content_name"
        :options="editorOptions"/>

      <template v-else-if="content.type === 'json'">
        <el-row :gutter="20">
          <el-col :md="{span: 22, offset: 2}">
            <el-row
              v-for="(jsonContent, jsonKey) in content.content"
              :key="jsonKey">

              <span style="display:block;">{{ inputLabel(jsonKey) }}</span>

              <div v-if="jsonKey.toUpperCase().includes('DATE')">
                <el-date-picker
                  v-model="content.content[jsonKey]"
                  type="date"
                  size="small"
                  style="width: 100%; max-width: 300px;"
                  placeholder="Pick a date"
                  format="dd/MM/yyyy"
                  value-format="dd-MM-yyy"/>

                <el-popover
                  v-if="editable"
                  :ref="'json_content_delete_confirm_' + jsonKey"
                  placement="top"
                  width="160">
                  <p>Delete content?</p>
                  <div style="text-align: right; margin: 0">
                    <el-button
                      size="mini"
                      type="text"
                      @click="$refs['json_content_delete_confirm_' + jsonKey][0].doClose()">Cancel</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="deleteJsonContent(jsonKey)">Confirm</el-button>
                  </div>
                  <el-button
                    slot="reference"
                    plain
                    class="mini_delete"
                    size="mini"
                    type="danger"
                    icon="el-icon-error"/>
                </el-popover>
              </div>

              <div
                v-else-if="jsonKey.toUpperCase().includes('NUMBER') || jsonKey.toUpperCase().includes('VALUE') || jsonKey.toUpperCase().includes('AMOUNT')"
                style="width:100%;">
                <el-input-number
                  v-model="content.content[jsonKey]"
                  :controls="false"
                  size="small"/>

                <el-popover
                  v-if="editable"
                  :ref="'json_content_delete_confirm_' + jsonKey"
                  placement="top"
                  width="160">
                  <p>Delete content?</p>
                  <div style="text-align: right; margin: 0">
                    <el-button
                      size="mini"
                      type="text"
                      @click="$refs['json_content_delete_confirm_' + jsonKey][0].doClose()">Cancel</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="deleteJsonContent(jsonKey)">Confirm</el-button>
                  </div>
                  <el-button
                    slot="reference"
                    plain
                    class="mini_delete"
                    size="mini"
                    type="danger"
                    icon="el-icon-error"/>
                </el-popover>

              </div>
              <div
                v-else-if="jsonKey.toUpperCase().includes('COST')"
                style="width: 100%;">
                <span class="currency --small">{{ shopData.currency }}</span><el-input-number
                  v-model="content.content[jsonKey]"
                  :controls="false"
                  :precision="3"
                  size="small"/>

                <el-popover
                  v-if="editable"
                  :ref="'json_content_delete_confirm_' + jsonKey"
                  placement="top"
                  width="160">
                  <p>Delete content?</p>
                  <div style="text-align: right; margin: 0">
                    <el-button
                      size="mini"
                      type="text"
                      @click="$refs['json_content_delete_confirm_' + jsonKey][0].doClose()">Cancel</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="deleteJsonContent(jsonKey)">Confirm</el-button>
                  </div>
                  <el-button
                    slot="reference"
                    plain
                    class="mini_delete"
                    size="mini"
                    type="danger"
                    icon="el-icon-error"/>
                </el-popover>
              </div>
              <div v-else-if="(jsonKey.toUpperCase().includes('GALLERY') || jsonKey.toUpperCase().includes('FILES') || jsonKey.toUpperCase().includes('IMAGES'))">
                <file-picker-modal
                  :current-files="(content.content[jsonKey] && content.content[jsonKey][0]) ? content.content[jsonKey] : undefined"
                  :show-btn="true"
                  :name="capitalize(jsonKey.replace(/_/g, ' '))"
                  :picker-id="jsonKey"
                  @update:files="val => content.content[jsonKey] = val"/>
                <el-popover
                  v-if="editable"
                  :ref="'json_content_delete_confirm_' + jsonKey"
                  placement="top"
                  width="160">
                  <p>Delete content?</p>
                  <div style="text-align: right; margin: 0">
                    <el-button
                      size="mini"
                      type="text"
                      @click="$refs['json_content_delete_confirm_' + jsonKey][0].doClose()">Cancel</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="deleteJsonContent(jsonKey)">Confirm</el-button>
                  </div>
                  <el-button
                    slot="reference"
                    plain
                    class="mini_delete"
                    size="mini"
                    type="danger"
                    icon="el-icon-error"/>
                </el-popover>
              </div>
              <div v-else-if="(jsonKey.toUpperCase().includes('IMAGE') || jsonKey.toUpperCase().includes('FILE'))">
                <file-picker-modal
                  :current-files="(content.content[jsonKey] && content.content[jsonKey][0]) ? [content.content[jsonKey][0]] : undefined"
                  :show-btn="true"
                  :name="capitalize(jsonKey.replace(/_/g, ' '))"
                  :selectable="1"
                  :picker-id="jsonKey"
                  @update:files="val => content.content[jsonKey] = val"/>
                <el-popover
                  v-if="editable"
                  :ref="'json_content_delete_confirm_' + jsonKey"
                  placement="top"
                  width="160">
                  <p>Delete content?</p>
                  <div style="text-align: right; margin: 0">
                    <el-button
                      size="mini"
                      type="text"
                      @click="$refs['json_content_delete_confirm_' + jsonKey][0].doClose()">Cancel</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="deleteJsonContent(jsonKey)">Confirm</el-button>
                  </div>
                  <el-button
                    slot="reference"
                    plain
                    class="mini_delete"
                    size="mini"
                    type="danger"
                    icon="el-icon-error"/>
                </el-popover>
              </div>
              <div v-else-if="(jsonKey.toUpperCase().includes('CHECK') || jsonKey.toUpperCase().includes('CHECKBOX'))">
                <el-checkbox v-model="content.content[jsonKey]"/>
              </div>
              <div v-else-if="jsonKey.toUpperCase().includes('MULTI')">
                <content-inner
                  :show-section-title="false"
                  :on-delete-content="deleteJsonContent"
                  :content="{content_name: jsonKey, content: content.content[jsonKey], type: 'json'}"
                  :content-key="jsonKey"
                  :editable="true"
                  :language-options="false"/>
              </div>
              <div v-else>
                <el-input
                  v-model="content.content[jsonKey]"
                  size="small"
                  style="width: 100%; max-width: 300px;"/>
                <el-popover
                  v-if="editable"
                  :ref="'json_content_delete_confirm_' + jsonKey"
                  placement="top"
                  width="160">
                  <p>Delete content?</p>
                  <div style="text-align: right; margin: 0">
                    <el-button
                      size="mini"
                      type="text"
                      @click="$refs['json_content_delete_confirm_' + jsonKey][0].doClose()">Cancel</el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      @click="deleteJsonContent(jsonKey)">Confirm</el-button>
                  </div>
                  <el-button
                    slot="reference"
                    plain
                    class="mini_delete"
                    size="mini"
                    type="danger"
                    icon="el-icon-error"/>
                </el-popover>
              </div>
            </el-row>
            <div>
              <el-button
                v-if="editable"
                slot="reference"
                plain
                class="mini_add"
                size="mini"
                type="success"
                @click="addJsonContent()">Add Content</el-button>
            </div>
          </el-col>
        </el-row>
      </template>

      <el-input
        v-else
        :type="content.type === 'textarea' ? 'textarea' : ''"
        :autofocus="true"
        v-model="content.content"
        size="small"/>

      <el-popover
        v-if="editable"
        ref="content_delete_confirm"
        placement="top"
        width="160">
        <p>Delete content?</p>
        <div style="text-align: right; margin: 0">
          <el-button
            size="mini"
            type="text"
            @click="$refs['content_delete_confirm'].doClose()">Cancel</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="deleteContent(contentKey)">Confirm</el-button>
        </div>
        <el-button
          slot="reference"
          size="mini"
          type="danger">Delete</el-button>
      </el-popover>

    </el-form-item>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import contentUtil from 'utils/content'

import { mapGetters } from 'vuex'

import ContentComponent from 'components/ContentComponent'

import { quillEditor } from 'vue-quill-editor'

var forEach = require('lodash.foreach')
export default {

  name: 'ContentInner',

  components: {
    quillEditor,
    FilePickerModal: () => import(/* webpackChunkName: "file-picker-modal" */'components/FilePickerModal'),
    ContentComponent
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
        return function (contentKey) {}
      }
    }
  },

  data () {
    var self = this
    return {
      editorOptions: {
        modules: {
          toolbar: {
            container: ['image', 'bold', 'italic', 'underline', 'strike', { 'header': 1 }, { 'header': 2 }, 'blockquote', { 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],

            handlers: {
              'image': function (value) {
                self.quillSelection = this.quill.getSelection()
                self.showFilePicker = true
                self.quillInstance = this
              }
            }
          }
        }
      },
      showFilePicker: false,
      quillInstance: null,
      quillSelection: null
    }
  },

  computed: {
    ...mapGetters([
      'shopData'
    ]),

    contentLabel () {
      var contentName = this.content.content_name.replace('multi', '')
      return this.showSectionTitle ? (contentName + (this.anguageOptions ? ' (' + (this.content.language ? this.content.language : '') + ')' : '')) : ''
    }
  },

  watch: {
    'content.content': function (value) {
      console.log(value)
    }
  },

  mounted () {
    console.log('ContentInner.vue mounted!')
  },

  methods: {
    deleteJsonContent (jsonKey) {
      this.$delete(this.content.content, jsonKey)
    },

    inputLabel (jsonKey) {
      return this.capitalize(contentUtil.inputLabel(jsonKey))
    },

    addJsonContent () {
      this.$prompt('Content Name', 'Content Name', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputValidator: function (val) { return !!val },
        inputErrorMessage: 'Name is required.'
      }).then(value => {
        var innerContent = value.value.toUpperCase().includes('MULTI') ? {} : ''
        this.$set(this.content.content, value.value, innerContent)
      })
    },

    deleteContent () {
      this.onDeleteContent(this.contentKey)
    },

    insertQuillImage (files) {
      forEach(files, function (file) {
        this.quillInstance.quill.insertEmbed(this.quillSelection.index, 'image', file.url)
      }.bind(this))

      this.quillInstance = null
      this.quillSelection = null
    },

    fileModalClosed () {
      this.showFilePicker = false
      this.quillInstance = null
      this.quillSelection = null
    }
  }

}
</script>

<style lang="css">
</style>
