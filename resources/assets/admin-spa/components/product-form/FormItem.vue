<template lang="html">
  <el-form-item
    :label="field.name"
    :prop="prop"
    :size="size">
    <slot />
  </el-form-item>
</template>

<script>
export default {
  name: 'FormItem',

  props: {
    field: {
      type: Object,
      required: true
    },
    prop: {
      required: true,
      type: String
    },
    size: {
      required: false,
      type: String,
      default: () => { return 'small' }
    }
  }
}
</script>

<style lang="css">
</style>
