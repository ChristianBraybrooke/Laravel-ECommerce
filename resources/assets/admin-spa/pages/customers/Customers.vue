<template lang="html">
    <data-table type-name="customer"
                base-url="users"
                edit-path="users"
                request-with="roles"
                :with-params="{withRole: 'customer'}"
                :table-options="tableOptions"
                :create-form="customersCreateForm"
                :create-form-rules="createFormRules">
    </data-table>
</template>

<script>
var upperFirst = require('lodash.upperfirst');

export default {
    name: 'Customers',

    data() {
        return {
            tableOptions: {
                collumns: [
                    {
                        prop: 'id',
                        sortable: true,
                        label: 'ID',
                        align: 'left',
                        resizable: true
                    },
                    {
                        prop: 'name.full',
                        sortable: true,
                        label: 'Name',
                        align: 'left',
                        resizable: true
                    },
                    {
                        prop: 'email',
                        sortable: true,
                        label: 'Email',
                        align: 'left',
                        resizable: true
                    },
                    {
                        prop: 'created_at.human',
                        sortable: true,
                        label: 'Created',
                        align: 'left',
                        resizable: true
                    },
                ],
            },
            customersCreateForm: {

            },
            createFormRules: {

            }
        }
    },

    components: {
        DataTable: () => import('../../components/DataTable.vue')
    },

    mounted() {
        console.log('Customers.vue mounted.')
    },
}
</script>

<style lang="css">
</style>
