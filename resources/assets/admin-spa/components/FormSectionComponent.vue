<template lang="html">
    <div>

      <template v-if="model.fields">
          <form-field-component v-for="field in model.fields.data" :model="field" :section="model" :form="form" :key="field.id"></form-field-component>
      </template>

      <el-button type="info" size="mini" icon="el-icon-plus" plain @click="addField">Add Field</el-button>

    </div>
</template>

<script>

export default {

      name: 'FormSectionComponent',

      components: {
          FormFieldComponent: () => import(/* webpackChunkName: "form-field-component" */'components/FormFieldComponent'),
      },

      props: {
          form: {
              type: Object,
              required: true,
          },
          model: {
              type: Object,
              required: true,
          },
      },

      data () {
          return {
              loading: false,
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('FormSectionComponent.vue Mounted');
      },

      methods: {

          addField()
          {
              this.model.fields.data.push({
                  rules: {
                      required: false,
                  },
                  options: {

                  }
              });
          },

      }
}
</script>

<style lang="css">
</style>
