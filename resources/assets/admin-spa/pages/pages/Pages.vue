<template lang="html">

  <data-table type-name="page"
              :table-options="tableOptions"
              :create-form="usersCreateForm">

  </data-table>

</template>

<script>
export default {

      name: 'Pages',

      components: {
          DataTable: () => import('../../components/DataTable.vue')
      },

      props: [

      ],

      data () {
          return {
              usersCreateForm: {},
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
                      {
                          prop: 'live_at.live',
                          sortable: true,
                          label: 'Live',
                          align: 'left',
                          formatter: function(row, column, cellValue) {
                              return row.live_at.live ? <i class="el-icon-check"></i> : <i class="el-icon-close"></i>;
                          },
                          resizable: true
                      },
                      {
                          prop: 'in_menu',
                          sortable: true,
                          label: 'In Menu',
                          align: 'left',
                          formatter: function(row, column, cellValue) {
                              return row.in_menu ? <i class="el-icon-check"></i> : <i class="el-icon-close"></i>;
                          },
                          resizable: true
                      },
                  ],
                  bulkOptions: [
                      {
                        value: 'delete',
                        label: 'Delete'
                      },
                      {
                        value: 'draft',
                        label: 'Mark Draft'
                      },
                      {
                        value: 'live',
                        label: 'Mark Live'
                      },
                      {
                        value: 'in_menu',
                        label: 'Put In Menu'
                      },
                      {
                        value: 'out_menu',
                        label: 'Take Out Menu'
                      },
                  ],
              }
          }
      },

      computed: {

      },

      watch: {

      },

      mounted () {
          console.log('Pages.vue mounted');
      },

      methods: {

      },

}
</script>

<style lang="css">
</style>
