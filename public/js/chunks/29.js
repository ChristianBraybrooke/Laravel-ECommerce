webpackJsonp([29],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_api_service_js__ = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var find = __webpack_require__("./node_modules/lodash.find/index.js");
var forEach = __webpack_require__("./node_modules/lodash.foreach/index.js");
var has = __webpack_require__("./node_modules/lodash.has/index.js");
var orderBy = __webpack_require__("./node_modules/lodash.orderby/index.js");

/* harmony default export */ __webpack_exports__["default"] = ({

    name: 'ViewProductPageLayout',

    components: {
        PageLayout: function PageLayout() {
            return __webpack_require__.e/* import() */(30).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/pages/PageLayout.vue"));
        }
    },

    props: {
        product: {
            type: Object,
            required: true
        },
        productId: {
            type: String,
            required: true
        },
        pageErrors: {
            required: false,
            type: Object,
            default: function _default() {
                return {};
            }
        },
        currentPage: {
            required: true,
            type: String
        },
        form: {
            type: Object,
            required: false,
            default: function _default() {
                return {};
            }
        },
        formRules: {
            type: Object,
            required: false,
            default: function _default() {
                return {};
            }
        },
        requestWith: {
            type: Array,
            required: false,
            default: function _default() {
                return [];
            }
        },
        requestIncludes: {
            type: Array,
            required: false,
            default: function _default() {
                return [];
            }
        }
    },

    data: function data() {
        return {
            productForm: this.form,
            productErrors: {},
            loading: false
        };
    },


    computed: {
        //
    },

    watch: {
        //
    },

    mounted: function mounted() {
        console.log('ProductPageLayout.vue mounted');
        this.getProduct();
    },


    methods: {

        /**
         * Get the product information from the server.
         *
         * @return void
         */
        getProduct: function getProduct() {
            this.productErrors = {};
            this.loading = true;

            __WEBPACK_IMPORTED_MODULE_0__services_api_service_js__["a" /* default */].get({
                path: 'products/' + this.productId,
                params: {
                    with: this.requestWith,
                    include: this.requestIncludes
                }
            }).then(function (data) {
                this.loading = false;
                this.productForm = data.data;
            }.bind(this)).catch(function (error) {
                this.loading = false;
                this.productErrors = error;
            }.bind(this));
        },


        /**
         * Validate the form and submit to the server.
         *
         * @return void
         */
        submitForm: function submitForm(formName) {
            var _this = this;

            this.productErrors = {};
            this.loading = true;
            this.productForm.with = this.requestWith;
            this.productForm.include = this.requestIncludes;

            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    __WEBPACK_IMPORTED_MODULE_0__services_api_service_js__["a" /* default */].persist('put', {
                        path: 'products/' + _this.productId,
                        object: _this.productForm
                    }).then(function (data) {
                        this.loading = false;
                        this.productForm = data.data;
                        // this.getCollections();
                    }.bind(_this)).catch(function (error) {
                        this.loading = false;
                        this.productErrors = error;
                    }.bind(_this));
                } else {
                    _this.loading = false;
                    return false;
                }
            });
        }
    }

});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a655372\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "\n.collection_type_select[data-v-3a655372] {\n    width: 100%;\n}\n.product_variant_card[data-v-3a655372] {\n    margin: 30px 0px;\n}\n.product_variant_card.minimised .el-card__body[data-v-3a655372] {\n    padding: 0px!important;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3a655372\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue":
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
          _c("el-breadcrumb-item", { attrs: { to: { name: "products" } } }, [
            _vm._v("Products")
          ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v(_vm._s(_vm.product.name))])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-row",
        { attrs: { align: "middle", type: "flex" } },
        [
          _c("el-col", { attrs: { span: 12 } }, [
            _c("h1", { staticClass: "page_title" }, [
              _vm._v(_vm._s(_vm.product.name))
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      Object.keys(_vm.productErrors).length > 0
        ? _c("errors", { attrs: { errors: _vm.productErrors } })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "page-layout",
        {
          attrs: {
            "page-errors": _vm.pageErrors,
            "current-page": _vm.currentPage,
            pages: [
              {
                name: "Basic Information",
                index: "/products/" + _vm.productId
              },
              {
                name: "Pricing",
                index: "/products/" + _vm.productId + "/pricing"
              },
              {
                name: "Images",
                index: "/products/" + _vm.productId + "/images"
              },
              {
                name: "Customisations",
                index: "/products/" + _vm.productId + "/customisations"
              },
              {
                name: "Variants",
                index: "/products/" + _vm.productId + "/variants"
              }
            ]
          }
        },
        [
          _c(
            "template",
            { attrs: { slot: "page_content" }, slot: "page_content" },
            [
              _c(
                "el-form",
                {
                  ref: "productForm",
                  attrs: {
                    "label-position": "top",
                    model: _vm.productForm,
                    rules: _vm.formRules,
                    "label-width": "120px"
                  }
                },
                [
                  _vm._t("product_page", null, {
                    productForm: _vm.productForm
                  }),
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
                                      _vm.submitForm("productForm")
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
                2
              )
            ],
            1
          )
        ],
        2
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
    require("vue-hot-reload-api")      .rerender("data-v-3a655372", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a655372\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a655372\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("ee0564b8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a655372\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./ProductPageLayout.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a655372\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./ProductPageLayout.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/pages/products/ProductPageLayout.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a655372\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3a655372\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue")
/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3a655372"
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
Component.options.__file = "resources/assets/admin-spa/pages/products/ProductPageLayout.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3a655372", Component.options)
  } else {
    hotAPI.reload("data-v-3a655372", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});