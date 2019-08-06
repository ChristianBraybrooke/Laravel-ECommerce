webpackJsonp([28],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/Dashboard.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_services_api_service_js__ = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");
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


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Dashboard',
  components: {
    Errors: function Errors() {
      return __webpack_require__.e/* import() */(31/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
    }
  },
  props: {},
  data: function data() {
    return {
      globalSearch: '',
      loading: ''
    };
  },
  computed: _objectSpread({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['user', 'userErrors'])),
  watch: {
    search: function search(value) {
      this.handleSearchChange(value);
    }
  },
  mounted: function mounted() {
    console.log('Dashboard.vue mounted');
    this.getUser();
  },
  methods: _objectSpread({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapActions"])(['getUser']), {
    /*
     * Fetch search data from the API into our results field
     */
    getAllOrders: function getAllOrders(queryString, callback) {
      __WEBPACK_IMPORTED_MODULE_1_services_api_service_js__["a" /* default */].get({
        path: 'orders',
        params: {
          search: queryString
        }
      }).then(function (data) {
        callback(data.data);
      }).catch(function () {//
      });
    },
    viewPathFormated: function viewPathFormated(item) {
      return item.type === 'Estimate' ? 'estimates' : 'orders';
    },
    statusClass: function statusClass(item) {
      return item.type === 'Completed' ? 'bg-success' : '';
    }
  })
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31c5e82c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/Dashboard.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.el-col[data-v-31c5e82c] {\n  margin-bottom: 2rem;\n}\n.welcome_text[data-v-31c5e82c] {\n    text-align: center;\n}\n.welcome_row[data-v-31c5e82c] {\n    margin-top: 40px;\n    margin-bottom: 40px;\n}\n.search_result[data-v-31c5e82c] {\n  color: initial;\n  text-decoration: none;\n}\n.search_result .flex-content[data-v-31c5e82c] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  margin-top: 10px;\n}\n.search_result span.status[data-v-31c5e82c] {\n  border: 1px solid rgba(0,0,0,0.1);\n  border-radius: 0.5rem;\n  padding: 0 10px;\n}\n.search_result div.small[data-v-31c5e82c] {\n  font-size: 0.7rem;\n  opacity: 0.75;\n  margin-bottom: 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-31c5e82c\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/Dashboard.vue":
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
      Object.keys(_vm.userErrors).length > 0
        ? _c("errors", { attrs: { errors: _vm.userErrors } })
        : _vm._e(),
      _vm._v(" "),
      _c("h1", { staticClass: "welcome_text" }, [
        _vm._v("Welcome, " + _vm._s(_vm.user.name.first))
      ]),
      _vm._v(" "),
      _c(
        "el-row",
        { staticClass: "welcome_row", attrs: { gutter: 40 } },
        [
          _c(
            "el-col",
            { attrs: { md: 12 } },
            [
              _c("el-card", [
                _c(
                  "div",
                  {
                    staticClass: "clearfix",
                    attrs: { slot: "header" },
                    slot: "header"
                  },
                  [
                    _c("span", [_vm._v("Orders")]),
                    _vm._v(" "),
                    _c(
                      "router-link",
                      { attrs: { to: { path: "/orders/new" } } },
                      [
                        _c(
                          "el-button",
                          {
                            staticStyle: { float: "right" },
                            attrs: { size: "mini", type: "primary", plain: "" }
                          },
                          [_vm._v("Create Order")]
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-col",
            { attrs: { md: 12 } },
            [
              _c("el-card", [
                _c(
                  "div",
                  {
                    staticClass: "clearfix",
                    attrs: { slot: "header" },
                    slot: "header"
                  },
                  [
                    _c("span", [_vm._v("Estimates")]),
                    _vm._v(" "),
                    _c(
                      "router-link",
                      { attrs: { to: { path: "/new-estimate" } } },
                      [
                        _c(
                          "el-button",
                          {
                            staticStyle: { float: "right" },
                            attrs: { size: "mini", type: "primary", plain: "" }
                          },
                          [_vm._v("Create Estimate")]
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-col",
            { attrs: { sm: 24 } },
            [
              _c(
                "el-card",
                [
                  _c(
                    "div",
                    {
                      staticClass: "clearfix",
                      staticStyle: { "text-align": "center" },
                      attrs: { slot: "header" },
                      slot: "header"
                    },
                    [
                      _c("span", [
                        _vm._v("Search orders, pro-formas, and estimates")
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c("el-autocomplete", {
                    staticStyle: { width: "100%" },
                    attrs: {
                      autofocus: true,
                      "fetch-suggestions": _vm.getAllOrders,
                      "trigger-on-focus": false,
                      "value-key": "ref",
                      placeholder: "Order number, customer name, company etc.",
                      clearable: ""
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "default",
                        fn: function(ref) {
                          var item = ref.item
                          return [
                            _c(
                              "router-link",
                              {
                                staticClass: "search_result",
                                attrs: {
                                  to: {
                                    path:
                                      _vm.viewPathFormated(item) + "/" + item.id
                                  }
                                }
                              },
                              [
                                _c("div", { staticClass: "flex-content" }, [
                                  _c("span", [
                                    _c("strong", [_vm._v(_vm._s(item.ref))]),
                                    _vm._v(
                                      " - " + _vm._s(item.customer.full_name)
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("span", { staticClass: "status" }, [
                                    _vm._v(_vm._s(item.status))
                                  ])
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "small" }, [
                                  _c("span", [
                                    _vm._v(
                                      _vm._s(
                                        item.customer.phone
                                          ? item.customer.phone
                                          : "No Phone Number"
                                      ) +
                                        " / " +
                                        _vm._s(
                                          item.billing_address.company
                                            ? item.billing_address.company
                                            : "No Company"
                                        )
                                    )
                                  ])
                                ])
                              ]
                            )
                          ]
                        }
                      }
                    ]),
                    model: {
                      value: _vm.globalSearch,
                      callback: function($$v) {
                        _vm.globalSearch = $$v
                      },
                      expression: "globalSearch"
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
    require("vue-hot-reload-api")      .rerender("data-v-31c5e82c", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31c5e82c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/Dashboard.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31c5e82c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/Dashboard.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("9dddedbe", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31c5e82c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Dashboard.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31c5e82c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Dashboard.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/pages/Dashboard.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31c5e82c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/Dashboard.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/Dashboard.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-31c5e82c\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/Dashboard.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-31c5e82c"
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
Component.options.__file = "resources/assets/admin-spa/pages/Dashboard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-31c5e82c", Component.options)
  } else {
    hotAPI.reload("data-v-31c5e82c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});