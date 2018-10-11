<template lang="html">

  <galleries-component/>

</template>

<script>
export default {

  name: 'Galleries',

  components: {
    GalleriesComponent: () => import(/* webpackChunkName: "galleries-component" */'components/GalleriesComponent')
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
    console.log('Galleries.vue: Mounted')
  },

  methods: {

  }

}
</script>

<style lang="css">
</style>
