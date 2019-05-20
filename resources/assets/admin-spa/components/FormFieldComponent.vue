<template lang="html">
  <div>
    <div :class="'form_field_row ' + (model.rules.required ? 'required' : '')">
      <el-row :gutter="20">
        <el-col
          :lg="12"
          :xl="4">
          <el-form-item
            label="Name"
            size="small"
            prop="name">
            <el-input
              :autofocus="true"
              v-model="model.name"/>
          </el-form-item>
        </el-col>
        <el-col
          :lg="12"
          :xl="4">
          <el-form-item
            label="Key"
            size="small"
            prop="key">
            <el-input
              v-model="model.key"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col
          :lg="24"
          :xl="6">
          <el-form-item
            label="Description"
            size="small"
            prop="description">
            <el-input
              :autofocus="true"
              v-model="model.description"/>
          </el-form-item>
        </el-col>
        <el-col
          :lg="10"
          :xl="4">
          <el-form-item
            label="Type"
            size="small"
            prop="type">
            <el-select
              v-model="model.type"
              placeholder="Type">
              <el-option
                v-for="option in fieldOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"/>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col
          :lg="6"
          :xl="2">
          <el-form-item
            label="Prepends"
            size="small"
            prop="prepend">
            <el-input
              :autofocus="true"
              v-model="model.prepend"/>
          </el-form-item>
        </el-col>
        <el-col
          :lg="6"
          :xl="2">
          <el-form-item
            label="Appends"
            size="small"
            prop="append">
            <el-input
              :autofocus="true"
              v-model="model.append"/>
          </el-form-item>
        </el-col>

        <el-col
          :lg="10"
          :xl="4">
          <el-form-item
            label="Order"
            prop="order"
            size="small">
            <el-input-number
              v-model="model.order"
              size="mini"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col
          :lg="4"
          :xl="2">
          <el-form-item
            label=""
            size="small"
            prop="rules">
            <el-button
              plain
              size="mini"
              type="primary"
              @click="showRulesModal = true">Show Rules</el-button>
          </el-form-item>
        </el-col>
        <el-col
          v-if="needsOptions"
          :lg="4"
          :xl="2">
          <el-form-item
            label=""
            size="small"
            prop="options">
            <el-button
              plain
              size="mini"
              type="primary"
              @click="showOptionsModal = true">Show Options</el-button>
          </el-form-item>
        </el-col>
        <el-col
          v-if="model.type === 'dynamic'"
          :lg="4"
          :xl="2">
          <el-form-item
            label=""
            size="small"
            prop="options">
            <el-button
              plain
              size="mini"
              type="primary"
              @click="showOptionsModal = true">Show Fields</el-button>
          </el-form-item>
        </el-col>
        <el-col
          :lg="4"
          :xl="2">
          <el-form-item
            label=""
            size="small"
            prop="delete">
            <el-button
              size="mini"
              type="danger"
              @click="deleteField(model)">Delete</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </div>

    <el-dialog
      v-if="showRulesModal"
      :title="model.name + ' Rules'"
      :visible.sync="showRulesModal"
      width="70%">

      <el-row type="flex">
        <el-col :span="24">
          <el-form-item
            label="Required"
            prop="required">
            <el-switch
              v-model="model.rules.required"
              active-color="#13ce66"
              inactive-color="#ff4949"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row
        type="flex">
        <el-col :span="24">
          <el-form-item
            label="Dynamic"
            prop="dynamic">
            <el-switch
              v-model="model.rules.dynamic"
              active-color="#13ce66"
              inactive-color="#ff4949"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row
        v-if="model.rules.dynamic"
        type="flex">
        <el-col
          :lg="12"
          :xl="4">
          <el-select
            v-model="model.rules.show_if_att">
            <el-option-group
              v-for="optgroup in getDynamicOptions"
              :key="optgroup[0].section_id"
              :label="optgroup[0].section_name">
              <el-option
                v-for="op in optgroup"
                :key="op.field_id"
                :label="op.field_name"
                :value="op.field_id" />
            </el-option-group>
          </el-select>
        </el-col>
        <el-col
          :lg="12"
          :xl="4">
          <el-select
            v-model="model.rules.show_if_operator">
            <el-option
              v-for="(op, key) in ['=']"
              :key="key"
              :label="op"
              :value="op" />
          </el-select>
        </el-col>
        <el-col
          :lg="12"
          :xl="4">
          <el-select
            v-model="model.rules.show_if_value">
            <el-option
              v-for="value in getDynamicOptionValues"
              :key="value.value"
              :label="value.name"
              :value="value.value" />
          </el-select>
        </el-col>
      </el-row>

      <el-row
        v-if="model.type === 'dynamic'"
        type="flex">
        <el-col :span="24">
          <el-form-item
            label="Loop Key"
            prop="loop_key">
            <el-input
              v-model="model.rules.loop_key"/>
          </el-form-item>
        </el-col>
      </el-row>

      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          @click="showRulesModal = false">Done</el-button>
      </span>

    </el-dialog>

    <el-dialog
      v-if="showOptionsModal"
      :title="model.name + ' Options'"
      :visible.sync="showOptionsModal"
      width="70%">

      <template v-if="model.type === 'dynamic'">
        <form-field-component
          v-for="(field, key) in model.options"
          :model="field"
          :section="section"
          :form="form"
          :key="key"/>
      </template>
      <template v-else>
        <el-row
          v-for="option in model.options"
          :gutter="20"
          :key="option.id"
          class="form_field_row">
          <el-col
            v-if="model.options"
            :lg="12"
            :xl="4">
            <el-form-item
              label="Label"
              size="small"
              prop="label">
              <el-input
                :autofocus="true"
                v-model="option.name"/>
            </el-form-item>
          </el-col>
          <el-col
            :lg="12"
            :xl="4">
            <el-form-item
              label="Value"
              size="small"
              prop="value">
              <el-input
                :autofocus="true"
                v-model="option.value"/>
            </el-form-item>
          </el-col>
          <el-col
            v-if="form.effects_price"
            :lg="12"
            :xl="4">
            <el-form-item
              label="Price Mutator"
              size="small"
              prop="price_mutator">
              <el-select
                v-model="option.price_mutator"
                placeholder="">
                <el-option value="+"/>
                <el-option value="-"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            v-if="form.effects_price"
            :lg="12"
            :xl="4">
            <el-form-item
              label="Price Value"
              size="small"
              prop="price_value">
              <el-input
                v-model="option.price_value"
                type="number"/>
            </el-form-item>
          </el-col>
          <el-col
            :lg="4"
            :xl="2">
            <el-form-item
              label=""
              size="small"
              prop="delete">
              <el-button
                size="mini"
                type="danger"
                @click="deleteOption(option, model.options)">Delete</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </template>

      <el-button
        type="info"
        size="mini"
        icon="el-icon-plus"
        plain
        @click="addOption">{{ model.type === 'dynamic' ? 'Add Field' : 'Add Option' }}</el-button>

      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          @click="showOptionsModal = false">Done</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>
