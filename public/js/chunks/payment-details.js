webpackJsonp([46],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/PaymentDetails.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _order = __webpack_require__("./resources/assets/admin-spa/utils/order.js");

var _order2 = _interopRequireDefault(_order);

var _apiService = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");

var _apiService2 = _interopRequireDefault(_apiService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    name: 'PaymentDetails',

    components: {
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(31/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        }
    },

    props: {
        payments: {
            type: Array,
            required: true
        },
        editable: {
            type: Boolean,
            required: false,
            default: function _default() {
                return true;
            }
        }
    },

    data: function data() {
        return {
            errors: {}
        };
    },


    computed: {
        totalPaid: function totalPaid() {
            return _order2.default.paymentTotal(this.payments);
        }
    },

    watch: {},

    mounted: function mounted() {
        console.log('PaymentDetails.vue mounted!');
    },


    methods: {
        markPaymentRefunded: function markPaymentRefunded(payment) {
            var _this = this;

            payment.payment_refunded = true;
            _apiService2.default.persist('put', {
                path: 'payments/' + payment.id,
                object: payment
            }).then(function (data) {
                payment = data.data;
                _this.$message({
                    type: 'success',
                    message: 'Payment updated successfully.'
                });
            }).catch(function (error) {
                payment.payment_refunded = false;
                _this.errors = error;
                _this.$message({
                    type: 'error',
                    message: 'There was an error updating the payment.'
                });
            });
        }
    }

};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-168dffd0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/PaymentDetails.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-168dffd0\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/PaymentDetails.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      Object.keys(_vm.errors).length > 0
        ? _c("errors", { attrs: { errors: _vm.errors } })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-table",
        { staticStyle: { width: "100%" }, attrs: { data: _vm.payments } },
        [
          _c("el-table-column", {
            attrs: { prop: "created_at", label: "Payment Date" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(props) {
                  return [
                    _c("strong", [_vm._v(_vm._s(props.row.created_at.date))])
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "reference", label: "Payment Reference" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "method", label: "Payment Method" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              prop: "amount",
              label: "Payment Amount",
              formatter: function(row) {
                return _vm.formatPrice(
                  row.amount,
                  _vm.currencyCodeToSymbol(row.currency)
                )
              }
            }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "fee", label: "Payment Fee" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "notes", label: "Payment Notes" }
          }),
          _vm._v(" "),
          _vm.editable
            ? _c("el-table-column", {
                attrs: { prop: "actions", label: "Actions" },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(props) {
                      return [
                        props.row.link
                          ? _c(
                              "a",
                              {
                                attrs: {
                                  href: props.row.link,
                                  target: "_blank"
                                }
                              },
                              [
                                _c(
                                  "el-button",
                                  {
                                    staticClass: "action_btn left",
                                    attrs: {
                                      type: "primary",
                                      size: "mini",
                                      plain: ""
                                    },
                                    on: {
                                      click: function($event) {
                                        _vm.markPaymentRefunded(props.row)
                                      }
                                    }
                                  },
                                  [_vm._v("View Details")]
                                )
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        !props.row.refunded
                          ? _c(
                              "el-button",
                              {
                                staticClass: "action_btn",
                                attrs: {
                                  type: "danger",
                                  size: "mini",
                                  plain: ""
                                },
                                on: {
                                  click: function($event) {
                                    _vm.markPaymentRefunded(props.row)
                                  }
                                }
                              },
                              [_vm._v("Mark Refunded")]
                            )
                          : _vm._e()
                      ]
                    }
                  }
                ])
              })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-table",
        { staticStyle: { width: "100%" }, attrs: { data: [{}] } },
        [
          _c("el-table-column", { attrs: { prop: "reference", label: "" } }),
          _vm._v(" "),
          _c("el-table-column", { attrs: { prop: "reference", label: "" } }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "reference", label: "" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(props) {
                  return [_c("strong", [_vm._v("Total Paid")])]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "reference", label: "" },
            scopedSlots: _vm._u([
              {
                key: "default",
                fn: function(props) {
                  return [
                    _c("strong", [
                      _vm._v(_vm._s(_vm.formatPrice(_vm.totalPaid, "£")))
                    ])
                  ]
                }
              }
            ])
          }),
          _vm._v(" "),
          _c("el-table-column", { attrs: { prop: "reference", label: "" } }),
          _vm._v(" "),
          _c("el-table-column", { attrs: { prop: "reference", label: "" } }),
          _vm._v(" "),
          _vm.editable
            ? _c("el-table-column", { attrs: { prop: "reference", label: "" } })
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-168dffd0", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-168dffd0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/PaymentDetails.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-168dffd0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/PaymentDetails.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("45df6738", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-168dffd0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PaymentDetails.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-168dffd0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PaymentDetails.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/components/PaymentDetails.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-168dffd0\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/PaymentDetails.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/PaymentDetails.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-168dffd0\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/PaymentDetails.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-168dffd0"
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
Component.options.__file = "resources/assets/admin-spa/components/PaymentDetails.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-168dffd0", Component.options)
  } else {
    hotAPI.reload("data-v-168dffd0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});