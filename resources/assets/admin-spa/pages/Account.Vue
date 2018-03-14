<template lang="html">
      <div v-loading="loading">

          <el-row align="middle">
            <el-col :span="24"><h1 class="page_title">Account - {{ user.name.full }}</h1></el-col>
          </el-row>

          <hr class="page_hr">

          <errors v-if="userErrors && Object.keys(userErrors).length > 0" :errors="userErrors"></errors>

          <el-row :gutter="40">
              <el-col :sm="24" :md="24" :lg="12">
                  <el-form label-position="top" :model="user" :rules="userFormRules" ref="userForm" label-width="120px" @keyup.enter.native="submitForm('userForm')">

                      <el-row :gutter="20">
                          <el-col :md="12" :sm="24">
                              <el-form-item label="First Name" prop="name.first">
                                  <el-input :autofocus="true" v-model="user.name.first"></el-input>
                              </el-form-item>
                          </el-col>
                          <el-col :md="12" :sm="24">
                              <el-form-item label="Last Name" prop="name.last">
                                  <el-input v-model="user.name.last"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>

                      <el-row :gutter="20">
                          <el-col :sm="24">
                              <el-form-item label="Email" prop="email">
                                  <el-input v-model="user.email"></el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>

                      <el-row :gutter="20">
                          <el-col :sm="24">
                              <el-form-item label="Update Password" prop="password">
                                  <el-input v-model="user.password" :type="passwordShow ? 'text' : 'password'">
                                      <i v-on:click="handlePassView" slot="prefix" class="el-input__icon el-icon-view"></i>
                                  </el-input>
                              </el-form-item>
                          </el-col>
                      </el-row>

                      <hr class="page_hr">

                      <el-row :gutter="20">
                          <el-col :sm="24">
                              <el-form-item>
                                  <el-button plain type="success" :loading="loading" @click="submitForm('userForm')">Update</el-button>
                              </el-form-item>
                          </el-col>
                      </el-row>

                  </el-form>
              </el-col>
          </el-row>

      </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
var zxcvbn = require('zxcvbn');

export default {

      name: 'Account',

      components: {
          Errors: () => import('../components/Errors.vue'),
          FilePickerModal: () => import('../components/FilePickerModal.vue')
      },

      props: {

      },

      data () {
          var passwordValidator = (rule, value, callback) => {
              var validator = zxcvbn(value);

              if (value && validator.score <= 2) {
                  var errorMsg = validator.feedback.warning ? validator.feedback.warning : validator.feedback.suggestions.join(' ');
                  return callback(new Error(errorMsg));
              } else if (!value) {
                  return callback();
              } else {
                  callback();
              }
          }
          return {
              loading: true,
              userFormRules: {
                  password: [
                    { validator: passwordValidator, trigger: 'change' },
                  ],
              },
              passwordShow: false,
          }
      },

      computed: {
          ...mapGetters([
            'user',
            'userErrors'
          ]),
      },

      watch: {
          user: {
              handler: function(user) {
                  this.$store.commit('UPDATE_USER', user);
              },
              deep: true
          },
      },

      mounted () {
          console.log('Account.vue mounted')

          this.getUser()
          .then(function () {
              this.loading = false;
          }.bind(this))
          .catch(function () {
              this.loading = false;
          }.bind(this));
      },

      methods: {
          ...mapActions([
              'getUser',
              'updateUser',
              'updateUserModel'
          ]),

          /**
           * Show or hide the password.
           *
           * @return void
           */
          handlePassView()
          {
              this.passwordShow = !this.passwordShow;
          },

          submitForm(formName)
          {
            this.loading = true;
            this.$refs[formName].validate((valid) => {
                // if (valid) {
                    this.updateUser()
                        .then(function () {
                            this.loading = false;

                            this.$message({
                              message: 'Account updated',
                              type: 'success',
                              showClose: true,
                            });

                        }.bind(this))
                        .catch(function () {
                            this.loading = false;
                        }.bind(this));
                // }
            });
          },
      },

}
</script>

<style lang="css">
</style>
