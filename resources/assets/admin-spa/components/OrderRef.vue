<template lang="html">
  <div>
    <el-row :gutter="20">
      <el-col :md="{span:3, offset: 4}">
        <el-form-item
          label="Ref"
          size="small"
          prop="ref">
          <el-input
            :autofocus="true"
            v-model="form.ref"
            auto-complete="off"/>
        </el-form-item>
        <small v-if="lastOrder.ref">Last order ref: {{ lastOrder.ref }}</small>
        <small v-else>Last order ref not known</small>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from 'services/api-service.js'

export default {
  name: 'OrderRef',

  components: {

  },

  props: {
    form: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      lastOrder: {}
    }
  },

  computed: {

  },

  watch: {

  },

  mounted () {
    if (!this.form.ref) {
      this.fetchLastRef()
    }
  },

  methods: {
    fetchLastRef () {
      api.get({
        path: 'orders',
        params: {
          limit: 1
        }
      })
        .then((data) => {
          this.lastOrder = data.data[0]
          var ref = parseInt(this.lastOrder.ref) + 1
          if (ref && !isNaN(ref)) {
            this.$set(this.form, 'ref', ref)
          }
        })
    }
  }
}
</script>

<style lang="css">
</style>
