import * as types from '../mutation-types';
var has = require('lodash.has');
import api from 'services/api-service';

var FETCH_BUFFER = 60 * 5 * 1000; /* ms */

// initial state
const state = {
  user: {
      name: {}
  },
  userErrors: [],
  userLastFetched: ''
}

// getters
const getters = {
  user: state => state.user,
  userErrors: state => state.userErrors
}

// actions
const actions = {

  getUser ({ state, commit, dispatch }, data = {}) {
      console.log('Vuex: Get User');

      data.path = has(data, 'path') ? data.path : 'user';

      if(!has(data, 'params')) {
        data.params = {};
      }

      return new Promise((resolve, reject) => {
        if(!state.user.created_at || ((Date.now()) - state.userLastFetched) > FETCH_BUFFER) {
            api.get(data)
               .then( function(response) {
                   commit(types.USER_LAST_FETCHED, Date.now());
                   commit(types.UPDATE_USER, response.data);
                   commit(types.UPDATE_USER_ERRORS, []);
                   resolve(response.data);
               }.bind(this))
               .catch( function(error) {
                   commit(types.UPDATE_USER_ERRORS, error)
                   reject(error);
               }.bind(this));
        } else {
          resolve(state.user);
        }
          });
  },

  updateUser ({ state, commit, dispatch }, data = {}) {
      console.log('Vuex: Update User');

      data.path = has(data, 'path') ? data.path : 'users/' + state.user.id;

      if(!has(data, 'params')) {
        data.params = {};
      }
      if(!has(data, 'object')) {
        data.object = state.user;
      }

      return new Promise((resolve, reject) => {
            api.persist('put', data)
               .then( function(response) {
                   commit(types.USER_LAST_FETCHED, Date.now());
                   commit(types.UPDATE_USER, response.data);
                   commit(types.UPDATE_USER_ERRORS, []);
                 resolve(response.data);
               }.bind(this))
               .catch( function(error) {
                   commit(types.UPDATE_USER_ERRORS, error)
                   reject(error);
               }.bind(this));
          });
  },
}

// mutations
const mutations = {

  [types.UPDATE_USER] (state, user) {
    state.user = user;
  },

  [types.UPDATE_USER_ERRORS] (state, error) {
    state.userErrors = error;
  },

  [types.USER_LAST_FETCHED] (state, data) {
    state.userLastFetched = data;
  },

  updateUserForm (state, data) {
      state.user[data.key] = data.value;
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
