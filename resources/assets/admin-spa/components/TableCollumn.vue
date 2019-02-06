<script>
import api from 'services/api-service'
import columnUtil from 'utils/collumn'
import AdditionForm from 'components/AdditionForm'

export default {
  name: 'TableCollumn',

  components: {
    AdditionForm: AdditionForm
  },

  props: {
    col: {
      type: Object,
      required: true
    },
    row: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loading: false,
      temp: ''
    }
  },

  computed: {

    getRenderType () {
      var renderType = null
      switch (this.col.type) {
        case 'button':
          renderType = this.button
          break
        case 'date':
          renderType = this.date
          break
        case 'text':
          renderType = this.text
          break
        case 'number':
          renderType = this.number
          break
        case 'addition':
          renderType = this.addition
          break
        default:
          renderType = this.col.value ? <div>{columnUtil.dotToObjectPath(columnUtil.replaceWhereLookup(this.col.value, this.row), this.row)}</div> : ''
      }
      return renderType
    },

    /**
         * Render the button.
         *
         * @return JSX
         */
    button () {
      var button = this.col.button ? this.col.button : {}
      var buttonContent = ''
      var extraContent = columnUtil.dotToObjectPath(columnUtil.replaceWhereLookup(button.value, this.row), this.row)
      var realValue = columnUtil.dotToObjectPath(columnUtil.replaceWhereLookup(this.col.value, this.row), this.row)
      var extra = button.show_value ? <span>{extraContent}</span> : ''

      var hideBtnIfValue = false
      if (this.objectHas(button, 'hide_if_value') && button.hide_if_value) {
        hideBtnIfValue = true
      }

      if ((!hideBtnIfValue && !extraContent) || !hideBtnIfValue || (hideBtnIfValue && !extraContent) || (hideBtnIfValue && button.only_show_hover && !realValue)) {
        buttonContent = <el-button type={button.type ? button.type : 'primary'}
          loading={this.loading}
          class={button.only_show_hover ? 'order_dispatch_btn' : ''}
          plain={button.plain === true}
          size={button.size ? button.size : 'small'}
          on-click={() => this.handleClick()}>{ button.text ? button.text : 'Confirm' }
        </el-button>
      }

      // return <div>{buttonContent}{extra}</div>

      return <div class="order_dispatch"><span class={(button.only_show_hover && buttonContent !== '') ? 'order_dispatch_text' : ''}>{extra}</span>{buttonContent}</div>
    },

    /**
         * Render the date.
         *
         * @return JSX
         */
    date () {
      var date = this.col.date ? this.col.date : {}
      return <el-date-picker type="date"
        v-model={this.temp}
        on-change={(val) => this.valChange(val)}
        disabled={this.loading}
        style="width: 100%;"
        size={date.size ? date.size : 'mini'}
        placeholder={date.placeholder}
        format={date.format ? date.format : 'dd/MM/yyyy'}
        value-format={date.value_format ? date.value_format : 'dd-MM-yyyy'}>
      </el-date-picker>
    },

    /**
         * Render the text.
         *
         * @return JSX
         */
    text () {
      var text = this.col.text ? this.col.text : {}
      return <el-input v-model={this.temp}
        on-change={(val) => this.valChange(val)}
        disabled={this.loading}
        style="width: 100%;"
        size={text.size ? text.size : 'mini'}
        placeholder={text.placeholder}>
      </el-input>
    },

    /**
         * Render the number.
         *
         * @return JSX
         */
    number () {
      var number = this.col.number ? this.col.number : {}
      return <el-input-number v-model={this.temp}
        on-change={(val) => this.valChange(val)}
        controls={this.objectHas(number, 'controls') ? number.controls : true}
        controls-position={number.controls_position ? number.controls_position : 'right'}
        disabled={this.loading}
        style="width: 100%;"
        size={number.size ? number.size : 'mini'}
        placeholder={number.placeholder}>
      </el-input-number>
    },

    /**
         * Render the addition.
         *
         * @return JSX
         */
    addition () {
      var addition = this.col.addition ? this.col.addition : {}
      var value = this.value ? this.value : {}
      console.log(typeof this.value)
      console.log(this.value)

      if (typeof value !== 'object' || value.length === 0) {
        value = {}
      }

      return <addition-form key={Math.floor(Math.random() * 101)}
        form-name={addition.form_name}
        amount-prefix={addition.amount_prefix}
        format-amount={addition.format_amount}
        individual-name={addition.individual_name}
        additional-fields={addition.additional_fields}
        show-total={addition.show_total}
        total-text={addition.total_text}
        total-button={addition.total_button}
        editable={addition.editable}
        base-additions={value}
        on-addition-added={(model, total, additions) => this.valChange(additions)}>
        {
          (props) => <div>
            <el-button on-click={() => props.showModal()}
              type={addition.add_button_type ? addition.add_button_type : 'primary'} size={addition.add_button_size ? addition.add_button_size : 'mini'}
              plain>{addition.add_button_text ? addition.add_button_text : 'Add'}
            </el-button>
            <el-button on-click={() => props.toggleEdit()} type="success" size="mini">{props.inEdit ? (addition.editable_save_text ? addition.editable_save_text : 'Save') : (addition.editable_text ? addition.editable_text : 'Edit')}</el-button>
          </div>
        }
      </addition-form>
    },

    value () {
      return columnUtil.dotToObjectPath(columnUtil.replaceWhereLookup(this.col.value, this.row), this.row)
    }
  },

  mounted () {
    console.log('TableCollumn.vue Mounted.')

    if (this.col.value) {
      this.temp = columnUtil.dotToObjectPath(columnUtil.replaceWhereLookup(this.col.value, this.row), this.row)
    }
  },

  methods: {

    /**
         * Handle the on click event and establish if there's an action to be taken.
         *
         * @return Void
         */
    handleClick () {
      var action = this.col.action ? this.col.action : {}
      if (action.type === 'api' && this.col.api) {
        var dots = columnUtil.replaceWhereLookup(this.col.action.set, this.row)

        if (dots !== null) {
          columnUtil.setRowValue(this.row, dots, this.col.action.value)
          this.apiAction()
        } else {
          this.$message({
            message: 'Sorry, content not available.',
            type: 'error',
            showClose: true
          })
        }
      }
    },

    valChange (val) {
      var dots = columnUtil.replaceWhereLookup(this.col.action.set, this.row)

      if (dots !== null) {
        columnUtil.setRowValue(this.row, dots, val)
        this.apiAction()
      } else {
        this.$message({
          message: 'Sorry, content not available.',
          type: 'error',
          showClose: true
        })
      }
    },

    apiAction (path) {
      path = path || null

      if (path === null) {
        if (this.objectHas(this.col, 'api.path')) {
          path = columnUtil.replaceVariables(this.col.api.path, this.row)
        }
      }

      if (path !== null) {
        this.loading = true
        api.persist(this.col.api.method, {
          path: path,
          object: this.row
        })
          .then(function (data) {
            this.$message({
              message: this.col.label + ' Updated!',
              type: 'success',
              showClose: true
            })
            this.loading = false
          }.bind(this))
          .catch(function () {
            this.loading = false
          }.bind(this))
      }
    },

    additionAdded (model, additions) {
      additions.push(model)
    }
  },

  render: function (h) {
    return (this.getRenderType)
  }
}
</script>

<style lang="css">
</style>
