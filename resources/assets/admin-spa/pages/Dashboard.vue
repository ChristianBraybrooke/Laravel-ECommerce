<template lang="html">
    <div v-loading="loading">
        <errors v-if="Object.keys(userErrors).length > 0" :errors="userErrors"></errors>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span v-if="user.name">Welcome, <strong>{{ user.name.first }}</strong></span>
            </div>
        </el-card>
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

<style lang="css">
</style>
