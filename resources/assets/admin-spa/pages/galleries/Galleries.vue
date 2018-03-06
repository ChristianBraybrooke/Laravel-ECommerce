<template lang="html">

<galleries-component></galleries-component>

</template>

<script>
export default {

      name: 'Galleries',

      components: {
          GalleriesComponent: () => import('../../components/GalleriesComponent.vue')
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
