<template>
  <div>
    <el-popover
      trigger="click"
      placement="top">
      <ul>
        <li
          v-for="delivery in deliveries"
          :key="delivery.id">
          <strong>Collection Date</strong>: {{ delivery.collection_date }} <br>
          <strong>Delivery Date</strong>: {{ delivery.planned_delivery_date }}
        </li>
      </ul>

      <el-button
        type="sucess"
        size="mini"
        plain
        @click="showModal = true">Add Delivery</el-button>

      <div slot="reference">
        <el-button
          size="mini"
          plain>Deliveries</el-button>
      </div>
    </el-popover>

    <el-dialog
      v-if="showModal"
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="showModal"
      title="Add Delivery">
      <el-form
        ref="form"
        :model="form"
        label-position="top">

        <el-row :gutter="20">
          <el-col :md="{span:8, offset: 4}">
            <el-form-item
              :rules="[{required: true, message: 'Collection date is required.', trigger: 'blur,change'}]"
              label="Collection Date"
              size="small"
              prop="collection_date">
              <el-date-picker
                v-model="form.collection_date"
                type="date"
                format="dd/MM/yyyy"
                value-format="dd-MM-yyyy"
                placeholder="DD/MM/YYYY" />
            </el-form-item>
          </el-col>

          <el-col :md="{span:8}">
            <el-form-item
              :rules="[{required: true, message: 'Delivery date is required.', trigger: 'blur,change'}]"
              label="Planned Delivery Date"
              size="small"
              prop="planned_delivery_date">
              <el-date-picker
                v-model="form.planned_delivery_date"
                type="date"
                format="dd/MM/yyyy"
                value-format="dd-MM-yyyy"
                placeholder="DD/MM/YYYY" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :md="{span:16, offset: 4}">
            <el-button
              :loading="loading"
              type="success"
              @click="addDelivery">Add Delivery</el-button>
          </el-col>
        </el-row>

      </el-form>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import api from 'services/api-service'

export default {
  name: 'DeliveryAddButton',

  props: {
    order: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      showModal: false,
      deliveries: [],
      errors: {},
      form: {}
    }
  },

  mounted () {
    this.deliveries = this.order.deliveries.data
  },

  methods: {
    addDelivery () {
      this.$refs['form'].validate((valid, errors) => {
        if (valid) {
          api.persist('post', {
            path: `orders/${this.order.id}/delivery`,
            object: this.form
          })
            .then(data => {
              this.deliveries.push(data.data)
              this.form = {}
              this.showModal = false
            })
            .catch(error => {
              this.errors = error
            })
        }
      })
    }
  }
}
</script>
