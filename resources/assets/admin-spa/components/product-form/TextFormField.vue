<template lang="html">
  <form-item
    :field="field"
    :prop="prop">
    <el-input
      v-if="propIsObject"
      v-model="form[prop].value"/>
    <el-input
      v-else
      v-model="form[prop]"/>
  </form-item>
</template>

<script>
import FormField from './FormField'

export default {
  name: 'TextFormField',

  mixins: [FormField]
}
</script>

<style lang="css">
</style>
