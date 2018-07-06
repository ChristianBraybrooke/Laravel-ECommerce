webpackJsonp([53],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/Payments.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {

    name: 'Payments',

    components: {
        PaymentDetails: function PaymentDetails() {
            return __webpack_require__.e/* import() */(48).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/PaymentDetails.vue"));
        },
        PaymentForm: function PaymentForm() {
            return __webpack_require__.e/* import() */(40).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/PaymentForm.vue"));
        }
    },

    props: {
        payments: {
            type: Array,
            required: true
        },
        order: {
            type: Object,
            required: true
        },
        onPaymentProcessed: {
            type: Function,
            required: false,
            default: function _default() {
                return function (payment) {};
            }
        },
        showPayments: {
            type: Boolean,
            required: false,
            default: function _default() {
                return true;
            }
        },
        formStartingAmount: {
            required: false,
            type: [String, Number],
            default: function _default() {
                return null;
            }
        }
    },

    data: function data() {
        return {
            loading: false,
            showModal: false,
            payment: {}
        };
    },


    computed: {},

    watch: {},

    mounted: function mounted() {
        console.log('Payments.vue mounted!');
    },


    methods: {
        closeAndClearModal: function closeAndClearModal() {
            var _this = this;

            this.$confirm('Are you sure to close the payment form?').then(function (_) {
                _this.showModal = false;
            }).catch(function (_) {});
        },
        clearModal: function clearModal(payment) {
            this.onPaymentProcessed(payment);
            this.$emit('payment-processed', payment);
            this.order.payments.data.push(payment);
            this.showModal = false;
        },
        displayModal: function displayModal() {
            this.showModal = true;
        }
    }

};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-db37f72e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/Payments.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-db37f72e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/Payments.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { loading: _vm.loading } },
    [
      _vm._t(
        "default",
        [
          _c(
            "el-button",
            {
              staticStyle: { "margin-bottom": "20px" },
              attrs: { type: "success", plain: "" },
              on: {
                click: function($event) {
                  _vm.showModal = true
                }
              }
            },
            [_vm._v("Add Payment")]
          )
        ],
        { showModal: _vm.displayModal }
      ),
      _vm._v(" "),
      _vm.showPayments
        ? _c("payment-details", { attrs: { payments: _vm.payments } })
        : _vm._e(),
      _vm._v(" "),
      _vm.showModal
        ? _c(
            "el-dialog",
            {
              attrs: {
                title: "Add Payment",
                "close-on-click-modal": false,
                "append-to-body": true,
                "before-close": _vm.closeAndClearModal,
                visible: _vm.showModal
              },
              on: {
                "update:visible": function($event) {
                  _vm.showModal = $event
                }
              }
            },
            [
              _c("payment-form", {
                attrs: {
                  "starting-amount": _vm.formStartingAmount,
                  model: _vm.payment,
                  order: _vm.order,
                  "on-payment-processed": _vm.clearModal
                }
              })
            ],
            1
          )
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-db37f72e", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-db37f72e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/Payments.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-db37f72e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/Payments.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("a9ab3ec0", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-db37f72e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Payments.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-db37f72e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Payments.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/components/Payments.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-db37f72e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/Payments.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/Payments.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-db37f72e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/Payments.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/admin-spa/components/Payments.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-db37f72e", Component.options)
  } else {
    hotAPI.reload("data-v-db37f72e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});