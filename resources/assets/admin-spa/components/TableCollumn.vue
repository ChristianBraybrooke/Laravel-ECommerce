<script>
export default {
    name: 'TableCollumn',

    render: function (h) {
        return (this.button);
    },

    props: {

        col: {
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
                var path = this.col.api.path;
                // path = path.substring(
                //     path.lastIndexOf("${") + 2,
                //     path.lastIndexOf("}")
                // );
                path = path.replace("${id}", function (x) {
                    return x;
                });
                console.log(path);
            }
        },

    },
}
</script>

<style lang="css">
</style>
