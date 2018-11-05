<template lang="html">
  <data-table
    :create-form="menusCreateForm"
    :table-options="tableOptions"
    type-name="menu"
    bulk-update-url="menus/bulk">

    <template
      slot="createForm"
      slot-scope="props">

      <el-form-item
        label="Menu Name"
        prop="name">
        <el-input
          :autofocus="true"
          v-model="menusCreateForm.name"
          auto-complete="off"/>
      </el-form-item>

    </template>

  </data-table>
</template>

<script>
export default {

  name: 'Menus',

  components: {
    DataTable: () => import(/* webpackChunkName: "data-table" */'components/DataTable')
  },

  props: {

  },

  data () {
    return {
      menusCreateForm: {},
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
          }
        ]
      }
    }
  },

  computed: {

  },

  watch: {

  },

  mounted () {
    console.log('Menus.vue Mounted')
  },

  methods: {

  }
}
</script>

<style lang="css">
</style>
