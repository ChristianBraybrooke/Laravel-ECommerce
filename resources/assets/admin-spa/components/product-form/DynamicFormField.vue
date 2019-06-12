<template lang="html">
  <div>
    <el-card
      v-for="loopKey in loopRange"
      :key="loopKey"
      style="margin-top: 10px;">
      <div
        class="form_option_section">
        <h4>{{ field.name }} {{ loopKey+1 }}</h4>
        <el-row
          :gutter="20">
          <el-col
            v-for="(dynamicfield, key) in field.options"
            :key="key"
            :md="8"
            :sm="24">
            <el-button
              class="copy_to_btn"
              size="mini"
              type="text"
              icon="el-icon-circle-check-outline"
              @click="copyToAll(dynamicfield, loopKey)">Copy to All
            </el-button>
            <component
              :is="`${dynamicfield.type}-form-field`"
              :form="form"
              :product="product"
              :section="section"
              :field="dynamicfield"
              :prop="`${field.name} ${loopKey+1} ${dynamicfield.name}`"/>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import FormField from './FormField'
import find from 'lodash.find'
import range from 'lodash.range'
import RadioFormField from 'components/product-form/RadioFormField'
import NumberFormField from 'components/product-form/NumberFormField'
import SelectFormField from 'components/product-form/SelectFormField'
import TextFormField from 'components/product-form/TextFormField'
import TextareaFormField from 'components/product-form/TextareaFormField'
import DynamicFormField from 'components/product-form/DynamicFormField'

export default {
  name: 'DynamicFormField',

  components: {
    RadioFormField,
    NumberFormField,
    SelectFormField,
    TextFormField,
    TextareaFormField,
    DynamicFormField
  },

  mixins: [FormField],

  computed: {
    orderOptions () {
      return this.product.order_options
    },

    loopKey () {
      return this.field.rules.loop_key
    },

    loopValue () {
      return find(this.orderOptions, { 'key': this.loopKey })
    },

    loopRange () {
      if (this.loopValue) {
        return range(0, this.loopValue.value)
      }
      return []
    }
  },

  methods: {
    copyToAll (dynamicfield, loopKey) {
      var val = this.form[`${this.field.name} ${loopKey + 1} ${dynamicfield.name}`]

      this.loopRange.forEach((r) => {
        this.$set(this.form, `${this.field.name} ${r + 1} ${dynamicfield.name}`, val)
      })
    }
  }
}
</script>

<style lang="css">
.copy_to_btn {
  margin-bottom: -7px;
  padding: 0px;
}
</style>
