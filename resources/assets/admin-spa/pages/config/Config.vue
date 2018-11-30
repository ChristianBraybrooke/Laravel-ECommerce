<template lang="html">
  <div v-loading="loading">

    <el-row
      align="middle"
      type="flex">
      <el-col :span="12"><h1 class="page_title">Config</h1></el-col>
    </el-row>

    <errors
      v-if="Object.keys(settingsErrors).length > 0"
      :errors="settingsErrors"/>

    <el-row type="flex">
      <el-col :md="24">
        <el-form
          ref="settingsForm"
          :model="settings"
          label-position="top"
          label-width="120px"
          @keyup.enter.native="submitForm('settingsForm')">

          <el-row :gutter="20">
            <el-tabs v-model="currentTab">
              <el-tab-pane
                label="General"
                name="general">

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
                    <el-form-item
                      v-if="settings"
                      label="Site Url"
                      size="small"
                      prop="url">
                      <el-input
                        v-model="settings['url']"
                        disabled/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :md="{span:8, offset: 4}">
                    <el-form-item
                      v-if="settings"
                      label="Contact Phone"
                      size="small"
                      prop="Contact Phone">
                      <el-input v-model="settings['Contact Phone']"/>
                    </el-form-item>
                  </el-col>

                  <el-col :md="{span:8}">
                    <el-form-item
                      v-if="settings"
                      label="Contact Email"
                      size="small"
                      prop="Contact Email">
                      <el-input v-model="settings['Contact Email']"/>
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
                    <el-form-item
                      v-if="settings"
                      label="Admin Notifications"
                      prop="Admin Notifications"
                      size="small">
                      <el-select
                        v-model="settings['Admin Notifications']"
                        class="config_select"
                        placeholder="Select"
                        multiple
                        filterable>
                        <el-option
                          v-for="user in users"
                          v-if="user.name"
                          :key="user.name.full"
                          :label="user.name.full"
                          :value="user.id"/>
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
                    <el-form-item
                      v-if="settings"
                      label="Invoice Number Prefix"
                      prop="Invoice Number Prefix"
                      size="small">
                      <el-input v-model="settings['Invoice Number Prefix']"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :md="{span:8, offset: 4}">
                    <el-form-item
                      v-if="settings"
                      label="Currency"
                      prop="Currency"
                      size="small">
                      <el-input v-model="settings['Currency']"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :md="{span:5, offset: 4}">
                    <el-form-item
                      v-if="settings"
                      label="Price Thousand Seperator"
                      prop="Price Thousand Seperator"
                      size="small">
                      <el-select
                        v-model="settings['Price Thousand Seperator']"
                        class="config_select"
                        placeholder="Select">
                        <el-option
                          :key="0"
                          label=","
                          value=","/>
                        <el-option
                          :key="1"
                          label=""
                          value=""/>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :md="{span:5}">
                    <el-form-item
                      v-if="settings"
                      label="Price Decimal Seperator"
                      prop="Price Decimal Seperator"
                      size="small">
                      <el-select
                        v-model="settings['Price Decimal Seperator']"
                        class="config_select"
                        placeholder="Select">
                        <el-option
                          :key="0"
                          label=","
                          value=","/>
                        <el-option
                          :key="1"
                          label="."
                          value="."/>
                        <el-option
                          :key="2"
                          label=":"
                          value=":"/>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :md="{span:5}">
                    <el-form-item
                      v-if="settings"
                      label="Price Numer of Decimals"
                      prop="Price Numer of Decimals"
                      size="small">
                      <el-select
                        v-model="settings['Price Numer of Decimals']"
                        class="config_select"
                        placeholder="Select">
                        <el-option
                          :key="0"
                          :label="0"
                          :value="0"/>
                        <el-option
                          :key="2"
                          :label="2"
                          :value="2"/>
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
                    <el-form-item
                      v-if="settings"
                      label="Shipping Rate"
                      prop="Shipping Rate"
                      size="small">
                      <el-input v-model="settings['Shipping Rate']"/>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-tab-pane>

              <el-tab-pane
                label="Pricing"
                name="pricing">

                <el-row :gutter="20">
                  <el-col :md="12">
                    <h5>VAT</h5>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :md="{span:8, offset: 4}">
                    <el-form-item
                      v-if="settings"
                      label="VAT Included"
                      prop="VAT Included"
                      size="small">
                      <el-switch
                        v-model="settings['VAT Included']"
                        active-text="VAT Included"
                        inactive-text="VAT Extra" />
                    </el-form-item>
                  </el-col>
                  <el-col :md="{span:8}">
                    <el-form-item
                      v-if="settings"
                      label="VAT Amount"
                      prop="VAT Amount"
                      size="small">
                      <el-input-number
                        v-model="settings['VAT Amount']"
                        :precision="2"
                        :step="0.1"
                        :max="1"
                        :min="0" />
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-tab-pane>

              <el-tab-pane
                label="Order PDFs"
                name="pdfs">

                <el-row :gutter="20">
                  <el-col :md="12">
                    <h5>Address</h5>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :md="{span:16, offset: 4}">
                    <el-form-item
                      v-if="settings"
                      label="Company Name"
                      prop="Company Name"
                      size="small">
                      <el-input v-model="settings['Company Name']"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :md="{span:16, offset: 4}">
                    <el-form-item
                      v-if="settings"
                      label="Company Address"
                      prop="Company Address"
                      size="small">
                      <el-input v-model="settings['Company Address']"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :md="12">
                    <h5>Bank Details</h5>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :md="{span:8, offset: 4}">
                    <el-form-item
                      v-if="settings"
                      label="Company Bank"
                      prop="Company Bank"
                      size="small">
                      <el-input v-model="settings['Company Bank']"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :md="{span:8, offset: 4}">
                    <el-form-item
                      v-if="settings"
                      label="Company Bank Sort Code"
                      prop="Company Bank Sort Code"
                      size="small">
                      <el-input v-model="settings['Company Bank Sort Code']"/>
                    </el-form-item>
                  </el-col>
                  <el-col :md="{span:8}">
                    <el-form-item
                      v-if="settings"
                      label="Company Bank AC Number"
                      prop="Company Bank AC Number"
                      size="small">
                      <el-input v-model="settings['Company Bank AC Number']"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :md="12">
                    <h5>Other</h5>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :md="{span:8, offset: 4}">
                    <el-form-item
                      v-if="settings"
                      label="Company No"
                      prop="Company No"
                      size="small">
                      <el-input v-model="settings['Company No']"/>
                    </el-form-item>
                  </el-col>
                  <el-col :md="{span:8}">
                    <el-form-item
                      v-if="settings"
                      label="Company Vat No"
                      prop="Company Vat No"
                      size="small">
                      <el-input v-model="settings['Company Vat No']"/>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :md="{span:16, offset: 4}">
                    <el-form-item
                      v-if="settings"
                      label="Footer Text"
                      prop="Footer Text"
                      size="small">
                      <el-input
                        v-model="settings['Footer Text']"
                        type="textarea"/>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-tab-pane>

              <el-tab-pane
                label="Site Images"
                name="site_images">
                <el-col
                  :lg="12"
                  :md="24">

                  <div
                    v-for="image in shopData.site_images"
                    :key="image">
                    <el-form-item
                      v-if="settings"
                      :label="image"
                      :prop="image">
                      <file-picker-modal
                        v-if="settings"
                        :current-files="(settings[image] && settings[image][0]) ? [settings[image][0]] : undefined"
                        :show-btn="true"
                        :name="image"
                        :selectable="1"
                        :picker-id="image"
                        @update:files="val => settings[image] = val"/>
                    </el-form-item>
                  </div>
                </el-col>
              </el-tab-pane>

              <el-tab-pane
                label="Collection Mappings"
                name="collection_mappings">
                <el-col
                  :lg="12"
                  :md="24">

                  <div
                    v-for="mapping in shopData.collection_mappings"
                    :key="mapping">
                    <el-form-item
                      v-if="settings"
                      :label="mapping"
                      :prop="mapping">
                      <el-select
                        v-model="settings[mapping]"
                        class="config_select"
                        placeholder="Select">
                        <el-option
                          v-for="type in collections"
                          :key="type.name"
                          :label="type.name"
                          :value="type.id"/>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
              </el-tab-pane>
            </el-tabs>
          </el-row>

          <hr class="page_hr">

          <el-row :gutter="20">
            <el-col :sm="24">
              <el-form-item>
                <el-button
                  :loading="loading"
                  plain
                  type="success"
                  @click="submitForm('settingsForm')">Update</el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import api from 'services/api-service'
