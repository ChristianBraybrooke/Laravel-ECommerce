<template lang="html">
  <div>

    <template v-if="model.fields">
      <form-field-component
        v-for="field in orderedFields"
        :model="field"
        :section="model"
        :form="form"
        :key="field.id"/>
    </template>

    <el-button
      type="info"
      size="mini"
      icon="el-icon-plus"
      plain
      @click="addField">Add Field</el-button>

  </div>
</template>

<script>
var orderBy = require('lodash.orderby')

export default {

  name: 'FormSectionComponent',

  components: {
    FormFieldComponent: () => import(/* webpackChunkName: "form-field-component" */'components/FormFieldComponent')
  },

  props: {
    form: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loading: false
    }
  },

  computed: {
    orderedFields () {
      return this.model.fields.data.length >= 1 ? orderBy(this.model.fields.data, ['order'], ['asc']) : []
    }
  },

  watch: {

  },

  mounted () {
    console.log('FormSectionComponent.vue Mounted')
  },

  methods: {

    addField () {
      this.model.fields.data.push({
        rules: {
          required: false
        },
        options: [

        ]
      })
    }

  }
}
</script>

<style lang="css">
</style>
