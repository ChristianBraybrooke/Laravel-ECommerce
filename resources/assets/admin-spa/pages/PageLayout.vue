<template lang="html">
    <div>

        <errors v-if="Object.keys(pageErrors).length > 0" :errors="pageErrors"></errors>

        <el-menu
                 mode="horizontal"
                 style="margin-bottom: 20px;"
                 :default-active="currentPage"
                 :router="true">
            <el-menu-item v-for="page in pages"
                          :router="true"
                          :index="page.index"
                          :key="page.index">

                {{ page.name }}

            </el-menu-item>

        </el-menu>

        <slot name="page_content"></slot>
    </div>
</template>

<script>
export default {

      name: 'NewOrderStepOne',

      components: {
          Errors: () => import(/* webpackChunkName: "errors" */'components/Errors'),
      },

      props: {
          pages: {
              required: true,
              type: Array
          },
          currentPage: {
              required: true,
              type: String
          },
          pageErrors: {
              required: false,
              type: Object,
              default() {
                  return {}
              }
          },

      },

      data () {
          return {

          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('PageLayout.vue Mounted');
      },

      methods: {

      }
}
</script>

<style lang="css">
</style>
