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


                                      <!--
                                          SITE INFORMATION
                                      -->
                                      <el-row :gutter="20">
                                          <el-col :md="12">
                                              <h5>Site Information</h5>
                                          </el-col>
                                      </el-row>

                                      <el-row :gutter="20">
                                          <el-col :md="{span:8, offset: 4}">
                                              <el-form-item v-if="settings" label="Site Url" size="small" prop="url">
                                                  <el-input disabled v-model="settings['url']"></el-input>
                                              </el-form-item>
                                          </el-col>
                                      </el-row>

                                      <el-row :gutter="20">
                                          <el-col :md="{span:8, offset: 4}">
                                              <el-form-item v-if="settings" label="Contact Phone" size="small" prop="Contact Phone">
                                                  <el-input v-model="settings['Contact Phone']"></el-input>
                                              </el-form-item>
                                          </el-col>

                                          <el-col :md="{span:8}">
                                              <el-form-item v-if="settings" label="Contact Email" size="small" prop="Contact Email">
                                                  <el-input v-model="settings['Contact Email']"></el-input>
                                              </el-form-item>
                                          </el-col>
                                      </el-row>

                                      <hr class="form_hr">


                                      <!--
                                          ADMIN NOTIFICATIONS
                                      -->
                                      <el-row :gutter="20">
                                          <el-col :md="12">
                                              <h5>Admin Notifications</h5>
                                          </el-col>
                                      </el-row>

                                      <el-row :gutter="20">
                                          <el-col :md="{span:8, offset: 4}">
                                              <el-form-item v-if="settings" label="Admin Notifications" prop="Admin Notifications" size="small">
                                                  <el-select class="config_select" v-model="settings['Admin Notifications']" placeholder="Select" multiple filterable>
                                                      <el-option v-for="user in users"
                                                                 v-if="user.name"
                                                                 :key="user.name.full"
                                                                 :label="user.name.full"
                                                                 :value="user.id">
                                                      </el-option>
                                                  </el-select>
                                              </el-form-item>
                                          </el-col>
                                      </el-row>

                                      <hr class="form_hr">

                                      <!--
                                          ORDER INFORMATION
                                      -->
                                      <el-row :gutter="20">
                                          <el-col :md="12">
                                              <h5>Order Information</h5>
                                          </el-col>
                                      </el-row>

                                      <el-row :gutter="20">
                                          <el-col :md="{span:8, offset: 4}">
                                              <el-form-item v-if="settings" label="Invoice Number Prefix" prop="Invoice Number Prefix" size="small">
                                                  <el-input v-model="settings['Invoice Number Prefix']"></el-input>
                                              </el-form-item>
                                          </el-col>
                                      </el-row>

                                      <el-row :gutter="20">
                                          <el-col :md="{span:8, offset: 4}">
                                              <el-form-item v-if="settings" label="Currency" prop="Currency" size="small">
                                                  <el-input v-model="settings['Currency']"></el-input>
                                              </el-form-item>
                                          </el-col>
                                      </el-row>

                                      <el-row :gutter="20">
                                          <el-col :md="{span:5, offset: 4}">
                                              <el-form-item v-if="settings" label="Price Thousand Seperator" prop="Price Thousand Seperator" size="small">
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
                                          </el-col>

                                          <el-col :md="{span:5}">
                                              <el-form-item v-if="settings" label="Price Decimal Seperator" prop="Price Decimal Seperator" size="small">
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
                                          </el-col>

                                          <el-col :md="{span:5}">
                                              <el-form-item v-if="settings" label="Price Numer of Decimals" prop="Price Numer of Decimals" size="small">
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
                                          </el-col>
                                      </el-row>

                                      <hr class="form_hr">


                                      <!--
                                          SHIPPING INFORMATION
                                      -->
                                      <el-row :gutter="20">
                                          <el-col :md="12">
                                              <h5>Order Information</h5>
                                          </el-col>
                                      </el-row>

                                      <el-row :gutter="20">
                                          <el-col :md="{span:8, offset: 4}">
                                              <el-form-item v-if="settings" label="Shipping Rate" prop="Shipping Rate" size="small">
                                                  <el-input v-model="settings['Shipping Rate']"></el-input>
                                              </el-form-item>
                                          </el-col>
                                      </el-row>


                                  </el-tab-pane>

                                  <el-tab-pane label="Site Images" name="site_images">
                                      <el-col :lg="12" :md="24">

                                          <el-form-item v-if="settings" v-for="image in shopData.site_images" :label="image" :prop="image" :key="image">
                                              <file-picker-modal v-if="settings"
                                                                 :current-files="(settings[image] && settings[image][0]) ? [settings[image][0]] : undefined"
                                                                 @update:files="val => settings[image] = val"
                                                                 :show-btn="true"
                                                                 :name="image"
                                                                 :selectable="1"
                                                                 :picker-id="image">
                                              </file-picker-modal>
                                          </el-form-item>

                                      </el-col>
                                  </el-tab-pane>

                                  <el-tab-pane label="Collection Mappings" name="collection_mappings">
                                      <el-col :lg="12" :md="24">

                                          <el-form-item v-if="settings" v-for="mapping in shopData.collection_mappings" :label="mapping" :prop="mapping" :key="mapping">
                                              <el-select class="config_select" v-model="settings[mapping]" placeholder="Select">
                                                  <el-option v-for="type in collections"
                                                             :key="type.name"
                                                             :label="type.name"
                                                             :value="type.id">
                                                  </el-option>
                                              </el-select>
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
import { mapActions, mapGetters } from 'vuex';


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
              settings: {},
              settingsErrors: {},
              settingsForm: {},
              collections: {},
              shopData: {},
              featured_product_types: {},
              users: {},
              currentTab: 'general'
          }
      },

      computed: {
          //
      },

      watch: {
          //
      },

      mounted () {
          console.log('Config.vue mounted');
          this.getSettings();
          this.getCollections();
          this.getUsers();
      },

      methods: {

        ...mapActions([
            'setShopData',
        ]),

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
                this.setShopData(data.shop_data);
                this.shopData = data.shop_data;
                if (!this.settings['Admin Notifications']) {
                    this.settings['Admin Notifications'] = [];
                }

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
