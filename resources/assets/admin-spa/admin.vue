<script type="text/ecmascript-6">
    import Layout from './layouts/MainLayout';

    export default {
        name: 'Admin',
        components: { Layout },
        mounted() {
          document.title = this.$route.meta.title ? this.$route.meta.title  : 'Admin: ' + this.$route.name;
          console.log('Admin.vue mounted.')
        },
        watch: {
          $route: function (value) {
              document.title = value.meta.title ? value.meta.title  : 'Admin: ' + this.capitalizeFirstLetter(value.name);
          }
        },
        methods: {
            capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            }
        }
    };
</script>

<template>

  <layout>
    <transition name="slide-fade"
                mode="out-in"
                appear>
      <router-view/>
    </transition>

  </layout>

</template>

<style lang="scss">

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .2s ease;
}
.slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-40px);
  opacity: 0;
}
.slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(80px);
  opacity: 0;
}

</style>
