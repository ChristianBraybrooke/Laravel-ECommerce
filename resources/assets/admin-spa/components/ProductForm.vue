<template lang="html">

    <div style="display: initial;">

      <el-button :loading="loading"
                 :size="mergedButton.size"
                 :plain="mergedButton.plain"
                 :class="mergedButton.class"
                 @click="showModal = true;"
                 type="primary">{{(loading ? mergedButton.loading : mergedButton.text)}}
      </el-button>

      <el-dialog :title="(editForm ? 'Edit' : 'Add') + ' Product'"
                 :close-on-click-modal="false"
                 :before-close="closeAndClearModal"
                 :visible.sync="showModal"
                 width="70%">

          <div v-loading="loading">

              <el-form label-position="top" ref="addProductForm" :model="form" @submit.native.prevent>

                 <div class="form_option_section" v-if="!editForm">

                     <el-row :gutter="20">
                         <el-col :md="12">
                             <h5>Product Type</h5>
                         </el-col>
                     </el-row>

                     <el-row :gutter="20">
                         <el-col :md="{span:16, offset: 4}">
                             <el-form-item label="Choose Category" prop="productCategory">
                                 <div>
                                     <el-radio-group v-model="productCategory" class="product_form_radio">
                                         <el-radio-button v-for="type in collectionToShow.types.data" :label="type" :key="type.id">{{ type.name }}</el-radio-button>
                                     </el-radio-group>
                                 </div>
                             </el-form-item>
                         </el-col>
                     </el-row>

                     <el-row :gutter="20" v-show="productCategory">
                         <el-col :md="{span:16, offset: 4}">
                             <el-form-item label="Choose Product" prop="productFirst">
                                 <div>
                                     <el-radio-group v-model="productFirst" class="product_form_radio">
                                         <template v-for="product in productsToShow">
                                             <el-tooltip :content="shopData.currency + (product.price ? product.price : '0.00')" placement="top" effect="light">
                                                 <el-radio-button :label="product">{{ product.name }}</el-radio-button>
                                             </el-tooltip>
                                         </template>
                                     </el-radio-group>
                                 </div>
                             </el-form-item>
                         </el-col>
                     </el-row>

                     <el-row :gutter="20" v-show="productFirst && productVariantsToShow.length >= 1">
                         <el-col :md="{span:16, offset: 4}">
                             <el-form-item :label="'Choose Variant'" prop="product">
                                 <div>
                                     <el-radio-group v-model="form.product" class="product_form_radio" v-if="productVariantsToShow.length < 10">
                                         <template v-for="variant in productVariantsToShow">
                                             <el-tooltip :content="shopData.currency + (variant.price ? variant.price : '0.00')" placement="top" effect="light">
                                                 <el-radio-button :label="variant">{{ variant.name }}</el-radio-button>
                                             </el-tooltip>
                                         </template>
                                     </el-radio-group>
                                     <el-select v-model="form.product" size="small" v-else value-key="id">
                                         <el-option v-for="variant in productVariantsToShow"
                                                    :key="variant.id"
                                                    :label="variant.name"
                                                    :value="variant">
                                         </el-option>
                                     </el-select>
                                 </div>
                             </el-form-item>
                         </el-col>
                     </el-row>

                 </div>

                 <div v-show="objectHas(form, 'product.id')">

                     <template v-for="section in orderForm">
                         <el-row :gutter="20" v-show="section.fields.data.length > 0">
                             <el-col :md="12">
                                 <h5>{{ section.name }}</h5>
                             </el-col>
                         </el-row>

                         <div v-show="section.fields.data.length > 0" class="form_option_section">
                             <el-row :gutter="20" v-for="field in section.fields.data" :key="field.id">
                                 <el-col :md="{span:16, offset: 4}">
                                     <el-form-item :label="field.name" size="small" :prop="'product.options[' + field.name + ']'">
                                         <el-input v-if="field.type === 'text'" v-model="form.product.options[field.name]"></el-input>
                                         <el-input-number v-if="field.type === 'number'" v-model="form.product.options[field.name]"></el-input-number>
                                         <el-select v-if="field.type === 'select'" v-model="form.product.options[field.name]">
                                             <el-option v-for="option in field.options"
                                                        :key="option.id"
                                                        :value="option"
                                                        :label="optionLabel(option)"></el-option>
                                         </el-select>
                                         <div v-if="field.type === 'radio'">
                                             <el-radio-group v-model="form.product.options[field.name]"  class="product_form_radio">
                                                 <el-radio-button v-for="option in field.options" :label="option" :key="option.id">{{optionLabel(option)}}</el-radio-button>
                                             </el-radio-group>
                                         </div>
                                         <p class="form_item_description">{{ field.description }}</p>
                                     </el-form-item>
                                 </el-col>
                             </el-row>
                         </div>
                    </template>

                     <el-row :gutter="20">
                         <el-col :md="12">
                             <h5>Quantity</h5>
                         </el-col>
                     </el-row>

                     <el-row :gutter="20">
                         <el-col :md="{span:16, offset: 4}">
                             <el-form-item label="Quantity" size="small" prop="product.quantity">
                                 <el-select v-model="form.product.quantity">
                                     <el-option v-for="range in quantityRange" :key="range" :value="range"></el-option>
                                 </el-select>
                             </el-form-item>
                         </el-col>
                     </el-row>

                     <el-row :gutter="20">
                         <el-col :md="12">
                             <h5>Price</h5>
                             <el-button size="mini"
                                        :type="editPrice ? 'warning'  : 'primary'"
                                        plain
                                        @click="handleEditPrice">{{ editPrice ? 'Reset Price' : 'Edit Price' }}</el-button>
                         </el-col>
                     </el-row>

                     <el-row :gutter="20">
                         <el-col :md="{span:16, offset: 4}">
                            <template v-for="(value, key) in formattedPrice(form.product)">
                                <p><strong>{{ key }}:</strong> <span v-show="key !== 'Base Price' || !editPrice && key === 'Base Price'">{{ shopData.currency }}{{ value }}</span>
                                    <div class="price_changer" v-show="editPrice && key === 'Base Price'">
                                         <span class="currency">{{ shopData.currency }}</span><el-input-number size="mini" @change="adjustPrice" :value="simplePrice(form.product.price)" controls-position="right"></el-input-number>
                                    </div>
                                </p>
                            </template>
                         </el-col>
                     </el-row>

                 </div>

              </el-form>


              <span slot="footer" class="dialog-footer">
                  <el-button @click="closeAndClearModal(null)">{{ editForm ? 'Discard Changes' : 'Cancel' }}</el-button>
                  <el-button v-if="!editForm" type="primary" @click="addProduct()">Add Product</el-button>
                  <el-button v-if="editForm" type="primary" @click="saveProduct()">Save Changes</el-button>
              </span>

          </div>

      </el-dialog>

    </div>
