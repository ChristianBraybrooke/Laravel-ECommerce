<template lang="html">
<div>
    <el-upload
        class="file_upload_box"
        list-type="picture-card"
        :with-credentials="true"
        :action="uploadUrl"
        :on-preview="handlePictureCardPreview"
        :file-list="fileList"
        :on-remove="handleRemove"
        :show-file-list="false"
        :drag="true"
        :multiple="true"
        :on-success="handleSuccess"
        :data="uploadData"
        :headers="uploadHeaders"
        :on-change="handleChange"
        :before-upload="handleBeforeUpload"
        :on-error="handleUploadError">

        <div class="file_upload_text">
          <i class="el-icon-plus"></i>
          <p>Click to upload or drag file</p>
        </div>
    </el-upload>


    <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
</div>
</template>

<script>
var replace = require('lodash.replace');

export default {

      name: 'FileUploadComponent',

      components: {

      },

      props: {
          galleryId: {
              type: Number,
              required: true,
          },
          fileList: {
              type: Array,
              required: false,
              default () {
                  return []
              },
          },
      },

      data () {
          return {
              dialogVisible: false,
              dialogImageUrl: ''
          }
      },

      computed: {

          uploadUrl()
          {
              const BASE_URL = ecommerceConfig.site_url + '/' + ecommerceConfig.api_prefix + '/';
              return BASE_URL + 'media/upload';
          },

          uploadHeaders()
          {
              return {
                  'Accept': 'application/json',
                  'X-CSRF-TOKEN': window.laravel_token
              };
          },

          uploadData()
          {
              return {
                  'gallery': this.galleryId,
              };
          },
      },

      watch: {

      },

      mounted () {
          console.log('ImageUploadComponent.vue: Mounted');
      },

      methods: {

        handlePictureCardPreview(file)
        {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },

        handleRemove(file, fileList)
        {
            console.log(file, fileList);
        },

        handleChange(file, filelist)
        {
            if(file.status === 'ready' && file.percentage === 0) {
                this.$emit('fileSelected', file);
            }
        },

        handleSuccess(response, file, fileList)
        {
            this.$emit('fileUploadSuccess', { response: response, file: file, fileList: fileList });
        },

        handleUploadError(err, file, fileList)
        {
            var err_data = JSON.parse(replace(err, 'Error: '+ err.status +' ', ''));

            this.$emit('fileUploadError', {
                error: {
                    status: err.status,
                    data: err_data
                },
                file: file,
                gallery: this.galleryId
            })
        },

        handleBeforeUpload(file)
        {

        },

      },

}
</script>

<style lang="css">
.file_upload_box .el-upload.el-upload--picture-card,.file_upload_box .el-upload-dragger {
    width: 100%!important;
}
.file_upload_box .el-upload-dragger {
    height: 100%;
}
.file_upload_text p{
    top: 10px;
    position: absolute;
    width: 100%;
    text-align: center!important;
    color: #8c929d;
}
</style>
