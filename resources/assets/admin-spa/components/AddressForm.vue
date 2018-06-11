<template lang="html">
    <div v-loading="loading">

        <el-row :gutter="20">
            <el-col :md="{span:span, offset: offset}">
                <el-form-item :label="getFormatedLabel('Address Line 1')"
                              size="small"
                              :prop="prop ? prop + '.line_1' : 'line_1'"
                              :rules="{
                                  required: required, message: 'Line 1 is required', trigger: 'blur'
                              }">
                    <el-input v-if="prop && prefixProp" :autofocus="true" v-model="form[prop].line_1" auto-complete="off"></el-input>
                    <el-input v-else :autofocus="true" v-model="form[getFormatedLabel('line_1', true)]" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :md="span">
                <el-form-item :label="getFormatedLabel('Address Line 2')"
                              size="small"
                              :prop="prop ? prop + '.line_2' : 'line_2'">
                    <el-input v-if="prop && prefixProp" :autofocus="true" v-model="form[prop].line_2" auto-complete="off"></el-input>
                    <el-input v-else :autofocus="true" v-model="form[getFormatedLabel('line_2', true)]" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :md="{span:span, offset: offset}">
                <el-form-item :label="getFormatedLabel('Address Town')"
                              size="small"
                              :prop="prop ? prop + '.town' : 'town'"
                              :rules="{
                                  required: required, message: 'Town is required', trigger: 'blur'
                              }">
                    <el-input v-if="prop && prefixProp" :autofocus="true" v-model="form[prop].town" auto-complete="off"></el-input>
                    <el-input v-else :autofocus="true" v-model="form[getFormatedLabel('town', true)]" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :md="span">
                <el-form-item :label="getFormatedLabel('Address County')"
                              size="small"
                              :prop="prop ? prop + '.county' : 'county'"
                              :rules="{
                                  required: required, message: 'County is required', trigger: 'blur'
                              }">
                    <el-input v-if="prop && prefixProp" :autofocus="true" v-model="form[prop].county" auto-complete="off"></el-input>
                    <el-input v-else :autofocus="true" v-model="form[getFormatedLabel('county', true)]" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :md="{span:span, offset: offset}">
                <el-form-item :label="getFormatedLabel('Address Postcode')"
                              size="small"
                              :prop="prop ? prop + '.postcode' : 'postcode'"
                              :rules="{
                                  required: required, message: 'Postcode is required', trigger: 'blur'
                              }">
                    <el-input v-if="prop && prefixProp" :autofocus="true" v-model="form[prop].postcode" auto-complete="off"></el-input>
                    <el-input v-else :autofocus="true" v-model="form[getFormatedLabel('postcode', true)]" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :md="span">
                <el-form-item :label="getFormatedLabel('Address Country')"
                              size="small"
                              :prop="prop ? prop + '.country' : 'country'"
                              :rules="{
                                  required: required, message: 'Country is required', trigger: 'blur'
                              }">
                    <el-input v-if="prop && prefixProp" :autofocus="true" v-model="form[prop].country" auto-complete="off"></el-input>
                    <el-input v-else :autofocus="true" v-model="form[getFormatedLabel('country', true)]" auto-complete="off"></el-input>
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
          span: {
              type: Number,
              required: false,
              default () {
                  return 8;
              }
          },
          offset: {
              type: Number,
              required: false,
              default () {
                  return 4;
              }
          },
          required: {
              type: Boolean,
              required: false,
              default () {
                  return true;
              }
          },
          prop: {
              type: String,
              required: false,
              default () {
                  return '';
              }
          },
          prefixProp: {
              type: Boolean,
              required: false,
              default () {
                  return false;
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
