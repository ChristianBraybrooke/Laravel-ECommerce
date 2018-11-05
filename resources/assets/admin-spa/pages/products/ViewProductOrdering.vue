<template lang="html">
  <div>

    <product-page-layout
      :product-id="productId"
      :current-page="'/products/' + productId + '/ordering'"
      :form-loaded="formLoaded"
      :request-with="['orderForm', 'frontendForm']">

      <template
        slot="product_page"
        slot-scope="props">

        <el-row :gutter="20">
          <el-col
            :md="6"
            :sm="12"
            :xs="24">
            <el-form-item
              v-if="props.productForm.order_form"
              label="Order Form"
              prop="order_form.id"
              size="small">
              <el-select
                v-model="props.productForm.order_form.id"
                class="collection_type_select"
                filterable
                placeholder="Select">
                <el-option
                  v-for="form in forms"
                  :key="form.id"
                  :label="form.name"
                  :value="form.id"/>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col
            :md="6"
            :sm="12"
            :xs="24">
            <el-form-item
              v-if="props.productForm.frontend_form"
              label="Frontend Order Form"
              prop="frontend_form.id"
              size="small">
              <el-select
                v-model="props.productForm.frontend_form.id"
                class="collection_type_select"
                filterable
                placeholder="Select">
                <el-option
                  v-for="form in forms"
                  :key="form.id"
                  :label="form.name"
                  :value="form.id"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

      </template>

    </product-page-layout>

  </div>
</template>

<script>
import api from 'services/api-service'

export default {

  name: 'ViewProductOrdering',

  components: {
    ProductPageLayout: () => import(/* webpackChunkName: "product-page-layout" */'./ProductPageLayout')
  },

  props: {
    productId: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      forms: {},
      formErrors: {}
    }
  },

  computed: {
    //
  },

  watch: {
    //
  },

  mounted () {
    console.log('ViewProductOrdering.vue mounted')
    this.getForms()
  },

  methods: {

    formLoaded (data) {
      if (!data.order_form) {
        this.$set(data, 'order_form', {})
      }
      if (!data.frontend_form) {
        this.$set(data, 'frontend_form', {})
      }
    },

    getForms () {
      api.get({
        path: 'forms'
      })
        .then(function (data) {
          this.forms = data.data
        }.bind(this))
        .catch(function (error) {
          this.formErrors = error
        }.bind(this))
    }
  }

}
</script>

<style lang="css" scoped>

</style>
