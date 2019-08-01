<template lang="html">
  <form-item
    :field="field"
    :prop="prop">
    <el-select
      v-model="form[prop]"
      allow-create
      filterable>
      <el-option
        v-for="option in field.options"
        :key="option.id"
        :value="option"
        :label="optionLabel(option)"/>
    </el-select>
    <small
      v-if="form[prop].name"
      class="input-placeholder-tag">
      <em>Currently set as {{ form[prop].name }}</em>
    </small>
    <small
      v-else
      class="input-placeholder-tag">
      <em>Currently updating as custom value</em>
    </small>
  </form-item>
</template>

<script>
import FormField from './FormField'

export default {
  name: 'SelectInputFormField',

  mixins: [FormField]
}
</script>

<style lang="css">
  .input-placeholder-tag {
    display: block;
  }
</style>