</template>

<script>
import api from 'services/api-service'
import clone from 'lodash.clone'
import { mapActions, mapGetters } from 'vuex'
import { operators } from 'utils/operators'

var forEach = require('lodash.foreach');
var range = require('lodash.range');

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

var formTemplate = {
  product: {
      quantity: 1,
      order_form: orderFormTemplate,
      options: {},
      product: {
          quantity: 1,
          options: {}
      },
      variants: {
        data: [],
        order_form: orderFormTemplate
      }
  }
}

export default {

      name: 'ProductForm',

      components: {
          Errors: () => import(/* webpackChunkName: "errors" */'components/Errors'),
      },

      props: {
          editForm: {
              type: Boolean,
              required: false,
              default () {
                  return false;
              }
          },
          product: {
              type: Object,
              required: false,
              default () {
                  return {};
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
                  return {};
              }
          },
      },

      data () {
          return {
              loading: true,
              showModal: false,
              errors: {},
              form: formTemplate,
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
                  size: 'small',
                  plain: false,
                  class: ''
              },
              mergedButton: {},
              editPrice: false,
              clonedPrice: '0.00'
          }
      },

      computed: {

        ...mapGetters([
          'shopData',
        ]),

        quantityRange()
        {
            return range(1, 250);
        },

        productsToShow()
        {
            if (this.productCategory) {
              return this.productCategory.products.data;
            }
            return [];
        },

        productVariantsToShow()
        {
            if (this.productFirst) {
                return this.productFirst.variants.data;
            }
            return [];
        },

        orderForm()
        {
            return this.objectHas(this.form, 'product.order_form.sections.data') ? this.form.product.order_form.sections.data : [];
        }

      },

      watch: {

        'form.product': function (val) {
            if (!this.objectHas(this.form, 'product.options')) {
                this.$set(this.form.product, 'options', {});
            }
            this.clonedPrice = clone(this.form.product.price)
        },

        productCategory: function() {
            this.productFirst = '';
        },

        productFirst: function(value) {
            if (this.objectHas(value, 'variants.data')) {
                if(value.variants.data.length >= 1) {
                    this.form.product = {
                        quantity: 1,
                        options: {}
                    };
                } else {
                  this.form.product.quantity = 1;
                  this.form.product = value;
                  this.clonedPrice = clone(this.form.product.price)
                }
            } else {
                this.form.product = {
                    quantity: 1,
                    options: {}
                };
            }
        },
      },

      mounted () {
          console.log('ProductForm.vue Mounted');
          this.clearAll();

          Object.assign(this.mergedButton,this.defaultButton,this.button);

          if (!this.editForm) {
              this.getProductCollection();
          } else {
              this.loading = false;
              this.form.product = this.product;
          }
      },

      methods: {

          getProductCollection()
          {
              if (this.shopData.collection_mappings_values) {
                  var product_category_id = this.shopData.collection_mappings_values['Product Categories Collection'];
                  this.loading = true;
                  api.get({
                        path: "collections/" + product_category_id,
                        params: {
                            include: ['type', 'options', 'price', 'effects_price', 'no_shop_data', 'description'],
                            with: ['types.products.variants.orderForm.sections.fields', 'types.products.variants.variant', 'types.products.orderForm.sections.fields']
                        }
                    })
                    .then(function (data) {
                        this.collectionToShow = data.data;
                        this.loading = false;
                    }.bind(this))
                    .catch(function (error) {
                        this.loading = false;
                        this.errors = error;
                    }.bind(this));
              }
          },

          adjustPrice(val)
          {
              this.form.product.price = val;
          },

          handleEditPrice()
          {
              if (this.editPrice) {
                  this.form.product.price = clone(this.clonedPrice);
              }
              this.editPrice = !this.editPrice;
          },

          closeAndClearModal()
          {
              this.$confirm('Are you sure to close the product selector?')
                .then(_ => {
                    this.clearAll();
                    this.showModal = false;
                })
                .catch(_ => {});
          },


          optionLabel(option)
          {
              if (option) {
                  if (option.price_mutator && option.price_value) {
                    return option.name + ' (' + option.price_mutator + ' £' + option.price_value + ')'
                  }
                  return option.name;
              }
              return '';
          },

          formattedPrice(product)
          {
              var base_price = this.simplePrice(product.price);
              var base_with_extras = base_price;
              var extras = 0;
              if (product.options) {
                  forEach(product.options, (option) => {
                      if (option) {
                          if (option.price_mutator && option.price_value) {
                              base_with_extras = operators[option.price_mutator](base_with_extras, option.price_value);
                              extras = operators[option.price_mutator](extras, option.price_value);
                          }
                      }
                  });
              }

              var quantity = product.quantity ? product.quantity : 1;
              var total = base_with_extras * quantity;
              extras = extras * quantity;
              return {
                  'Base Price': this.formatPrice(base_price),
                  'Sub-Total': this.formatPrice(base_price * quantity),
                  'Extras':  this.formatPrice(extras),
                  'Total': this.formatPrice(total)
              };
          },

          clearAll()
          {
              // if (this.objectHas(this.form, 'product.options')) {
              //     this.form.product.options = {};
              // }
              this.errors = {};
              this.form = formTemplate;

              this.productCategory = null;
              this.productFirst = null;
          },

          addProduct()
          {
              if(this.objectHas(this.form, 'product.id') && this.objectHas(this.form, 'product.quantity')) {
                  this.showModal = false;
                  this.onProductAdd(this.form.product);
                  this.clearAll();
              }
          },

          saveProduct()
          {
              this.showModal = false;
          },

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
