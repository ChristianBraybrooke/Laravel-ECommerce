<template lang="html">
  <div v-loading="loading">

    <el-breadcrumb
      class="breadcrumbs"
      separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'orders' }">Orders</el-breadcrumb-item>
      <el-breadcrumb-item>New Order</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'orders.step1' }">Step 1</el-breadcrumb-item>
      <el-breadcrumb-item>Step 2</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row
      align="middle"
      type="flex">
      <el-col :span="12"><h1 class="page_title">New Order <span v-if="order.id"> - #{{ order.id }}</span></h1></el-col>
    </el-row>

    <el-row
      :gutter="20"
      style="margin-top: 20px; margin-bottom: 20px;">
      <el-col :span="12">
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
          :order-totals="orderTotals"
          :on-product-update="handleProductUpdate"/>
      </el-col>
    </el-row>

    <el-row
      :gutter="20"
      style="margin-top: 40px;">
      <el-col :md="{span:24}">
        <el-button
          type="primary"
          plain
          @click="processSubmit(false)">Save Changes</el-button>
        <el-button
          type="primary"
          @click="processSubmit()">Process Payment</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import api from 'services/api-service'
import { mapActions, mapGetters } from 'vuex'
var findIndex = require('lodash.findindex')
var forEach = require('lodash.foreach')
var throttle = require('lodash.throttle')
var last = require('lodash.last')
var range = require('lodash.range')

var productFormTemplate = {
  edit: false,
  product: {
    quantity: 1

  },
  productHighLevel: {
    variants: []
  },
  productCategory: { products: { data: [] } }
}

