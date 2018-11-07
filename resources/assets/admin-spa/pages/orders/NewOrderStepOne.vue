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

      <customer-information-form :form="order" />

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
    CustomerInformationForm: () => import(/* webpackChunkName: "customer-information-form" */'components/CustomerInformationForm')
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
    }
  }
}
</script>

<style lang="css">
</style>
