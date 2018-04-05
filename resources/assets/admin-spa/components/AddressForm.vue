<template lang="html">
    <div v-loading="loading">

        <el-row :gutter="20">
            <el-col :md="{span:8, offset: 4}">
                <el-form-item :label="getFormatedLabel('Address Line 1')"
                              size="small"
                              :prop="prop ? prop + '.line_1' : 'line_1'"
                              :rules="{
                                  required: true, message: 'Line 1 is required', trigger: 'blur'
                              }">
                    <el-input :autofocus="true" v-model="form[getFormatedLabel('line_1', true)]" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :md="8">
                <el-form-item :label="getFormatedLabel('Address Line 2')"
                              size="small"
                              :prop="prop ? prop + '.line_2' : 'line_2'">
                    <el-input :autofocus="true" v-model="form[getFormatedLabel('line_2', true)]" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :md="{span:8, offset: 4}">
                <el-form-item :label="getFormatedLabel('Address Town')"
                              size="small"
                              :prop="prop ? prop + '.town' : 'town'"
                              :rules="{
                                  required: true, message: 'Town is required', trigger: 'blur'
                              }">
                    <el-input :autofocus="true" v-model="form[getFormatedLabel('town', true)]" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :md="8">
                <el-form-item :label="getFormatedLabel('Address County')"
                              size="small"
                              :prop="prop ? prop + '.county' : 'county'"
                              :rules="{
                                  required: true, message: 'County is required', trigger: 'blur'
                              }">
                    <el-input :autofocus="true" v-model="form[getFormatedLabel('county', true)]" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :md="{span:8, offset: 4}">
                <el-form-item :label="getFormatedLabel('Address Postcode')"
                              size="small"
                              :prop="prop ? prop + '.postcode' : 'postcode'"
                              :rules="{
                                  required: true, message: 'Postcode is required', trigger: 'blur'
                              }">
                    <el-input :autofocus="true" v-model="form[getFormatedLabel('postcode', true)]" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :md="8">
                <el-form-item :label="getFormatedLabel('Address Country')"
                              size="small"
                              :prop="prop ? prop + '.country' : 'country'"
                              :rules="{
                                  required: true, message: 'Country is required', trigger: 'blur'
                              }">
                    <el-input :autofocus="true" v-model="form[getFormatedLabel('country', true)]" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {

      name: 'AddressForm',

      components: {

      },

      props: {
          form: {
              type: Object,
              required: true
          },
          type: {
              type: String,
              required: false,
              default () {
                  return '';
              }
          },
          prop: {
              type: String,
              required: false,
              default () {
                  return '';
              }
          }
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
          console.log('AddressForm.vue Mounted');
      },

      methods: {

          /**
           * Format the input label name based on the type of address
           *
           * @param String name
           * @return String
           */
          getFormatedLabel(name, prop = false)
          {
              if (this.type) {
                  if(prop) {
                      return this.type + '_' + name;
                  }
                  return this.capitalize(this.type) + ' ' + name;
              } else {
                  return name;
              }
          },


      }
}
</script>

<style lang="css">
</style>
