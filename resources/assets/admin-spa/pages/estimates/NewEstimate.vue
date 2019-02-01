<template lang="html">

  <div v-loading="loading">

    <el-breadcrumb
      class="breadcrumbs"
      separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'estimates' }">Estimates</el-breadcrumb-item>
      <el-breadcrumb-item>New {{ documentName }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row
      align="middle"
      type="flex">
      <el-col :span="12">
        <h1 class="page_title">New {{ documentName }} {{ order.ref ? `- ${order.ref}` : '' }}</h1>
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

      <order-ref :form="order" />

      <hr>

      <customer-information-form :form="order" />

    </el-form>

    <el-row
      :gutter="20"
      style="margin-top: 20px; margin-bottom: 20px;">
      <el-col :span="12">
        <product-form :on-product-add="addProductToTable"/>
        <new-product-form :on-product-add="addProductToTable"/>
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
          @click="processSubmit()">Create {{ documentName }}</el-button>
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
    NewProductForm: () => import(/* webpackChunkName: "new-product-form" */'components/NewProductForm'),
    ProductTable: () => import(/* webpackChunkName: "product-table" */'components/ProductTable'),
    Errors: () => import(/* webpackChunkName: "errors" */'components/Errors'),
    CustomerInformationForm: () => import(/* webpackChunkName: "customer-information-form" */'components/CustomerInformationForm'),
    OrderRef: () => import(/* webpackChunkName: "order-ref" */'components/OrderRef')
  },

  props: {
    isProForma: {
      type: Boolean,
      required: false,
      default: () => { return false }
    }
  },

  data () {
    return {
      loading: false,
      errors: {},
      order: {
        status: null,
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
    },

    documentName () {
      return this.isProForma ? 'Pro-Forma' : 'Estimate'
    }
  },

  mounted () {
    console.log('NewEstimate.vue mounted!')

    this.order.status = this.documentName
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
