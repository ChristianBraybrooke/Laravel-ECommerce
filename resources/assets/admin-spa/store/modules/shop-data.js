import * as types from '../mutation-types'
import api from 'services/api-service'

// initial state
const state = {
  shopData: {},
  shopDataErrors: []
}

// getters
const getters = {
  shopData: state => state.shopData,
  shopDataErrors: state => state.shopDataErrors
}

// actions
const actions = {

  getShopData ({ commit, dispatch }, data = {}) {
    console.log('Vuex: Get Shop Data')

    data.path = window._.has(data, 'path') ? data.path : 'shop-data'

    if (!window._.has(data, 'params')) {
      data.params = {}
    }
    data.params.orderBy = window._.has(data, 'params.orderBy') ? data.params.orderBy : 'name'
    data.params.ascending = window._.has(data, 'params.ascending') ? data.params.ascending : 1

    return new Promise((resolve, reject) => {
      api.get(data)
        .then(function (response) {
          commit(types.GET_SHOP_DATA, response.data)
          commit(types.GET_SHOP_DATA_ERRORS, [])
          resolve(response)
        })
        .catch(function (error) {
          commit(types.GET_SHOP_DATA_ERRORS, error)
          reject(error)
        })
    })
  },

  setShopData ({ commit, dispatch }, data = {}) {
    console.log('Vuex: Set Shop Data')
    commit(types.GET_SHOP_DATA, data)
    commit(types.GET_SHOP_DATA_ERRORS, [])
  }

}

// mutations
const mutations = {

  [types.GET_SHOP_DATA] (state, shopData) {
    state.shopData = shopData
  },

  [types.GET_SHOP_DATA_ERRORS] (state, error) {
    state.shopDataErrors = error
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
