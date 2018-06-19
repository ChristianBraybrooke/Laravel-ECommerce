window.ecommerceConfig.web_version = '0.0.25';

import 'babel-polyfill';
import Vue from 'vue';
import Element from 'element-ui';
import router from './router/';
import store from './store/index.js';
import Admin from './admin.vue';
import locale from 'element-ui/lib/locale/lang/en';
import { mapActions, mapGetters } from 'vuex';
window.has = require('lodash.has');
var numeral = require('numeral');

Vue.use(Element, {locale});

Vue.mixin({
    computed: {
        getSiteBaseURL(value) {
            return ecommerceConfig.site_url + '/';
        },
    },
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
        formatPrice(price, prepend = '', append = '')
        {
            var price = String(price);
            var number = parseFloat(price.replace(/,/g, ''));
            return prepend + numeral(number).format('0,0.00') + append;
        }
    }
});

Vue.config.productionTip = false

const app = new Vue({
    router,
    store,
    render: h => h(Admin),
}).$mount('#app');
