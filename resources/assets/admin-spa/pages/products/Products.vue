<template lang="html">
    <data-table type-name="product"
                bulk-update-url="products/bulk"
                :request-includes="['live_at', 'created_at']"
                :create-form="productsCreateForm">

      <template slot="createForm"
                slot-scope="props">


                <el-form-item label="Product Name" prop="name">
                  <el-input :autofocus="true" v-model="productsCreateForm.name" auto-complete="off"></el-input>
                </el-form-item>

      </template>

    </data-table>
</template>

<script>
export default {

  components: {
      DataTable: () => import('../../components/DataTable.vue')
  },

  watch: {
    productsCreateForm: function (value) {
        this.$emit('input', this.internalValue);
    }
  },

  mounted() {
      console.log('Products.vue Mounted.');
  },

  data() {
    return {
        productsCreateForm: {

        }
    }
  },

}
</script>

<style lang="css">
</style>
