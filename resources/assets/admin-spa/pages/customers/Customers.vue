<template lang="html">
  <data-table
    :with-params="{withRole: 'customer'}"
    :table-options="tableOptions"
    :create-form="customersCreateForm"
    :create-form-rules="createFormRules"
    type-name="customer"
    base-url="users"
    edit-path="users"
    request-with="roles"/>
</template>

<script>
export default {
  name: 'Customers',

  components: {
    DataTable: () => import('../../components/DataTable.vue')
  },

  data () {
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
            prop: 'company',
            sortable: true,
            label: 'Company',
            align: 'left',
            resizable: true
          },
          {
            prop: 'created_at.human',
            sortable: true,
            label: 'Created',
            align: 'left',
            resizable: true
          }
        ]
      },
      customersCreateForm: {

      },
      createFormRules: {

      }
    }
  },

  mounted () {
    console.log('Customers.vue mounted.')
  }
}
</script>

<style lang="css">
</style>
