<template lang="html">


  <el-container>

    <el-header class="cb_header">
      <div class="menu_wrap">
        <el-menu
          class="cb_menu_horizontal"
          mode="horizontal"
          :default-active="currentPage"
          :router="true">
            <el-menu-item v-if="user.name" class="menu_right" index="/account">{{ user.name.first ? user.name.first : 'Account'  }}</el-menu-item>
        </el-menu>
      </div>
    </el-header>


    <el-container>
      <el-aside :width=" width < 990 ? '65px' : '200px'">
        <el-menu
          v-if="currentPage"
          default-active="2"
          class="cb_menu_vertical"
          :router="true"
          :default-active="currentPage"
          :collapse="width < 990">
          <el-menu-item index="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g class="nc-icon-wrapper" fill="#000000">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
                </g>
            </svg>
            <span slot="title">Dashboard</span>
          </el-menu-item>
          <el-menu-item index="/orders">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve" width="24" height="24"><g class="nc-icon-wrapper" fill="#000000"><path data-color="color-2" fill="#000000" d="M7,1H0v18h9V3C9,1.895,8.105,1,7,1z"></path> <path fill="#000000" d="M23.447,11.105l-3.589-1.794L18.97,5.758C18.859,5.312,18.459,5,18,5h-1.625H11c0,0,0,12.451,0,13 s0.051,1,0.051,1c0.252,2.244,2.139,4,4.449,4s4.197-1.756,4.449-4H23c0.552,0,1-0.448,1-1v-6 C24,11.621,23.786,11.275,23.447,11.105z M15.5,21c-1.378,0-2.5-1.121-2.5-2.5s1.122-2.5,2.5-2.5s2.5,1.121,2.5,2.5 S16.878,21,15.5,21z M13,10V7h4.344L18,10H13z"></path></g></svg>
            <span slot="title">Orders <el-badge v-if="shopData" :value="shopData.orders" class="item"></el-badge></span>
          </el-menu-item>
          <el-submenu index="0">
            <template slot="title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve" width="24" height="24"><g class="nc-icon-wrapper" fill="#000000"><path data-color="color-2" fill="#000000" d="M17,2c-0.905,0-1.73,0.312-2.4,0.818C15.475,3.986,16,5.431,16,7v1 c0,0.953-0.193,1.862-0.54,2.691C15.935,10.889,16.454,11,17,11c2.209,0,4-1.791,4-4V6C21,3.791,19.209,2,17,2z"></path> <path fill="#000000" d="M9,13L9,13c-2.761,0-5-2.239-5-5V7c0-2.761,2.239-5,5-5h0c2.761,0,5,2.239,5,5v1C14,10.761,11.761,13,9,13z"></path> <path data-color="color-2" fill="#000000" d="M22.839,14.405C21.555,13.815,19.354,13,17,13c-1.195,0-2.35,0.211-3.367,0.495 c0.376,0.078,0.753,0.157,1.13,0.253c2.911,0.742,4.97,3.275,5.192,6.252H23c0.552,0,1-0.448,1-1v-2.779 C24,15.439,23.55,14.731,22.839,14.405z"></path> <path fill="#000000" d="M17,22H1c-0.552,0-1-0.448-1-1v-0.475c0-2.275,1.527-4.277,3.731-4.839C5.205,15.31,7.021,15,9,15 s3.795,0.31,5.269,0.686C16.473,16.248,18,18.25,18,20.525V21C18,21.552,17.552,22,17,22z"></path></g></svg>
              <span slot="title">Users</span>
            </template>

              <el-menu-item index="/users">Users</el-menu-item>
              <el-menu-item index="/customers">Customers</el-menu-item>

          </el-submenu>
          <el-submenu index="1">
            <template slot="title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve" width="24" height="24"><g class="nc-icon-wrapper" fill="#000000"><path data-color="color-2" fill="#000000" d="M12.994,12.839l10.022-5.988L11.504,0.136c-0.315-0.184-0.706-0.181-1.019,0.007L0.993,5.838 L12.994,12.839z"></path> <path fill="#000000" d="M12,14.575l-12-7V16c0,0.355,0.189,0.685,0.496,0.864L12,23.575V14.575z"></path> <path fill="#000000" d="M14,14.567v8.953l9.573-6.701C23.841,16.632,24,16.326,24,16V8.592L14,14.567z"></path></g></svg>
              <span slot="title">Products</span>
            </template>

              <el-menu-item index="/products">Products</el-menu-item>
              <el-menu-item index="/collections">Collections</el-menu-item>

          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve" width="24" height="24"><g class="nc-icon-wrapper" fill="#000000"><polygon fill="#000000" points="12,0 24,7 12,14 0,7 "></polygon> <polygon data-color="color-2" fill="#000000" points="12,21.315 2.301,15.658 0,17 12,24 24,17 21.699,15.658 "></polygon> <polygon data-color="color-2" fill="#000000" points="12,16.315 2.301,10.658 0,12 12,19 24,12 21.699,10.658 "></polygon></g></svg>
              <span>Content</span>
            </template>

              <el-menu-item index="/pages">Pages</el-menu-item>
              <el-menu-item index="/menus">Menus</el-menu-item>

          </el-submenu>

          <el-menu-item index="/forms">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve" width="24" height="24"><g class="nc-icon-wrapper" fill="#000000"><path fill="#000000" d="M21,3h-2v5H5V3H3C2.447,3,2,3.447,2,4v19c0,0.553,0.447,1,1,1h18c0.553,0,1-0.447,1-1V4 C22,3.447,21.553,3,21,3z M18,19H6v-2h12V19z M18,14H6v-2h12V14z"></path> <path data-color="color-2" fill="#000000" d="M14,2c0-1.105-0.895-2-2-2s-2,0.895-2,2H7v4h10V2H14z"></path></g></svg>
            <span slot="title">Forms</span>
          </el-menu-item>

          <el-menu-item index="/galleries">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve" width="24" height="24"><g class="nc-icon-wrapper" fill="#000000"><circle data-color="color-2" fill="#000000" cx="9" cy="8" r="2"></circle>
            <path fill="#000000" d="M23,1H1C0.448,1,0,1.447,0,2v20c0,0.553,0.448,1,1,1h22c0.552,0,1-0.447,1-1V2C24,1.447,23.552,1,23,1z
            	 M22,3v12l-5-5l-6,7l-5-4l-4,4V3H22z"></path></g></svg>
            <span slot="title">Files</span>
          </el-menu-item>
          <el-menu-item index="/config">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve" width="24" height="24"><g class="nc-icon-wrapper" fill="#000000"><path fill="#000000" d="M23,14v-4h-3.262c-0.189-0.732-0.477-1.422-0.852-2.058l2.306-2.306l-2.828-2.828l-2.306,2.306 C15.422,4.739,14.732,4.451,14,4.262V1h-4v3.262C9.268,4.451,8.578,4.739,7.942,5.114L5.636,2.808L2.808,5.636l2.306,2.306 C4.739,8.578,4.451,9.268,4.262,10H1v4h3.262c0.189,0.732,0.477,1.422,0.852,2.058l-2.306,2.306l2.828,2.828l2.306-2.306 c0.635,0.375,1.326,0.663,2.058,0.852V23h4v-3.262c0.732-0.189,1.422-0.477,2.058-0.852l2.306,2.306l2.828-2.828l-2.306-2.306 c0.375-0.635,0.663-1.326,0.852-2.058H23z M12,15c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S13.657,15,12,15z"></path></g></svg>
            <span slot="title">Config</span>
          </el-menu-item>

          <el-submenu index="3">
            <template slot="title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve" width="24" height="24"><g class="nc-icon-wrapper" fill="#000000"><path fill="#000000" d="M4,1v11H1c-0.552,0-1,0.448-1,1v8c0,1.657,1.343,3,3,3h1h17c1.657,0,3-1.343,3-3V1c0-0.552-0.448-1-1-1H5 C4.448,0,4,0.448,4,1z M8,5h6v6H8V5z M3,22c-0.552,0-1-0.449-1-1v-7h2v7C4,21.551,3.552,22,3,22z M20,19H8v-2h12V19z M20,15H8v-2h12 V15z M20,11h-4V9h4V11z M20,7h-4V5h4V7z"></path></g></svg>
              <span slot="title">Reports</span>
            </template>

              <el-menu-item index="/import-export">Import / Export</el-menu-item>

          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main>
      <slot></slot>
      <p class="ecom_version">API Version: <strong>{{ config.api_version }}</strong> SPA Version: <strong>{{ config.web_version }}</strong></p>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
