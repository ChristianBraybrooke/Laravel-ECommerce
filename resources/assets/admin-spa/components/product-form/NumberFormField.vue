<template lang="html">
  <form-item
    :field="field"
    :prop="prop">
    <el-input-number
      v-if="propIsObject"
      v-model="form[prop].value"
      controls-position="right"/>
    <el-input-number
      v-else
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
