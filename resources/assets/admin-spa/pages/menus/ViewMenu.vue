<template lang="html">
    <div v-loading="loading">
      <el-form label-position="top" :model="menu" :rules="menuFormRules" ref="menuForm" label-width="120px">


      <el-breadcrumb class="breadcrumbs" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'menus' }">Menus</el-breadcrumb-item>
          <el-breadcrumb-item>{{ menu.name }}</el-breadcrumb-item>
      </el-breadcrumb>


      <errors v-if="Object.keys(menuErrors).length > 0" :errors="menuErrors"></errors>


    </el-form>
    </div>
</template>

<script>
import api from "../../services/api-service.js";

var withRequest = [

];
var includeRequest = [

];

export default {

      name: 'ViewMenu',

      components: {
          Errors: () => import('../../components/Errors.vue'),
          ContentComponent: () => import('../../components/ContentComponent.vue'),
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
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('ViewMenu.vue mounted');
          this.getMenu();
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

      }

}
</script>

<style lang="css">
</style>
