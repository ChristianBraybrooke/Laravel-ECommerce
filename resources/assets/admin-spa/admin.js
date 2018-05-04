window.ecommerceConfig.web_version = '0.0.17';

import 'babel-polyfill';

window.Vue = require('vue');
import Element from 'element-ui';
import router from './router/';
import store from './store/index.js';
import Admin from './admin.vue';
import locale from 'element-ui/lib/locale/lang/en';

import './axios.js';


Vue.use(Element, {locale});

import { mapActions, mapGetters } from 'vuex';
Vue.mixin({
    computed: {
        getSiteBaseURL(value) {
            return ecommerceConfig.site_url + '/';
        },
    },
});

var has = require('lodash.has');

Vue.mixin({
    methods: {
        objectHas(object, value)
        {
            return has(object, value);
        },

        capitalize(str)
        {
            var lower = str.toLowerCase();
            return lower.replace(/(^| )(\w)/g, function(x) {
              return x.toUpperCase();
            });
        },
    }
});


const app = new Vue({
    router,
    el: '#app',
    store,
    render: h => h(Admin),
});
