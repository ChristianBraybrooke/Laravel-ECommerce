<template lang="html">
    <div v-loading="loading">

        <el-breadcrumb class="breadcrumbs" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'forms' }">Forms</el-breadcrumb-item>
            <el-breadcrumb-item>{{ form.name }}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row align="middle" type="flex">
            <el-col :span="12"><h1 class="page_title">{{ form.name }}</h1></el-col>
        </el-row>

    </div>
</template>

<script>
import api from "../../services/api-service.js";

export default {

      name: 'ViewForm',

      components: {
          Errors: () => import('../../components/Errors.vue'),
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
                        with: ['sections.fields']
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
      },

}
</script>

<style lang="css">
</style>
