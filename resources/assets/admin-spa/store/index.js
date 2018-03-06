import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import collections from './modules/collections';
import user from './modules/user';
import shopData from './modules/shop-data';

Vue.use(Vuex);

export default new Vuex.Store({
 modules: {
   collections,
   user,
   shopData
 },
 plugins: [createPersistedState({
   key: 'admin_storage',
   paths: ['user', 'shopData'],
 })],
});
