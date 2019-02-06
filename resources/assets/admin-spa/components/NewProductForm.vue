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
          </div>

        </el-form>

        <el-form
          ref="productCustomisationForm"
          :model="customisationForm"
          label-position="top"
          @submit.native.prevent>

          <div v-show="customisationForm.product.id">
            <template v-if="customisationForm.product.order_form">
              <div
                v-for="section in customisationForm.product.order_form.sections.data"
                v-show="section.fields.data.length > 0"
                :key="section.id">
                <el-row
                  :gutter="20">
                  <el-col :md="12">
                    <h5>{{ section.name }}</h5>
                  </el-col>
                </el-row>

                <div
                  class="form_option_section">
                  <el-row
                    :gutter="20">
                    <el-col :md="{span:16, offset: 4}">
                      <div
                        v-for="field in section.fields.data"
                        :key="field.id">
                        <component
                          v-if="calculateDynamicVisible(field.rules)"
                          :is="`${field.type}-form-field`"
                          :form="customisationForm.options"
                          :product="customisationForm.product"
                          :section="section"
                          :field="field"
                          :prop="`${field.name}`"/>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <hr>
              </div>
            </template>
          </div>

          <template v-if="readyForCustomisationForm">
            <el-row :gutter="20">
              <el-col :md="12">
                <h5>Quantity</h5>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :md="{span:16, offset: 4}">
                <el-form-item
                  label="Quantity"
                  size="small"
                  prop="quantity">
                  <el-select v-model="customisationForm.quantity">
                    <el-option
                      v-for="range in quantityRange"
                      :key="range"
                      :value="range">
                      {{ range }}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :md="12">
                <h5>Price</h5>
                <el-button
                  :type="editPrice ? 'warning' : 'primary'"
                  size="mini"
                  plain
                  @click="handleEditPrice">{{ editPrice ? 'Reset Price' : 'Edit Price' }}</el-button>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col
                v-for="(value, key) in formattedPrices(customisationForm.product)"
                :key="key"
                :md="{span:16, offset: 4}">
                <p><strong>{{ key }}:</strong> <span v-show="key !== 'Base Price' || !editPrice && key === 'Base Price'">{{ shopData.currency }}{{ value }}</span></p>
                <div
                  v-show="editPrice && key === 'Base Price'"
                  class="price_changer">
                  <span class="currency">{{ shopData.currency }}</span><el-input-number
                    :value="simplePrice(customisationForm.product.price)"
                    size="mini"
                    controls-position="right"
                    @change="adjustPrice"/>
                </div>
              </el-col>
            </el-row>
          </template>

        </el-form>

        <span
          slot="footer"
          class="dialog-footer">
          <el-button
            v-if="!editForm"
            @click="closeAndClearModal()">{{ editForm ? 'Discard Changes' : 'Cancel' }}
          </el-button>
          <el-button
            v-if="!editForm"
            :disabled="!readyForCustomisationForm"
            type="primary"
            plain
            @click="addProduct(true)">
            Finish & Add Another
          </el-button>
          <el-button
            v-if="!editForm"
            :disabled="!readyForCustomisationForm"
            type="primary"
            @click="addProduct()">Finish
          </el-button>
          <el-button
            v-if="editForm"
            type="primary"
            @click="saveProduct()">
            Save Changes
          </el-button>
        </span>

      </div>

    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { operators } from 'utils/operators'
import api from 'services/api-service'
import RadioFormField from 'components/product-form/RadioFormField'
import NumberFormField from 'components/product-form/NumberFormField'
import SelectFormField from 'components/product-form/SelectFormField'
import TextFormField from 'components/product-form/TextFormField'
import TextareaFormField from 'components/product-form/TextareaFormField'

import clone from 'lodash.clone'
import range from 'lodash.range'
import forEach from 'lodash.foreach'

