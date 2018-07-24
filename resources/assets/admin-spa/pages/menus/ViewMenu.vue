<template lang="html">
    <div v-loading="loading">
      <el-form label-position="top" :model="menu" :rules="menuFormRules" ref="menuForm" label-width="120px">


      <el-breadcrumb class="breadcrumbs" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'menus' }">Menus</el-breadcrumb-item>
          <el-breadcrumb-item>{{ menu.name }}</el-breadcrumb-item>
      </el-breadcrumb>


      <errors v-if="Object.keys(menuErrors).length > 0" :errors="menuErrors"></errors>

      <el-row>
          <el-col :md="6">
              <div class="menu_links_container">

                  <ul class="menu_outer" v-for="(linkType, key) in links" :key="key">
                      <li class="menu_link_type">{{ key }}</li>
                      <ul class="menu_inner">
                          <!-- <draggable v-model="linkType" class="dragArea" :options="{}"> -->
                              <li class="menu_link_name" v-for="link in linkType" :key="link.id">{{ link.name }}</li>
                          <!-- </draggable> -->
                      </ul>
                  </ul>
              </div>
          </el-col>

          <el-col :md="12">
              <div class="menu_container">
              </div>
          </el-col>
      </el-row>


    </el-form>
    </div>
</template>

<script>
import api from "services/api-service";
import draggable from 'vuedraggable';
import ContentComponent from 'components/ContentComponent'


var withRequest = [

];
var includeRequest = [

];

export default {

      name: 'ViewMenu',

      components: {
          Errors: () => import(/* webpackChunkName: "errors" */'components/Errors'),
          ContentComponent,
          draggable
      },

      props: {
        menuId: {
            type: String,
            required: true,
        },
      },

      data () {
          return {
              loading: false,
              menu: {},
              menuErrors: {},
              menuFormRules: {},
              loadingLinks: false,
              linkErrors: {},
              links: [],
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('ViewMenu.vue mounted');
          this.getMenu();
          this.getLinks();
      },

      methods: {

          getMenu()
          {
              this.loading = true;
              this.menuErrors = {};

              api.get({
                    path: "menus/" + this.menuId,
                    params: {
                        with: withRequest,
                        include: includeRequest
                    }
                })
                .then(function (data) {
                    this.loading = false;
                    this.menu = data.data;
                }.bind(this))
                .catch(function (error) {
                    this.loading = false;
                    this.menuErrors = error;
                }.bind(this));
          },

          getLinks()
          {
              this.loadingLinks = true;
              this.linkErrors = {};

              api.get({
                    path: "links"
                })
                .then(function (data) {
                    this.loadingLinks = false;
                    this.links = data.data;
                }.bind(this))
                .catch(function (error) {
                    this.loadingLinks = false;
                    this.linkErrors = error;
                }.bind(this));
          },

      }

}
</script>

<style lang="css" scoped>
    ul.menu_outer, ul.menu_outer ul {
        list-style: none;
        -webkit-padding-start: 0;
    }
    li.menu_link_type {
        font-weight: bold;
        padding-bottom: 8px;
    }
    ul.menu_outer li {
        background: white;
        padding: 7px 7px;
        margin-bottom: 5px;
    }
    .menu_container {
        padding: 10px;
        border: 2px dashed grey;
        margin-top: 17px;
        min-height: 100px;
        display: flex;
        position: relative;
    }
    li.menu_link_name {
        cursor: move;
    }
</style>