var groupBy = require('lodash.groupby')

export default {

  name: 'FormFieldComponent',

  components: {
    // FormFieldComponent: () => import(/* webpackChunkName: "form-field-component" */'components/FormFieldComponent')
  },

  props: {
    form: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      required: true
    },
    section: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      fieldOptions: [
        {
          label: 'Text',
          value: 'text'
        },
        {
          label: 'Text Area',
          value: 'textarea'
        },
        {
          label: 'Number',
          value: 'number'
        },
        {
          label: 'Radio',
          value: 'radio'
        },
        {
          label: 'Select',
          value: 'select'
        },
        {
          label: 'Dynamic Order Data',
          value: 'dynamic'
        }
      ],
      showRulesModal: false,
      showOptionsModal: false
    }
  },

  computed: {

    needsOptions () {
      if (this.model.type === 'radio') {
        return true
      }
      if (this.model.type === 'select') {
        return true
      }
      return false
    },

    getDynamicOptions () {
      var options = []
      this.form.sections.data.forEach((section) => {
        section.fields.data.forEach((field) => {
          options.push({
            section_id: section.id,
            section_name: section.name,
            field_id: field.id,
            field_name: field.name
          })
        })
      })
      return groupBy(options, 'section_id')
    },

    getDynamicOptionValues () {
      var options = []
      if (this.model.rules.show_if_att) {
        this.form.sections.data.forEach((section) => {
          section.fields.data.forEach((field) => {
            if (field.id === this.model.rules.show_if_att) {
              options = field.options
            }
          })
        })
      }
      return options
    }
  },

  watch: {

  },

  mounted () {
    console.log('FormFieldComponent.vue Mounted')
  },

  methods: {

    deleteField (field) {
      this.section.fields.data.splice(this.section.fields.data.indexOf(field), 1)
    },

    addOption () {
      if (this.model.type === 'dynamic') {
        this.model.options.push({
          options: [],
          rules: {},
          type: ''
        })
      } else {
        this.model.options.push({

        })
      }
    },

    deleteOption (option, options) {
      options.splice(options.indexOf(option), 1)
    }
  }
}
</script>

<style lang="css">
</style>
