<script>
import api from "services/api-service"
import collumn_util from "utils/collumn"
var findIndex = require('lodash.findindex')

export default {
    name: 'TableCollumn',

    render: function (h) {
        return (this.getRenderType);
    },

    props: {

        col: {
            type: Object,
            required: true,
        },

        row: {
            type: Object,
            required: true,
        }

    },

    data () {
        return {
            loading: false,
            temp: ''
        }
    },

    mounted () {
        console.log('TableCollumn.vue Mounted.');

        if(this.col.value) {
            this.temp = collumn_util.dotToObjectPath(collumn_util.replaceWhereLookup(this.col.value, this.row), this.row);
        }
    },

    computed: {

        getRenderType()
        {
            switch (this.col.type) {
              case 'button':
                return this.button;
                break;
              case 'date':
                return this.date;
                break;
              case 'text':
                return this.text;
                break;
              case 'number':
                return this.number;
                break;
              default:
                return this.col.value ? <div>{collumn_util.dotToObjectPath(collumn_util.replaceWhereLookup(this.col.value, this.row), this.row)}</div> : '';

            }
        },

        /**
         * Render the button.
         *
         * @return JSX
         */
        button()
        {
            var button = this.col.button ? this.col.button : {};
            var button_content = '';
            var extra_content = collumn_util.dotToObjectPath(collumn_util.replaceWhereLookup(button.value, this.row), this.row);
            var real_value = collumn_util.dotToObjectPath(collumn_util.replaceWhereLookup(this.col.value, this.row), this.row);
            var extra = button.show_value ? <span>{extra_content}</span> : '';

            var hide_button_if_value = false;
            if (this.objectHas(button, 'hide_if_value') && button.hide_if_value) {
                hide_button_if_value = true;
            }

            if (!hide_button_if_value && !extra_content || !hide_button_if_value || hide_button_if_value && !extra_content || hide_button_if_value && button.only_show_hover && !real_value) {
                button_content = <el-button type={button.type ? button.type : 'primary'}
                                            loading={this.loading}
                                            class={button.only_show_hover ? 'order_dispatch_btn' : ''}
                                            plain={button.plain === true ? true : false}
                                            size={button.size ? button.size : 'small'}
                                            on-click={() => this.handleClick()}>{ button.text ? button.text : 'Confirm' }
                                 </el-button>
            }

            // return <div>{button_content}{extra}</div>

            return <div class="order_dispatch"><span class={(button.only_show_hover && button_content !== '')? 'order_dispatch_text' : ''}>{extra}</span>{button_content}</div>
        },

        /**
         * Render the date.
         *
         * @return JSX
         */
        date()
        {
            var date = this.col.date ? this.col.date : {};
            var value = collumn_util.dotToObjectPath(collumn_util.replaceWhereLookup(this.col.value, this.row), this.row);
            return  <el-date-picker type="date"
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
        text()
        {
            var text = this.col.text ? this.col.text : {};
            var value = collumn_util.dotToObjectPath(collumn_util.replaceWhereLookup(this.col.value, this.row), this.row);
            return  <el-input v-model={this.temp}
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
        number()
        {
            var number = this.col.number ? this.col.number : {};
            var value = collumn_util.dotToObjectPath(collumn_util.replaceWhereLookup(this.col.value, this.row), this.row);
            return  <el-input-number v-model={this.temp}
                              on-change={(val) => this.valChange(val)}
                              controls={this.objectHas(number, 'controls') ? number.controls : true}
                              controls-position={number.controls_position ? number.controls_position : 'right'}
                              disabled={this.loading}
                              style="width: 100%;"
                              size={number.size ? number.size : 'mini'}
                              placeholder={number.placeholder}>
                    </el-input-number>

        }
    },

    methods: {

        /**
         * Handle the on click event and establish if there's an action to be taken.
         *
         * @return Void
         */
        handleClick()
        {
            var action = this.col.action ? this.col.action : {};
            if (action.type === 'api' && this.col.api) {
                var dots = collumn_util.replaceWhereLookup(this.col.action.set, this.row);

                if (dots !== null) {
                    collumn_util.setRowValue(this.row, dots, this.col.action.value);
                    this.apiAction();
                } else {
                    this.$message({
                      message: "Sorry, content not available.",
                      type: 'error',
                      showClose: true,
                    });
                }
            }
        },

        valChange(val)
        {
            var dots = collumn_util.replaceWhereLookup(this.col.action.set, this.row);

            if (dots !== null) {
                collumn_util.setRowValue(this.row, dots, val);
                this.apiAction();
            } else {
                this.$message({
                  message: "Sorry, content not available.",
                  type: 'error',
                  showClose: true,
                });
            }
        },

        apiAction(path)
        {
            var path = path ? path : null;

            if (path === null) {
                if (this.objectHas(this.col, 'api.path')) {
                    path = collumn_util.replaceVariables(this.col.api.path, this.row)
                }
            }

            if (path !== null) {
                this.loading = true;
                api.persist(this.col.api.method, {
                      path: path,
                      object: this.row
                  })
                  .then(function (data) {
                      this.$message({
                        message: this.col.label + " Updated!",
                        type: 'success',
                        showClose: true,
                      });
                      this.loading = false;
                  }.bind(this))
                  .catch(function (error) {
                      this.loading = false;
                  }.bind(this));
            }

        }
    }
}
</script>

<style lang="css">
</style>