export default {

  name: 'NewOrderStepTwo',

  components: {
    Errors: () => import(/* webpackChunkName: "errors" */'components/Errors'),
    NewProductForm: () => import(/* webpackChunkName: "new-product-form" */'components/NewProductForm'),
    ProductTable: () => import(/* webpackChunkName: "product-table" */'components/ProductTable')
  },

  props: {

  },

  data () {
    return {
      loading: false,
      loadingProductCategories: false,
      showProductModal: false,
      addProductForm: productFormTemplate,
      productAddErrors: {},
      operators: {
        '+': function (a, b) { return parseInt(a) + parseInt(b) },
        '-': function (a, b) { return parseInt(a) - parseInt(b) }
      },
      products: [],
      productTypes: {
        types: {
          data: []
        }
      },
      productProps: {
        value: 'id',
        label: 'name',
        children: 'variants'
      }
    }
  },

  computed: {
    ...mapGetters([
      'order',
      'shopData',
      'orderTotals'
    ]),

    shippingRange () {
      return range(0, 250, 10)
    },

    topLevelProductsToShow () {
      if (this.addProductForm.productCategory) {
        return this.addProductForm.productCategory.products.data
      }

      return []
    },

    secondLevelProductsToShow () {
      return []
    },

    productSelected () {
      if (this.addProductForm.edit) {
        return true
      }
      return this.addProductForm.productHighLevel && this.topLevelProductsToShow.length >= 1
    }
  },

  watch: {
    order: {
      handler: function (order) {
        this.$store.commit('SET_ORDER', order)
      },
      deep: true
    },
    'addProductForm.productHighLevel': function (value) {
      if (value) {
        if (!this.productHasVariants(value)) {
          this.$set(value, 'options', {})
          this.$set(value, 'quantity', 1)
          this.$set(this.addProductForm, 'product', value)
        } else {
          this.$set(this.addProductForm, 'product', {})
        }
      }
    },
    'addProductForm.productSecondLevel': function (value) {
      if (value) {
        this.$set(value, 'options', {})
        this.$set(value, 'quantity', 1)
        this.$set(this.addProductForm, 'product', value)
      }
    }
  },

  mounted () {
    console.log('NewOrderStepTwo.vue Mounted')
    if (!this.order.id) {
      this.$router.push({ name: 'orders.step1' })
    }
  },

  methods: {

    ...mapActions([
      'deleteOrderItem',
      'editOrderItem'
    ]),

    productHasVariants (product) {
      if (this.objectHas(product, 'variants.data')) {
        return product.variants.data.length >= 1
      }
      return false
    },

    getProductTypesCollection () {
      if (this.shopData.collection_mappings_values) {
        var productCatId = this.shopData.collection_mappings_values['Product Categories Collection']
        this.loadingProductCategories = true
        api.get({
          path: 'collections/' + productCatId,
          params: {
            include: ['type', 'options', 'price', 'effects_price', 'no_shop_data'],
            with: ['types.products.variants.orderForm.sections.fields']
          }
        })
          .then(function (data) {
            this.productTypes = data.data

            this.loadingProductCategories = false
          }.bind(this))
          .catch(function () {
            this.loadingProductCategories = false
            // this.errors = error;
          }.bind(this))
      }
    },

    formattedPrice (product) {
      var basePrice = parseInt(product.price)
      var baseWithExtras = basePrice
      var extras = 0
      if (product.options) {
        forEach(product.options, function (option) {
          if (option) {
            if (option.price_mutator && option.price_value) {
              baseWithExtras = this.operators[option.price_mutator](baseWithExtras, option.price_value)
              extras = this.operators[option.price_mutator](extras, option.price_value)
            }
          }
        }.bind(this))
      }

      var quantity = product.quantity ? product.quantity : 1
      var total = baseWithExtras * quantity
      extras = extras * quantity
      return {
        'Base Price': basePrice,
        'Sub-Total': basePrice * quantity,
        'Extras': extras,
        'Total': total
      }
    },

    /**
           * Check the user wants to close the modal and then clear everything
           *
           * @param Mixed done
           * @return void
           */
    closeAndClearModal (done) {
      this.$confirm('Are you sure to close the product selector?')
        .then(_ => {
          this.productAddErrors = {}
          this.addProductForm = productFormTemplate
          this.showProductModal = false
        })
        .catch(_ => {})
    },

    /**
           * Set the product on the form data model
           *
           * @param Array val
           * @return void
           */
    handleProductChange (val) {
      var chosenProduct = this.findProductById(last(val))
      this.addProductForm.product = chosenProduct
      this.$set(this.addProductForm.product, 'options', {})
    },

    /**
           * Retrieve the product variants from the server
           *
           * @param Int val
           * @return void
           */
    requestProductVariants: throttle(function (val) {
      var productIndex = this.getIndexFromId(val)
      this.loading = true
      api.get({
        path: 'products/' + val + '/variants',
        params: {
          include: ['blank_variants', 'type', 'options', 'price', 'effects_price'],
          with: ['orderForm.sections.fields']
        }
      })
        .then(function (data) {
          this.loading = false
          this.products[productIndex].variants = data.data
        }.bind(this))
        .catch(function () {
          this.loading = false
        }.bind(this))
    }, 1000),

    /**
           * Do everything that needs to be done when the user adds a product
           *
           * @return void
           */
    handleAddProductBtnClick () {
      this.showProductModal = true
    },

    getIndexFromId (id) {
      if (id) {
        var productIndex = findIndex(this.products, function (p) {
          return p.id === parseInt(id)
        })
        return productIndex === -1 ? null : productIndex
      }

      return null
    },

    findProductById (id) {
      var product = null
      if (id) {
        forEach(this.products, function (p) {
          if (p.id === parseInt(id)) {
            product = p
          } else {
            forEach(p.variants, function (v) {
              if (v.id === parseInt(id)) {
                product = v
              }
            })
          }
        })
      }
      return product
    },

    addProductToTable (product) {
      this.$store.commit('ADD_PRODUCT_TO_ORDER', product)
    },

    editProductOnTable () {
      this.editOrderItem(this.addProductForm.product)
      this.productAddErrors = {}
      this.addProductForm = productFormTemplate
      this.showProductModal = false
    },

    deleteRow (index, row) {
      this.deleteOrderItem(row)
    },

    editRow (index, row) {
      this.addProductForm.edit = true
      this.addProductForm.product = row
      this.showProductModal = true
    },

    optionLabel (option) {
      if (option) {
        if (option.price_mutator && option.price_value) {
          return option.name + ' (' + option.price_mutator + ' £' + option.price_value + ')'
        }
        return option.name
      }
      return ''
    },

    itemRowNameFormatter (row, column, cellValue) {
      var rowName = null
      if (this.objectHas(row, 'variant.name')) {
        rowName = <p><strong>{(row.variant.name + ' / ')}</strong>{row.name}</p>
      } else {
        rowName = <p><strong>{row.name}</strong></p>
      }

      if (row.options) {
        var items = []
        forEach(row.options, function (value, key) {
          var newValue = value ? value.name : value
          items.push(<li>{key}: {newValue}</li>)
        })

        return <div>{rowName} <ul class="order_item_options">{items}</ul></div>
      }
      return <div>{rowName}</div>
    },

    processSubmit (navigate = true) {
      console.log(this.order)
      this.loading = true
      api.persist('put', {
        path: 'orders/' + this.order.id,
        object: this.order
      })
        .then(function (data) {
          this.loading = false
          if (navigate) {
            this.$router.push({ name: 'orders.step3' })
          }
        }.bind(this))
        .catch(function () {
          this.loading = false
        }.bind(this))
    },

    formatTotalRow (row, column, cellValue) {
      if (row.total === 'Shipping') {
        var options = []
        forEach(this.shippingRange, function (range) {
          options.push(<el-option key={range} value={range}></el-option>)
        })

        return <div>{this.shopData.currency} <el-select v-model={this.order.shipping_rate} size="mini" style="max-width: 85px;">{options}</el-select></div>
      }
      return this.shopData.currency + cellValue
    },

    handleProductUpdate (obj) {
      var currentProduct = this.order.items[obj.index]
      var product = {
        ...currentProduct,
        ...obj.product
      }
      this.order.items.splice(obj.index, 1, product)
    }

  }
}
</script>

<style lang="scss">
  @import '../../sass/_variables.scss';

  .form_option_section {
      border-bottom: dashed 2px $--border-color-light;
      padding: 10px 0px;
      margin-bottom: 10px;
  }
  ul.order_item_options {
      list-style: circle;
      font-size: 13px;
      padding: 0px 25px;
  }
</style>
