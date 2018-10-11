<template lang="html">
  <div
    v-if="Object.keys(errors).length > 0"
    class="error_wrap">

    <el-alert
      :title="errors.message"
      :closable="false"
      class="error_title"
      type="error"
      description="More information can be found below."
      show-icon/>

    <template v-if="errors.errors && Object.keys(errors.errors).length > 0">
      <div
        v-for="(error, key) in errors.errors"
        :key="key"
        class="error_messages">
        <el-alert
          :closable="false"
          :title="error.join()"
          type="error"/>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  name: 'Errors',

  props: {
    errors: {
      type: Object,
      required: true
    }
  },

  mounted () {
    console.log('Errors: Mounted')
  }
}
</script>

<style lang="scss" scoped>
  .error_wrap {
      padding-top: 10px;
      padding-bottom: 25px;

    .error_messages, .error_title {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
</style>
