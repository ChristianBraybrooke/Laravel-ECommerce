<template>
  <div :class="{'deliveries_col': true, 'danger': deliveries.length == 0, 'success': deliveries.length > 0}">
    <el-popover
      trigger="click"
      placement="top">
      <el-card
        v-for="(delivery, key) in deliveries"
        :key="delivery.id"
        class="box-card"
        style="margin-bottom: 5px; margin-top: 5px;">
        <p><strong>Courier</strong>: {{ delivery.courrier_company }} - {{ delivery.courrier_name }}</p>
        <p><strong>Courier Cost</strong>: {{ formatPrice(delivery.cost, '£') }} - {{ delivery.courrier_invoice_received_at }}</p>
        <p><strong>Collection Date</strong>: {{ delivery.collection_date }}</p>
        <p><strong>Delivery Date</strong>: {{ delivery.planned_delivery_date }}</p>

        <div>
          <el-button
            size="mini"
            @click="showEditForm(delivery, key)">Edit Delivery
          </el-button>
        </div>
      </el-card>

      <el-button
        type="sucess"
        size="mini"
        plain
        @click="showModal = true">Add Delivery
      </el-button>

      <div slot="reference">
        <el-button
          :type="deliveries.length > 0 ? 'success' : 'danger'"
          class="add_button"
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
          <el-col :md="{span:8, offset: 4}">
            <el-form-item
              :rules="[{required: true, message: 'Courrier company is required.', trigger: 'blur,change'}]"
              label="Courrier Company"
              size="small"
              prop="courrier_company">
              <el-autocomplete
                v-model="form.courrier_company"
                :fetch-suggestions="getCourriers"
                value-key="company"
                style="width: 100%;"
                @select="handleCourrierSelect">
                <template slot-scope="{ item }">
                  <span>{{ item.company }} - {{ item.name.full }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :md="{span:8}">
            <el-form-item
              label="Courrier Name"
              size="small"
              prop="courrier_name">
              <el-input v-model="form.courrier_name" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :md="{span:8, offset: 4}">
            <el-form-item
              label="Courrier Phone"
              size="small"
              prop="courrier_phone">
              <el-input v-model="form.courrier_phone" />
            </el-form-item>
          </el-col>
          <el-col :md="{span:8}">
            <el-form-item
              label="Courrier Email"
              size="small"
              prop="courrier_email">
              <el-input v-model="form.courrier_email" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :md="{span:8, offset: 4}">
            <el-form-item
              label="Courrier Cost"
              size="small"
              prop="cost">
              <div class="price_changer">
                <span class="currency --small">£</span><el-input-number
                  v-model="form.cost"
                  :autofocus="true"
                  :controls="false"
                  :min="1"
                  :precision="2"
                  size="small"
                  controls-position="right"/>
              </div>
            </el-form-item>
          </el-col>
          <el-col :md="{span:8}">
            <el-form-item
              label="Courier Invoice Received"
              size="small"
              prop="courrier_invoice_received_at">
              <el-date-picker
                v-model="form.courrier_invoice_received_at"
                type="date"
                format="dd/MM/yyyy"
                value-format="dd-MM-yyyy"
                placeholder="DD/MM/YYYY" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :md="{span:8, offset: 4}">
            <el-form-item
              label="Courrier Notes"
              size="small"
              prop="courrier_notes">
              <el-input
                :rows="2"
                v-model="form.courrier_notes"
                type="textarea" />
            </el-form-item>
          </el-col>
          <el-col :md="{span:8}">
            <el-form-item
              label="Customer Notes"
              size="small"
              prop="notes">
              <el-input
                :rows="2"
                v-model="form.notes"
                type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :md="{span:16, offset: 4}">
            <el-button
              v-if="isEdit"
              type="success"
              @click="EditDelivery">Save Delivery
            </el-button>
            <el-button
              v-else
              type="success"
              @click="addDelivery">Add Delivery
            </el-button>
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
      form: {},
      isEdit: false,
      editKey: null
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
    },

    getCourriers (queryString, callback) {
      api.get({
        path: 'users',
        params: {
          search: queryString,
          withRole: 'courrier'
        }
      })
        .then((data) => {
          callback(data.data)
        })
        .catch(() => {
          //
        })
    },

    showEditForm (delivery, key) {
      this.editKey = key
      this.showModal = true
      this.isEdit = true
      this.form = {
        ...this.form,
        ...delivery
      }
    },

    EditDelivery () {
      this.$refs['form'].validate((valid, errors) => {
        if (valid) {
          api.persist('put', {
            path: `deliveries/${this.form.id}`,
            object: this.form
          })
            .then(data => {
              this.$set(this.deliveries, this.editKey, data.data)
              this.editKey = null
              this.showModal = false
              this.isEdit = false
              this.form = {}
              this.$message({
                message: 'Delivery updated successfully!',
                type: 'success'
              })
            })
            .catch(error => {
              this.errors = error
              this.$message.error('There was a problem updating the delivery.')
            })
        }
      })
    },

    handleCourrierSelect (courrier) {
      this.$set(this.form, 'courrier_email', courrier.email)
      this.$set(this.form, 'courrier_name', courrier.name.full)
      this.$set(this.form, 'courrier_phone', courrier.phone)
    }
  }
}
</script>

<style lang="css">
.deliveries_col {
  height: 100%;
  position: absolute;
  top: 0px;
  width: 100%;
  left: 0px;
  padding: 12px 0px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.deliveries_col.danger {
  background: red!important;
}
.deliveries_col.success {
  background: rgb(169, 209, 0)!important;
}
</style>
