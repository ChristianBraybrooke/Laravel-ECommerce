<template lang="html">
  <div v-loading="loading">

    <el-breadcrumb
      class="breadcrumbs"
      separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'orders' }">Orders</el-breadcrumb-item>
      <el-breadcrumb-item>New Order</el-breadcrumb-item>
      <el-breadcrumb-item>Step 1</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row
      align="middle"
      type="flex">
      <el-col :span="12">
        <h1 class="page_title">New Order <span v-if="order.first_name && order.last_name"> - {{ order.first_name + ' ' + order.last_name }}</span></h1>
        <el-button
          v-show="order.id"
          type="danger"
          plain
          size="mini"
          @click="resetOrder">Reset Order</el-button>
      </el-col>
    </el-row>

    <hr class="page_hr">

    <errors
      v-if="Object.keys(orderErrors).length > 0"
      :errors="orderErrors"/>

    <el-form
      ref="orderForm"
      :rules="formRules"
      :model="order"
      label-position="top"
      @submit.native.prevent>

      <el-row :gutter="20">
        <el-col :md="12">
          <h5>Customer Information</h5>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :md="{span:16, offset: 4}">
          <el-form-item
            label="Customer Company"
            size="small"
            prop="customer.company">
            <el-autocomplete
              :autofocus="true"
              :disabled="order.customer.id ? true : false"
              v-model="order.customer.company"
              :fetch-suggestions="getCustomers"
              value-key="email"
              @select="handleCustomerSelect"/>
            <el-button
              v-if="order.customer.id"
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
              v-model="order.customer.first_name"
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
              v-model="order.customer.last_name"
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
              v-model="order.customer.phone"
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
              v-model="order.customer.email"
              auto-complete="off"/>
          </el-form-item>
        </el-col>
      </el-row>

      <hr>

      <el-row :gutter="20">
        <el-col :md="12">
          <h5>Needs Address</h5>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :md="{span:16, offset: 4}">
          <el-form-item
            label="Address"
            size="small"
            prop="needs_address">

            <div>
              <el-radio-group
                v-model="order.needs_address"
                size="small">
                <el-radio-button label="Needs Address" />
                <el-radio-button label="No Address"/>
              </el-radio-group>
            </div>

          </el-form-item>
        </el-col>
      </el-row>

      <hr>

      <template v-if="needsAddress">

        <el-row :gutter="20">
          <el-col :md="12">
            <h5>Billing Adress</h5>
          </el-col>
        </el-row>

        <address-form
          :form="order.billing_address"
          prop="billing_address"/>

        <hr>

        <el-row :gutter="20">
          <el-col :md="12">
            <h5>Shipping Adress</h5>
          </el-col>
        </el-row>

        <el-row
          :gutter="20"
          style="margin-bottom: 20px;">
          <el-col :md="{span:20, offset: 4}">
            <el-checkbox v-model="order.use_billing_for_shipping">Same As Billing Address</el-checkbox>
          </el-col>
        </el-row>

        <address-form
          v-if="!order.use_billing_for_shipping"
          :form="order.shipping_address"
          prop="shipping_address"/>

      </template>

      <el-row
        :gutter="20"
        style="margin-top: 40px;">
        <el-col :md="{span:24}">
          <el-button
            v-if="order.id"
            type="primary"
            plain
            @click="processSubmit('orderForm', false)">Save Changes</el-button>
          <el-button
            type="primary"
            @click="processSubmit('orderForm', true)">Choose Products</el-button>
        </el-col>
      </el-row>

    </el-form>

  </div>
</template>

<script>
import api from 'services/api-service'
import { mapActions, mapGetters } from 'vuex'

export default {

  name: 'OrderStepOne',

  components: {
    Errors: () => import(/* webpackChunkName: "errors" */'components/Errors'),
    AddressForm: () => import(/* webpackChunkName: "address-form" */'components/AddressForm')
  },

  props: {

  },

  data () {
    return {
      loading: false,
      orderErrors: {},
      formRules: {
        // 'customer.first_name': [
        //   { required: true, message: 'The first name is required', trigger: 'blur' }
        // ],
        // 'customer.last_name': [
        //   { required: true, message: 'The last name is required', trigger: 'blur' }
        // ],
        // 'customer.phone': [
        //   { required: true, message: 'The phone number is required', trigger: 'blur' }
        // ],
        // 'customer.email': [
        //   { required: true, message: 'The email is required', trigger: 'blur' },
        //   { type: 'email', message: 'Please enter a valid email address' }
        // ]
      }
    }
  },

  computed: {
    ...mapGetters([
      'order',
      'shopData'
    ]),

    needsAddress () {
      return this.order.needs_address === 'Needs Address'
    }
  },

  watch: {
    order: {
      handler: function (order) {
        this.$store.commit('SET_ORDER', order)
      },
      deep: true
    }
  },

  mounted () {
    console.log('orderStepOne.vue Mounted')
  },

  methods: {

    ...mapActions([
      'resetOrder'
    ]),

    /**
           * Process the form submission and determine what to do next
           *
           * @param String form
           * @param Boolean toNextPage
           * @return void
           */
    processSubmit (formName, toNextPage) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.order.id) {
            api.persist('put', {
              path: 'orders/' + this.order.id,
              object: this.order
            })
              .then(function (data) {
                this.loading = false
                // this.$store.commit('SET_ORDER', data.data);
                if (toNextPage) {
                  this.$router.push({ name: 'orders.step2' })
                }
              }.bind(this))
              .catch(function (error) {
                this.loading = false
                this.orderErrors = error
              }.bind(this))
          } else {
            api.persist('post', {
              path: 'orders',
              object: this.order
            })
              .then(function (data) {
                this.loading = false
                this.$set(this.order, 'id', data.data.id)
                // this.$store.commit('SET_ORDER', data.data);
                this.$router.push({ name: 'orders.step2' })
              }.bind(this))
              .catch(function (error) {
                this.loading = false
                this.orderErrors = error
              }.bind(this))
          }
        } else {
          return false
        }
      })
    },

    /**
           * Get customers for the autocomplete
           *
           * @param String queryString
           * @param Function callback
           * @return Void
           */
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

    /**
           * Get customers for the autocomplete
           *
           * @param String queryString
           * @param Function callback
           * @return Void
           */
    handleCustomerSelect (item) {
      console.log(item)
      this.order.customer.id = item.id
      this.order.customer.first_name = item.name.first
      this.order.customer.last_name = item.name.last
      this.order.customer.phone = item.phone
      this.order.customer.email = item.email

      this.order.billing_address.line_1 = item.billing_address.line_1
      this.order.billing_address.line_2 = item.billing_address.line_2
      this.order.billing_address.town = item.billing_address.town
      this.order.billing_address.county = item.billing_address.county
      this.order.billing_address.postcode = item.billing_address.postcode
      this.order.billing_address.country = item.billing_address.country

      this.order.shipping_address.line_1 = item.shipping_address.line_1
      this.order.shipping_address.line_2 = item.shipping_address.line_2
      this.order.shipping_address.town = item.shipping_address.town
      this.order.shipping_address.county = item.shipping_address.county
      this.order.shipping_address.postcode = item.shipping_address.postcode
      this.order.shipping_address.country = item.shipping_address.country
    },

    /**
           * Reset the customer id
           *
           * @return Void
           */
    resetCustomer () {
      this.order.customer.id = null
      this.order.customer.company = null
    }
  }
}
</script>

<style lang="css">
</style>
