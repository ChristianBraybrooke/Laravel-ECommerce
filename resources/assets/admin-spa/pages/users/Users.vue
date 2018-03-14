<template lang="html">

    <data-table type-name="user"
                request-with="roles"
                :table-options="tableOptions"
                :create-form="usersCreateForm"
                :create-form-rules="createFormRules">

      <template slot="createForm"
                slot-scope="props">


                <el-form-item label="First Name" prop="first_name">
                  <el-input :autofocus="true" v-model="usersCreateForm.first_name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="Last Name" prop="last_name">
                  <el-input :autofocus="true" v-model="usersCreateForm.last_name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="Email" prop="email">
                  <el-input :autofocus="true" v-model="usersCreateForm.email" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="Password" prop="password">
                  <el-input :autofocus="true" v-model="usersCreateForm.password" auto-complete="off"></el-input>
                </el-form-item>

      </template>

    </data-table>

</template>

<script>
var upperFirst = require('lodash.upperfirst');

export default {

      name: 'Users',

      components: {
          DataTable: () => import('../../components/DataTable.vue')
      },

      props: [

      ],

      data () {
          return {
              usersCreateForm: {},
              createFormRules: {
                  first_name: [
                    { required: true, message: 'The first name is required', trigger: 'blur' },
                    { min: 3, max: 200, message: 'The first name length should be more than 3 characters', trigger: 'blur' }
                  ],
                  last_name: [
                    { required: true, message: 'The last name is required', trigger: 'blur' },
                    { min: 3, max: 200, message: 'The last name length should be more than 3 characters', trigger: 'blur' }
                  ],
                  email: [
                    { required: true, message: 'The email is required', trigger: 'blur' },
                    { min: 3, max: 200, message: 'The email length should be more than 3 characters', trigger: 'blur' }
                  ],
                  password: [
                    { required: true, message: 'The password is required', trigger: 'blur' },
                    { min: 3, max: 200, message: 'The password length should be more than 3 characters', trigger: 'blur' }
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
                          prop: 'roles.data',
                          sortable: true,
                          label: 'Roles',
                          align: 'left',
                          resizable: true,
                          formatter: function(row, column, cellValue) {
                              var roles = [];
                              cellValue.forEach(function (role) {
                                  roles.push(upperFirst(role.name));
                              }.bind(this));

                              return roles.join(', ');
                          },
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
                      },
                      {
                        value: 'draft',
                        label: 'Mark Draft'
                      },
                      {
                        value: 'live',
                        label: 'Mark Live'
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
          console.log('Users.vue mounted.')
      },

      methods: {

      },

}
</script>

<style lang="css">
</style>
