<template lang="html">

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
                                    <el-radio-button v-for="type in productCollection.types.data" :label="type" :key="type.id">{{ type.name }}</el-radio-button>
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
    </div>
</template>

<script>
export default {

      name: 'ProductAddForm',

      components: {
          Errors: () => import('./Errors.vue'),
      },

      props: {
          productCollection: {
              type: Object,
              required: true,
          },
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
              loading: false,
          }
      },

      computed: {
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
      },

      methods: {

      }
}
</script>

<style lang="css">
</style>
