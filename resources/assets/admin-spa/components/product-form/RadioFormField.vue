<template lang="html">
  <form-item
    :field="field"
    :prop="prop">
    <el-radio-group
      v-model="form[prop]"
      class="product_form_radio">
      <el-radio-button
        v-for="option in field.options"
        :label="mergedFieldValue(option)"
        :key="option.id">
        {{ optionLabel(option) }}
      </el-radio-button>
    </el-radio-group>
  </form-item>
</template>

<script>
import FormField from './FormField'

export default {
  name: 'RadioFormField',

  mixins: [FormField]
}
</script>

<style lang="css">
</style>
