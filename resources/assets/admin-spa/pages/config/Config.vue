<template lang="html">
    <div v-loading="loading">

      <el-row align="middle" type="flex">
          <el-col :span="12"><h1 class="page_title">Config</h1></el-col>
      </el-row>

      <errors v-if="Object.keys(settingsErrors).length > 0" :errors="settingsErrors"></errors>


              <el-row type="flex">
                  <el-col :md="24">
                      <el-form label-position="top"
                               :model="settings"
                               ref="settingsForm"
                               label-width="120px"
                               @keyup.enter.native="submitForm('settingsForm')">


                          <el-row :gutter="20">
                              <el-tabs v-model="currentTab">
                                  <el-tab-pane label="General" name="general">

                                      <el-col :lg="12" :md="24">

                                          <el-form-item v-if="settings" label="Site Url" prop="url">
                                              <el-input v-model="settings['url']"></el-input>
                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Contact Phone" prop="Contact Phone">
                                              <el-input v-model="settings['Contact Phone']"></el-input>
                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Contact Email" prop="Contact Email">
                                              <el-input v-model="settings['Contact Email']"></el-input>
                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Admin Notifications" prop="Admin Notifications">
                                              <el-select class="config_select" v-model="settings['Admin Notifications']" placeholder="Select" multiple filterable>
                                                  <el-option v-for="user in users"
                                                             :key="user.name"
                                                             :label="user.first_name + ' ' + user.last_name"
                                                             :value="user.id">
                                                  </el-option>
                                              </el-select>
                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Invoice Number Prefix" prop="Invoice Number Prefix">
                                              <el-input v-model="settings['Invoice Number Prefix']"></el-input>
                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Currency" prop="Currency">
                                              <el-input v-model="settings['Currency']"></el-input>
                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Price Thousand Seperator" prop="Price Thousand Seperator">
                                              <el-select class="config_select" v-model="settings['Price Thousand Seperator']" placeholder="Select">
                                                  <el-option :key="0"
                                                             label=","
                                                             value=",">
                                                  </el-option>
                                                  <el-option :key="1"
                                                             label=""
                                                             value="">
                                                  </el-option>
                                              </el-select>
                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Price Decimal Seperator" prop="Price Decimal Seperator">
                                              <el-select class="config_select" v-model="settings['Price Decimal Seperator']" placeholder="Select">
                                                  <el-option :key="0"
                                                             label=","
                                                             value=",">
                                                  </el-option>
                                                  <el-option :key="1"
                                                             label="."
                                                             value=".">
                                                  </el-option>
                                                  <el-option :key="2"
                                                             label=":"
                                                             value=":">
                                                  </el-option>
                                              </el-select>
                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Price Numer of Decimals" prop="Price Numer of Decimals">
                                              <el-select class="config_select" v-model="settings['Price Numer of Decimals']" placeholder="Select">
                                                  <el-option :key="0"
                                                             :label="0"
                                                             :value="0">
                                                  </el-option>
                                                  <el-option :key="2"
                                                             :label="2"
                                                             :value="2">
                                                  </el-option>
                                              </el-select>
                                          </el-form-item>


                                          <el-form-item v-if="settings" label="Shipping Rate" prop="Shipping Rate">
                                              <el-input v-model="settings['Shipping Rate']"></el-input>
                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Advert Collection" prop="Advert Collection">
                                              <el-select class="config_select" v-model="settings['Advert Collection']" placeholder="Select">
                                                  <el-option v-for="type in collections"
                                                             :key="type.name"
                                                             :label="type.name"
                                                             :value="type.id">
                                                  </el-option>
                                              </el-select>
                                          </el-form-item>

                                      </el-col>

                                      <el-col :lg="12" :md="24">

                                          <el-form-item v-if="settings" label="Website Logo" prop="Website Logo">
                                              <el-button type="info" plain size="mini" @click="displayFilePicker('websiteLogoPicker')">Select File <i class="el-icon-document"></i></el-button>

                                              <file-picker-modal ref="websiteLogoPicker"
                                                                 :current-files="(settings['Website Logo'] && settings['Website Logo'][0]) ? [settings['Website Logo'][0]] : undefined"
                                                                 v-on:filesChosen="handleFilesChosen"
                                                                 v-on:filesUnChosen="handleFilesUnChosen"
                                                                 name="Website Logo"
                                                                 :selectable="1"
                                                                 picker-id="Website Logo"
                                                                 :open-on-mount="false">
                                              </file-picker-modal>

                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Website Logo White" prop="Website Logo White">
                                              <el-button type="info" plain size="mini" @click="displayFilePicker('websiteLogoWhitePicker')">Select File <i class="el-icon-document"></i></el-button>

                                              <file-picker-modal ref="websiteLogoWhitePicker"
                                                                 :current-files="(settings['Website Logo White'] && settings['Website Logo White'][0]) ? [settings['Website Logo White'][0]] : undefined"
                                                                 v-on:filesChosen="handleFilesChosen"
                                                                 v-on:filesUnChosen="handleFilesUnChosen"
                                                                 name="Website Logo White"
                                                                 :selectable="1"
                                                                 picker-id="Website Logo White"
                                                                 :open-on-mount="false">
                                              </file-picker-modal>

                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Website Watermark" prop="Website Watermark">
                                              <el-button type="info" plain size="mini" @click="displayFilePicker('websiteWatermarkPicker')">Select File <i class="el-icon-document"></i></el-button>

                                              <file-picker-modal ref="websiteWatermarkPicker"
                                                                 :current-files="(settings['Website Watermark'] && settings['Website Watermark'][0]) ? [settings['Website Watermark'][0]] : undefined"
                                                                 v-on:filesChosen="handleFilesChosen"
                                                                 v-on:filesUnChosen="handleFilesUnChosen"
                                                                 name="Website Watermark"
                                                                 :selectable="1"
                                                                 picker-id="Website Watermark"
                                                                 :open-on-mount="false">
                                              </file-picker-modal>

                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Brochure File" prop="Brochure File">

                                              <file-picker-modal ref="brochurePicker"
                                                                 :current-files="(settings['Brochure File'] && settings['Brochure File'][0]) ? [settings['Brochure File'][0]] : undefined"
                                                                 v-on:filesChosen="handleFilesChosen"
                                                                 v-on:filesUnChosen="handleFilesUnChosen"
                                                                 name="Brochure File"
                                                                 :selectable="1"
                                                                 picker-id="Brochure File"
                                                                 :show-btn="true"
                                                                 :open-on-mount="false">
                                              </file-picker-modal>

                                          </el-form-item>
                                    </el-col>

                                  </el-tab-pane>
                                  <el-tab-pane label="Home Page" name="home">
                                      <el-col :lg="12" :md="24">

                                          <el-form-item v-if="settings" label="Home Header Collection" prop="Home Header Collection">
                                              <el-select class="config_select" v-model="settings['Home Header Collection']" placeholder="Select">
                                                  <el-option v-for="type in collections"
                                                             :key="type.name"
                                                             :label="type.name"
                                                             :value="type.id">
                                                  </el-option>
                                              </el-select>
                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Home Panels Collection" prop="Home Panels Collection">
                                              <el-select class="config_select" v-model="settings['Home Panels Collection']" placeholder="Select">
                                                  <el-option v-for="type in collections"
                                                             :key="type.name"
                                                             :label="type.name"
                                                             :value="type.id">
                                                  </el-option>
                                              </el-select>
                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Home Featured Product Collection" prop="Home Featured Product Collection">
                                              <el-select class="config_select" v-model="settings['Home Featured Product Collection']" placeholder="Select">
                                                  <el-option v-for="type in collections"
                                                             :key="type.name"
                                                             :label="type.name"
                                                             :value="type.id">
                                                  </el-option>
                                              </el-select>
                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Home Featured Product Collection Types" prop="Home Featured Product Collection Types">
                                              <el-select class="config_select" v-model="settings['Home Featured Product Collection Types']" placeholder="Select" multiple filterable>
                                                  <el-option v-for="type in featured_product_types"
                                                             :key="type.name"
                                                             :label="type.name"
                                                             :value="type.id">
                                                  </el-option>
                                              </el-select>
                                          </el-form-item>

                                          <el-form-item v-if="settings" label="Product Video Placeholder" prop="Product Video Placeholder">
                                              <el-button type="info" plain size="mini" @click="displayFilePicker('productVideoPicker')">Select File <i class="el-icon-document"></i></el-button>

                                              <file-picker-modal ref="productVideoPicker"
                                                                 :current-files="(settings['Product Video Placeholder'] && settings['Product Video Placeholder'][0]) ? [settings['Product Video Placeholder'][0]] : undefined"
                                                                 v-on:filesChosen="handleFilesChosen"
                                                                 v-on:filesUnChosen="handleFilesUnChosen"
                                                                 name="Product Video Placeholder"
                                                                 :selectable="1"
                                                                 picker-id="Product Video Placeholder"
                                                                 :open-on-mount="false">
                                              </file-picker-modal>

                                          </el-form-item>

                                      </el-col>

                                  </el-tab-pane>
                              </el-tabs>
                        </el-row>

                        <hr class="page_hr">

                        <el-row :gutter="20">
                            <el-col :sm="24">
                                <el-form-item>
                                    <el-button plain type="success" :loading="loading" @click="submitForm('settingsForm')">Update</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>

                      </el-form>
                  </el-col>
              </el-row>


    </div>
