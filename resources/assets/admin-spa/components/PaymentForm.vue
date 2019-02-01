<template lang="html">

  <div v-loading="loading">
    <errors
      v-if="Object.keys(errors).length > 0"
      :errors="errors"/>

    <el-form
      ref="paymentForm"
      :model="model"
      label-position="top">
      <el-tabs v-model="activePaymentTab">
        <el-tab-pane
          label="Card"
          name="card">
          <el-row
            v-if="activePaymentTab === 'card'"
            :gutter="20">
            <el-col :md="{span:8, offset: 4}">
              <el-form-item
                :disabled="disableAmount"
                :rules="[{required: true, message: 'Payment amount is required.', trigger: 'blur,change'}]"
                label="Payment Amount"
                size="small"
                prop="payment_amount">
                <div class="price_changer">
                  <span class="currency --small">{{ shopData.currency }}</span><el-input-number
                    v-model="model.payment_amount"
                    :autofocus="true"
                    :controls="false"
                    :min="1"
                    :precision="2"
                    size="small"
                    controls-position="right"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <card-payment-form
            v-if="activePaymentTab === 'card'"
            :model="model"
            :on-form-submit="onCardFormSubmit"
            :loading="loading"
            :on-token-creation="onTokenCreation">
            <template slot="after_form">
              <el-row
                v-if="activePaymentTab === 'card'"
                :gutter="20">
                <el-col :md="{span:16, offset: 4}">
                  <el-form-item
                    label="Payment Notes"
                    size="small"
                    prop="payment_notes">
                    <el-input
                      :autosize="{ minRows: 2, maxRows: 4}"
                      v-model="model.payment_notes"
                      type="textarea" />
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          </card-payment-form>

        </el-tab-pane>

        <el-tab-pane
          label="BACS"
          name="bacs">
          <el-row
            v-if="activePaymentTab === 'bacs'"
            :gutter="20">
            <el-col :md="{span:4, offset: 4}">
              <el-form-item
                :disabled="disableAmount"
                :rules="[{required: true, message: 'Payment amount is required.', trigger: 'blur,change'}]"
                label="Payment Amount"
                size="small"
                prop="payment_amount">
                <div class="price_changer">
                  <span class="currency --small">{{ shopData.currency }}</span><el-input-number
                    v-model="model.payment_amount"
                    :autofocus="true"
                    :controls="false"
                    :min="1"
                    :precision="2"
                    size="small"
                    controls-position="right"/>
                </div>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item
                :rules="[{required: true, message: 'Payment reference is required.', trigger: 'blur,change'}]"
                label="Payment Reference"
                size="small"
                prop="payment_reference">
                <el-input
                  :autofocus="true"
                  v-model="model.payment_reference"
                  auto-complete="off"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            v-if="activePaymentTab === 'bacs'"
            :gutter="20">
            <el-col :md="{span:16, offset: 4}">
              <el-form-item
                label="Payment Date"
                size="small"
                prop="payment_date">
                <el-date-picker
                  v-model="model.payment_date"
                  :default-value="defaultPaymentDate"
                  :picker-picker-options="paymentDateOptions"
                  type="date"
                  format="dd/MM/yyyy"
                  value-format="dd-MM-yyyy"
                  placeholder="dd/MM/yyyy"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            v-if="activePaymentTab === 'bacs'"
            :gutter="20">
            <el-col :md="{span:16, offset: 4}">
              <el-form-item
                label="Payment Notes"
                size="small"
                prop="payment_notes">
                <el-input
                  :autosize="{ minRows: 2, maxRows: 4}"
                  v-model="model.payment_notes"
                  type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane
          label="Other"
          name="other">
          <el-row
            v-if="activePaymentTab === 'other'"
            :gutter="20">
            <el-col :md="{span:4, offset: 4}">
              <el-form-item
                :disabled="disableAmount"
                :rules="[{required: true, message: 'Payment amount is required.', trigger: 'blur,change'}]"
                label="Payment Amount"
                size="small"
                prop="payment_amount">
                <div class="price_changer">
                  <span class="currency --small">{{ shopData.currency }}</span><el-input-number
                    v-model="model.payment_amount"
                    :autofocus="true"
                    :controls="false"
                    :min="1"
                    :precision="2"
                    size="small"
                    controls-position="right"/>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            v-if="activePaymentTab === 'other'"
            :gutter="20">
            <el-col :md="{span:4, offset: 4}">
              <el-form-item
                :rules="[{required: true, message: 'Payment method is required.', trigger: 'blur,change'}]"
                label="Payment Method"
                size="small"
                prop="payment_method">
                <el-input
                  :autofocus="true"
                  v-model="model.payment_method"
                  auto-complete="off"/>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item
                :rules="[{required: true, message: 'Payment reference is required.', trigger: 'blur,change'}]"
                label="Payment Reference"
                size="small"
                prop="payment_reference">
                <el-input
                  :autofocus="true"
                  v-model="model.payment_reference"
                  auto-complete="off"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            v-if="activePaymentTab === 'other'"
            :gutter="20">
            <el-col :md="{span:16, offset: 4}">
              <el-form-item
                label="Payment Date"
                size="small"
                prop="payment_date">
                <el-date-picker
                  v-model="model.payment_date"
                  :default-value="defaultPaymentDate"
                  :picker-picker-options="paymentDateOptions"
                  type="date"
                  format="dd/MM/yyyy"
                  value-format="dd-MM-yyyy"
                  placeholder="dd/MM/yyyy"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            v-if="activePaymentTab === 'other'"
            :gutter="20">
            <el-col :md="{span:16, offset: 4}">
              <el-form-item
                label="Payment Notes"
                size="small"
                prop="payment_notes">
                <el-input
                  :autosize="{ minRows: 2, maxRows: 4}"
                  v-model="model.payment_notes"
                  type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane
          label="On Account"
          name="account"/>

        <el-tab-pane
          v-if="showNoneOption"
          label="None"
          name="none"/>

        <el-row
          v-if="activePaymentTab !== 'card'"
          :gutter="20">
          <el-col :md="{span:16, offset: 4}">
            <el-button
              :loading="loading"
              type="success"
              @click="processPayment">Process Payment</el-button>
          </el-col>
        </el-row>

      </el-tabs>
    </el-form>
  </div>