export default {
  name: 'NewProductForm',

  components: {
    RadioFormField,
    NumberFormField,
    SelectFormField,
    TextFormField,
    TextareaFormField
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
    onProductUpdate: {
      type: Function,
      required: false,
      default: () => {}
    },
    tableIndex: {
      type: [Number, String],
      required: false,
      default: () => { return null }
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
      default: (instance, confirm) => {
        if (confirm) {
          instance.$confirm('Are you sure to close the product selector?')
            .then(_ => {
              instance.clearAll()
              instance.showModal = false
            })
            .catch(_ => {})
        } else {
          instance.clearAll()
          instance.showModal = false
        }
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
        quantity: 1,
        options: {},
        product: {
          order_form: {
            sections: {
              data: []
            }
          }
        }
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
      },
      editPrice: false,
      clonedPrice: '0.00'
    }
  },

  computed: {
    ...mapGetters([
      'shopData'
    ]),

    quantityRange () {
      return range(1, 250)
    },

    defaultButton () {
      return {
        text: 'Add Product',
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
      if (this.editForm) {
        return true
      }
      if (this.form.product.id && this.form.product.variants.data.length === 0) {
        return true
      }
      if (this.form.variant.id) {
        return true
      }
    },

    mergedProduct () {
      return {
        ...this.customisationForm.product,
        ...{ quantity: this.customisationForm.quantity },
        ...{ options: this.customisationForm.options }
      }
    }
  },

  watch: {
    'form.category.id': function (val) {
      this.resetForm()
    },
    'form.product.id': function (val) {
      if (!this.editForm) {
        if (this.form.product.variants.data.length === 0) {
          this.setCustomisationProduct(this.form.product)
        } else {
          if (this.readyForCustomisationForm) {
            this.setCustomisationProduct(this.form.product)
          }
          this.resetCustomisationForm()
          this.resetVariant()
        }
      }
    },
    'form.variant.id': function (val) {
      this.resetCustomisationForm()
      if (this.readyForCustomisationForm) {
        this.setCustomisationProduct(this.form.variant)
      }
    }
  },

  mounted () {
    if (this.editForm) {
      this.loading = false
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
      this.clonedPrice = '0.00'
      this.resetForm()
    },

    resetVariant () {
      this.form.variant = {}
    },

    resetCustomisationForm () {
      this.customisationForm = {
        quantity: 1,
        options: {},
        product: {
          order_form: {
            sections: {
              data: []
            }
          }
        }
      }
    },

    setCustomisationProduct (val) {
      var product = {
        ...{},
        ...val
      }
      this.clonedPrice = clone(product.price)
      this.customisationForm.product = product
    },

    calculateDynamicVisible (rules) {
      if (rules.dynamic) {
        var optionKey = null
        this.customisationForm.product.order_form.sections.data.forEach((section) => {
          section.fields.data.forEach((field) => {
            if (field.id === rules.show_if_att) {
              optionKey = field.name
            }
          })
        })
        if (this.customisationForm.options[optionKey]) {
          if (this.customisationForm.options[optionKey].value) {
            return this.customisationForm.options[optionKey].value === rules.show_if_value
          }
          return this.customisationForm.options[optionKey] === rules.show_if_value
        }
        return false
      }
      return true
    },

    handleEditPrice () {
      if (this.editPrice) {
        this.customisationForm.product.price = clone(this.clonedPrice)
      }
      this.editPrice = !this.editPrice
    },

    adjustPrice (val) {
      this.customisationForm.product.price = val
    },

    formattedPrices (product) {
      var basePrice = this.simplePrice(product.price)
      var baseWithExtras = basePrice
      var extras = 0
      if (product.options) {
        forEach(product.options, (option) => {
          if (option) {
            if (option.price_mutator && option.price_value) {
              baseWithExtras = operators[option.price_mutator](baseWithExtras, option.price_value)
              extras = operators[option.price_mutator](extras, option.price_value)
            }
          }
        })
      }

      var quantity = this.customisationForm.quantity
      var total = baseWithExtras * quantity
      extras = extras * quantity
      return {
        'Base Price': this.formatPrice(basePrice),
        'Sub-Total': this.formatPrice(basePrice * quantity),
        'Extras': this.formatPrice(extras),
        'Total': this.formatPrice(total)
      }
    },

    addProduct (addAnother = false) {
      if (this.customisationForm.quantity >= 1) {
        var product = this.mergedProduct
        this.onProductAdd(product)

        if (!addAnother) {
          this.$message({
            message: 'Product Added!',
            type: 'success'
          })
          this.closeAndClearModal(false)
        } else {
          this.clearAll()
          this.$message({
            message: 'Product Added and Form Cleared!',
            type: 'success'
          })
        }
      }
    },

    saveProduct () {
      var product = this.mergedProduct
      this.onProductUpdate({ product: product, index: this.tableIndex })
      this.$emit('product-update', { product: product, index: this.tableIndex })
      this.clearAll()
      this.showModal = false
    },

    openModal () {
      if (this.editForm) {
        this.setupEditForm()
      }
      this.showModal = true
    },

    setupEditForm () {
      var product = JSON.parse(JSON.stringify(this.product))
      this.form.product = product
      this.customisationForm.product = product
      this.customisationForm.options = product.options
      this.customisationForm.quantity = product.quantity
    },

    closeAndClearModal (confirm = true) {
      this.onModalClose(this, confirm)
    }
  }
}
</script>

<style lang="css" scoped>
.tooltip_wrap {
  float: left;
}
</style>
