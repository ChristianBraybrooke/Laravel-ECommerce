<template lang="html">
    <div>

      <el-row :gutter="20">
          <el-col :md="6">
              <el-form-item label="Name" size="small" prop="name">
                  <el-input :autofocus="true" v-model="model.name"></el-input>
              </el-form-item>
          </el-col>
      </el-row>

      <template v-if="model.fields">
          <form-field-component v-for="field in model.fields.data" :model="field" :key="field.name"></form-field-component>
      </template>

    </div>
</template>

<script>

export default {

      name: 'FormSectionComponent',

      components: {
          FormFieldComponent: () => import('./FormFieldComponent.vue'),
      },

      props: {
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

      }
}
</script>

<style lang="css">
</style>
