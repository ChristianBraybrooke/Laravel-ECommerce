<template lang="html">
    <div class="">

        <el-button v-if="showBtn" type="info" plain size="mini" @click="dialogVisible = true;">Select File <i class="el-icon-document"></i></el-button>
        <el-dialog :title="'File Picker: ' + name"
                   class="file_picker_window"
                   :visible.sync="dialogVisible"
                   width="70%"
                   :close-on-click-modal="false"
                   top="7vh"
                   :before-close="handleClose">

            <galleries-component ref="galleries"
                                 :selectable="selectable"
                                 :in-modal="true"
                                 v-on:fileHighlighted="handleFileHighlighted"
                                 v-on:fileUnHighlighted="handleFileHighlighted">
            </galleries-component>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false; files = []; handleClose()">Cancel</el-button>
                <el-button :disabled="!fileSelected" type="primary" @click="handleFileChoose">{{ this.files.length <= 1 ? 'Use File' : 'Use Files' }}</el-button>
            </span>
        </el-dialog>

        <template v-for="chunk in fileChunks" v-if="showPreview">
            <el-row :gutter="10" class="gallery_row" type="flex">
                <template v-for="(file, index) in chunk">
                    <el-col>
                        <div class="gallery_file_wrap">
                            <div class="gallery_file_wrap_inner">

                                <el-popover
                                  :ref="'delete_popover_' + file.id"
                                  placement="top"
                                  width="160">
                                  <p>Remove {{ file.name }}?</p>
                                  <div style="text-align: right; margin: 0">
                                    <el-button type="primary" size="mini" @click="hideDeletePopover(file)">cancel</el-button>
                                    <el-button type="primary" size="mini" @click="deleteFile(file)">confirm</el-button>
                                  </div>
                                  <i id="delete" slot="reference" @click="handleIconClick('delete', file)" class="el-icon-delete gallery_file_wrap_icon"></i>
                                </el-popover>

                                <p class="gallery_file_wrap_title">{{file.name}}</p>
                            </div>
                            <img style="max-width: 100%;" :src="getFileUrl(file)" :alt="file.name">
                        </div>
                    </el-col>
                </template>
            </el-row>
        </template>

    </div>
</template>

<script>
var chunk = require('lodash.chunk');
var forEach = require('lodash.foreach');

export default {

      name: 'FilePickerComponent',

      components: {
          GalleriesComponent: () => import('./GalleriesComponent.vue'),
      },

      props: {
          openOnMount: {
              type: Boolean,
              required: false,
              default() {
                  return false
              }
          },
          selectable: {
              type: Number,
              required: false,
              default() {

              }
          },
          name: {
              type: String,
              required: true,
          },
          visible: {
              type: Boolean,
              required: false,
              default() {
                  return false;
              }
          },
          showPreview: {
              type: Boolean,
              required: false,
              default() {
                  return true
              }
          },
          showBtn: {
              type: Boolean,
              required: false,
              default() {
                  return false
              }
          },
          currentFiles: {
              required: false,
          },
          pickerId: {

          },
      },

      data () {
          return {
              dialogVisible: false,
              files: [],
          }
      },

      computed: {
          fileSelected: function() {
              return Object.keys(this.files).length >= 1;
          },

          fileChunks()
          {
              return chunk(this.files, 4);
          },
      },

      watch: {
          dialogVisible: function(value) {
              if (!value) {
                  this.$emit('closed:modal', value);
              } else {
                  this.$emit('opened:modal', value);
              }
          },

          visible: function(value) {
              this.dialogVisible = value;
          }
      },

      mounted () {
          console.log('FilePickerModal.vue mounted.');

          this.syncFiles();

          if(this.openOnMount) {
              this.openModal();
          }
      },

      methods: {

          syncFiles()
          {
              if(this.currentFiles) {
                  forEach(this.currentFiles, function (file) {
                      this.files.push(file);
                  }.bind(this));
              }
          },

          getFileUrl(file)
          {
            var thumb = file.conversions ? file.conversions.thumbnail : null;
            var url = file.url;

            if(thumb) {
                return thumb;
            } else if(url) {
                return url;
            }

            return file.response;
          },

          openModal()
          {
              this.dialogVisible = true;
          },

          closeModal()
          {
              this.dialogVisible = false;
          },

          handleClose()
          {
              this.files = [];
              this.closeModal();
              this.$emit('modalClosed', { files: this.files, id: this.pickerId });
              if(this.currentFiles) {
                  forEach(this.currentFiles, function (file) {
                      this.files.push(file);
                  }.bind(this));
              }
          },

          handleFileChoose()
          {
              this.dialogVisible = false;
              this.$emit('update:files', this.files);
              this.$emit('filesChosen', { files: this.files, id: this.pickerId });
          },

          handleFileHighlighted(data)
          {
              this.files = data.selectedFiles;
          },

          handleIconClick(type)
          {

          },

          hideDeletePopover(file)
          {
              this.$refs['delete_popover_' + file.id][0].doClose();
          },

          deleteFile(file)
          {
              this.files.splice(this.files.indexOf(file), 1);
              this.$emit('update:files', this.files);
              this.$emit('filesUnChosen', { files: this.files, id: this.pickerId });
          },


      },

}
</script>

<style lang="css">
.file_picker_window .el-dialog {
    min-width: 620px!important;
}
@media (max-width: 700px) {
  .file_picker_window .el-dialog {
      min-width: 350px!important;
  }
}
</style>
