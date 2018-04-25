<template lang="html">

    <div>

      <el-button :loading="loading"
                 size="small"
                 @click="showModal = true"
                 type="primary">{{ loading ? 'Loading Products' : 'Add Product(s)' }}
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
                             <el-form-item label="Choose Category" size="small" prop="productCategory">
                                 <div>
                                     <el-radio-group v-model="form.productCategory" size="small">
                                         <el-radio-button v-for="type in collectionToShow.types.data" :label="type" :key="type.id">{{ type.name }}</el-radio-button>
                                     </el-radio-group>
                                 </div>
                             </el-form-item>
                         </el-col>
                     </el-row>

                     <el-row :gutter="20">
                         <el-col :md="{span:16, offset: 4}">
                             <el-form-item label="Choose Product" size="small" prop="productFirst">
                                 <div>
                                     <el-radio-group v-model="form.productFirst" size="small">
                                         <el-radio-button v-for="product in productsToShow" :label="product" :key="product.id">{{ product.name }}</el-radio-button>
                                     </el-radio-group>
                                 </div>
                             </el-form-item>
                         </el-col>
                     </el-row>

                     <!-- <el-row :gutter="20">
                         <el-col :md="{span:16, offset: 4}">
                             <el-form-item :label="'Choose ' + form.productHighLevel.name + ' Variant'" size="small" prop="product">
                                 <div>
                                     <el-radio-group v-model="form.productVariant" size="small">
                                         <el-radio-button v-for="variant in productVariantsToShow" :label="variant" :key="variant.id">{{ variant.name }}</el-radio-button>
                                     </el-radio-group>
                                 </div>
                             </el-form-item>
                         </el-col>
                     </el-row> -->

                 </div>

                 <!-- <template v-if="objectHas(addProductForm, 'product.order_form.sections') && productSelected">
                     <template v-if="addProductForm.product.order_form.sections" v-for="section in addProductForm.product.order_form.sections.data">
                         <template v-if="objectHas(section, 'fields.data')">
                             <el-row :gutter="20" v-if="section.fields.data.length > 0">
                                 <el-col :md="12">
                                     <h5>{{ section.name }}</h5>
                                 </el-col>
                             </el-row>

                             <div v-if="section.fields.data.length > 0" class="form_option_section">
                                 <el-row :gutter="20" v-for="field in section.fields.data" :key="field.id">
                                     <el-col :md="{span:16, offset: 4}">
                                         <el-form-item :label="field.name" size="small" :prop="'product.options[' + field.name + ']'">
                                             <el-input v-if="field.type === 'text'" v-model="addProductForm.product.options[field.name]"></el-input>
                                             <el-input-number v-if="field.type === 'number'" v-model="addProductForm.product.options[field.name]"></el-input-number>
                                             <el-select v-if="field.type === 'select'" v-model="addProductForm.product.options[field.name]">
                                                 <el-option v-for="option in field.options"
                                                            :key="option.id"
                                                            :value="option"
                                                            :label="optionLabel(option)"></el-option>
                                             </el-select>
                                             <div v-if="field.type === 'radio'">
                                                 <el-radio-group v-model="addProductForm.product.options[field.name]" size="small">
                                                     <el-radio-button v-for="option in field.options" :label="option" :key="option.id">{{optionLabel(option)}}</el-radio-button>
                                                 </el-radio-group>
                                             </div>

                                         </el-form-item>
                                     </el-col>
                                 </el-row>
                             </div>

                         </template>
                     </template>
                 </template>

                 <div v-if="objectHas(addProductForm, 'product.id') && productSelected">
                     <el-row :gutter="20">
                         <el-col :md="12">
                             <h5>Quantity</h5>
                         </el-col>
                     </el-row>

                     <el-row :gutter="20">
                         <el-col :md="{span:16, offset: 4}">
                             <el-form-item label="Quantity" size="small" prop="product.quantity">
                                 <el-select v-model="addProductForm.product.quantity">
                                     <el-option v-for="range in quantityRange" :key="range" :value="range"></el-option>
                                 </el-select>
                             </el-form-item>
                         </el-col>
                     </el-row>
                 </div>

                 <div v-if="objectHas(addProductForm, 'product.id') && productSelected">
                     <el-row :gutter="20">
                         <el-col :md="12">
                             <h5>Price</h5>
                         </el-col>
                     </el-row>

                     <el-row :gutter="20">
                         <el-col :md="{span:16, offset: 4}">
                             <p v-for="(value, key) in formattedPrice(addProductForm.product)"><strong>{{ key }}:</strong> {{ shopData.currency }}{{ value }}</p>
                         </el-col>
                     </el-row>
                 </div> -->

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
import api from '../services/api-service.js';
import { mapActions, mapGetters } from 'vuex';

export default {

      name: 'ProductAddForm',

      components: {
          Errors: () => import('./Errors.vue'),
      },

      props: {
          form: {
              type: Object,
              required: false,
              default () {
                return {

                }
              }
          },
          editForm: {
              type: Boolean,
              required: false,
              default () {
                return false;
              }
          },
      },

      data () {
          return {
              loading: true,
              showModal: false,
              errors: {},
              collectionToShow: {
                  types: {
                      data: []
                  }
              }
          }
      },

      computed: {

        ...mapGetters([
          'shopData',
        ]),

        productsToShow()
        {
            if (this.form.productCategory) {
              return this.form.productCategory.products.data;
            }
            return [];
        },

        productVariantsToShow()
        {
            if (this.form.productFirst) {
                return this.form.productFirst.variants.data;
            }
            return [];
        },

      },

      watch: {

      },

      mounted () {
          console.log('ProductAddForm.vue Mounted');

          this.getProductCollection();
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
                            include: ['type', 'options', 'price', 'effects_price', 'no_shop_data'],
                            with: ['types.products.variants.orderForm.sections.fields']
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

          closeAndClearModal()
          {
              this.$confirm('Are you sure to close the product selector?')
                .then(_ => {
                    this.errors = {};
                    this.form = {};
                    this.showModal = false;
                })
                .catch(_ => {});
          },

          addProduct()
          {

          },

          saveProduct()
          {

          },

      }
}
</script>

<style lang="css">
</style>
