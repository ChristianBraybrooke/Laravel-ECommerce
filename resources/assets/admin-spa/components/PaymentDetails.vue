<template lang="html">
    <div>

      <el-table :data="[payment]" style="width: 100%">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="reference" label="Payment Reference"></el-table-column>
          <el-table-column prop="method" label="Payment Method"></el-table-column>
          <el-table-column prop="amount" label="Payment Amount"></el-table-column>
          <el-table-column prop="fee" label="Payment Fee"></el-table-column>
          <el-table-column prop="reference" label="Payment Reference"></el-table-column>
      </el-table>

    </div>
</template>

<script>
export default {

      name: 'PaymentDetails',

      components: {

      },

      props: {
          payment: {
              type: Object,
              required: true,
          }
      },

      data () {
          return {

          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('PaymentDetails.vue mounted!')
      },

      methods: {

      },

}
</script>

<style lang="css">
</style>
