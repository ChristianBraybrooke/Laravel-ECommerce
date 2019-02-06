<template lang="html">
  <form-item
    :field="field"
    :prop="prop">
    <el-select
      v-model="form[prop]"
      filterable>
      <el-option
        v-for="option in field.options"
        :key="option.id"
        :value="option"
        :label="optionLabel(option)"/>
    </el-select>
  </form-item>
</template>

<script>
import FormField from './FormField'

export default {
  name: 'SelectFormField',

  mixins: [FormField]
}
</script>

<style lang="css">
</style>