</template>

<script>
import api from "../../services/api-service.js";
var upperFirst = require('lodash.upperfirst');

export default {

      name: 'Config',

      components: {
          Errors: () => import('../../components/Errors'),
          FilePickerModal: () => import('../../components/FilePickerModal.vue')
      },

      props: [

      ],

      data () {
          return {
              loading: false,
              settings: null,
              settingsErrors: {},
              settingsForm: {},
              collections: {},
              featured_product_types: {},
              users: {},
              currentTab: 'general'
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('Config.vue mounted');
          this.getSettings();
          this.getCollections();
          this.getUsers();
      },

      methods: {

        p(path) {
           const segments = path.split('.')
           return function () {
             var obj = this
             for (let i = 0; i < segments.length; i++) {
               if (!obj) return
               obj = obj[segments[i]]
             }
             return obj
           }
        },

        ucFirst(value)
        {
            return upperFirst(value);
        },

        shouldShowInput(key)
        {
            if (key === 'Admin Notifications' || key === 'Home Header Collection' || key === 'Home Panels Collection') {
                return false;
            }
            return true;
        },

        getSettings()
        {
            this.loading = true;
            this.settingsErrors = {};

            api.get({
                path: 'settings'
            })
            .then(function (data) {
                this.loading = false;
                this.settings = data.data;
                this.getFeaturedProductCollectionTypes();
            }.bind(this))
            .catch(function (error) {
                this.loading = false;
                this.settingsErrors = error;
            }.bind(this));
        },

        getCollections()
        {
            api.get({
                path: 'collections'
            })
            .then(function (data) {
                this.collections = data.data;
            }.bind(this))
            .catch(function (error) {
                this.settingsErrors = error;
            }.bind(this));
        },

        getFeaturedProductCollectionTypes()
        {

            if (this.settings['Home Featured Product Collection']) {
                api.get({
                    path: 'collections/' + this.settings['Home Featured Product Collection'] + '/types'
                })
                .then(function (data) {
                    this.featured_product_types = data.data;
                }.bind(this))
                .catch(function (error) {
                    this.settingsErrors = error;
                }.bind(this));
            } else {
                this.featured_product_types = {};
            }

        },

        getUsers()
        {
            api.get({
                path: 'users',
                params: {
                  withRole: 'admin'
                }
            })
            .then(function (data) {
                this.users = data.data;
            }.bind(this))
            .catch(function (error) {
                this.settingsErrors = error;
            }.bind(this));
        },

        submitForm(formName)
        {
            this.loading = true;
            this.settingsErrors = {};

            api.persist('post', {
                path: 'settings',
                object: {
                  settings: this.settings
                }
            })
            .then(function (data) {
                this.loading = false;
                this.settings = data.data;
            }.bind(this))
            .catch(function (error) {
                this.loading = false;
                this.settingsErrors = error;
            }.bind(this));
        },

        displayFilePicker(ref)
        {
            if(this.$refs[ref]) {
                this.$refs[ref].openModal();
            }
        },

        handleFilesChosen(data)
        {
            this.$set(this.settings, data.id, data.files);
        },

        handleFilesUnChosen(data)
        {
            this.$set(this.settings, data.id, data.files);
        }
      },

}
</script>

<style lang="css" scoped>
.config_select {
    width: 100%
}
</style>
