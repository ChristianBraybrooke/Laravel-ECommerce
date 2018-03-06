import * as types from '../mutation-types';
import api from '../../services/api-service';

// initial state
const state = {
  collections: {},
  collectionErrors: []
}

// getters
const getters = {
  collections: state => state.collections,
  collectionErrors: state => state.collectionErrors
}

// actions
const actions = {

  getCollections ({ commit, dispatch }, data = {}) {
      console.log('Vuex: Get Collections');

      data.path = _.has(data, 'path') ? data.path : 'collections';

      if(!_.has(data, 'params')) {
        data.params = {};
      }
      data.params.orderBy = _.has(data, 'params.orderBy') ? data.params.orderBy : 'name';
      data.params.ascending = _.has(data, 'params.ascending') ? data.params.ascending : 1;

      return new Promise((resolve, reject) => {

        api.get(data)
           .then( function(response) {

             commit(types.GET_COLLECTIONS, response.data);
             commit(types.GET_COLLECTION_ERRORS, []);
             resolve(response);

           }.bind(this))
           .catch( function(error) {

             commit(types.GET_COLLECTION_ERRORS, error)
             reject(error);

           }.bind(this));

      });
  },

}

// mutations
const mutations = {

  [types.GET_COLLECTIONS] (state, collections) {
    state.collections = collections;
  },

  [types.GET_COLLECTION_ERRORS] (state, error) {
    state.collectionErrors = error;
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
