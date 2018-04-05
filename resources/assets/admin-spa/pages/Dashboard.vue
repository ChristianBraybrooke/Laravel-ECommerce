<template lang="html">
    <div v-loading="loading">
        <errors v-if="Object.keys(userErrors).length > 0" :errors="userErrors"></errors>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span v-if="user.name">Welcome, <strong>{{ user.name.first }}</strong></span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button> -->
          </div>

        </el-card>
    </div>
</template>

<script>
import api from "../services/api-service.js";
import { mapActions, mapGetters } from 'vuex';

export default {

      name: 'Dashboard',

      components: {
          Errors: () => import('../components/Errors.vue'),
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
