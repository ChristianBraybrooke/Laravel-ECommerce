import 'babel-polyfill'
import Vue from 'vue'
import Element from 'element-ui'
import router from './router/'
import store from './store/index.js'
import Admin from './admin.vue'
import locale from 'element-ui/lib/locale/lang/en'
import VueClipboard from 'vue-clipboard2'
import { codeConverter } from 'utils/currency'

window.ecommerceConfig.web_version = '0.0.67'

const bugsnag = require('bugsnag-js')
const bugsnagClient = bugsnag({ apiKey: window.bugsnag.key, appVersion: window.ecommerceConfig.web_version, releaseStage: window.bugsnag.env })
window.has = require('lodash.has')
var numeral = require('numeral')

if (window.bugsnag.active) {
  const bugsnagVue = require('bugsnag-vue')
  bugsnagClient.use(bugsnagVue(Vue))

  bugsnagClient.user = window.bugsnag.user
}

let token = document.head.querySelector('meta[name="csrf-token"]')
window.laravel_token = token.content

Vue.use(Element, { locale })
Vue.use(VueClipboard)

Vue.mixin({
  computed: {
    getSiteBaseURL (value) {
      return window.ecommerceConfig.site_url + '/'
    },

    ecommerceConfig () {
      return window.ecommerceConfig
    }
  },
  methods: {
    currencyCodeToSymbol (code, fallback = '') {
      return codeConverter(code, fallback)
    },

    objectHas (object, value) {
      return window.has(object, value)
    },

    copy (val) {
      this.$copyText(val).then((e) => {
        this.$message({
          message: 'Successfully copied text!',
          type: 'success',
          showClose: true
        })
      }, (e) => {
        this.$message({
          message: 'Cannot copy text.',
          type: 'error',
          showClose: true
        })
      })
    },

    capitalize (str) {
      var lower = str.toLowerCase()
      return lower.replace(/(^| )(\w)/g, function (x) {
        return x.toUpperCase()
      })
    },

    simplePrice (price) {
      price = String(price)
      return parseFloat(price.replace(/,/g, ''))
    },

    formatPrice (price, prepend = '', append = '') {
      var number = this.simplePrice(price)
      return prepend + numeral(number).format('0,0.00') + append
    }
  }
})

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  router,
  store,
  render: h => h(Admin)
}).$mount('#app')
