webpackJsonp([40],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/CustomerInformationForm.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_services_api_service__ = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'CustomerInformationForm',
  components: {
    AddressForm: function AddressForm() {
      return __webpack_require__.e/* import() */(41).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/AddressForm.vue"));
    }
  },
  props: {
    form: {
      required: true,
      type: Object
    }
  },
  data: function data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted: function mounted() {
    if (!this.form.billing_address.billing_address) {
      this.form.billing_address = {
        country: 'United Kingdom'
      };
    }

    if (!this.form.shipping_address.billing_address) {
      this.form.shipping_address = {
        country: 'United Kingdom'
      };
    }
  },
  methods: {
    getCustomers: function getCustomers(queryString, callback) {
      __WEBPACK_IMPORTED_MODULE_0_services_api_service__["a" /* default */].get({
        path: 'users',
        params: {
          search: queryString
        }
      }).then(function (data) {
        callback(data.data);
      })["catch"](function () {//
      });
    },
    resetCustomer: function resetCustomer() {
      this.form.customer.id = null;
      this.form.customer.company = null;
    },
    handleCustomerSelect: function handleCustomerSelect(customer) {
      this.form.customer.id = customer.id;
      this.form.customer.first_name = customer.name.first;
      this.form.customer.last_name = customer.name.last;
      this.form.customer.phone = customer.phone;
      this.form.customer.email = customer.email;
      this.form.billing_address = _objectSpread({}, customer.billing_address, this.form.billing_address);
      this.form.shipping_address = _objectSpread({}, customer.shipping_address, this.form.shipping_address);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-30fc2774\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/CustomerInformationForm.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-30fc2774\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/CustomerInformationForm.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {},
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
                    label: "Customer Company",
                    size: "small",
                    prop: "customer.company"
                  }
                },
                [
                  _c("el-autocomplete", {
                    attrs: {
                      autofocus: true,
                      disabled: _vm.form.customer.id ? true : false,
                      "fetch-suggestions": _vm.getCustomers,
                      "value-key": "email"
                    },
                    on: { select: _vm.handleCustomerSelect },
                    model: {
                      value: _vm.form.customer.company,
                      callback: function($$v) {
                        _vm.$set(_vm.form.customer, "company", $$v)
                      },
                      expression: "form.customer.company"
                    }
                  }),
                  _vm._v(" "),
                  _vm.form.customer.id
                    ? _c(
                        "el-button",
                        {
                          attrs: { type: "warning", size: "mini" },
                          on: { click: _vm.resetCustomer }
                        },
                        [_vm._v("Reset Customer")]
                      )
                    : _vm._e()
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
                    label: "Customer First Name",
                    size: "small",
                    prop: "customer.first_name"
                  }
                },
                [
                  _c("el-input", {
                    attrs: { autofocus: true, "auto-complete": "off" },
                    model: {
                      value: _vm.form.customer.first_name,
                      callback: function($$v) {
                        _vm.$set(_vm.form.customer, "first_name", $$v)
                      },
                      expression: "form.customer.first_name"
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
                      value: _vm.form.customer.last_name,
                      callback: function($$v) {
                        _vm.$set(_vm.form.customer, "last_name", $$v)
                      },
                      expression: "form.customer.last_name"
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
                      value: _vm.form.customer.phone,
                      callback: function($$v) {
                        _vm.$set(_vm.form.customer, "phone", $$v)
                      },
                      expression: "form.customer.phone"
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
                      value: _vm.form.customer.email,
                      callback: function($$v) {
                        _vm.$set(_vm.form.customer, "email", $$v)
                      },
                      expression: "form.customer.email"
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
            { attrs: { md: { span: 8, offset: 4 } } },
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
                            value: _vm.form.needs_address,
                            callback: function($$v) {
                              _vm.$set(_vm.form, "needs_address", $$v)
                            },
                            expression: "form.needs_address"
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
      _vm.form.needs_address === "Needs Address"
        ? _c(
            "el-row",
            { attrs: { gutter: 20 } },
            [
              _c(
                "el-col",
                { attrs: { md: { span: 8, offset: 4 } } },
                [
                  _c("h5", [_vm._v("Billing Address")]),
                  _vm._v(" "),
                  _c("address-form", {
                    attrs: {
                      offset: 0,
                      span: 12,
                      form: _vm.form.billing_address,
                      prop: "billing_address"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { md: { span: 24 } } },
                    [
                      _c(
                        "el-checkbox",
                        {
                          model: {
                            value: _vm.form.save_billing_address,
                            callback: function($$v) {
                              _vm.$set(_vm.form, "save_billing_address", $$v)
                            },
                            expression: "form.save_billing_address"
                          }
                        },
                        [_vm._v("Save Billing Address")]
                      )
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
                  _c("h5", [_vm._v("Shipping Address")]),
                  _vm._v(" "),
                  !_vm.form.use_billing_for_shipping
                    ? _c("address-form", {
                        attrs: {
                          offset: 0,
                          span: 12,
                          form: _vm.form.shipping_address,
                          prop: "shipping_address"
                        }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "el-col",
                    { attrs: { md: { span: 24 } } },
                    [
                      _c(
                        "el-checkbox",
                        {
                          model: {
                            value: _vm.form.use_billing_for_shipping,
                            callback: function($$v) {
                              _vm.$set(
                                _vm.form,
                                "use_billing_for_shipping",
                                $$v
                              )
                            },
                            expression: "form.use_billing_for_shipping"
                          }
                        },
                        [_vm._v("Same As Billing Address")]
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
        : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-30fc2774", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-30fc2774\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/CustomerInformationForm.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-30fc2774\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/CustomerInformationForm.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("6532349e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-30fc2774\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CustomerInformationForm.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-30fc2774\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CustomerInformationForm.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/components/CustomerInformationForm.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-30fc2774\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/CustomerInformationForm.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/CustomerInformationForm.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-30fc2774\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/CustomerInformationForm.vue")
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
Component.options.__file = "resources/assets/admin-spa/components/CustomerInformationForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-30fc2774", Component.options)
  } else {
    hotAPI.reload("data-v-30fc2774", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});