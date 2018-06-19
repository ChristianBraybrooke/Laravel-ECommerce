<template lang="html">
<div class="gallery_component" v-loading="loading">

      <div style="margin-bottom: 20px;">

          <el-popover ref="addGalleryPopover"
                      placement="right"
                      width="300"
                      trigger="click"
                      v-model="addGalleryPopoverVisible">

              <el-form :inline="true"
                       :rules="createGalleryRules"
                       @submit.native.prevent
                       @keyup.enter.native="createGallery"
                       ref="createGallery"
                       :model="createGalleryForm">
                <el-form-item prop="name" ref="createGalleryName">
                  <el-input v-model="createGalleryForm.name" placeholder="Gallery Name"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="createGallery">Create</el-button>
                </el-form-item>
              </el-form>

          </el-popover>

          <el-button size="small" @click="getGalleries" type="info" plain><i class="el-icon-refresh"></i></el-button>
          <el-button v-if="!inModal" size="small" type="primary" plain v-popover:addGalleryPopover @click="addGalleryPopoverVisible = true">Create New Gallery</el-button>
      </div>

      <el-popover
        ref="deleteGalleryPopover"
        placement="bottom"
        width="160"
        v-model="deleteGalleryPopoverVisible">
        <p>Are you sure to delete this?</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="deleteGalleryPopoverVisible = false">cancel</el-button>
          <el-button type="primary" size="mini" @click="deleteGalleryPopoverVisible = false">confirm</el-button>
        </div>
      </el-popover>

      <errors :errors="errors"></errors>

      <el-tabs v-model="currentTab" type="card" @tab-click="handleTabClick">
          <el-tab-pane v-for="(gallery, index) in galleries"
                       :key="gallery.id"
                       :label="gallery.name"
                       :name="gallery.id.toString()">

              <gallery-component :gallery-id="gallery.id"
                                 v-if="showGallery[gallery.id] && showGallery[gallery.id].show"
                                 :get-gallery-files="false"
                                 :in-modal="inModal"
                                 :meta="gallery.meta"
                                 :selectable="gallerySelectable[gallery.id] ? gallerySelectable[gallery.id] : undefined"
                                 v-on:fileSelected="handleFileSelected"
                                 v-on:fileDeleted="handleFileDeleted"
                                 v-on:fileUnHighlighted="handleFileUnHighlighted"
                                 v-on:fileHighlighted="handleFileHighlighted"
                                 v-on:fileUploadSuccess="handleFileUploadSuccess"
                                 v-on:fileUploadError="handleFileUploadError"
                                 v-on:mediaSearch="handleMediaSearch"
                                 :gallery-files="files[gallery.id] ? files[gallery.id] : []">
              </gallery-component>
          </el-tab-pane>
      </el-tabs>

</div>
</template>

<script>
import api from "services/api-service";
var findIndex = require('lodash.findindex');
var head = require('lodash.head');
var find = require('lodash.find');

