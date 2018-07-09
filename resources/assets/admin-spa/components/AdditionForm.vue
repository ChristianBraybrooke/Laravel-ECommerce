<template lang="html">

    <div :loading="loading">

        <el-popover trigger="hover" placement="top">
            <ul>
                <li v-for="(addition, key) in additions" :key="key">
                    <strong>Amount</strong>: {{ amountPrefix }}{{ formatAmount ? formatPrice(addition.Amount) : addition.Amount }} <br />
                    <template v-for="(field, key) in additionalFields"><strong>{{ key }}</strong>: {{ addition[key] }}<br /></template>
                </li>
            </ul>

            <slot :showModal="displayModal">
                <el-button type="success" plain style="margin-bottom: 20px;" @click="showModal = true">{{ formName }}</el-button>
            </slot>
            <div slot="reference"><strong>{{ amountPrefix }}{{formatAmount ? formatPrice(total) : total}}</strong></div>
        </el-popover>

        <el-dialog :title="formName"
                   v-if="showModal"
                   :close-on-click-modal="false"
                   :append-to-body="true"
                   :before-close="closeAndClearModal"
                   :visible.sync="showModal">

            <el-form :model="model" label-position="top" ref="form">

                <el-row :gutter="20">
                    <el-col :md="{span:8, offset: 4}">
                        <el-form-item label="Amount"
                                      size="small"
                                      prop="Amount"
                                      :rules="[{required: true, message: 'Amount is required.', trigger: 'blur,change'}]">
                            <div class="price_changer">
                                <span class="currency --small">{{ amountPrefix }}</span><el-input-number size="small"
                                                                                                         v-model="model.Amount"
                                                                                                         :autofocus="true"
                                                                                                         :controls="false"
                                                                                                         :min="1"
                                                                                                         :precision="2"
                                                                                                         controls-position="right">
                                </el-input-number>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20" v-for="(field, key) in additionalFields" :key="key">
                    <el-col :md="{span:8, offset: 4}">
                        <el-form-item :label="key"
                                      size="small"
                                      :prop="key">
                            <el-input v-model="model[key]"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :md="{span:16, offset: 4}">
                        <el-button type="success" @click="addObject" :loading="loading">{{ formAddButton }}</el-button>
                    </el-col>
                </el-row>

            </el-form>





        </el-dialog>


    </div>


</template>

<script>
var clone = require('lodash.clone')
var forEach = require('lodash.foreach')

export default {

      name: 'AdditionForm',

      components: {
          ContentInner: () => import(/* webpackChunkName: "content-inner" */'components/ContentInner')
      },

      props: {
          formName: {
              type: String,
              required: false,
              default () {
                  return 'Add New';
              }
          },
          individualName: {
              type: String,
              required: false,
              default () {
                  return 'Item';
              }
          },
          formAddButton: {
              type: String,
              required: false,
              default () {
                  return 'Add';
              }
          },
          amountPrefix: {
              type: [String, Number],
              required: false,
              default () {
                  return '';
              }
          },
          formatAmount: {
              type: Boolean,
              required: false,
              default () {
                  return false;
              }
          },
          additionalFields: {
              type: [Array, Object],
              required: false,
              default () {
                  return [];
              }
          },
          onAdditionAdded: {
              type: Function,
              required: false,
              default () {
                  return function (model, total, additions) {};
              }
          },
          baseAdditions: {
              type: Object,
              required: false,
              default () {
                  return [];
              }
          },
      },

      data () {
          return {
              loading: false,
              showModal: false,
              model: {},
              additions: {},
          }
      },

      computed: {
          total()
          {
              var addition_total = 0;
              forEach(this.additions, (addition) => {
                  if (addition.Amount) {
                      addition_total = addition_total + this.simplePrice(addition.Amount);
                  }
              })

              return addition_total;
          }
      },

      watch: {

      },

      mounted () {
          console.log('AdditionForm.vue mounted!')
          this.additions = clone(this.baseAdditions)
      },

      methods: {
          closeAndClearModal()
          {
              this.$confirm('Are you sure to close?')
                .then(_ => {
                    this.showModal = false;
                })
                .catch(_ => {});
          },

          addObject()
          {
              this.$refs['form'].validate((valid, errors) => {
                  if (valid) {
                      var obj_length = Object.keys(this.additions).length
                      obj_length = obj_length +1
                      this.$set(this.additions, `Multi ${this.individualName} ${obj_length}`, this.model)
                      this.onAdditionAdded(this.model, this.total, this.additions)
                      this.$emit('addition-added', this.model, this.total, this.additions)
                      this.model = {}
                      this.showModal = false
                      this.loading = false
                  }
              });
          },

          displayModal()
          {
              this.showModal = true;
          }
      },

}
</script>

<style lang="css">
</style>
