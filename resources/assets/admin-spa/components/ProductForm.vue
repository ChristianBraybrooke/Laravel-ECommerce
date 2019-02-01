<template lang="html">

  <div style="display: initial;">

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
      :title="(editForm ? 'Edit' : 'Add') + ' Product'"
      :close-on-click-modal="false"
      :before-close="closeAndClearModal"
      :visible.sync="showModal"
      width="70%">

      <div v-loading="loading">

        <el-form
          ref="addProductForm"
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
                  prop="productCategory">
                  <div>
                    <el-radio-group
                      v-model="productCategory"
                      class="product_form_radio">
                      <el-radio-button
                        v-for="type in collectionToShow.types.data"
                        :label="type"
                        :key="type.id">{{ type.name }}</el-radio-button>
                    </el-radio-group>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row
              v-show="productCategory"
              :gutter="20">
              <el-col :md="{span:16, offset: 4}">
                <el-form-item
                  label="Choose Product"
                  prop="productFirst">
                  <div>
                    <el-radio-group
                      v-model="productFirst"
                      class="product_form_radio">
                      <el-tooltip
                        v-for="product in productsToShow"
                        :key="product.id"
                        :content="shopData.currency + (product.price ? product.price : '0.00')"
                        placement="top"
                        effect="light">
                        <el-radio-button :label="product">{{ product.name }}</el-radio-button>
                      </el-tooltip>
                    </el-radio-group>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row
              v-show="productFirst && productVariantsToShow.length >= 1"
              :gutter="20">
              <el-col :md="{span:16, offset: 4}">
                <el-form-item
                  :label="'Choose Variant'"
                  prop="product">
                  <div>
                    <el-radio-group
                      v-if="productVariantsToShow.length < 10"
                      v-model="form.product"
                      class="product_form_radio">
                      <el-tooltip
                        v-for="variant in productVariantsToShow"
                        :key="variant.id"
                        :content="shopData.currency + (variant.price ? variant.price : '0.00')"
                        placement="top"
                        effect="light">
                        <el-radio-button :label="variant">{{ variant.name }}</el-radio-button>
                      </el-tooltip>
                    </el-radio-group>
                    <el-select
                      v-else
                      v-model="form.product"
                      size="small"
                      filterable
                      value-key="id">
                      <el-option
                        v-for="variant in productVariantsToShow"
                        :key="variant.id"
                        :label="variant.name"
                        :value="variant"/>
                    </el-select>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>

          </div>

          <div v-show="objectHas(form, 'product.id')">

            <p v-if="objectHas(form, 'product.order_form.id')">Using: <router-link :to="{ name: 'forms.view', params: {formId: form.product.order_form.id} }">{{ form.product.order_form.name }}</router-link></p>

            <div
              v-for="(section, key) in orderForm"
              :key="key">
              <el-row
                v-show="section.fields.data.length > 0"
                :gutter="20">
                <el-col :md="12">
                  <h5>{{ section.name }}</h5>
                </el-col>
              </el-row>

              <div
                v-show="section.fields.data.length > 0"
                class="form_option_section">
                <el-row
                  :gutter="20">
                  <div
                    v-for="(field, key) in orderedFields(section.fields.data)"
                    :key="field.id">
                    <el-col
                      v-if="calculateDynamicVisible(field.rules)"
                      :md="calculateFieldCol(key, field)">
                      <el-form-item
                        :label="field.name"
                        :prop="'product.options[' + field.name + ']'"
                        size="small">

                        <template v-if="field.type === 'text' || field.type === 'textarea'">
                          <el-input
                            v-if="typeof form.product.options[field.name] === 'object'"
                            v-model="form.product.options[field.name].value"
                            :type="field.type === 'textarea' ? 'textarea' : null"/>
                          <el-input
                            v-else
                            v-model="form.product.options[field.name]"
                            :type="field.type === 'textarea' ? 'textarea' : null"/>
                        </template>

                        <template v-if="field.type === 'number'">
                          <el-input-number
                            v-if="typeof form.product.options[field.name] === 'object'"
                            v-model="form.product.options[field.name].value"
                            controls-position="right"/>
                          <el-input-number
                            v-else
                            v-model="form.product.options[field.name]"
                            controls-position="right"/>
                        </template>

                        <el-select
                          v-if="field.type === 'select'"
                          v-model="form.product.options[field.name]"
                          filterable>
                          <el-option
                            v-for="option in field.options"
                            :key="option.id"
                            :value="option"
                            :label="optionLabel(option)"/>
                        </el-select>
                        <div v-if="field.type === 'radio'">
                          <el-radio-group
                            v-model="form.product.options[field.name]"
                            class="product_form_radio">
                            <el-radio-button
                              v-for="option in field.options"
                              :label="option"
                              :key="option.id">{{ optionLabel(option) }}</el-radio-button>
                          </el-radio-group>
                        </div>
                        <p class="form_item_description">{{ field.description }}</p>
                      </el-form-item>
                    </el-col>
                  </div>
                </el-row>
              </div>
            </div>

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
                  prop="product.quantity">
                  <el-select v-model="form.product.quantity">
                    <el-option
                      v-for="range in quantityRange"
                      :key="range"
                      :value="range"/>
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
                v-for="(value, key) in formattedPrice(form.product)"
                :key="key"
                :md="{span:16, offset: 4}">
                <p><strong>{{ key }}:</strong> <span v-show="key !== 'Base Price' || !editPrice && key === 'Base Price'">{{ shopData.currency }}{{ value }}</span></p>
                <div
                  v-show="editPrice && key === 'Base Price'"
                  class="price_changer">
                  <span class="currency">{{ shopData.currency }}</span><el-input-number
                    :value="simplePrice(form.product.price)"
                    size="mini"
                    controls-position="right"
                    @change="adjustPrice"/>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-form>

        <span
          slot="footer"
          class="dialog-footer">
          <el-button
            v-if="!editForm"
            @click="closeAndClearModal(null)">{{ editForm ? 'Discard Changes' : 'Cancel' }}</el-button>
          <el-button
            v-if="!editForm"
            :disabled="!form.product.id"
            type="primary"
            plain
            @click="addProduct(true)">Add Another</el-button>
          <el-button
            v-if="!editForm"
            :disabled="!form.product.id"
            type="primary"
            @click="addProduct()">Finish</el-button>
          <el-button
            v-if="editForm"
            type="primary"
            @click="saveProduct()">Save Changes</el-button>
        </span>

      </div>

    </el-dialog>

  </div>
