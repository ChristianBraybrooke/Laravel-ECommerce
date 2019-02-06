<template lang="html">
  <form-item
    :field="field"
    :prop="prop">
    <el-input-number
      v-model="form[prop]"
      controls-position="right"/>
  </form-item>
</template>

<script>
import FormField from './FormField'

export default {
  name: 'NumberFormField',

  mixins: [FormField]
}
</script>

<style lang="css">
</style>
