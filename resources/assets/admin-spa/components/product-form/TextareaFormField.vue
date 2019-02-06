<template lang="html">
  <form-item
    :field="field"
    :prop="prop">
    <el-input
      v-if="propIsObject"
      v-model="form[prop].value"
      type="textarea"/>
    <el-input
      v-else
      v-model="form[prop]"
      type="textarea"/>
  </form-item>
</template>

<script>
import FormField from './FormField'

export default {
  name: 'TextareaFormField',

  mixins: [FormField]
}
</script>

<style lang="css">
</style>
