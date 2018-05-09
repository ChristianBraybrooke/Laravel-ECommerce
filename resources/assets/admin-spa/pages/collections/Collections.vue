<template lang="html">
    <data-table type-name="collection"
                :request-includes="['live_at', 'created_at']"
                bulk-update-url="collections/bulk">

    </data-table>
</template>

<script>
export default {

  components: {
    DataTable: () => import('../../components/DataTable.vue')
  },

  mounted() {
      console.log('Collections.vue Mounted.');
  },

  data() {
    return {

    }
  },

}
</script>

<style lang="css">
</style>
