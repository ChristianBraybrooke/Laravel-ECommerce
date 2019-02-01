<template lang="html">
  <div>
    <el-button
      :loading="loading"
      :size="mergedButton.size"
      :plain="mergedButton.plain"
      :class="mergedButton.class"
      :type="mergedButton.type"
      @click="openModal">{{ (loading ? mergedButton.loading : mergedButton.text) }}
    </el-button>

    <el-dialog
      v-if="showModal"
      :title="mergedDialog.title"
      :close-on-click-modal="mergedDialog.closeOnClick"
      :before-close="closeAndClearModal"
      :visible.sync="showModal"
      :width="mergedDialog.width">

      Ready for customisation {{ readyForCustomisationForm }}

      <div v-loading="loading">
        <el-form
          ref="productAddForm"
          :model="form"
          label-position="top"
          @submit.native.prevent>

          <div
            v-if="!editForm"
            class="form_option_section">

            <el-row :gutter="20">
              <el-col :md="12">
                <h5>Product Type</h5>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :md="{span:16, offset: 4}">
                <el-form-item
                  label="Choose Category"
                  prop="category">
                  <div>
                    <el-radio-group
                      v-model="form.category"
                      class="product_form_radio">
                      <el-radio-button
                        v-for="type in productCollection.types.data"
                        :label="type"
                        :key="type.id">{{ type.name }}
                      </el-radio-button>
                    </el-radio-group>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row
              v-show="form.category.id"
              :gutter="20">
              <el-col :md="{span:16, offset: 4}">
                <el-form-item
                  label="Choose Product"
                  prop="productFirst">
                  <div>
                    <el-radio-group
                      v-model="form.product"
                      class="product_form_radio">
                      <div
                        v-for="product in form.category.products.data"
                        :key="product.id"
                        class="tooltip_wrap">
                        <el-tooltip
                          v-if="!parseInt(product.price) == 0"
                          :content="shopData.currency + product.price"
                          placement="top"
                          effect="light">
                          <el-radio-button :label="product">{{ product.name }}</el-radio-button>
                        </el-tooltip>
                        <el-radio-button
                          v-else
                          :label="product">{{ product.name }}
                        </el-radio-button>
                      </div>
                    </el-radio-group>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row
              v-show="form.product.variants.data.length >= 1"
              :gutter="20">
              <el-col :md="{span:16, offset: 4}">
                <el-form-item
                  label="Choose Variant"
                  prop="variant">
                  <div>
                    <el-radio-group
                      v-if="form.product.variants.data.length < 10"
                      v-model="form.variant"
                      class="product_form_radio">
                      <el-tooltip
                        v-for="variant in form.product.variants.data"
                        :key="variant.id"
                        :content="shopData.currency + variant.price"
                        placement="top"
                        effect="light">
                        <el-radio-button :label="variant">
                          {{ variant.name }}
                        </el-radio-button>
                      </el-tooltip>
                    </el-radio-group>
                    <el-select
                      v-else
                      v-model="form.variant"
                      size="small"
                      filterable
                      value-key="id">
                      <el-option
                        v-for="variant in form.product.variants.data"
                        :key="variant.id"
                        :label="`${variant.name} - ${shopData.currency + variant.price}`"
                        :value="variant">
                        {{ variant.name }} - <strong>{{ shopData.currency + variant.price }}</strong>
                      </el-option>
                    </el-select>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            {{ customisationForm.product }}

          </div>

        </el-form>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import api from 'services/api-service'

export default {
  name: 'NewProductForm',

  components: {

  },

  props: {
    button: {
      type: Object,
      required: false,
      default: () => { return {} }
    },
    dialog: {
      type: Object,
      required: false,
      default: () => { return {} }
    },
    onProductAdd: {
      type: Function,
      required: false,
      default: () => {}
    },
    editForm: {
      type: Boolean,
      required: false,
      default: () => { return false }
    },
    product: {
      type: Object,
      required: false,
      default: () => { return {} }
    },
    onModalClose: {
      type: Function,
      required: false,
      default: (instance) => {
        instance.$confirm('Are you sure to close the product selector?')
          .then(_ => {
            instance.clearAll()
            instance.showModal = false
          })
          .catch(_ => {})
      }
    },
    includes: {
      type: Array,
      required: false,
      default: () => { return [] }
    },
    with: {
      type: Array,
      required: false,
      default: () => { return [] }
    }
  },

  data () {
    return {
      loading: true,
      customisationForm: {
        product: {}
      },
      form: {
        category: {
          products: {
            data: []
          }
        },
        product: {
          variants: {
            data: []
          }
        },
        variant: {}
      },
      showModal: false,
      productCollection: {
        types: {
          data: []
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'shopData'
    ]),

    defaultButton () {
      return {
        text: 'Add Product (New)',
        loading: 'Loading Products',
        type: 'success',
        size: 'large',
        plain: false,
        class: ''
      }
    },

    mergedButton () {
      return {
        ...this.defaultButton,
        ...this.button
      }
    },

    defaultDialog () {
      return {
        title: `${(this.editForm ? 'Edit' : 'Add')} Product`,
        closeOnClick: true,
        width: '70%'
      }
    },

    mergedDialog () {
      return {
        ...this.defaultDialog,
        ...this.dialog
      }
    },

    defaultIncludes () {
      return ['type', 'options', 'price', 'effects_price', 'no_shop_data', 'description', 'order', 'rules']
    },

    mergedIncludes () {
      return [
        ...this.defaultIncludes,
        ...this.includes
      ]
    },

    defaultWith () {
      return ['types.products.variants.orderForm.sections.fields', 'types.products.variants.variant', 'types.products.orderForm.sections.fields']
    },

    mergedWith () {
      return [
        ...this.defaultWith,
        ...this.with
      ]
    },

    readyForCustomisationForm () {
      if (this.form.product.id && this.form.product.variants.data.length === 0) {
        return true
      }
      if (this.form.variant.id) {
        return true
      }
    }
  },

  watch: {
    'form.category.id': function (val) {
      this.resetForm()
    },
    'form.product.id': function (val) {
      if (this.readyForCustomisationForm) {
        this.setCustomisationProduct(this.form.product)
      }
    },
    'form.variant.id': function (val) {
      if (this.readyForCustomisationForm) {
        this.setCustomisationProduct(this.form.variant)
      }
    }
  },

  mounted () {
    if (this.editForm) {
      this.loading = false
      this.form.product = this.product
    } else {
      this.getData()
    }
  },

  methods: {
    getData () {
      if (this.shopData.collection_mappings_values) {
        var productCatId = this.shopData.collection_mappings_values['Product Categories Collection']
        this.loading = true
        api.get({
          path: 'collections/' + productCatId,
          params: {
            include: this.mergedIncludes,
            with: this.mergedWith
          }
        })
          .then(function (data) {
            this.productCollection = data.data
            this.loading = false
          }.bind(this))
          .catch(function (error) {
            this.loading = false
            this.errors = error
          }.bind(this))
      }
    },

    resetForm () {
      this.form.product = {
        variants: {
          data: []
        }
      }
      this.form.variant = {}
    },

    clearAll () {
      this.form.category = {
        products: {
          data: []
        }
      }
      this.resetForm()
    },

    setCustomisationProduct (val) {
      var product = {
        ...{},
        ...val
      }
      this.$set(this.customisationForm.product, product)
    },

    openModal () {
      if (this.editForm) {
        this.form.product = this.product
      }
      this.showModal = true
    },

    closeAndClearModal () {
      this.onModalClose(this)
    }
  }
}
</script>

<style lang="css" scoped>
.tooltip_wrap {
  float: left;
}
</style>
