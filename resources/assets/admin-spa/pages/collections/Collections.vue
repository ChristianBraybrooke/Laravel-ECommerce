<template lang="html">
  <data-table
    :request-includes="['live_at', 'created_at']"
    type-name="collection"
    bulk-update-url="collections/bulk"/>
</template>

<script>
export default {

  components: {
    DataTable: () => import(/* webpackChunkName: "data-table" */'components/DataTable')
  },

  data () {
    return {

    }
  },

  mounted () {
    console.log('Collections.vue Mounted.')
  }

}
</script>

<style lang="css">
</style>
