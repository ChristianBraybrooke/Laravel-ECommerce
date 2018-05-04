<template lang="html">
    <div v-loading="loading">


    </div>
</template>

<script>
export default {

      name: 'ProductTable',

      components: {
          Errors: () => import('./Errors.vue'),
      },

      props: {

      },

      data () {
          return {
              loading: false,
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('ProductTable.vue Mounted');
      },

      methods: {

      }
}
</script>

<style lang="css">
</style>