export default {

      name: 'GalleriesComponent',

      components: {
          GalleryComponent: () => import(/* webpackChunkName: "gallery-component" */'components/GalleryComponent'),
          Errors: () => import(/* webpackChunkName: "errors" */'components/Errors')
      },

      props: {
          selectable: {
              type: Number,
              required: false,
              default() {

              }
          },
          inModal: {
              type: Boolean,
              required: false,
              default() {
                  return false
              }
          },
      },

      data () {
          return {
              galleries: [],
              tabIndex: 2,
              createGalleryForm: {},
              createGalleryRules: {},
              showGallery: {},
              gallerySelectable: {},
              loading: false,
              currentTab: '',
              files: {},
              deleteGalleryPopoverVisible: false,
              addGalleryPopoverVisible: false,
              errors: {},
              selectedFiles: {},
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('GalleriesCompnenent.vue: Mounted');
          this.getGalleries();
      },

      methods: {

          setCurrentGallery(getFiles = false, gallery = null)
          {
              if(!gallery) {
                  gallery = head(this.galleries);
              }

              if (gallery) {
                  this.currentTab = gallery.id.toString();
                  if (getFiles) {
                      this.getFiles(gallery);
                  }
              }
          },

          /**
           * Get the galleries from the server.
           *
           * @return void
           */
          getGalleries()
          {
              this.loading = true;
              api.get({
                  path: 'galleries'
              })
              .then(function(data) {
                  this.galleries = data.data;
                  this.loading = false;
                  this.setCurrentGallery(true);
              }.bind(this))
              .catch(function(error) {
                  this.loading = false;
              }.bind(this))
          },

          getFiles(gallery = null, search = '')
          {
              if (!gallery) {
                  gallery = this.getGalleryFromTabIndex(this.currentTab);
              }
              if (gallery) {
                  this.loading = true;
                  this.$set(this.showGallery, gallery.id, { show: false });

                  api.get({
                      path: 'galleries/' + gallery.id + '/media',
                      params: {
                        limit: 24,
                        search: search
                      }
                  })
                  .then(function(data) {
                      this.loading = false;
                      this.errors = {};
                      this.$set(this.gallerySelectable, gallery.id, this.selectable);
                      this.$set(this.files, gallery.id, data.data);

                      var galleryIndex = this.getGalleriesArrayIndex(gallery.id);
                      this.galleries[galleryIndex].meta = data.meta;

                      this.$set(this.showGallery, gallery.id, { show: true });
                  }.bind(this))
                  .catch(function(error) {
                      this.errors = error;
                      this.loading = false;
                  }.bind(this))
              } else {
                this.errors = {
                    message: "No gallery selected."
                }
              }
          },

          createGallery()
          {
              this.loading = true;
              this.createGalleryRules = {name: [{ required: true, message: 'Gallery name is required'}]};
              this.$refs.createGallery.validate((valid) => {
                  if (valid) {
                      api.persist('post', {
                          path: 'galleries',
                          object: this.createGalleryForm
                      })
                      .then(function(data) {
                          this.galleries.unshift(data.data);
                          this.createGalleryRules = {};
                          this.setCurrentGallery(true, data.data);
                          this.loading = false;
                          this.addGalleryPopoverVisible = false;
                          this.$refs.createGalleryName.resetField();
                      }.bind(this))
                      .catch(function(error) {
                          this.loading = false;
                      }.bind(this));
                  }
              });
          },

          deleteGallery(tabIndex) {
              this.loading = true;

              var gallery = this.getGalleryFromTabIndex(tabIndex);

              if (gallery) {
                  api.delete({
                      path: 'galleries/' + gallery.id
                  })
                  .then(function() {
                      this.galleries.splice(this.galleries.indexOf(gallery), 1);
                      this.loading = false;
                  }.bind(this))
                  .catch(function() {
                      this.loading = false;
                  }.bind(this));
              } else {
                  this.loading = false;
              }
          },

          handleTabClick(tab)
          {
              var gallery = this.getGalleryFromTabIndex(tab.name);

              if(gallery) {
                  this.setCurrentGallery(true, gallery);
              }
          },

          getGalleryFromTabIndex(tabIndex)
          {
              if (tabIndex) {
                  var galleryIndex = findIndex(this.galleries, function(g) {
                                          return g.id === parseInt(tabIndex);
                                      });
                  return galleryIndex === -1 ? null : this.galleries[galleryIndex];
              }

              return null;
          },

          getGalleriesArrayIndex(galleryId)
          {
              if (galleryId) {
                  var galleryIndex = findIndex(this.galleries, function(g) {
                                          return g.id === galleryId;
                                      });
                  return galleryIndex === -1 ? null : galleryIndex;
              }

              return null;
          },

          handleFileSelected(data)
          {
              this.files[data.gallery].unshift(data.file);
          },

          handleFileDeleted(data)
          {
              this.files[data.gallery].splice(this.files[data.gallery].indexOf(data.file), 1);
          },

          handleFileHighlighted(data)
          {
              this.selectedFiles = data.selectedFiles;
              this.$emit('fileHighlighted', data);
          },

          handleFileUploadSuccess(data)
          {
              var file = findIndex(this.files[data.gallery], function(g) {
                                      return g.uid === data.data.file.uid;
                                  });
              var galleryIndex = this.getGalleriesArrayIndex(data.gallery)
              console.log(galleryIndex)
              if(galleryIndex !== null) {
                  this.galleries[galleryIndex].meta.total = this.galleries[galleryIndex].meta.total + 1;
              }
              this.files[data.gallery][file].id = data.data.response.data.id;
              this.files[data.gallery][file].url = data.data.response.data.url;
              this.errors = {};
          },

          handleFileUploadError(data)
          {
              this.errors = api.errorAdapter(data.error);
              setTimeout(function() {
                  this.files[data.gallery].splice(this.files[data.gallery].indexOf(data.file), 1);
                  this.errors = {};
              }.bind(this), 3000)
          },

          handleFileUnHighlighted(data)
          {
              this.selectedFiles = data.selectedFiles;
              this.$emit('fileUnHighlighted', data);
          },

          handleMediaSearch(data)
          {
              // this.getFiles({ id: data.galllery }, data.search);
          },
      },

}
</script>

<style lang="css">
</style>
