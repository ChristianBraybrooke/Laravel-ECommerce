<template lang="html">
    <div v-loading="loading">

        <el-breadcrumb class="breadcrumbs" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'forms' }">Forms</el-breadcrumb-item>
            <el-breadcrumb-item>{{ form.name }}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row align="middle" type="flex">
            <el-col :span="24"><h1 class="page_title">{{ form.name }}</h1></el-col>
        </el-row>

        <errors v-if="Object.keys(formErrors).length > 0" :errors="formErrors"></errors>

        <el-form :model="form"
                 label-position="left"
                 ref="formForm"
                 label-width="120px">

            <el-row type="flex">
               <el-col :span="4">
                   <el-form-item label="Order Form" prop="is_order_form" size="small">
                       <el-switch v-model="form.is_order_form"
                                  active-color="#13ce66"
                                  inactive-color="#ff4949">
                       </el-switch>
                   </el-form-item>
               </el-col>
               <el-col :span="4">
                   <el-form-item v-if="form.is_order_form" label="Effects Price" prop="effects_price" size="small">
                       <el-switch v-model="form.effects_price"
                                  active-color="#13ce66"
                                  inactive-color="#ff4949">
                       </el-switch>
                   </el-form-item>
               </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :lg="12" :md="24">
                    <el-form-item label="Form Name" size="small" prop="name" :rules="[{ required: true, message: 'Form name is required'}]">
                        <el-input :autofocus="true" v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <template v-if="form.sections">
                <el-card :class="section.minimise ? 'product_variant_card box-card' : 'product_variant_card minimised box-card'" v-for="section in orderedSections()" :key="section.id">
                    <div slot="header" class="clearfix">
                        <el-input size="mini" style="width: 200px;" :autofocus="true" v-model="section.name"></el-input>
                      <el-button style="float: right; padding: 4px 8px; margin-left: 5px;" @click="minimiseSectionCard(section)" type="primary">
                      {{ section.minimise ? 'Minimise' : 'Maximise' }}</el-button>
                      <el-button style="float: right; padding: 4px 8px" @click="deleteSection(section)" type="danger">Delete</el-button>
                      <el-input-number style="float: right; margin-top: -2px;" v-model="section.order" size="mini"></el-input-number>
                    </div>
                    <form-section-component v-if="section.minimise ? true : false" :model="section" :form="form"></form-section-component>

                </el-card>
            </template>

            <el-button type="info" size="small" icon="el-icon-plus" @click="addSection()" plain>Add Section</el-button>

            <hr class="page_hr">

            <el-row :gutter="20">
                <el-col :sm="24">
                    <el-button plain type="success" :loading="loading" @click="submitForm('formForm')">Update</el-button>
                </el-col>
            </el-row>

        </el-form>

    </div>
</template>

<script>
import api from "../../services/api-service.js";
var orderBy = require('lodash.orderby');


export default {

      name: 'ViewForm',

      components: {
          Errors: () => import('../../components/Errors.vue'),
          FormSectionComponent: () => import('../../components/FormSectionComponent.vue')
      },

      props: {
        formId: {
            type: String,
            required: true,
        },
      },

      data () {
          return {
              loading: false,
              form: {},
              formErrors: {},
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('ViewForm.vue mounted');
          this.getForm();
      },

      methods: {

          /**
           * Get the form object from the server
           *
           * @return void
           */
          getForm()
          {
              this.loading = true;
              this.pageErrors = {};

              api.get({
                    path: "forms/" + this.formId,
                    params: {
                        with: ['sections.fields'],
                        include: ['order', 'rules', 'type', 'options', 'is_order_form', 'effects_price']
                    }
                })
                .then(function (data) {
                    this.loading = false;
                    this.form = data.data;
                }.bind(this))
                .catch(function (error) {
                    this.loading = false;
                    this.formErrors = error;
                }.bind(this));
          },

          /**
           * Uddate the form and send the data to the server
           *
           * @param String formName
           * @return void
           */
          submitForm(formName)
          {
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                      this.loading = true;
                      this.formErrors = {};
                      this.form.with = ['sections.fields'];
                      this.form.include = ['order', 'rules', 'type', 'options', 'is_order_form', 'effects_price'];

                      api.persist("put", {
                            path: "forms/" + this.formId,
                            object: this.form
                        })
                        .then(function (data) {
                            this.loading = false;
                            this.form = data.data;

                            this.$message({
                              message: 'Form updated',
                              type: 'success',
                              showClose: true,
                            });

                        }.bind(this))
                        .catch(function (error) {
                            this.loading = false;
                            this.formErrors = error;
                        }.bind(this));
                  }
              });
          },

          addSection()
          {
              this.form.sections.data.push({
                name: 'New Section',
                order: 1,
                minimise: true,
                fields: {
                  data: [
                  ]
                }
              });
          },

          orderedSections()
          {
              return this.form.sections.data.length >= 1 ? orderBy(this.form.sections.data, ['order'], ['asc']) : [];
          },

          minimiseSectionCard(section)
          {
              var index = this.form.sections.data.indexOf(section);

              var value = this.form.sections.data[index].minimise ? false : true;

              this.$set(this.form.sections.data[index], 'minimise', value);
          },

          deleteSection(section)
          {
              this.form.sections.data.splice(this.form.sections.data.indexOf(section), 1);
          }
      },

}
</script>

<style lang="css">
.product_variant_card {
    margin: 30px 0px;
}
.product_variant_card.minimised .el-card__body {
    padding: 0px!important;
}
</style>
