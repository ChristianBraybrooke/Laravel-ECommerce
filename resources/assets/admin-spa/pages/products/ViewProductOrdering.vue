<template lang="html">
    <div>

        <product-page-layout :product-id="productId"
                             :current-page="'/products/' + productId + '/ordering'"
                             :request-with="['orderForm']">

            <template slot="product_page"
                      slot-scope="props">


                <el-row :gutter="20">
                    <el-col :md="6" :sm="12" :xs="24">
                        <el-form-item label="Order Form" prop="order_form.id" size="small" v-if="props.productForm.order_form">
                            <el-select class="collection_type_select" v-model="props.productForm.order_form.id" filterable placeholder="Select">
                                <el-option v-for="form in forms"
                                           :key="form.id"
                                           :label="form.name"
                                           :value="form.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

            </template>

        </product-page-layout>

    </div>
</template>

<script>
import api from "../../services/api-service.js";

export default {

      name: 'ViewProductOrdering',

      components: {
          ProductPageLayout: () => import('./ProductPageLayout.vue'),
      },

      props: {
          productId: {
              type: String,
              required: true,
          },
      },

      data () {
          return {
              forms: {},
              formErrors: {},
          }
      },

      computed: {
          //
      },

      watch: {
          //
      },

      mounted () {
          console.log('ViewProductOrdering.vue mounted');
          this.getForms();
      },

      methods: {

          getForms()
          {
              api.get({
                  path: 'forms'
              })
              .then(function (data) {
                  this.forms = data.data;
              }.bind(this))
              .catch(function (error) {
                  this.formErrors = error;
              }.bind(this));
          }
      },

}
</script>

<style lang="css" scoped>

</style>