var startsWith = require('lodash.startswith');
import Tooltip from 'element-ui';
var throttle = require('lodash.throttle');
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {},

  data () {
      return {
          width: 100,
          currentPage: null,
      }
  },

  watch: {
      $route: function (value) {
          console.log(value);
          var path = value.path;

          if (startsWith(value.path, '/collections')) {
            path = '/collections';
          }
          if (startsWith(value.path, '/products')) {
            path = '/products';
          }
          if (startsWith(value.path, '/pages')) {
            path = '/pages';
          }
          if (startsWith(value.path, '/users')) {
            path = '/users';
          }
          if (startsWith(value.path, '/orders')) {
            path = '/orders';
          }
          if (startsWith(value.path, '/forms')) {
            path = '/forms';
          }
          this.currentPage = path;
      }
  },

  mounted () {
      window.addEventListener('resize', this.getWindowWidth);

      this.getWindowWidth();

      this.currentPage = this.$route.path;
  },

  computed: {
      ...mapGetters([
        'user',
        'userErrors',
        'shopData'
      ]),

      config()
      {
          return ecommerceConfig;
      }
  },

  methods: {
      ...mapActions([
          'getUser',
          'updateUser',
          'updateUserModel'
      ]),

      getWindowWidth: throttle(function (evt)
      {
          this.width = document.documentElement.clientWidth;
      }, 500),
  },

}
</script>

<style lang="scss" scoped>
@import '../sass/variables';
.cb_header {

}

</style>
