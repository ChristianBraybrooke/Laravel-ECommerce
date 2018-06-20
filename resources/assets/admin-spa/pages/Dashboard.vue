<template lang="html">
    <div v-loading="loading">
        <errors v-if="Object.keys(userErrors).length > 0" :errors="userErrors"></errors>

        <h1 class="welcome_text">Welcome, {{ user.name.first }}</h1>

        <el-row :gutter="40" class="welcome_row">

            <el-col :md="8">
                <el-card>
                    <div slot="header" class="clearfix">
                      <span>Orders</span>
                      <el-button style="float: right;" size="mini" type="primary" plain>Create Order</el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :md="8">
                <el-card>
                    <div slot="header" class="clearfix">
                      <span>Products</span>
                      <el-button style="float: right;" size="mini" type="primary" plain>Create Product</el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :md="8">
                <el-card>
                    <div slot="header" class="clearfix">
                      <span>Pages</span>
                      <el-button style="float: right;" size="mini" type="primary" plain>Create Page</el-button>
                    </div>
                </el-card>
            </el-col>


        </el-row>


    </div>
</template>

<script>
import api from "services/api-service";
import { mapActions, mapGetters } from 'vuex';

export default {

      name: 'Dashboard',

      components: {
          Errors: () => import(/* webpackChunkName: "errors" */'components/Errors'),
      },

      props: {

      },

      data () {
          return {
              loading: false,
          }
      },

      computed: {
          ...mapGetters([
            'user',
            'userErrors'
          ]),
      },

      watch: {

      },

      mounted () {
          console.log('Dashboard.vue mounted');
          this.getUser();
      },

      methods: {
          ...mapActions([
              'getUser',
          ]),
      },

}
</script>

<style lang="css" scoped>
.welcome_text {
    text-align: center;
}
.welcome_row {
    margin-top: 40px;
    margin-bottom: 40px;
}
</style>
