webpackJsonp([39],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/PaymentForm.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _apiService = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");

var _apiService2 = _interopRequireDefault(_apiService);

var _vuex = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    name: 'PaymentForm',

    components: {
        CardPaymentForm: function CardPaymentForm() {
            return __webpack_require__.e/* import() */(49).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/CardPaymentForm.vue"));
        },
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(31/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        }
    },

    props: {
        order: {
            required: true,
            type: Object
        },
        showNoneOption: {
            required: false,
            type: Boolean,
            default: function _default() {
                return false;
            }
        },
        startingAmount: {
            required: false,
            type: [String, Number],
            default: function _default() {
                return null;
            }
        },
        disableAmount: {
            required: false,
            type: Boolean,
            default: function _default() {
                return false;
            }
        },
        onPaymentProcessed: {
            required: false,
            default: function _default() {
                return function (payment) {};
            }
        }
    },

    data: function data() {
        return {
            activePaymentTab: 'card',
            loading: false,
            errors: {},
            model: {
                order: {}
            }
        };
    },


    computed: _extends({}, (0, _vuex.mapGetters)(['shopData'])),

    watch: {
        activePaymentTab: function activePaymentTab(val) {
            this.errors = {};
        }
    },

    mounted: function mounted() {
        console.log('PaymentForm.vue mounted!');

        this.model.payment_amount = this.startingAmount;
    },


    methods: {
        onTokenCreation: function onTokenCreation(error) {
            if (!error) {
                this.processPayment();
            }
        },
        onCardFormSubmit: function onCardFormSubmit() {
            this.$refs['paymentForm'].validate();
        },
        processPayment: function processPayment() {
            var _this = this;

            if (this.activePaymentTab !== 'none') {
                this.$refs['paymentForm'].validate(function (valid, errors) {
                    if (valid) {
                        if (_this.activePaymentTab !== 'other') {
                            _this.model.payment_method = _this.activePaymentTab;
                        }
                        _this.model.order.id = _this.order.id;
                        _this.loading = true;
                        _this.model.include = ['payment.reference', 'payment.method', 'payment.currency', 'payment.amount', 'payment.fee', 'payment.source'];
                        _apiService2.default.persist('post', {
                            path: 'payments',
                            object: _this.model
                        }).then(function (data) {
                            _this.onPaymentProcessed(data.data);
                            _this.loading = false;
                            _this.model = {
                                order: {}
                            };
                            _this.errors = {};
                        }).catch(function (error) {
                            _this.errors = error;
                            _this.loading = false;
                        });
                    } else {
                        _this.errors = {
                            message: 'There are required feilds empty below.'
                        };
                    }
                });
            } else {
                this.onPaymentProcessed({});
            }
        }
    }

};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6cbbec44\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/PaymentForm.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6cbbec44\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/PaymentForm.vue":
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
      Object.keys(_vm.errors).length > 0
        ? _c("errors", { attrs: { errors: _vm.errors } })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-form",
        {
          ref: "paymentForm",
          attrs: { model: _vm.model, "label-position": "top" }
        },
        [
          _c(
            "el-tabs",
            {
              model: {
                value: _vm.activePaymentTab,
                callback: function($$v) {
                  _vm.activePaymentTab = $$v
                },
                expression: "activePaymentTab"
              }
            },
            [
              _c(
                "el-tab-pane",
                { attrs: { label: "Card", name: "card" } },
                [
                  _vm.activePaymentTab === "card"
                    ? _c(
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
                                    label: "Payment Amount",
                                    size: "small",
                                    prop: "payment_amount",
                                    disabled: _vm.disableAmount,
                                    rules: [
                                      {
                                        required: true,
                                        message: "Payment amount is required.",
                                        trigger: "blur,change"
                                      }
                                    ]
                                  }
                                },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "price_changer" },
                                    [
                                      _c(
                                        "span",
                                        { staticClass: "currency --small" },
                                        [_vm._v(_vm._s(_vm.shopData.currency))]
                                      ),
                                      _c("el-input-number", {
                                        attrs: {
                                          size: "small",
                                          autofocus: true,
                                          controls: false,
                                          min: 1,
                                          precision: 2,
                                          "controls-position": "right"
                                        },
                                        model: {
                                          value: _vm.model.payment_amount,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.model,
                                              "payment_amount",
                                              $$v
                                            )
                                          },
                                          expression: "model.payment_amount"
                                        }
                                      })
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
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.activePaymentTab === "card"
                    ? _c(
                        "card-payment-form",
                        {
                          attrs: {
                            model: _vm.model,
                            "on-form-submit": _vm.onCardFormSubmit,
                            loading: _vm.loading,
                            "on-token-creation": _vm.onTokenCreation
                          }
                        },
                        [
                          _c(
                            "template",
                            { slot: "after_form" },
                            [
                              _vm.activePaymentTab === "card"
                                ? _c(
                                    "el-row",
                                    { attrs: { gutter: 20 } },
                                    [
                                      _c(
                                        "el-col",
                                        {
                                          attrs: { md: { span: 16, offset: 4 } }
                                        },
                                        [
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: "Payment Notes",
                                                size: "small",
                                                prop: "payment_notes"
                                              }
                                            },
                                            [
                                              _c("el-input", {
                                                attrs: {
                                                  type: "textarea",
                                                  autosize: {
                                                    minRows: 2,
                                                    maxRows: 4
                                                  }
                                                },
                                                model: {
                                                  value:
                                                    _vm.model.payment_notes,
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.model,
                                                      "payment_notes",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "model.payment_notes"
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
                                  )
                                : _vm._e()
                            ],
                            1
                          )
                        ],
                        2
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-tab-pane",
                { attrs: { label: "BACS", name: "bacs" } },
                [
                  _vm.activePaymentTab === "bacs"
                    ? _c(
                        "el-row",
                        { attrs: { gutter: 20 } },
                        [
                          _c(
                            "el-col",
                            { attrs: { md: { span: 4, offset: 4 } } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: "Payment Amount",
                                    size: "small",
                                    prop: "payment_amount",
                                    disabled: _vm.disableAmount,
                                    rules: [
                                      {
                                        required: true,
                                        message: "Payment amount is required.",
                                        trigger: "blur,change"
                                      }
                                    ]
                                  }
                                },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "price_changer" },
                                    [
                                      _c(
                                        "span",
                                        { staticClass: "currency --small" },
                                        [_vm._v(_vm._s(_vm.shopData.currency))]
                                      ),
                                      _c("el-input-number", {
                                        attrs: {
                                          size: "small",
                                          autofocus: true,
                                          controls: false,
                                          min: 1,
                                          precision: 2,
                                          "controls-position": "right"
                                        },
                                        model: {
                                          value: _vm.model.payment_amount,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.model,
                                              "payment_amount",
                                              $$v
                                            )
                                          },
                                          expression: "model.payment_amount"
                                        }
                                      })
                                    ],
                                    1
                                  )
                                ]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-col",
                            { attrs: { md: 12 } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: "Payment Reference",
                                    size: "small",
                                    prop: "payment_reference",
                                    rules: [
                                      {
                                        required: true,
                                        message:
                                          "Payment reference is required.",
                                        trigger: "blur,change"
                                      }
                                    ]
                                  }
                                },
                                [
                                  _c("el-input", {
                                    attrs: {
                                      autofocus: true,
                                      "auto-complete": "off"
                                    },
                                    model: {
                                      value: _vm.model.payment_reference,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.model,
                                          "payment_reference",
                                          $$v
                                        )
                                      },
                                      expression: "model.payment_reference"
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
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.activePaymentTab === "bacs"
                    ? _c(
                        "el-row",
                        { attrs: { gutter: 20 } },
                        [
                          _c(
                            "el-col",
                            { attrs: { md: { span: 16, offset: 4 } } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: "Payment Notes",
                                    size: "small",
                                    prop: "payment_notes"
                                  }
                                },
                                [
                                  _c("el-input", {
                                    attrs: {
                                      type: "textarea",
                                      autosize: { minRows: 2, maxRows: 4 }
                                    },
                                    model: {
                                      value: _vm.model.payment_notes,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.model,
                                          "payment_notes",
                                          $$v
                                        )
                                      },
                                      expression: "model.payment_notes"
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
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-tab-pane",
                { attrs: { label: "Other", name: "other" } },
                [
                  _vm.activePaymentTab === "other"
                    ? _c(
                        "el-row",
                        { attrs: { gutter: 20 } },
                        [
                          _c(
                            "el-col",
                            { attrs: { md: { span: 4, offset: 4 } } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: "Payment Amount",
                                    size: "small",
                                    prop: "payment_amount",
                                    disabled: _vm.disableAmount,
                                    rules: [
                                      {
                                        required: true,
                                        message: "Payment amount is required.",
                                        trigger: "blur,change"
                                      }
                                    ]
                                  }
                                },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "price_changer" },
                                    [
                                      _c(
                                        "span",
                                        { staticClass: "currency --small" },
                                        [_vm._v(_vm._s(_vm.shopData.currency))]
                                      ),
                                      _c("el-input-number", {
                                        attrs: {
                                          size: "small",
                                          autofocus: true,
                                          controls: false,
                                          min: 1,
                                          precision: 2,
                                          "controls-position": "right"
                                        },
                                        model: {
                                          value: _vm.model.payment_amount,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.model,
                                              "payment_amount",
                                              $$v
                                            )
                                          },
                                          expression: "model.payment_amount"
                                        }
                                      })
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
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.activePaymentTab === "other"
                    ? _c(
                        "el-row",
                        { attrs: { gutter: 20 } },
                        [
                          _c(
                            "el-col",
                            { attrs: { md: { span: 4, offset: 4 } } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: "Payment Method",
                                    size: "small",
                                    prop: "payment_method",
                                    rules: [
                                      {
                                        required: true,
                                        message: "Payment method is required.",
                                        trigger: "blur,change"
                                      }
                                    ]
                                  }
                                },
                                [
                                  _c("el-input", {
                                    attrs: {
                                      autofocus: true,
                                      "auto-complete": "off"
                                    },
                                    model: {
                                      value: _vm.model.payment_method,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.model,
                                          "payment_method",
                                          $$v
                                        )
                                      },
                                      expression: "model.payment_method"
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
                            { attrs: { md: 12 } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: "Payment Reference",
                                    size: "small",
                                    prop: "payment_reference",
                                    rules: [
                                      {
                                        required: true,
                                        message:
                                          "Payment reference is required.",
                                        trigger: "blur,change"
                                      }
                                    ]
                                  }
                                },
                                [
                                  _c("el-input", {
                                    attrs: {
                                      autofocus: true,
                                      "auto-complete": "off"
                                    },
                                    model: {
                                      value: _vm.model.payment_reference,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.model,
                                          "payment_reference",
                                          $$v
                                        )
                                      },
                                      expression: "model.payment_reference"
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
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.activePaymentTab === "other"
                    ? _c(
                        "el-row",
                        { attrs: { gutter: 20 } },
                        [
                          _c(
                            "el-col",
                            { attrs: { md: { span: 16, offset: 4 } } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: "Payment Notes",
                                    size: "small",
                                    prop: "payment_notes"
                                  }
                                },
                                [
                                  _c("el-input", {
                                    attrs: {
                                      type: "textarea",
                                      autosize: { minRows: 2, maxRows: 4 }
                                    },
                                    model: {
                                      value: _vm.model.payment_notes,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.model,
                                          "payment_notes",
                                          $$v
                                        )
                                      },
                                      expression: "model.payment_notes"
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
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c("el-tab-pane", {
                attrs: { label: "On Account", name: "account" }
              }),
              _vm._v(" "),
              _vm.showNoneOption
                ? _c("el-tab-pane", { attrs: { label: "None", name: "none" } })
                : _vm._e(),
              _vm._v(" "),
              _vm.activePaymentTab !== "card"
                ? _c(
                    "el-row",
                    { attrs: { gutter: 20 } },
                    [
                      _c(
                        "el-col",
                        { attrs: { md: { span: 16, offset: 4 } } },
                        [
                          _c(
                            "el-button",
                            {
                              attrs: { type: "success", loading: _vm.loading },
                              on: { click: _vm.processPayment }
                            },
                            [_vm._v("Process Payment")]
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
    require("vue-hot-reload-api")      .rerender("data-v-6cbbec44", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6cbbec44\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/PaymentForm.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6cbbec44\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/PaymentForm.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("7a1bc01f", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6cbbec44\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PaymentForm.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6cbbec44\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PaymentForm.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/components/PaymentForm.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6cbbec44\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/PaymentForm.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/PaymentForm.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6cbbec44\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/PaymentForm.vue")
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
Component.options.__file = "resources/assets/admin-spa/components/PaymentForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6cbbec44", Component.options)
  } else {
    hotAPI.reload("data-v-6cbbec44", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});