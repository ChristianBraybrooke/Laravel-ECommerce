webpackJsonp([36],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/components/CardPaymentForm.vue":
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var stripe = Stripe('pk_test_uAzfSI4OCDnMzvadYJWuFpfZ'),
    elements = stripe.elements(),
    card = undefined;

exports.default = {

    name: 'CardPaymentForm',

    components: {},

    props: {
        form: {
            type: Object,
            required: true
        },
        onTokenCreation: {
            type: Function,
            required: false,
            default: function _default() {
                return function (has_error, token_object, error_object) {};
            }
        },
        size: {
            type: String,
            required: false,
            default: function _default() {
                return '';
            }
        }
    },

    data: function data() {
        return {
            cardErrors: {
                number: null,
                date: null,
                cvc: null
            },
            loading: false,
            cardNumberElement: undefined,
            cardExpiryElement: undefined,
            cardCvcElement: undefined
        };
    },


    computed: {},

    watch: {},

    mounted: function mounted() {
        console.log('CardPaymentForm.vue Mounted');
        this.setupStripe();
    },


    methods: {

        /**
         * Setup the stripe element on the page.
         *
         * @return void
         */
        setupStripe: function setupStripe() {
            var is_mini = this.size.includes('mini');
            var is_small = this.size.includes('small');
            var is_medium = this.size.includes('medium');
            var color = '#606266';
            var placeholder_color = '#c0c4cc';

            var style = {
                base: {
                    fontSize: is_mini ? '12px' : is_small ? '13px' : is_medium ? '14px' : '14px',
                    color: color,
                    fontSmoothing: 'antialiased',
                    fontFamily: 'Helvetica Neue',
                    '::placeholder': {
                        color: placeholder_color
                    }
                },
                'invalid': {
                    'color': color
                }
            };

            // Create the card number element.
            this.cardNumberElement = elements.create('cardNumber', {
                style: style
            });
            this.cardNumberElement.mount(this.$refs.cardNumber);

            // Create the expiry date element.
            this.cardExpiryElement = elements.create('cardExpiry', {
                style: style
            });
            this.cardExpiryElement.mount(this.$refs.cardExpiry);

            // Create the cvc element.
            this.cardCvcElement = elements.create('cardCvc', {
                style: style
            });
            this.cardCvcElement.mount(this.$refs.cardCvc);

            this.listenForEvents();
        },


        /**
         * Listen for stripe events.
         *
         * @return void
         */
        listenForEvents: function listenForEvents() {
            // Card number change event.
            this.cardNumberElement.on('change', function (event, value) {
                // Switch brand logo.
                if (event.brand) {
                    this.setBrandIcon(event.brand);
                }

                console.log(event);
                console.log(this.cardNumberElement);
                if (!event.empty) {
                    this.$set(this.form, 'card_number', '4444');
                } else {
                    this.$set(this.form, 'card_number', null);
                }

                // Focus on next element.
                if (event.complete) {
                    this.cardExpiryElement.focus();
                }

                this.setOutcome(event, 'number_change');
            }.bind(this));

            // Card expiry change event.
            this.cardExpiryElement.on('change', function (event) {
                // Focus on next element.
                if (event.complete) {
                    this.cardCvcElement.focus();
                }

                this.setOutcome(event, 'expiry_change');
            }.bind(this));

            // Card cvc change event.
            this.cardCvcElement.on('change', function (event) {
                // Focus on next element.
                if (event.complete) {
                    // $payment_submit.focus();
                }

                this.setOutcome(event, 'cvc_change');
            }.bind(this));
        },


        /**
         * Set the card brand icon.
         *
         * @var string brand
         * @return void
         */
        setBrandIcon: function setBrandIcon(brand) {
            console.log(brand);
        },


        /**
         * Determine what happens on events.
         *
         * @var Object result
         * @var Mixed type
         * @return void
         */
        setOutcome: function setOutcome(result) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            // Hide card number error elements.
            if (type == 'number_change') {
                this.cardErrors.number = null;
            }

            // Hide card expiry error elements.
            if (type == 'expiry_change') {
                this.cardErrors.date = null;
            }

            // Hide card cvc error elements.
            if (type == 'cvc_change') {
                this.cardErrors.cvc = null;
            }

            if (result.token) {
                // Tell the parent that a token has been created.
                this.onTokenCreation(false, result.token, {});
                this.$set(this.form, 'payment_token', result.token.id);

                // Submit the form:
                this.loading = false;
            } else if (result.error) {
                // Tell the parent that a token hasn't been created.
                this.onTokenCreation(true, {}, result.error);

                // Re-enable the submit button.
                this.loading = false;

                // Display error
                this.handleError(result.error);
            }
        },


        /**
         * Determine what happens on error.
         *
         * @var Object error
         * @return void
         */
        handleError: function handleError(error) {
            // The error was a validation_error
            if (error.type === 'validation_error' && error.code) {

                var code = error.code;

                // Card Number error has occured.
                if (~code.indexOf("number")) {
                    this.cardErrors.number = error.message;
                }

                // Expiry error has occured.
                if (~code.indexOf("expiry")) {
                    this.cardErrors.date = error.message;
                }

                // CVC error has occured.
                if (~code.indexOf("cvc")) {
                    this.cardErrors.cvc = error.message;
                }
            } else {
                // Another type of error occured.

            }
        },
        createToken: function createToken() {
            this.loading = true;
            stripe.createToken(this.cardNumberElement, {
                name: 'Christian Braybrooke'
            }).then(this.setOutcome);
        }
    }

};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fc530fea\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/components/CardPaymentForm.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "/* Element Chalk Variables */\n/* Transition\n-------------------------- */\n/* Colors\n-------------------------- */\n/* 53a8ff */\n/* 66b1ff */\n/* 79bbff */\n/* 8cc5ff */\n/* a0cfff */\n/* b3d8ff */\n/* c6e2ff */\n/* d9ecff */\n/* ecf5ff */\n/* Link\n-------------------------- */\n/* Background\n-------------------------- */\n/* Border\n-------------------------- */\n/* Box-shadow\n-------------------------- */\n/* Fill\n-------------------------- */\n/* Font\n-------------------------- */\n/* Size\n-------------------------- */\n/* z-index\n-------------------------- */\n/* Disable base\n-------------------------- */\n/* Icon\n-------------------------- */\n/* Checkbox\n-------------------------- */\n/* Radio\n-------------------------- */\n/* Select\n-------------------------- */\n/* Alert\n-------------------------- */\n/* Message Box\n-------------------------- */\n/* Message\n-------------------------- */\n/* Notification\n-------------------------- */\n/* Input\n-------------------------- */\n/* Cascader\n-------------------------- */\n/* Group\n-------------------------- */\n/* Tab\n-------------------------- */\n/* Button\n-------------------------- */\n/* cascader\n-------------------------- */\n/* Switch\n-------------------------- */\n/* Dialog\n-------------------------- */\n/* Table\n-------------------------- */\n/* Pagination\n-------------------------- */\n/* Popover\n-------------------------- */\n/* Tooltip\n-------------------------- */\n/* Tag\n-------------------------- */\n/* Tree\n-------------------------- */\n/* Dropdown\n-------------------------- */\n/* Badge\n-------------------------- */\n/* Card\n--------------------------*/\n/* Slider\n--------------------------*/\n/* Steps\n--------------------------*/\n/* Menu\n--------------------------*/\n/* Rate\n--------------------------*/\n/* DatePicker\n--------------------------*/\n/* Loading\n--------------------------*/\n/* Scrollbar\n--------------------------*/\n/* Carousel\n--------------------------*/\n/* Collapse\n--------------------------*/\n/* Transfer\n--------------------------*/\n/* Header\n  --------------------------*/\n/* Footer\n--------------------------*/\n/* Main\n--------------------------*/\n/* Break-point\n--------------------------*/\n/* Custom */\n/* Menu\n-------------------------- */\n.stripe_input[data-v-fc530fea] {\n  -webkit-appearance: none;\n  background-color: #fff;\n  background-image: none;\n  border-radius: 4px;\n  border: 1px solid #dcdfe6;\n  border-color: #dcdfe6;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  display: inherit;\n  font-size: 14px;\n  line-height: 1;\n  outline: none;\n  padding: 12px 15px;\n  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\n  width: 100%;\n  height: 40px;\n}\n.stripe_input[data-v-fc530fea]:hover {\n  cursor: text;\n  border: 1px solid #dcdfe6;\n  border-color: #c0c4cc;\n}\n.stripe_input.StripeElement--focus[data-v-fc530fea] {\n  border: 1px solid #dcdfe6;\n  border-color: #409eff;\n}\n.stripe_input.StripeElement--invalid[data-v-fc530fea] {\n  border: 1px solid #dcdfe6;\n  border-color: #f56c6c;\n}\n.stripe_input.StripeElement--complete[data-v-fc530fea] {\n  border: 1px solid #dcdfe6;\n  border-color: #67c23a;\n}\n.stripe_input.medium[data-v-fc530fea] {\n  font-size: 14px;\n  height: 36px;\n  padding: 10px 15px;\n}\n.stripe_input.small[data-v-fc530fea] {\n  font-size: 13px;\n  height: 32px;\n  padding: 8.5px 15px;\n}\n.stripe_input.mini[data-v-fc530fea] {\n  font-size: 12px;\n  height: 28px;\n  padding: 7px 15px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-fc530fea\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/components/CardPaymentForm.vue":
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
      ],
      staticClass: "card_payment_form"
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
                    label: "Cardholder Name",
                    size: "small",
                    prop: "cardholder_name",
                    rules: [
                      {
                        required: true,
                        message: "Cardholder name is required.",
                        trigger: "blur,change"
                      }
                    ]
                  }
                },
                [
                  _c("el-input", {
                    attrs: { placeholder: "" },
                    model: {
                      value: _vm.form.cardholder_name,
                      callback: function($$v) {
                        _vm.$set(_vm.form, "cardholder_name", $$v)
                      },
                      expression: "form.cardholder_name"
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
                    label: "Card Number",
                    size: "small",
                    prop: "card_number",
                    rules: [
                      {
                        required: true,
                        message: "Card Number is required.",
                        trigger: "blur,change"
                      }
                    ]
                  }
                },
                [
                  _c("div", {
                    ref: "cardNumber",
                    staticClass: "stripe_input small"
                  }),
                  _vm._v(" "),
                  _c("transition", { attrs: { name: "el-zoom-in-top" } }, [
                    _vm.cardErrors.number
                      ? _c("div", { staticClass: "el-form-item__error" }, [
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.cardErrors.number) +
                              "\n                    "
                          )
                        ])
                      : _vm._e()
                  ])
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
                    label: "Card Expiry",
                    size: "small",
                    prop: "customer.company"
                  }
                },
                [
                  _c("div", {
                    ref: "cardExpiry",
                    staticClass: "stripe_input small"
                  }),
                  _vm._v(" "),
                  _c("transition", { attrs: { name: "el-zoom-in-top" } }, [
                    _vm.cardErrors.date
                      ? _c("div", { staticClass: "el-form-item__error" }, [
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.cardErrors.date) +
                              "\n                    "
                          )
                        ])
                      : _vm._e()
                  ])
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
                    label: "Card CVC",
                    size: "small",
                    prop: "customer.company"
                  }
                },
                [
                  _c("div", {
                    ref: "cardCvc",
                    staticClass: "stripe_input small"
                  }),
                  _vm._v(" "),
                  _c("transition", { attrs: { name: "el-zoom-in-top" } }, [
                    _vm.cardErrors.cvc
                      ? _c("div", { staticClass: "el-form-item__error" }, [
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.cardErrors.cvc) +
                              "\n                    "
                          )
                        ])
                      : _vm._e()
                  ])
                ],
                1
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
    require("vue-hot-reload-api")      .rerender("data-v-fc530fea", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fc530fea\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/components/CardPaymentForm.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fc530fea\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/components/CardPaymentForm.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("ea433fda", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fc530fea\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./CardPaymentForm.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fc530fea\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./CardPaymentForm.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/components/CardPaymentForm.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fc530fea\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/components/CardPaymentForm.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/components/CardPaymentForm.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-fc530fea\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/components/CardPaymentForm.vue")
/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-fc530fea"
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
Component.options.__file = "resources/assets/admin-spa/components/CardPaymentForm.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fc530fea", Component.options)
  } else {
    hotAPI.reload("data-v-fc530fea", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});