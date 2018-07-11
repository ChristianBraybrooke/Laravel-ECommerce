<template lang="html">
    <div class="">
        <el-row :gutter="20">
            <el-col :lg="12" :md="24">
                <el-form-item label="Name" prop="name">
                    <el-input :autofocus="true" v-model="productCustomisation.name"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :lg="24" :md="24" v-if="productCustomisation.options">
                <template v-for="option in productCustomisation.options.data">
                    <product-customisation-option-component :model="option" v-on:optionDeleted="handleOptionDeleted">
                    </product-customisation-option-component>
                </template>

                <el-button type="primary" icon="el-icon-plus" @click="addOption" plain>Add Option</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {

      name: 'ProductCustomisationComponent',

      components: {
          ProductCustomisationOptionComponent: () => import(/* webpackChunkName: "product-customisation-option-component" */'components/ProductCustomisationOptionComponent'),
      },

      props: {
          model: {
              type: Object,
              required: true,
          },
      },

      data () {
          return {
              productCustomisation: {}
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('ProductCustomisationComponent.vue mounted');
          this.productCustomisation = this.model;
      },

      methods: {
          addOption()
          {
              this.productCustomisation.options.data.push({
                  name: '',
                  selector_img: {},
                  main_img: {},
              });
          },

          handleOptionDeleted(option)
          {
            if (option.id) {

            } else {
                this.productCustomisation.options.data.splice(this.productCustomisation.options.data.indexOf(option), 1);
            }
          }
      },

}
</script>

<style lang="css">
</style>
