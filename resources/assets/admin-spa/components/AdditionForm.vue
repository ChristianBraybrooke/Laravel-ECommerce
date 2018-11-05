<template lang="html">

  <div :loading="loading">

    <el-popover
      trigger="click"
      placement="top">
      <ul>
        <li
          v-for="(addition, key) in additions"
          :key="key">
          <strong>Amount</strong>: {{ amountPrefix }}{{ formatAmount ? formatPrice(addition.Amount) : addition.Amount }} <br >
          <span
            v-for="(field, key) in additionalFields"
            :key="key"
            class="addition_meta_list"><strong>{{ key }}</strong>:
            <span
              v-if="!inEdit"
              class="addition_meta_list">{{ addition[key] }}</span>
            <el-input
              v-else
              v-model="addition[key]"
              class="addition_meta_list_input"
              size="mini" />
          </span>
        </li>
      </ul>

      <slot
        :showModal="displayModal"
        :toggleEdit="toggleEdit"
        :inEdit="inEdit">
        <el-button
          type="success"
          plain
          style="margin-bottom: 20px;"
          @click="showModal = true">{{ formName }}</el-button>
        <el-button
          type="success">Edit</el-button>
      </slot>
      <div slot="reference">
        <strong v-if="showTotal">{{ amountPrefix }}{{ formatAmount ? formatPrice(total) : total }}</strong>
        <strong v-else-if="totalText && totalButton">
          <el-button size="mini">{{ totalText }}</el-button>
        </strong>
        <strong v-else-if="totalText">{{ totalText }}</strong>
      </div>
    </el-popover>

    <el-dialog
      v-if="showModal"
      :title="formName"
      :close-on-click-modal="false"
      :append-to-body="true"
      :before-close="closeAndClearModal"
      :visible.sync="showModal">

      <el-form
        ref="form"
        :model="model"
        label-position="top">

        <el-row :gutter="20">
          <el-col :md="{span:8, offset: 4}">
            <el-form-item
              :rules="[{required: true, message: 'Amount is required.', trigger: 'blur,change'}]"
              label="Amount"
              size="small"
              prop="Amount">
              <div class="price_changer">
                <span class="currency --small">{{ amountPrefix }}</span><el-input-number
                  v-model="model.Amount"
                  :autofocus="true"
                  :controls="false"
                  :min="1"
                  :precision="2"
                  size="small"
                  controls-position="right"/>
              </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row
          v-for="(field, key) in additionalFields"
          :gutter="20"
          :key="key">
          <el-col :md="{span:8, offset: 4}">
            <el-form-item
              :label="key"
              :prop="key"
              size="small">
              <el-input v-model="model[key]"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :md="{span:16, offset: 4}">
            <el-button
              :loading="loading"
              type="success"
              @click="addObject">{{ formAddButton }}</el-button>
          </el-col>
        </el-row>

      </el-form>

    </el-dialog>

  </div>

</template>

<script>
var clone = require('lodash.clone')
var forEach = require('lodash.foreach')

export default {

  name: 'AdditionForm',

  components: {
    ContentInner: () => import(/* webpackChunkName: "content-inner" */'components/ContentInner')
  },

  props: {
    formName: {
      type: String,
      required: false,
      default () {
        return 'Add New'
      }
    },
    individualName: {
      type: String,
      required: false,
      default () {
        return 'Item'
      }
    },
    formAddButton: {
      type: String,
      required: false,
      default () {
        return 'Add'
      }
    },
    amountPrefix: {
      type: [String, Number],
      required: false,
      default () {
        return ''
      }
    },
    formatAmount: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    additionalFields: {
      type: [Array, Object],
      required: false,
      default () {
        return []
      }
    },
    onAdditionAdded: {
      type: Function,
      required: false,
      default () {
        return function (model, total, additions) {}
      }
    },
    baseAdditions: {
      type: [Object],
      required: false,
      default () {
        return []
      }
    },
    showTotal: {
      type: Boolean,
      required: false,
      default () {
        return true
      }
    },
    totalText: {
      type: String,
      required: false,
      default () {
        return ''
      }
    },
    totalButton: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    },
    editable: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    }
  },

  data () {
    return {
      loading: false,
      showModal: false,
      model: {},
      additions: {},
      inEdit: false
    }
  },

  computed: {
    total () {
      var addTotal = 0
      forEach(this.additions, (addition) => {
        if (addition.Amount) {
          addTotal = addTotal + this.simplePrice(addition.Amount)
        }
      })

      return addTotal
    }
  },

  watch: {

  },

  mounted () {
    console.log('AdditionForm.vue mounted!')
    this.additions = clone(this.baseAdditions)
  },

  methods: {
    closeAndClearModal () {
      this.$confirm('Are you sure to close?')
        .then(_ => {
          this.showModal = false
        })
        .catch(_ => {})
    },

    toggleEdit () {
      this.inEdit = !this.inEdit

      if (!this.inEdit) {
        this.onAdditionAdded(this.model, this.total, this.additions)
        this.$emit('addition-added', this.model, this.total, this.additions)
      }
    },

    addObject () {
      this.$refs['form'].validate((valid, errors) => {
        if (valid) {
          var objLength = Object.keys(this.additions).length
          objLength = objLength + 1
          this.$set(this.additions, `Multi ${this.individualName} ${objLength}`, this.model)
          this.onAdditionAdded(this.model, this.total, this.additions)
          this.$emit('addition-added', this.model, this.total, this.additions)
          this.model = {}
          this.showModal = false
          this.loading = false
        }
      })
    },

    displayModal () {
      this.showModal = true
    }
  }

}
</script>

<style lang="css" scoped>
 .addition_meta_list {
   position: relative;
   display: block;
 }
 .addition_meta_list_input {
   max-width: 100px;
 }
</style>
