import * as types from '../mutation-types'
import api from 'services/api-service'

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
    console.log('Vuex: Get Collections')

    data.path = window._.has(data, 'path') ? data.path : 'collections'

    if (!window._.has(data, 'params')) {
      data.params = {}
    }
    data.params.orderBy = window._.has(data, 'params.orderBy') ? data.params.orderBy : 'name'
    data.params.ascending = window._.has(data, 'params.ascending') ? data.params.ascending : 1

    return new Promise((resolve, reject) => {
      api.get(data)
        .then(function (response) {
          commit(types.GET_COLLECTIONS, response.data)
          commit(types.GET_COLLECTION_ERRORS, [])
          resolve(response)
        })
        .catch(function (error) {
          commit(types.GET_COLLECTION_ERRORS, error)
          reject(error)
        })
    })
  }

}

// mutations
const mutations = {

  [types.GET_COLLECTIONS] (state, collections) {
    state.collections = collections
  },

  [types.GET_COLLECTION_ERRORS] (state, error) {
    state.collectionErrors = error
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