import { mapActions } from 'vuex'
var upperFirst = require('lodash.upperfirst')

export default {

  name: 'Config',

  components: {
    Errors: () => import(/* webpackChunkName: "errors" */'components/Errors'),
    FilePickerModal: () => import(/* webpackChunkName: "file-picker-modal" */'components/FilePickerModal')
  },

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
    console.log('Config.vue mounted')
    this.getSettings()
    this.getCollections()
    this.getUsers()
  },

  methods: {

    ...mapActions([
      'setShopData'
    ]),

    p (path) {
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

    ucFirst (value) {
      return upperFirst(value)
    },

    getSettings () {
      this.loading = true
      this.settingsErrors = {}

      api.get({
        path: 'settings'
      })
        .then(function (data) {
          this.loading = false
          this.settings = data.data
          this.setShopData(data.shop_data)
          this.shopData = data.shop_data
          if (!this.settings['Admin Notifications']) {
            this.settings['Admin Notifications'] = []
          }

          this.getFeaturedProductCollectionTypes()
        }.bind(this))
        .catch(function (error) {
          this.loading = false
          this.settingsErrors = error
        }.bind(this))
    },

    getCollections () {
      api.get({
        path: 'collections'
      })
        .then(function (data) {
          this.collections = data.data
        }.bind(this))
        .catch(function (error) {
          this.settingsErrors = error
        }.bind(this))
    },

    getFeaturedProductCollectionTypes () {
      if (this.settings['Home Featured Product Collection']) {
        api.get({
          path: 'collections/' + this.settings['Home Featured Product Collection'] + '/types'
        })
          .then(function (data) {
            this.featured_product_types = data.data
          }.bind(this))
          .catch(function (error) {
            this.settingsErrors = error
          }.bind(this))
      } else {
        this.featured_product_types = {}
      }
    },

    getUsers () {
      api.get({
        path: 'users',
        params: {
          withRole: 'admin'
        }
      })
        .then(function (data) {
          this.users = data.data
        }.bind(this))
        .catch(function (error) {
          this.settingsErrors = error
        }.bind(this))
    },

    submitForm (formName) {
      this.loading = true
      this.settingsErrors = {}

      api.persist('post', {
        path: 'settings',
        object: {
          settings: this.settings
        }
      })
        .then(function (data) {
          this.loading = false
          this.settings = data.data
        }.bind(this))
        .catch(function (error) {
          this.loading = false
          this.settingsErrors = error
        }.bind(this))
    },

    displayFilePicker (ref) {
      if (this.$refs[ref]) {
        this.$refs[ref].openModal()
      }
    },

    handleFilesChosen (data) {
      this.$set(this.settings, data.id, data.files)
    },

    handleFilesUnChosen (data) {
      this.$set(this.settings, data.id, data.files)
    }
  }

}
</script>

<style lang="css" scoped>
.config_select {
    width: 100%
}
</style>
