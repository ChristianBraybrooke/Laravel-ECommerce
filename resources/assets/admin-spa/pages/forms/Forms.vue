<template lang="html">

    <data-table type-name="form"
                request-with=""
                :table-options="tableOptions"
                :create-form="formCreateForm"
                :create-form-rules="formCreateFormRules">

      <template slot="createForm"
                slot-scope="props">

                <el-form-item label="Form Name" prop="name">
                  <el-input :autofocus="true" v-model="formCreateForm.name" auto-complete="off"></el-input>
                </el-form-item>

      </template>

    </data-table>

</template>

<script>
var upperFirst = require('lodash.upperfirst');

export default {

      name: 'Forms',

      components: {
          DataTable: () => import('components/DataTable')
      },

      props: [

      ],

      data () {
          return {
              formCreateForm: {},
              formCreateFormRules: {
                  name: [
                    { required: true, message: 'The name is required', trigger: 'blur' },
                  ],
              },
              tableOptions: {
                  border: true,
                  stripe: true,
                  showSearch: true,
                  showHeader: true,
                  showNewBtn: true,
                  showRefreshBtn: true,
                  showHeadHr: true,
                  showTitle: true,
                  viewText: 'View',
                  deleteText: 'Delete',
                  collumns: [
                      {
                          prop: 'id',
                          sortable: true,
                          label: 'ID',
                          align: 'left',
                          resizable: true
                      },
                      {
                          prop: 'name',
                          sortable: true,
                          label: 'Name',
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
                  bulkOptions: [
                      {
                        value: 'delete',
                        label: 'Delete'
                      }
                  ],
              }
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('Forms.vue mounted.')
      },

      methods: {

      },

}
</script>

<style lang="css">
</style>
