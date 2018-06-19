<template lang="html">

<galleries-component></galleries-component>

</template>

<script>
export default {

      name: 'Galleries',

      components: {
          GalleriesComponent: () => import(/* webpackChunkName: "galleries-component" */'components/GalleriesComponent')
      },

      props: [

      ],

      data () {
          return {

          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('Galleries.vue: Mounted');
      },

      methods: {

      },

}
</script>

<style lang="css">
</style>
