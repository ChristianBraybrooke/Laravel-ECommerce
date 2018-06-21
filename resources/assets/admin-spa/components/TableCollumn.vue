<script>
import api from "services/api-service"
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
                var path = this.replacer(this.col.api.path);
                var dots = this.fillIndexInDotSyntaxString(this.col.action.set, this.row);
                this.setRowValue(this.row, dots, this.col.action.value);


                api.persist(this.col.api.method, {
                      path: path,
                      object: this.row
                  })
                  .then(function (data) {
                      // this.loading = false;
                      // this.data = data.data;
                  }.bind(this))
                  .catch(function (error) {
                      // this.loading = false;
                      // this.errors = error;
                  }.bind(this));

            }
        },

        /**
         * Replace the parts of the path that need to be subsituted for real data.
         *
         * @return String
         */
        replacer(path)
        {
            path = path.replace(/\${(.+?)\}/g, (x) => {
                x = x.replace('${', '');
                x = x.replace('}', '');
                return this.dotToObjectPath(x, this.row);
            });
            return path;
        },

        /**
         * Replace a lookup for index in a dot syntax string.
         *
         * @return String
         */
        fillIndexInDotSyntaxString(set, object)
        {
            var string = set.replace(/\$\[(.+?)\]/g, (x) => {
                x = x.replace('$[', '');
                x = x.replace(']', '');

                var before_equals = x.split('=')[0];
                var after_equals = x.split('=')[1];
                var lookup = set.split('.$[')[0];
                lookup = this.dotToObjectPath(lookup, object);

                return findIndex(lookup, function (o) { return o[before_equals] === after_equals });
            });
            return string;
        },

        /**
         * Turn a dot syntax string into an object path.
         *
         * @return Mixed
         */
        dotToObjectPath(string, object)
        {
            return string.split('.').reduce((o,i)=>o[i], object);
        },

        /**
         * Set a dynamic row value.
         *
         * @return Mixed
         */
        setRowValue(obj,is, value) {
            if (typeof is == 'string')
                return this.setRowValue(obj,is.split('.'), value);
            else if (is.length==1 && value!==undefined)
                return obj[is[0]] = value;
            else if (is.length==0)
                return obj;
            else
                return this.setRowValue(obj[is[0]],is.slice(1), value);
        }

    },
}
</script>

<style lang="css">
</style>