</template>

<script>
import api from 'services/api-service'
import clone from 'lodash.clone'
import orderBy from 'lodash.orderby'
import { mapGetters } from 'vuex'
import { operators } from 'utils/operators'

var forEach = require('lodash.foreach')
var range = require('lodash.range')

var orderFormTemplate = {
  sections: {
    data: [
      {
        fields: {
          data: []
        }
      }
    ]
  }
}

var productTemplate = {
  quantity: 1,
  order_form: orderFormTemplate,
  options: {},
  product: {
    quantity: 5,
    options: {}
  },
  variants: {
    data: [],
    order_form: orderFormTemplate
  }
}

export default {

  name: 'ProductForm',

  components: {
    Errors: () => import(/* webpackChunkName: "errors" */'components/Errors')
  },

  props: {
    editForm: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    product: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    onProductAdd: {
      type: Function,
      required: false,
      default () {
        return function (product) {}
      }
    },
    button: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      loading: true,
      showModal: false,
      errors: {},
      tempProduct: {},
      form: {
        product: productTemplate
      },
      productCategory: '',
      productFirst: '',
      collectionToShow: {
        types: {
          data: []
        }
      },
      defaultButton: {
        text: 'Add Product',
        loading: 'Loading Products',
        type: 'success',
        size: 'large',
        plain: false,
        class: ''
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

    productsToShow () {
      if (this.productCategory) {
        return this.productCategory.products.data
      }
      return []
    },

    productVariantsToShow () {
      if (this.productFirst) {
        return this.productFirst.variants.data
      }
      return []
    },

    orderForm () {
      return this.objectHas(this.form, 'product.order_form.sections.data') ? orderBy(this.form.product.order_form.sections.data, ['order'], ['asc']) : []
    },

    mergedButton () {
      return {
        ...this.defaultButton,
        ...this.button
      }
    }

  },

  watch: {

    'form.product': function (val) {
      if (!this.objectHas(this.form, 'product.options')) {
        this.$set(this.form.product, 'options', {})
      }
      if (!this.objectHas(this.form, 'product.quantity')) {
        this.$set(this.form.product, 'quantity', 1)
      }
      this.clonedPrice = clone(this.form.product.price)
    },

    productCategory: function () {
      this.productFirst = ''
    },

    productFirst: function (value) {
      if (this.objectHas(value, 'variants.data')) {
        if (value.variants.data.length >= 1) {
          this.form.product.quantity = 1
          this.form.product.options = {}
        } else {
          this.form.product = value
          this.form.product.quantity = 1
          this.clonedPrice = clone(this.form.product.price)
        }
      } else {
        this.form.product = {
          quantity: 1,
          options: {}
        }
      }
    }
  },

  mounted () {
    this.clearAll()

    Object.assign(this.mergedButton, this.defaultButton, this.button)

    if (!this.editForm) {
      this.getProductCollection()
    } else {
      this.loading = false
      this.form.product = this.product
    }
  },

  methods: {

    getProductCollection () {
      if (this.shopData.collection_mappings_values) {
        var productCatId = this.shopData.collection_mappings_values['Product Categories Collection']
        this.loading = true
        api.get({
          path: 'collections/' + productCatId,
          params: {
            include: ['type', 'options', 'price', 'effects_price', 'no_shop_data', 'description', 'order', 'rules'],
            with: ['types.products.variants.orderForm.sections.fields', 'types.products.variants.variant', 'types.products.orderForm.sections.fields']
          }
        })
          .then(function (data) {
            this.collectionToShow = data.data
            this.loading = false
          }.bind(this))
          .catch(function (error) {
            this.loading = false
            this.errors = error
          }.bind(this))
      }
    },

    adjustPrice (val) {
      this.form.product.price = val
    },

    handleEditPrice () {
      if (this.editPrice) {
        this.form.product.price = clone(this.clonedPrice)
      }
      this.editPrice = !this.editPrice
    },

    openModal () {
      if (this.editForm) {
        this.form.product = this.product
      }
      this.showModal = true
    },

    closeAndClearModal () {
      this.$confirm('Are you sure to close the product selector?')
        .then(_ => {
          this.clearAll()
          this.showModal = false
        })
        .catch(_ => {})
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

    formattedPrice (product) {
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

      var quantity = product.quantity ? product.quantity : 1
      var total = baseWithExtras * quantity
      extras = extras * quantity
      return {
        'Base Price': this.formatPrice(basePrice),
        'Sub-Total': this.formatPrice(basePrice * quantity),
        'Extras': this.formatPrice(extras),
        'Total': this.formatPrice(total)
      }
    },

    clearAll () {
      this.errors = {}
      this.form = {
        product: {}
      }
      this.form.product = productTemplate

      this.productCategory = null
      this.productFirst = null
    },

    addProduct (addAnother = false) {
      if (this.objectHas(this.form, 'product.id') && this.objectHas(this.form, 'product.quantity')) {
        this.onProductAdd(this.form.product)
        if (!addAnother) {
          this.showModal = false
          this.clearAll()
        } else {
          this.$confirm('Would you like to clear the form?', '', {
            distinguishCancelAndClose: true,
            confirmButtonText: 'Clear',
            cancelButtonText: "Don't Clear"
          })
            .then(_ => {
              this.clearAll()
              this.$message({
                message: 'Product Added and Form Cleared!',
                type: 'success'
              })
            })
            .catch((action) => {
              if (action === 'cancel') {
                this.$message({
                  message: 'Product Added and Form Saved!',
                  type: 'success'
                })
              }
            })
        }
      } else {
        this.$message({
          message: 'Please choose a product and quantity!',
          type: 'error'
        })
      }
    },

    saveProduct () {
      this.clearAll()
      this.showModal = false
    },

    calculateDynamicVisible (rules) {
      if (rules.dynamic) {
        var optionKey = null
        this.orderForm.forEach((section) => {
          section.fields.data.forEach((field) => {
            if (field.id === rules.show_if_att) {
              optionKey = field.name
            }
          })
        })
        if (this.form.product.options[optionKey]) {
          if (this.form.product.options[optionKey].value) {
            return this.form.product.options[optionKey].value === rules.show_if_value
          }
          return this.form.product.options[optionKey] === rules.show_if_value
        }
        return false
      }
      return true
    },

    orderedFields (fields) {
      return fields.length >= 1 ? orderBy(fields, ['order'], ['asc']) : []
    },

    calculateFieldCol (key, field) {
      if (field.type === 'number' || field.type === 'select') {
        return {
          span: 4,
          offset: (key === 0 || key === 4) ? 4 : 0
        }
      }
      return {
        span: 16,
        offset: 4
      }
    }

  }
}
</script>

<style lang="css">
.product_form_radio .el-radio-button {
    margin: 5px 3px;
    border-left: 1px solid #dcdfe6;
}
.product_form_radio .el-radio-button:first-child {
    margin: 5px 3px 5px 0px;
    border-left: 0;
}
.product_form_radio .el-radio-button:last-child {
    margin: 5px 0px 5px 3px;
}
p.form_item_description {
    font-size: 12px;
    font-style: italic;
    margin-top: 0;
}
</style>
