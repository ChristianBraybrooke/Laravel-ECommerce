<template lang="html">
  <div
    v-loading="loading"
    :class="inModal ? 'gallery_component gallery_dialog_component' : 'gallery_component'">
    <errors :errors="errors"/>

    <file-upload-component
      :gallery-id="galleryId"
      :file-list="files"
      @fileUploadSuccess="handleUploadSuccess"
      @fileSelected="handlefileSelected"
      @fileUploadError="handleFileUploadError"/>

    <el-row :gutter="20">
      <el-col :sm="24">
        <el-input
          :autofocus="true"
          v-model="galleryMeta.search"
          class="media_search"
          placeholder="Search"/>
      </el-col>
    </el-row>

    <div class="gallery_rows_wrap">
      <el-row
        class="table_meta"
        type="flex">
        <el-col>
          <small>Showing: <strong>{{ files.length }}</strong> of <strong>{{ galleryMeta.total }}</strong></small>
        </el-col>
      </el-row>

      <el-row
        v-for="(chunk, key) in galleryImageChunks"
        :key="key"
        :gutter="0"
        class="gallery_row">
        <!-- <el-col :md="inModal ? 6 : 4" :sm="inModal ? 12 : 6"> -->
        <div
          v-for="(file, index) in chunk"
          :key="index"
          :class="shouldShowProgress(file) ? 'gallery_file_wrap show_progress' : fileInSelects(file) ? 'gallery_file_wrap selected' : 'gallery_file_wrap'"
          class="gallery_file"
          @click="handleFileClick(file, $event)">
          <div
            v-if="shouldShowProgress(file)"
            class="gallery_file_wrap_progress">
            <el-progress
              :percentage="formatPercentage(file.percentage)"
              :status="file.status === 'fail' ? 'exception' : file.status === 'success' ? 'success' : ''"
              class="progress_object"
              type="circle"/>
          </div>
          <div
            v-if="shouldShowProgress(file) && file.status === 'fail'"
            class="gallery_file_wrap_cancel">
            <p
              id="cancel"
              class="gallery_file_wrap_icon"
              @click="handleIconClick('cancel', file)">Cancel</p>
          </div>
          <div
            v-if="!shouldShowProgress(file)"
            class="gallery_file_wrap_inner">

            <i
              v-if="!fileInSelects(file)"
              id="view"
              class="el-icon-view gallery_file_wrap_icon"
              @click="handleIconClick('view', file)"/>
            <i
              v-if="fileInSelects(file)"
              class="el-icon-check gallery_file_wrap_icon"/>

            <el-popover
              v-if="!fileInSelects(file)"
              :ref="'delete_popover_' + file.id"
              placement="top"
              width="160">
              <p>Delete {{ file.name }}?</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  type="primary"
                  size="mini"
                  @click="hideDeletePopover(file)">cancel</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="deleteFile(file)">confirm</el-button>
              </div>
              <i
                id="delete"
                slot="reference"
                class="el-icon-delete gallery_file_wrap_icon"
                @click="handleIconClick('delete', file)"/>
            </el-popover>

            <p class="gallery_file_wrap_title">{{ file.name }}</p>
          </div>
          <img
            :src="getFileUrl(file)"
            :alt="file.name"
            style="max-width: 100%;">
        </div>
        <!-- </el-col> -->
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-button
            :disabled="meta.total <= files.length"
            class="load_more_btn"
            type="success"
            plain
            @click="handleLoadMoreFiles">Load More</el-button>
        </el-col>
      </el-row>

      <el-dialog
        :title="fileDialog.file.name"
        :visible.sync="fileDialog.show"
        :fullscreen="true"
        :append-to-body="true"
        center>
        <el-row :gutter="10">
          <el-col :span="18">
            <h4 class="conversion_title">Full Resolution</h4>
            <img
              :src="fileDialog.file.url"
              :title="fileDialog.file.name"
              style="width:100%;">
          </el-col>
          <el-col :span="6">
            <div
              v-for="(conversion, key) in fileDialog.file.conversions"
              :key="key">
              <h4 class="conversion_title">{{ ucFirst(key) }}</h4>
              <img
                :src="conversion"
                :title="key"
                style="width:100%;"
                alt="No Image Available">
            </div>
          </el-col>
        </el-row>
      </el-dialog>

    </div>

  </div>
