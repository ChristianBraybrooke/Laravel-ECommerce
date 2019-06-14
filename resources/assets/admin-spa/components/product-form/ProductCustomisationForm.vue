<template>
  <div>
    Using {{ formTemplate.name }}
    <el-form
      ref="productCustomisationForm"
      :model="form"
      label-position="top"
      @submit.native.prevent>
      <el-row
        v-for="section in formTemplate.sections.data"
        :key="section.id"
        :gutter="20">
        {{ section.name }}
        <el-col
          v-for="field in section.fields.data"
          :key="field.id"
          :md="6">
          <component
            v-if="field.type && field.key"
            :is="`${field.type}-form-field`"
            :form="form"
            :product="product"
            :section="section"
            :field="field"
            :prop="`${field.key}`"/>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script type="text/javascript">
import orderFormUtil from 'utils/orderForm'
import RadioFormField from 'components/product-form/RadioFormField'
import NumberFormField from 'components/product-form/NumberFormField'
import SelectFormField from 'components/product-form/SelectFormField'
import TextFormField from 'components/product-form/TextFormField'
import TextareaFormField from 'components/product-form/TextareaFormField'
import DynamicFormField from 'components/product-form/DynamicFormField'

export default {
  name: 'ProductCustomisationForm',

  components: {
    RadioFormField,
    NumberFormField,
    SelectFormField,
    TextFormField,
    TextareaFormField,
    DynamicFormField
  },

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      form: {}
    }
  },

  computed: {
    formTemplate () {
      return this.product.order_form
    }
  },

  mounted () {
    this.product.order_form.sections.data.forEach((section) => {
      section.fields.data.forEach((field) => {
        if (field.key) {
          this.$set(this.form, field.key, orderFormUtil.formatFieldValue(section, field))
        }
      })
    })
  }
}
</script>
