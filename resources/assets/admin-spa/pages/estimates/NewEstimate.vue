<template lang="html">

  <div v-loading="loading">

    <el-breadcrumb
      class="breadcrumbs"
      separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'estimates' }">Estimates</el-breadcrumb-item>
      <el-breadcrumb-item>New Estimate</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row
      align="middle"
      type="flex">
      <el-col :span="12">
        <h1 class="page_title">New Estimate</h1>
      </el-col>
    </el-row>

    <hr class="page_hr">

    <errors
      v-if="Object.keys(errors).length > 0"
      :errors="errors"/>

    <el-form
      ref="orderForm"
      :model="order"
      label-position="top"
      @submit.native.prevent>

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
        <el-col :md="{span:24}">
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

      <el-row
        v-if="order.needs_address === 'Needs Address'"
        :gutter="20">
        <el-col :md="12">
          <h5>Shipping Address</h5>
          <address-form
            :form="order.billing_address"
            prop="billing_address"/>
        </el-col>

        <el-col :md="12">
          <h5>Billing Address</h5>
          <el-col :md="{span:24}">
            <el-checkbox v-model="order.use_billing_for_shipping">Same As Billing Address</el-checkbox>
          </el-col>
          <address-form
            v-if="!order.use_billing_for_shipping"
            :form="order.shipping_address"
            prop="shipping_address"/>
        </el-col>
      </el-row>
    </el-form>

    <el-row
      :gutter="20"
      style="margin-top: 20px; margin-bottom: 20px;">
      <el-col :span="12">
        <product-form :on-product-add="addProductToTable"/>
      </el-col>
    </el-row>

    <el-row
      v-if="order.items"
      :gutter="20">
      <el-col :span="24">
        <product-table
          :editable="true"
          :order="order"
          :order-totals="orderTotals"/>
      </el-col>
    </el-row>

    <el-row
      :gutter="20"
      style="margin-top: 40px;">
      <el-col :md="{span:24}">
        <el-button
          type="primary"
          @click="processSubmit()">Create Estimate</el-button>
      </el-col>
    </el-row>

  </div>

</template>

<script>
import orderUtil from 'utils/order'
import api from 'services/api-service'
export default {

  name: 'NewEstimate',

  components: {
    ProductForm: () => import(/* webpackChunkName: "product-form" */'components/ProductForm'),
    ProductTable: () => import(/* webpackChunkName: "product-table" */'components/ProductTable'),
    AddressForm: () => import(/* webpackChunkName: "address-form" */'components/AddressForm'),
    Errors: () => import(/* webpackChunkName: "errors" */'components/Errors')
  },

  data () {
    return {
      loading: false,
      errors: {},
      order: {
        status: 'Estimate',
        customer: {},
        shipping_rate: 60,
        discount_rate: 0,
        billing_address: {},
        shipping_address: {},
        items: [],
        cart: {
          totals: {
            Shipping: 60,
            Discount: 0
          }
        },
        use_billing_for_shipping: false,
        needs_address: 'No Address'
      }
    }
  },

  computed: {
    orderTotals () {
      return orderUtil.totals(this.order.items, this.order.cart.totals['Shipping'], this.order.cart.totals['Discount'])
    }
  },

  mounted () {
    console.log('NewEstimate.vue mounted!')
  },

  methods: {
    addProductToTable (product) {
      this.order.items.push(product)
    },

    processSubmit () {
      this.loading = true
      this.errors = {}

      api.persist('post', {
        path: 'orders',
        object: this.order
      })
        .then((data) => {
          this.loading = false
          this.$router.push({ name: 'orders.view', params: { orderId: data.data.id.toString() } })
        })
        .catch((error) => {
          this.loading = false
          this.errors = error
        })
    }
  }
}
</script>

<style lang="css">
</style>
