<template lang="html">
  <div v-loading="loading">
    <errors
      v-if="Object.keys(userErrors).length > 0"
      :errors="userErrors"/>

    <h1 class="welcome_text">Welcome, {{ user.name.first }}</h1>

    <el-row
      :gutter="40"
      class="welcome_row">

      <el-col :md="12">
        <el-card>
          <div
            slot="header"
            class="clearfix">
            <span>Orders</span>
            <router-link
              :to="{ path: '/orders/new' }">
              <el-button
                style="float: right;"
                size="mini"
                type="primary"
                plain>Create Order</el-button>
            </router-link>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :md="8">
        <el-card>
          <div
            slot="header"
            class="clearfix">
            <span>Products</span>
            <router-link
              :to="{ path: '/products' }">
              <el-button
                style="float: right;"
                size="mini"
                type="primary"
                plain>Create Product</el-button>
            </router-link>
          </div>
        </el-card>
      </el-col> -->
      <el-col :md="12">
        <el-card>
          <div
            slot="header"
            class="clearfix">
            <span>Estimates</span>
            <router-link
              :to="{ path: '/new-estimate' }">
              <el-button
                style="float: right;"
                size="mini"
                type="primary"
                plain>Create Estimate</el-button>
            </router-link>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24">
        <el-card>
          <div
            slot="header"
            class="clearfix"
            style="text-align: center;">
            <span>Search orders, pro-formas, and estimates</span>
          </div>
          <el-autocomplete
            v-model="globalSearch"
            :autofocus="true"
            :fetch-suggestions="getAllOrders"
            :trigger-on-focus="false"
            style="width: 100%;"
            value-key="ref"
            placeholder="Order number, customer name, company etc."
            clearable>
            <template slot-scope="{ item }">
              <router-link
                :to="{ path: viewPathFormated(item) + '/' + item.id }"
                class="search_result">
                <div class="flex-content">
                  <span><strong>{{ item.ref }}</strong> - {{ item.customer.full_name }}</span>
                  <span class="status">{{ item.status }}</span>
                </div>
                <div class="small">
                  <span>{{ item.customer.phone ? item.customer.phone : 'No Phone Number' }} / {{ item.billing_address.company ? item.billing_address.company : 'No Company' }}</span>
                </div>
              </router-link>
            </template>
          </el-autocomplete>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import api from 'services/api-service.js'

export default {

  name: 'Dashboard',

  components: {
    Errors: () => import(/* webpackChunkName: "errors" */'components/Errors')
  },

  props: {

  },

  data () {
    return {
      globalSearch: '',
      loading: ''
    }
  },

  computed: {
    ...mapGetters([
      'user',
      'userErrors'
    ])
  },

  watch: {
    search: function (value) {
      this.handleSearchChange(value)
    }
  },

  mounted () {
    console.log('Dashboard.vue mounted')
    this.getUser()
  },

  methods: {
    ...mapActions([
      'getUser'
    ]),

    /*
     * Fetch search data from the API into our results field
     */
    getAllOrders (queryString, callback) {
      api.get({
        path: 'orders',
        params: {
          search: queryString
        }
      })
        .then((data) => {
          callback(data.data)
        })
        .catch(() => {
          //
        })
    },
    viewPathFormated (item) {
      return item.type === 'Estimate' ? 'estimates' : 'orders'
    },
    statusClass (item) {
      return item.type === 'Completed' ? 'bg-success' : ''
    }
  }

}
</script>

<style lang="css" scoped>
.el-col {
  margin-bottom: 2rem;
}
.welcome_text {
    text-align: center;
}
.welcome_row {
    margin-top: 40px;
    margin-bottom: 40px;
}
.search_result {
  color: initial;
  text-decoration: none;
}
.search_result .flex-content {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.search_result span.status {
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 0.5rem;
  padding: 0 10px;
}
.search_result div.small {
  font-size: 0.7rem;
  opacity: 0.75;
  margin-bottom: 10px;
}
</style>