</template>

<script>
import api from 'services/api-service'
var chunk = require('lodash.chunk')
var find = require('lodash.find')
var last = require('lodash.last')
var filter = require('lodash.filter')
var union = require('lodash.union')
var upperFirst = require('lodash.upperfirst')
var debounce = require('lodash.debounce')

export default {

  name: 'GalleryComponent',

  components: {
    FileUploadComponent: () => import(/* webpackChunkName: "file-upload-component" */'components/FileUploadComponent'),
    Errors: () => import(/* webpackChunkName: "error" */'./Errors')
  },

  props: {
    galleryId: {
      type: Number,
      required: true
    },
    inModal: {
      type: Boolean,
      required: false,
      default: () => { return false }
    },
    meta: {
      type: Object,
      required: false,
      default: () => { return {} }
    },
    getGalleryFiles: {
      type: Boolean,
      required: false,
      default: () => { return true }
    },
    galleryFiles: {
      type: Array,
      required: false,
      default: () => { return [] }
    },
    selectable: {
      type: Number,
      required: false,
      default: () => { return null }
    }
  },

  data () {
    return {
      files: [],
      selectedFiles: [],
      errors: {},
      loading: false,
      fileDialog: {
        show: false,
        file: {}
      },
      galleryMeta: {},
      search: ''
    }
  },

  computed: {
    galleryImageChunks () {
      return chunk(this.files, this.inModal ? 6 : 12)
    }
  },

  watch: {
    'galleryMeta.search': debounce(function (value) {
      this.$emit('mediaSearch', { gallery: this.galleryId, value: value })

      this.getFiles()
    }, 500)
  },

  mounted () {
    console.log('GalleryCompnenent.vue: Mounted')
    if (this.getGalleryFiles) {
      this.getFiles()
    } else {
      this.files = this.galleryFiles
      this.galleryMeta = this.meta
    }
  },

  methods: {

    ucFirst (str) {
      return upperFirst(str)
    },

    formatPercentage (num) {
      return parseInt(num)
    },

    getFileUrl (file) {
      var thumb = file.conversions ? file.conversions.thumbnail : null
      var url = file.url

      if (thumb) {
        return thumb
      } else if (url) {
        return url
      }

      return file.response
    },

    /**
           * Get the media from the gallery.
           *
           * @return void
           */
    getFiles (push = false, unshift = false, page = 1, limit = 24, ascending = 0, syncMeta = true, load = true, silentErrors = false) {
      if (load) {
        this.loading = true
      }
      this.errors = {}
      var search = this.galleryMeta.search ? this.galleryMeta.search : ''

      api.get({
        path: 'galleries/' + this.galleryId + '/media?page=' + page,
        params: {
          limit: limit,
          ascending: ascending,
          search: search
        }
      })
        .then(function (data) {
          if (load) {
            this.loading = false
          }
          if (syncMeta) {
            this.galleryMeta = data.meta
          }
          if (unshift) {
            data.data.forEach(function (file) {
              this.files.unshift(file)
            }.bind(this))
          } else if (push) {
            data.data.forEach(function (file) {
              this.files.push(file)
            }.bind(this))
          } else {
            this.files = data.data
            this.$set(this.galleryMeta, 'search', search)
          }
        }.bind(this))
        .catch(function (error) {
          if (load) {
            this.loading = false
          }
          if (!silentErrors) {
            this.errors = error
          }
        }.bind(this))
    },

    deleteFile (file) {
      this.loading = true
      this.errors = {}

      api.delete({
        path: 'media/' + file.id
      })
        .then(function (data) {
          this.loading = false
          this.galleryMeta.total = this.galleryMeta.total - 1
          this.hideDeletePopover(file)

          if (this.galleryMeta.total >= this.files.length) {
            this.getFiles(true, false, this.galleryMeta.current_page, 1, 1, false, false, true)
          }

          this.$emit('fileDeleted', { file: file, gallery: this.galleryId })
        }.bind(this))
        .catch(function (error) {
          this.loading = false
          this.errors = error
        }.bind(this))
    },

    handleLoadMoreFiles () {
      this.getFiles(true, false, this.galleryMeta.current_page + 1)
    },

    shouldShowProgress (file) {
      if (file.percentage && file.percentage < 100) {
        return true
      }
      if (file.status && file.status !== 'success') {
        return true
      }
      return false
    },

    handleIconClick (method, file) {
      if (method === 'view') {
        this.fileDialog.show = true
        this.fileDialog.file = file
      }
      if (method === 'cancel') {
        this.files.splice(this.files.indexOf(file), 1)
      }
    },

    hideDeletePopover (file) {
      this.$refs['delete_popover_' + file.id][0].doClose()
    },

    handlefileSelected (file) {
      this.$emit('fileSelected', { file: file, gallery: this.galleryId })
    },

    handleUploadSuccess (data) {
      this.$emit('fileUploadSuccess', { data: data, gallery: this.galleryId })
    },

    handleFileClick (file, e) {
      if (e.srcElement.id !== 'delete' && e.srcElement.id !== 'view' && (this.selectable > 0 || !this.selectable)) {
        if ((e.metaKey || e.shiftKey || e.ctrlKey) && (this.selectable > 1 || !this.selectable)) {
          this.handleMultipleFileClick(file, e)
        } else if (!this.fileInSelects(file) && !this.shouldShowProgress(file)) {
          this.selectedFiles = []
          this.selectedFiles.push(file)

          this.$emit('fileHighlighted', { file: file, gallery: this.galleryId, selectedFiles: this.selectedFiles })
        } else {
          this.selectedFiles = []

          this.$emit('fileUnHighlighted', { file: file, gallery: this.galleryId, selectedFiles: this.selectedFiles })
        }
      } else if (e.srcElement.id === 'view') {
        this.handleIconClick('view', file)
      }
    },

    handleMultipleFileClick (file, e) {
      if (e.metaKey || e.ctrlKey) {
        if (this.fileInSelects(file) && !this.shouldShowProgress(file)) {
          this.selectedFiles.splice(this.selectedFiles.indexOf(file), 1)
          this.$emit('fileUnHighlighted', { file: file, gallery: this.galleryId, selectedFiles: this.selectedFiles })
        } else if (!this.shouldShowProgress(file)) {
          this.selectedFiles.push(file)
          this.selectedFiles = this.sliceSeletedFiles(this.selectedFiles)
          this.$emit('fileHighlighted', { file: file, gallery: this.galleryId, selectedFiles: this.selectedFiles })
        }
      } else if (e.shiftKey) {
        var multipleSelects = filter(this.files, function (o) {
          var currentIndex = this.files.indexOf(o)
          var selectedIndex = this.files.indexOf(file)
          var lastIndex = this.files.indexOf(last(this.selectedFiles))

          return currentIndex <= selectedIndex && currentIndex >= lastIndex && !this.shouldShowProgress(o)
        }.bind(this))

        var selectedFiles = union(this.selectedFiles, multipleSelects)

        this.selectedFiles = this.sliceSeletedFiles(selectedFiles)

        multipleSelects.forEach((file) => {
          this.$emit('fileHighlighted', { file: file, gallery: this.galleryId, selectedFiles: this.selectedFiles })
        })
      }
    },

    handleFileUploadError (data) {
      this.$emit('fileUploadError', data)
    },

    sliceSeletedFiles (files) {
      return files.slice(0, this.selectable)
    },

    fileInSelects (file) {
      var inSelects = find(this.selectedFiles, file)

      return !!inSelects
    },

    handleRightClick (file) {
      console.log(file)
    }

  }

}
</script>

<style lang="css" scoped>
.gallery_file_wrap {
  /* min-width: 200px; */
}
.media_search {
    margin-top: 20px;
    margin-bottom: 10px;
}
</style>
