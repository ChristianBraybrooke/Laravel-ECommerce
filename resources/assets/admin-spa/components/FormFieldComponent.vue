<template lang="html">
    <div>

        <el-row :gutter="20">
            <el-col :md="6">
                <el-form-item label="Name" size="small" prop="name">
                    <el-input :autofocus="true" v-model="model.name"></el-input>
                </el-form-item>
            </el-col>
            <el-col :md="6">
                <el-form-item label="Type" size="small" prop="type">
                    <el-select v-model="model.type" placeholder="Type">
                        <el-option
                          v-for="option in fieldOptions"
                          :key="option.value"
                          :label="option.label"
                          :value="option.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :md="4">
                <el-form-item label="Rules" size="small" prop="rules">
                    <el-button plain @click="showRulesModal = true" size="mini" type="primary">Show Rules</el-button>
                </el-form-item>
            </el-col>
            <el-col :md="4" v-if="needsOptions">
                <el-form-item label="Options" size="small" prop="options">
                    <el-button plain @click="showOptionsModal = true" size="mini" type="primary">Show Options</el-button>
                </el-form-item>
            </el-col>
        </el-row>

        <el-dialog :title="model.name + ' Rules'"
                   v-if="showRulesModal"
                   :visible.sync="showRulesModal"
                   width="70%">

             <el-row type="flex">
                <el-col :span="24">
                    <el-form-item label="Required" prop="rules.required">
                        <el-switch v-model="model.rules.required"
                                   active-color="#13ce66"
                                   inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                </el-col>
             </el-row>

        </el-dialog>

        <el-dialog :title="model.name + ' Options'"
                   v-if="showOptionsModal"
                   :visible.sync="showOptionsModal"
                   width="70%">

        </el-dialog>

    </div>
</template>

<script>

export default {

      name: 'FormFieldComponent',

      components: {

      },

      props: {
          model: {
              type: Object,
              required: true,
          },
      },

      data () {
          return {
              fieldOptions: [
                  {
                      label: 'Text',
                      value: 'text',
                  },
                  {
                      label: 'Radio',
                      value: 'radio',
                  },
                  {
                      label: 'Select',
                      value: 'select',
                  },
              ],
              showRulesModal: false,
              showOptionsModal: false,
          }
      },

      computed: {

          needsOptions()
          {
              if (this.model.type === 'radio') {
                  return true;
              }
              if (this.model.type === 'select') {
                  return true;
              }
              return false;
          },
      },

      watch: {

      },

      mounted () {
          console.log('FormFieldComponent.vue Mounted');
      },

      methods: {

      }
}
</script>

<style lang="css">
</style>
