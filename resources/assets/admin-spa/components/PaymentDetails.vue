<template lang="html">
    <div>

      <el-table :data="payments" style="width: 100%">
          <el-table-column prop="created_at" label="Payment Date">
              <template slot-scope="props">
                  <strong>{{ props.row.created_at.date }}</strong>
              </template>
          </el-table-column>
          <el-table-column prop="reference" label="Payment Reference"></el-table-column>
          <el-table-column prop="method" label="Payment Method"></el-table-column>
          <el-table-column prop="amount" label="Payment Amount" :formatter="(row) => { return formatPrice(row.amount, currencyCodeToSymbol(row.currency)) }"></el-table-column>
          <el-table-column prop="fee" label="Payment Fee"></el-table-column>
          <el-table-column prop="notes" label="Payment Notes"></el-table-column>
          <el-table-column prop="actions" label="Actions" v-if="editable">
              <template slot-scope="props">
                  <a v-if="props.row.link" :href="props.row.link" target="_blank">
                      <el-button @click="markPaymentRefunded(props.row)" class="action_btn left" type="primary" size="mini" plain>View Details</el-button>
                  </a>
                  <el-button @click="markPaymentRefunded(props.row)" class="action_btn" type="danger" size="mini" plain>Mark Refunded</el-button>
              </template>
          </el-table-column>
      </el-table>
      <el-table :data="[{}]" style="width: 100%">
          <el-table-column prop="reference" label=""></el-table-column>
          <el-table-column prop="reference" label=""></el-table-column>
          <el-table-column prop="reference" label="">
            <template slot-scope="props">
                <strong>Total Paid</strong>
            </template>
          </el-table-column>
          <el-table-column prop="reference" label="">
            <template slot-scope="props">
                <strong>{{ formatPrice(totalPaid, '£') }}</strong>
            </template>
          </el-table-column>
          <el-table-column prop="reference" label=""></el-table-column>
          <el-table-column prop="reference" label=""></el-table-column>
          <el-table-column prop="reference" label="" v-if="editable"></el-table-column>

      </el-table>

    </div>
</template>

<script>
export default {

      name: 'PaymentDetails',

      components: {

      },

      props: {
          payments: {
              type: Array,
              required: true,
          },
          editable: {
              type: Boolean,
              required: false,
              default () {
                  return true
              }
          }
      },

      data () {
          return {

          }
      },

      computed: {
          totalPaid()
          {
              var total = 0;
              this.payments.forEach((payment) => {
                  if (payment.refunded !== true) {
                      total = total + this.simplePrice(payment.amount)
                  }
              });
              return total;
          }
      },

      watch: {

      },

      mounted () {
          console.log('PaymentDetails.vue mounted!')
      },

      methods: {
          markPaymentRefunded(payment)
          {
              //
          }
      },

}
</script>

<style lang="css" scoped>
</style>
