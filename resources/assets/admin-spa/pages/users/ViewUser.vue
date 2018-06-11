<template lang="html">
    <div class="">
        Test
    </div>
</template>

<script>
import api from '../../services/api-service'

export default {
    name: 'ViewUser',

    props: {
        userId: {
            type: String,
            required: true,
        },
    },

    data () {
        return {
            loading: false,
            errors: {},
            user: {},
        }
    },

    mounted() {
        console.log('ViewUser.vue mounted.');
        this.getUser();
    },

    methods: {

        /*
         * Get the user data from the server.
         *
         * @return Void
         */
         getUser()
         {
            this.loading = true;
            api.get({
                path: 'users/' + this.userId
            })
            .then(data => {
                this.user = data.data;
                this.loading = false;
            })
            .catch(error => {
                this.errors = error;
                this.loading = false;
            });
         }
    }
}
</script>

<style lang="css">
</style>
