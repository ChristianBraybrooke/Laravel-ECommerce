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
        <new-product-form
          :on-product-add="addProductToTable" />
      </el-col>
    </el-row>

    {{ order }}

    <el-row
      v-if="order.products"
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
    NewProductForm: () => import(/* webpackChunkName: 'new'product-form" */'components/NewProductForm'),
    ProductTable: () => import(/* webpackChunkName: 'product'table" */'components/ProductTable'),
    Errors: () => import(/* webpackChunkName: 'errors' */'components/Errors'),
    CustomerInformationForm: () => import(/* webpackChunkName: 'customer'information-form" */'components/CustomerInformationForm'),
    OrderRef: () => import(/* webpackChunkName: 'order'ref" */'components/OrderRef')
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
      // order: {
      //   status: null,
      //   customer: {},
      //   shipping_rate: 60,
      //   discount_rate: 0,
      //   billing_address: {},
      //   shipping_address: {},
      //   products: [],
      //   totals: {
      //     shipping: 60,
      //     discount: 0
      //   },
      //   use_billing_for_shipping: false,
      //   needs_address: 'No Address'
      // }
      order: {
        status: 'STATUS_AWAITING_PAYMENT',
        customer: {},
        shipping_rate: 60,
        discount_rate: 0,
        billing_address: {
          country: 'United Kingdom'
        },
        shipping_address: {
          country: 'United Kingdom'
        },
        products: [
          {
            product: {
              id: 221,
              name: 'Quad Enclosed',
              variant: {
                id: 2,
                name: 'Eco Cubicles'
              }
            },
            totals: {
              unit_price: '864.00',
              extras: 0
            },
            qty: 1,
            customisation_data: {
              length: {
                group: 'Measurements',
                value: 2000,
                name: null,
                type: 'number',
                label: 'Length',
                appends: 'mm'
              },
              depth: {
                group: 'Measurements',
                value: 100,
                name: null,
                type: 'number',
                label: 'Depth',
                appends: 'mm'
              },
              height: {
                group: 'Measurements',
                name: '1850mm Standard',
                value: '1850mm',
                type: 'radio',
                label: 'Height',
                appends: 'mm'
              },
              cubicle_material: {
                group: 'Materials',
                name: 'MFC',
                value: 'MFC',
                type: 'radio',
                label: 'Cubicle Material'
              },
              pilaster_colour: {
                group: 'Cubicles',
                name: 'Birdie Beech Light',
                value: 'Birdie Beech Light',
                type: 'select',
                label: 'Pilaster Colour'
              },
              division_colour: {
                group: 'Cubicles',
                name: 'Birdie Beech Light',
                value: 'Birdie Beech Light',
                type: 'select',
                label: 'Division Colour'
              },
              notes: {
                group: 'Notes',
                value: null,
                name: null,
                type: 'textarea',
                label: 'Additional notes'
              },
              layout_description: {
                group: 'Layout',
                value: null,
                name: null,
                type: 'text',
                label: 'Layout Description'
              },
              legs: {
                group: 'Fixtures',
                name: '50mm',
                value: '50',
                type: 'radio',
                label: 'Cubicle Legs'
              },
              cubicle: {
                group: 'Cubicles',
                value: null,
                name: null,
                type: 'dynamic',
                label: 'Cubicle'
              },
              cubicle_1_door_function: {
                group: 'Cubicles',
                name: 'Inward',
                value: 'Inward',
                type: 'radio',
                label: 'Door Function'
              },
              cubicle_1_hinge_side: {
                group: 'Cubicles',
                name: 'Left',
                value: 'Left',
                type: 'radio',
                label: 'Hinge Side'
              },
              cubicle_2_door_function: {
                group: 'Cubicles',
                name: 'Inward',
                value: 'Inward',
                type: 'radio',
                label: 'Door Function'
              },
              cubicle_2_hinge_side: {
                group: 'Cubicles',
                name: 'Left',
                value: 'Left',
                type: 'radio',
                label: 'Hinge Side'
              },
              cubicle_3_hinge_side: {
                group: 'Cubicles',
                name: 'Left',
                value: 'Left',
                type: 'radio',
                label: 'Hinge Side'
              },
              cubicle_3_door_function: {
                group: 'Cubicles',
                name: 'Inward',
                value: 'Inward',
                type: 'radio',
                label: 'Door Function'
              },
              cubicle_4_door_function: {
                group: 'Cubicles',
                name: 'Inward',
                value: 'Inward',
                type: 'radio',
                label: 'Door Function'
              },
              cubicle_4_hinge_side: {
                group: 'Cubicles',
                name: 'Left',
                value: 'Left',
                type: 'radio',
                label: 'Hinge Side'
              }
            },
            form: {
              id: 6
            }
          }
        ],
        totals: {
          shipping: 60,
          discount: 0
        },
        use_billing_for_shipping: false,
        needs_address: 'No Address',
        ref: 42
      }
    }
  },

  computed: {
    orderTotals () {
      return orderUtil.totals(this.order.products, this.order.totals.shipping, this.order.totals.discount)
    },

    documentName () {
      return this.isProForma ? 'Pro-Forma' : 'Estimate'
    }
  },

  mounted () {
    console.log('NewEstimate.vue mounted!')

    this.order.status = 'STATUS_AWAITING_PAYMENT'
  },

  methods: {
    addProductToTable (product) {
      this.order.products.push(product)
    },

    updateProductOnTable (product) {
      //
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
    },

    handleProductUpdate (obj) {
      var currentProduct = this.order.products[obj.index]
      var product = {
        ...currentProduct,
        ...obj.product
      }
      this.order.products.splice(obj.index, 1, product)
    }
  }
}
</script>

<style lang="css">
</style>