</template>

<script>
import api from 'services/api-service'
import { mapGetters } from 'vuex'

export default {

  name: 'PaymentForm',

  components: {
    CardPaymentForm: () => import(/* webpackChunkName: "card-payment-form" */'components/CardPaymentForm'),
    Errors: () => import(/* webpackChunkName: "errors" */'components/Errors')
  },

  props: {
    order: {
      required: true,
      type: Object
    },
    showNoneOption: {
      required: false,
      type: Boolean,
      default () {
        return false
      }
    },
    startingAmount: {
      required: false,
      type: [String, Number],
      default () {
        return null
      }
    },
    disableAmount: {
      required: false,
      type: Boolean,
      default () {
        return false
      }
    },
    onPaymentProcessed: {
      required: false,
      type: Function,
      default () {
        return function (payment) {}
      }
    },
    defaultPaymentDate: {
      required: false,
      type: Date,
      default: () => { return new Date() }
    },
    paymentDateOptions: {
      required: false,
      type: Object,
      default: () => {
        return {
          shortcuts: [
            {
              text: 'Today',
              onClick (picker) {
                picker.$emit('pick', new Date())
              }
            },
            {
              text: 'Yesterday',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
              }
            },
            {
              text: 'A week ago',
              onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
              }
            }
          ]
        }
      }
    }
  },

  data () {
    return {
      activePaymentTab: 'card',
      loading: false,
      errors: {},
      model: {
        order: {},
        payment_date: null
      }
    }
  },

  computed: {
    ...mapGetters([
      'shopData'
    ])
  },

  watch: {
    activePaymentTab: function (val) {
      this.errors = {}
    }
  },

  mounted () {
    console.log('PaymentForm.vue mounted!')

    this.model.payment_date = this.defaultPaymentDate
    this.model.payment_amount = this.startingAmount
  },

  methods: {

    onTokenCreation (error) {
      if (!error) {
        this.processPayment()
      }
    },

    onCardFormSubmit () {
      this.$refs['paymentForm'].validate()
    },

    processPayment () {
      if (this.activePaymentTab !== 'none') {
        this.$refs['paymentForm'].validate((valid, errors) => {
          if (valid) {
            if (this.activePaymentTab !== 'other') {
              this.model.payment_method = this.activePaymentTab
            }
            this.model.order.id = this.order.id
            this.loading = true
            this.model.include = ['payment.reference', 'payment.method', 'payment.currency', 'payment.amount', 'payment.fee', 'payment.source']
            api.persist('post', {
              path: 'payments',
              object: this.model
            })
              .then(data => {
                this.onPaymentProcessed(data.data)
                this.loading = false
                this.model = {
                  order: {}
                }
                this.errors = {}
              })
              .catch(error => {
                this.errors = error
                this.loading = false
              })
          } else {
            this.errors = {
              message: 'There are required feilds empty below.'
            }
          }
        })
      } else {
        this.onPaymentProcessed({})
      }
    }
  }

}
</script>

<style lang="css">
</style>
