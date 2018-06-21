<script>
import api from "services/api-service"
import collumn_util from "utils/collumn"
var findIndex = require('lodash.findindex')

export default {
    name: 'TableCollumn',

    render: function (h) {
        return (this.button);
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
        }
    },

    mounted () {
        console.log('TableCollumn.vue Mounted.');
    },

    computed: {

        /**
         * Render the button.
         *
         * @return JSX
         */
        button()
        {
            var button = this.col.button ? this.col.button : {};

            return <el-button type={button.type ? button.type : 'primary'}
                              loading={this.loading}
                              plain={button.plain === true ? true : false}
                              size={button.size ? button.size : 'small'}
                              on-click={() => this.handleClick()}>
                              { button.text ? button.text : 'Confirm' }
                   </el-button>
        },
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
                var path = collumn_util.replaceVariables(this.col.api.path, this.row);
                var dots = collumn_util.replaceWhereLookup(this.col.action.set, this.row);
                collumn_util.setRowValue(this.row, dots, this.col.action.value);


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
                      // this.errors = error;
                  }.bind(this));

            }
        },
    }
}
</script>

<style lang="css">
</style>
