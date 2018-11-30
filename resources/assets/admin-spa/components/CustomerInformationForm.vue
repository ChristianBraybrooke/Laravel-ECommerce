<template lang="html">
  <div class="">

    <el-row :gutter="20">
      <el-col :md="{span:8, offset: 4}">
        <el-form-item
          label="Customer Company"
          size="small"
          prop="customer.company">
          <el-autocomplete
            :autofocus="true"
            :disabled="form.customer.id ? true : false"
            v-model="form.customer.company"
            :fetch-suggestions="getCustomers"
            value-key="email"
            @select="handleCustomerSelect"/>
          <el-button
            v-if="form.customer.id"
            type="warning"
            size="mini"
            @click="resetCustomer">Reset Customer</el-button>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :md="{span:8, offset: 4}">
        <el-form-item
          label="Customer First Name"
          size="small"
          prop="customer.first_name">
          <el-input
            :autofocus="true"
            v-model="form.customer.first_name"
            auto-complete="off"/>
        </el-form-item>
      </el-col>
      <el-col :md="8">
        <el-form-item
          label="Customer Last Name"
          size="small"
          prop="customer.last_name">
          <el-input
            :autofocus="true"
            v-model="form.customer.last_name"
            auto-complete="off"/>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :md="{span:8, offset: 4}">
        <el-form-item
          label="Customer Phone"
          size="small"
          prop="customer.phone">
          <el-input
            :autofocus="true"
            v-model="form.customer.phone"
            auto-complete="off"/>
        </el-form-item>
      </el-col>
      <el-col :md="8">
        <el-form-item
          label="Customer Email"
          size="small"
          prop="customer.email">
          <el-input
            :autofocus="true"
            v-model="form.customer.email"
            auto-complete="off"/>
        </el-form-item>
      </el-col>
    </el-row>

    <hr>

    <el-row :gutter="20">
      <el-col :md="{span:8, offset: 4}">
        <el-form-item
          label="Address"
          size="small"
          prop="needs_address">

          <div>
            <el-radio-group
              v-model="form.needs_address"
              size="small">
              <el-radio-button label="Needs Address" />
              <el-radio-button label="No Address"/>
            </el-radio-group>
          </div>

        </el-form-item>
      </el-col>
    </el-row>

    <el-row
      v-if="form.needs_address === 'Needs Address'"
      :gutter="20">
      <el-col :md="{span:8, offset: 4}">
        <h5>Billing Address</h5>
        <address-form
          :offset="0"
          :span="12"
          :form="form.billing_address"
          prop="billing_address"/>
      </el-col>

      <el-col :md="8">
        <h5>Shipping Address</h5>
        <address-form
          v-if="!form.use_billing_for_shipping"
          :offset="0"
          :span="12"
          :form="form.shipping_address"
          prop="shipping_address"/>
        <el-col :md="{span:24}">
          <el-checkbox v-model="form.use_billing_for_shipping">Same As Billing Address</el-checkbox>
        </el-col>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import api from 'services/api-service'

export default {
  name: 'CustomerInformationForm',

  components: {
    AddressForm: () => import(/* webpackChunkName: "address-form" */'components/AddressForm')
  },

  props: {
    form: {
      required: true,
      type: Object
    }
  },

  data () {
    return {

    }
  },

  computed: {

  },

  watch: {

  },

  mounted () {
    if (!this.form.billing_address.billing_address) {
      this.form.billing_address = {
        country: 'United Kingdom'
      }
    }
    if (!this.form.shipping_address.billing_address) {
      this.form.shipping_address = {
        country: 'United Kingdom'
      }
    }
  },

  methods: {
    getCustomers (queryString, callback) {
      api.get({
        path: 'users',
        params: {
          search: queryString
        }
      })
        .then((data) => {
          callback(data.data)
        })
        .catch(() => {
          //
        })
    },

    resetCustomer () {
      this.form.customer.id = null
      this.form.customer.company = null
    },

    handleCustomerSelect (customer) {
      this.form.customer.id = customer.id
      this.form.customer.first_name = customer.name.first
      this.form.customer.last_name = customer.name.last
      this.form.customer.phone = customer.phone
      this.form.customer.email = customer.email

      this.form.billing_address = {
        ...customer.billing_address,
        ...this.form.billing_address
      }

      this.form.shipping_address = {
        ...customer.shipping_address,
        ...this.form.shipping_address
      }
    }
  }
}
</script>

<style lang="css">
</style>
