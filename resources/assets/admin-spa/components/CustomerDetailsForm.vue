<template lang="html">
  <div class="">
    <el-row :gutter="20">
      <el-col :md="{span:8}">
        <el-form-item
          label="Name"
          size="mini"
          prop="full_name">
          <el-input
            v-model="form.full_name"
            auto-complete="off"/>
        </el-form-item>
      </el-col>

      <el-col :md="{span:8}">
        <el-form-item
          label="Email"
          size="mini"
          prop="email">
          <el-input
            v-model="form.email"
            auto-complete="off"/>
        </el-form-item>
      </el-col>

      <el-col :md="{span:8}">
        <el-form-item
          label="Phone"
          size="mini"
          prop="phone">
          <el-input
            v-model="form.phone"
            auto-complete="off"/>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'CustomerDetailsForm',

  components: {

  },

  props: {
    form: {
      type: Object,
      required: false,
      default: () => { return {} }
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

  },

  methods: {

  }
}
</script>

<style lang="css">
</style>
