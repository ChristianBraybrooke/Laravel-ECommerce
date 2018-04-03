import * as types from '../mutation-types';

// initial state
const state = {
  order: {
      customer: {},
      billing_address: {},
      shipping_address: {},
      items: [],
      cart: {},
      use_billing_for_shipping: true,
      status: 'STATUS_DRAFT'
  },
}

// getters
const getters = {
  order: state => state.order,
}

// actions
const actions = {

  setOrder ({commit, dispatch}, data = {}) {
      console.log('Vuex: Set Order');
      commit(types.SET_ORDER, data);

  }

}

// mutations
const mutations = {

  [types.SET_ORDER] (state, order) {
    state.order = order;
  },

  [types.ADD_PRODUCT_TO_ORDER] (state, product) {
    state.order.items.push(product);
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}
