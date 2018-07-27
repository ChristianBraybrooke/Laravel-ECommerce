webpackJsonp([25],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/estimates/NewEstimate.vue":
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

    name: 'NewEstimate',

    components: {
        ProductForm: function ProductForm() {
            return __webpack_require__.e/* import() */(36).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/ProductForm.vue"));
        },
        ProductTable: function ProductTable() {
            return __webpack_require__.e/* import() */(35).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/ProductTable.vue"));
        },
        AddressForm: function AddressForm() {
            return __webpack_require__.e/* import() */(37).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/AddressForm.vue"));
        },
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(31/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        }
    },

    data: function data() {
        return {
            loading: false,
            errors: {},
            order: {
                status: 'Estimate',
                customer: {},
                shipping_rate: 60,
                discount_rate: 0,
                billing_address: {},
                shipping_address: {},
                items: [],
                cart: {
                    totals: {
                        Shipping: 60,
                        Discount: 0
                    }
                },
                use_billing_for_shipping: false,
                needs_address: 'No Address'
            }
        };
    },


    computed: {
        orderTotals: function orderTotals() {
            return _order2.default.totals(this.order.items, this.order.cart.totals['Shipping'], this.order.cart.totals['Discount']);
        }
    },

    mounted: function mounted() {
        console.log('NewEstimate.vue mounted!');
    },


    methods: {
        addProductToTable: function addProductToTable(product) {
            this.order.items.push(product);
        },
        processSubmit: function processSubmit() {
            var _this = this;

            this.loading = true;
            this.errors = {};

            _apiService2.default.persist("post", {
                path: "orders",
                object: this.order
            }).then(function (data) {
                _this.loading = false;
                _this.$router.push({ name: 'orders.view', params: { orderId: data.data.id.toString() } });
            }).catch(function (error) {
                _this.loading = false;
                _this.errors = error;
            });
        }
    }
};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2a173688\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/NewEstimate.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-2a173688\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/estimates/NewEstimate.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "loading",
          rawName: "v-loading",
          value: _vm.loading,
          expression: "loading"
        }
      ]
    },
    [
      _c(
        "el-breadcrumb",
        {
          staticClass: "breadcrumbs",
          attrs: { "separator-class": "el-icon-arrow-right" }
        },
        [
          _c("el-breadcrumb-item", { attrs: { to: { name: "estimates" } } }, [
            _vm._v("Estimates")
          ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v("New Estimate")])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-row",
        { attrs: { align: "middle", type: "flex" } },
        [
          _c("el-col", { attrs: { span: 12 } }, [
            _c("h1", { staticClass: "page_title" }, [_vm._v("New Estimate")])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("hr", { staticClass: "page_hr" }),
      _vm._v(" "),
      Object.keys(_vm.errors).length > 0
        ? _c("errors", { attrs: { errors: _vm.errors } })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-form",
        {
          ref: "orderForm",
          attrs: { "label-position": "top", model: _vm.order },
          nativeOn: {
            submit: function($event) {
              $event.preventDefault()
            }
          }
        },
        [
          _c(
            "el-row",
            { attrs: { gutter: 20 } },
            [
              _c(
                "el-col",
                { attrs: { md: { span: 8, offset: 4 } } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "Customer First Name",
                        size: "small",
                        prop: "customer.first_name"
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { autofocus: true, "auto-complete": "off" },
                        model: {
                          value: _vm.order.customer.first_name,
                          callback: function($$v) {
                            _vm.$set(_vm.order.customer, "first_name", $$v)
                          },
                          expression: "order.customer.first_name"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-col",
                { attrs: { md: 8 } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "Customer Last Name",
                        size: "small",
                        prop: "customer.last_name"
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { autofocus: true, "auto-complete": "off" },
                        model: {
                          value: _vm.order.customer.last_name,
                          callback: function($$v) {
                            _vm.$set(_vm.order.customer, "last_name", $$v)
                          },
                          expression: "order.customer.last_name"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-row",
            { attrs: { gutter: 20 } },
            [
              _c(
                "el-col",
                { attrs: { md: { span: 8, offset: 4 } } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "Customer Phone",
                        size: "small",
                        prop: "customer.phone"
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { autofocus: true, "auto-complete": "off" },
                        model: {
                          value: _vm.order.customer.phone,
                          callback: function($$v) {
                            _vm.$set(_vm.order.customer, "phone", $$v)
                          },
                          expression: "order.customer.phone"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-col",
                { attrs: { md: 8 } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "Customer Email",
                        size: "small",
                        prop: "customer.email"
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { autofocus: true, "auto-complete": "off" },
                        model: {
                          value: _vm.order.customer.email,
                          callback: function($$v) {
                            _vm.$set(_vm.order.customer, "email", $$v)
                          },
                          expression: "order.customer.email"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c(
            "el-row",
            { attrs: { gutter: 20 } },
            [
              _c(
                "el-col",
                { attrs: { md: { span: 24 } } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "Address",
                        size: "small",
                        prop: "needs_address"
                      }
                    },
                    [
                      _c(
                        "div",
                        [
                          _c(
                            "el-radio-group",
                            {
                              attrs: { size: "small" },
                              model: {
                                value: _vm.order.needs_address,
                                callback: function($$v) {
                                  _vm.$set(_vm.order, "needs_address", $$v)
                                },
                                expression: "order.needs_address"
                              }
                            },
                            [
                              _c("el-radio-button", {
                                attrs: { label: "Needs Address" }
                              }),
                              _vm._v(" "),
                              _c("el-radio-button", {
                                attrs: { label: "No Address" }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm.order.needs_address === "Needs Address"
            ? _c(
                "el-row",
                { attrs: { gutter: 20 } },
                [
                  _c(
                    "el-col",
                    { attrs: { md: 12 } },
                    [
                      _c("h5", [_vm._v("Billing Adress")]),
                      _vm._v(" "),
                      _c("address-form", {
                        attrs: {
                          form: _vm.order.billing_address,
                          prop: "billing_address"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { md: 12 } },
                    [
                      _c("h5", [_vm._v("Billing Adress")]),
                      _vm._v(" "),
                      _c(
                        "el-col",
                        { attrs: { md: { span: 24 } } },
                        [
                          _c(
                            "el-checkbox",
                            {
                              model: {
                                value: _vm.order.use_billing_for_shipping,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.order,
                                    "use_billing_for_shipping",
                                    $$v
                                  )
                                },
                                expression: "order.use_billing_for_shipping"
                              }
                            },
                            [_vm._v("Same As Billing Address")]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      !_vm.order.use_billing_for_shipping
                        ? _c("address-form", {
                            attrs: {
                              form: _vm.order.shipping_address,
                              prop: "shipping_address"
                            }
                          })
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-row",
        {
          staticStyle: { "margin-top": "20px", "margin-bottom": "20px" },
          attrs: { gutter: 20 }
        },
        [
          _c(
            "el-col",
            { attrs: { span: 12 } },
            [
              _c("product-form", {
                attrs: { "on-product-add": _vm.addProductToTable }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.order.items
        ? _c(
            "el-row",
            { attrs: { gutter: 20 } },
            [
              _c(
                "el-col",
                { attrs: { span: 24 } },
                [
                  _c("product-table", {
                    attrs: {
                      editable: true,
                      order: _vm.order,
                      "order-totals": _vm.orderTotals
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-row",
        { staticStyle: { "margin-top": "40px" }, attrs: { gutter: 20 } },
        [
          _c(
            "el-col",
            { attrs: { md: { span: 24 } } },
            [
              _c(
                "el-button",
                {
                  attrs: { type: "primary" },
                  on: {
                    click: function($event) {
                      _vm.processSubmit()
                    }
                  }
                },
                [_vm._v("Create Estimate")]
              )
            ],
            1
          )
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
    require("vue-hot-reload-api")      .rerender("data-v-2a173688", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2a173688\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/NewEstimate.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2a173688\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/NewEstimate.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("65343773", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2a173688\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NewEstimate.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2a173688\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NewEstimate.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/pages/estimates/NewEstimate.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2a173688\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/NewEstimate.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/estimates/NewEstimate.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-2a173688\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/estimates/NewEstimate.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/estimates/NewEstimate.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2a173688", Component.options)
  } else {
    hotAPI.reload("data-v-2a173688", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});