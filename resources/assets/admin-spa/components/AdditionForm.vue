<template lang="html">

    <div :loading="loading">

        <el-popover trigger="hover" placement="top">
            <ul>
                <li v-for="(addition, key) in additions" :key="key">
                    <strong>Amount</strong>: {{ amountPrefix }}{{ formatAmount ? formatPrice(addition.amount) : addition.amount }} <br />
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
                                      prop="amount"
                                      :rules="[{required: true, message: 'Amount is required.', trigger: 'blur,change'}]">
                            <div class="price_changer">
                                <span class="currency --small">{{ amountPrefix }}</span><el-input-number size="small"
                                                                                                         v-model="model.amount"
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
export default {

      name: 'AdditionForm',

      components: {

      },

      props: {
          formName: {
              type: String,
              required: false,
              default () {
                  return 'Add New';
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
                  return function (model, total) {};
              }
          },
          baseAdditions: {
              type: [Array],
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
              additions: [],
          }
      },

      computed: {
          total()
          {
              var addition_total = 0;
              this.additions.forEach((addition) => {
                  if (addition.amount) {
                      addition_total = addition_total + this.simplePrice(addition.amount);
                  }
              })

              return addition_total;
          }
      },

      watch: {

      },

      mounted () {
          console.log('AdditionForm.vue mounted!')
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
                      this.additions.push(this.model)
                      this.onAdditionAdded(this.model, this.total)
                      this.$emit('addition-added', this.model, this.total)
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
