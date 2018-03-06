<template lang="html">
    <div v-if="Object.keys(errors).length > 0" class="error_wrap">

        <el-alert class="error_title"
            :title="errors.message"
            :closable="false"
            type="error"
            description="More information can be found below."
            show-icon>
        </el-alert>

        <div class="error_messages"
             v-if="errors.errors && Object.keys(errors.errors).length > 0"
             v-for="error in errors.errors">
             <el-alert
               :closable="false"
               :title="error.join()"
               type="error">
             </el-alert>
        </div>


    </div>
</template>

<script>
export default {
  name: 'Errors',

  mounted() {
      console.log('Errors: Mounted');
  },

  props: {
      errors: {
          type: Object,
          required: true,
      }
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
