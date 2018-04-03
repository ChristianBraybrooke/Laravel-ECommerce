import * as types from '../mutation-types';
var forEach = require('lodash.foreach');

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
  orderTotals(state) {

      var operators = {
          '+': function(a, b) { return parseInt(a) + parseInt(b) },
          '-': function(a, b) { return parseInt(a) - parseInt(b) },
      };

      var sub_total = 0;
      var extras = 0;
      forEach(state.order.items, function(item, key) {
          var quantity = item.quantity ? item.quantity : 1;
          sub_total = sub_total + (parseInt(item.price) * quantity);

          forEach(item.options, function(option) {
              if (option.price_mutator && option.price_value) {
                  extras = extras + (operators[option.price_mutator](extras, option.price_value) * quantity);
              }
          });
      });

      var vat = (sub_total + extras) * 0.2;
      return [
          {
              total: 'Sub-Total',
              value: sub_total
          },
          {
              total: 'Extras',
              value: extras
          },
          {
              total: 'VAT',
              value: vat
          },
          {
              total: 'Total',
              value: sub_total + extras + vat
          },
      ]
  }
}

// actions
const actions = {

  setOrder ({commit, dispatch}, data = {}) {
      console.log('Vuex: Set Order');
      commit(types.SET_ORDER, data);

  },

  deleteOrderItem ({commit, dispatch}, item) {
      console.log('Vuex: Delete Order Item');
      commit(types.DELETE_ITEM, item);

  },

  editOrderItem({state, commit, dispatch}, item)
  {
      console.log('Vuex: Update Order Item');
      var item_index = state.order.items.indexOf(item);
      state.order.items[item_index] = item;
  },

}

// mutations
const mutations = {

  [types.SET_ORDER] (state, order) {
    state.order = order;
  },

  [types.ADD_PRODUCT_TO_ORDER] (state, product) {
    state.order.items.push(product);
  },

  [types.DELETE_ITEM] (state, item) {
    state.order.items.splice(state.order.items.indexOf(item), 1);
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}
