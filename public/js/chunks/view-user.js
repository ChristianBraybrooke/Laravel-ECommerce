webpackJsonp([11],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/users/ViewUser.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _apiService = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");

var _apiService2 = _interopRequireDefault(_apiService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'ViewUser',

    components: {
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(28/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        },
        AddressForm: function AddressForm() {
            return __webpack_require__.e/* import() */(35).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/AddressForm.vue"));
        }
    },

    props: {
        userId: {
            type: String,
            required: true
        }
    },

    data: function data() {
        return {
            loading: false,
            errors: {},
            user: {
                name: {},
                billing_address: {},
                shipping_address: {}
            }

        };
    },
    mounted: function mounted() {
        console.log('ViewUser.vue mounted.');
        this.getUser();
    },


    methods: {

        /*
         * Get the user data from the server.
         *
         * @return Void
         */
        getUser: function getUser() {
            var _this = this;

            this.loading = true;
            _apiService2.default.get({
                path: 'users/' + this.userId
            }).then(function (data) {
                _this.user = data.data;
                _this.loading = false;
            }).catch(function (error) {
                _this.errors = error;
                _this.loading = false;
            });
        },


        /*
         * Submit the form to the server and save the user info.
         *
         * @return Void
         */
        submitForm: function submitForm(formName) {
            var _this2 = this;

            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    _this2.loading = true;
                    _this2.errors = {};

                    _apiService2.default.persist("put", {
                        path: "users/" + _this2.userId,
                        object: {
                            company: _this2.user.company,
                            first_name: _this2.user.name.first,
                            last_name: _this2.user.name.last,
                            email: _this2.user.email,
                            shipping_address_line_1: _this2.user.shipping_address.line_1,
                            shipping_address_line_2: _this2.user.shipping_address.line_2,
                            shipping_address_town: _this2.user.shipping_address.town,
                            shipping_address_county: _this2.user.shipping_address.county,
                            shipping_address_postcode: _this2.user.shipping_address.postcode,
                            shipping_address_country: _this2.user.shipping_address.country,
                            billing_address_line_1: _this2.user.billing_address.line_1,
                            billing_address_line_2: _this2.user.billing_address.line_2,
                            billing_address_town: _this2.user.billing_address.town,
                            billing_address_county: _this2.user.billing_address.county,
                            billing_address_postcode: _this2.user.billing_address.postcode,
                            billing_address_country: _this2.user.billing_address.country
                        }
                    }).then(function (data) {
                        _this2.loading = false;
                        _this2.user = data.data;

                        _this2.$message({
                            message: 'User updated',
                            type: 'success',
                            showClose: true
                        });
                    }).catch(function (error) {
                        _this2.loading = false;
                        _this2.pageErrors = error;
                    });
                }
            });
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0bd99e4f\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/users/ViewUser.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-0bd99e4f\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/users/ViewUser.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { loading: _vm.loading } },
    [
      _c(
        "el-form",
        {
          ref: "userForm",
          attrs: {
            "label-position": "top",
            model: _vm.user,
            "label-width": "120px"
          }
        },
        [
          _c(
            "el-breadcrumb",
            {
              staticClass: "breadcrumbs",
              attrs: { "separator-class": "el-icon-arrow-right" }
            },
            [
              _c("el-breadcrumb-item", { attrs: { to: { name: "users" } } }, [
                _vm._v("Users")
              ]),
              _vm._v(" "),
              _c("el-breadcrumb-item", [_vm._v(_vm._s(_vm.user.name.full))])
            ],
            1
          ),
          _vm._v(" "),
          Object.keys(_vm.errors).length > 0
            ? _c("errors", { attrs: { errors: _vm.errors } })
            : _vm._e(),
          _vm._v(" "),
          _c(
            "el-row",
            { attrs: { gutter: 40 } },
            [
              _c(
                "el-col",
                { attrs: { sm: 24, md: 8 } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        size: "small",
                        label: "Company",
                        prop: "company"
                      }
                    },
                    [
                      _c("el-input", {
                        model: {
                          value: _vm.user.company,
                          callback: function($$v) {
                            _vm.$set(_vm.user, "company", $$v)
                          },
                          expression: "user.company"
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
            { attrs: { gutter: 40 } },
            [
              _c(
                "el-col",
                { attrs: { sm: 24, md: 8 } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        size: "small",
                        label: "First Name",
                        prop: "name.first",
                        rules: {
                          required: true,
                          message: "First name field is required."
                        }
                      }
                    },
                    [
                      _c("el-input", {
                        model: {
                          value: _vm.user.name.first,
                          callback: function($$v) {
                            _vm.$set(_vm.user.name, "first", $$v)
                          },
                          expression: "user.name.first"
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
                { attrs: { sm: 24, md: 8 } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        size: "small",
                        label: "Last Name",
                        prop: "name.last",
                        rules: {
                          required: true,
                          message: "Last name field is required."
                        }
                      }
                    },
                    [
                      _c("el-input", {
                        model: {
                          value: _vm.user.name.last,
                          callback: function($$v) {
                            _vm.$set(_vm.user.name, "last", $$v)
                          },
                          expression: "user.name.last"
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
                { attrs: { sm: 24, md: 8 } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        size: "small",
                        label: "Email",
                        prop: "email",
                        rules: {
                          required: true,
                          message: "Email field is required."
                        }
                      }
                    },
                    [
                      _c("el-input", {
                        model: {
                          value: _vm.user.email,
                          callback: function($$v) {
                            _vm.$set(_vm.user, "email", $$v)
                          },
                          expression: "user.email"
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
            { attrs: { gutter: 40 } },
            [
              _c(
                "el-col",
                { attrs: { sm: 24, md: 12 } },
                [
                  _c("address-form", {
                    attrs: {
                      form: _vm.user,
                      type: "billing",
                      span: 12,
                      offset: 0,
                      required: false,
                      prop: "billing_address",
                      "prefix-prop": true
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-col",
                { attrs: { sm: 24, md: 12 } },
                [
                  _c("address-form", {
                    attrs: {
                      form: _vm.user,
                      type: "shippping",
                      span: 12,
                      offset: 0,
                      required: false,
                      prop: "shipping_address",
                      "prefix-prop": true
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("hr", { staticClass: "page_hr" }),
          _vm._v(" "),
          _c(
            "el-row",
            { attrs: { gutter: 20 } },
            [
              _c(
                "el-col",
                { attrs: { sm: 24 } },
                [
                  _c(
                    "el-form-item",
                    [
                      _c(
                        "el-button",
                        {
                          attrs: {
                            plain: "",
                            type: "success",
                            loading: _vm.loading
                          },
                          on: {
                            click: function($event) {
                              _vm.submitForm("userForm")
                            }
                          }
                        },
                        [_vm._v("Update")]
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
    require("vue-hot-reload-api")      .rerender("data-v-0bd99e4f", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0bd99e4f\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/users/ViewUser.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0bd99e4f\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/users/ViewUser.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("d116d22e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0bd99e4f\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewUser.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0bd99e4f\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewUser.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/pages/users/ViewUser.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0bd99e4f\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/users/ViewUser.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/users/ViewUser.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-0bd99e4f\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/users/ViewUser.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/users/ViewUser.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0bd99e4f", Component.options)
  } else {
    hotAPI.reload("data-v-0bd99e4f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});