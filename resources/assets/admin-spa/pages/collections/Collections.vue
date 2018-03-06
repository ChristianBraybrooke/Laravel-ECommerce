<template lang="html">
    <data-table type-name="collection"
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
