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
          <el-menu-item index="/users">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve" width="24" height="24"><g class="nc-icon-wrapper" fill="#000000"><path data-color="color-2" fill="#000000" d="M17,2c-0.905,0-1.73,0.312-2.4,0.818C15.475,3.986,16,5.431,16,7v1 c0,0.953-0.193,1.862-0.54,2.691C15.935,10.889,16.454,11,17,11c2.209,0,4-1.791,4-4V6C21,3.791,19.209,2,17,2z"></path> <path fill="#000000" d="M9,13L9,13c-2.761,0-5-2.239-5-5V7c0-2.761,2.239-5,5-5h0c2.761,0,5,2.239,5,5v1C14,10.761,11.761,13,9,13z"></path> <path data-color="color-2" fill="#000000" d="M22.839,14.405C21.555,13.815,19.354,13,17,13c-1.195,0-2.35,0.211-3.367,0.495 c0.376,0.078,0.753,0.157,1.13,0.253c2.911,0.742,4.97,3.275,5.192,6.252H23c0.552,0,1-0.448,1-1v-2.779 C24,15.439,23.55,14.731,22.839,14.405z"></path> <path fill="#000000" d="M17,22H1c-0.552,0-1-0.448-1-1v-0.475c0-2.275,1.527-4.277,3.731-4.839C5.205,15.31,7.021,15,9,15 s3.795,0.31,5.269,0.686C16.473,16.248,18,18.25,18,20.525V21C18,21.552,17.552,22,17,22z"></path></g></svg>
            <span slot="title">Users</span>
          </el-menu-item>
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
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve" width="24" height="24"><g class="nc-icon-wrapper" fill="#000000"><path data-color="color-2" fill="#000000" d="M4,4V1H1C0.448,1,0,1.447,0,2v2H4z"></path> <path fill="#000000" d="M0,6v16c0,0.553,0.448,1,1,1h22c0.552,0,1-0.447,1-1V6H0z M11,18H3v-8h8V18z M18,16h-5v-2h5V16z M21,12h-8 v-2h8V12z"></path> <path data-color="color-2" fill="#000000" d="M24,4V2c0-0.553-0.448-1-1-1H6v3H24z"></path></g></svg>
              <span>Content</span>
            </template>

              <el-menu-item index="/pages">Pages</el-menu-item>
              <el-menu-item index="/menus">Menus</el-menu-item>

          </el-submenu>

          <el-menu-item index="/forms">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve" width="24" height="24"><g class="nc-icon-wrapper" fill="#000000"><circle data-color="color-2" fill="#000000" cx="9" cy="8" r="2"></circle>
            <path fill="#000000" d="M23,1H1C0.448,1,0,1.447,0,2v20c0,0.553,0.448,1,1,1h22c0.552,0,1-0.447,1-1V2C24,1.447,23.552,1,23,1z
            	 M22,3v12l-5-5l-6,7l-5-4l-4,4V3H22z"></path></g></svg>
            <span slot="title">Forms</span>
          </el-menu-item>

          <el-menu-item index="/galleries">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve" width="24" height="24"><g class="nc-icon-wrapper" fill="#000000"><circle data-color="color-2" fill="#000000" cx="9" cy="8" r="2"></circle>
            <path fill="#000000" d="M23,1H1C0.448,1,0,1.447,0,2v20c0,0.553,0.448,1,1,1h22c0.552,0,1-0.447,1-1V2C24,1.447,23.552,1,23,1z
            	 M22,3v12l-5-5l-6,7l-5-4l-4,4V3H22z"></path></g></svg>
            <span slot="title">Files</span>
          </el-menu-item>
          <el-menu-item index="/config">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" xml:space="preserve" width="16" height="16"><g class="nc-icon-wrapper"><path d="M13.2,5.2l-2.4-2.4l2.4-2.4C12.7,0.1,12.1,0,11.5,0C9,0,7,2,7,4.5C7,5,7.1,5.4,7.2,5.9l-6.6,4.9 c-0.8,0.6-0.8,1.7-0.2,2.4l2.3,2.4c0.7,0.7,1.8,0.6,2.4-0.2l4.9-6.6C10.5,8.9,11,9,11.5,9C14,9,16,7,16,4.5c0-0.6-0.1-1.2-0.3-1.7 L13.2,5.2z"></path></g></svg>
            <span slot="title">Config</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
      <slot></slot>
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
