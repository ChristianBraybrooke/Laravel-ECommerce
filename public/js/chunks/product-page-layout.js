webpackJsonp([34],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_services_api_service__ = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'ProductPageLayout',
  components: {
    PageLayout: function PageLayout() {
      return __webpack_require__.e/* import() */(45).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/pages/PageLayout.vue"));
    }
  },
  props: {
    productId: {
      type: String,
      required: true
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
    formLoaded: {
      type: Function,
      required: false,
      default: function _default() {
        return function (data) {};
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
  computed: {//
  },
  watch: {//
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
      __WEBPACK_IMPORTED_MODULE_0_services_api_service__["a" /* default */].get({
        path: 'products/' + this.productId,
        params: {
          with: this.requestWith.concat(['variant']),
          include: this.requestIncludes
        }
      }).then(function (data) {
        this.loading = false;
        this.productForm = data.data;
        this.formLoaded(data.data);
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
      this.productForm.with = this.requestWith.concat(['variant']);
      this.productForm.include = this.requestIncludes;
      this.$refs[formName].validate(function (valid) {
        if (valid) {
          __WEBPACK_IMPORTED_MODULE_0_services_api_service__["a" /* default */].persist('put', {
            path: 'products/' + _this.productId,
            object: _this.productForm
          }).then(function (data) {
            this.loading = false;
            this.productForm = data.data;
            this.$message({
              message: 'Product updated',
              type: 'success',
              showClose: true
            });
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

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-537d6856\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.collection_type_select[data-v-537d6856] {\n    width: 100%;\n}\n.product_variant_card[data-v-537d6856] {\n    margin: 30px 0px;\n}\n.product_variant_card.minimised .el-card__body[data-v-537d6856] {\n    padding: 0px!important;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-537d6856\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue":
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
          _vm.productForm.variant
            ? _c(
                "el-breadcrumb-item",
                {
                  attrs: {
                    to: {
                      name: "products.view.variants",
                      params: {
                        productId: _vm.productForm.variant.id.toString()
                      },
                      force: true
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.productForm.variant.name))]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v(_vm._s(_vm.productForm.name))])
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
              _vm._v(_vm._s(_vm.productForm.name))
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "page-layout",
        {
          attrs: {
            "page-errors": _vm.productErrors,
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
              },
              {
                name: "Order Information",
                index: "/products/" + _vm.productId + "/ordering"
              }
            ]
          }
        },
        [
          _c(
            "template",
            { slot: "page_content" },
            [
              _c(
                "el-form",
                {
                  ref: "productForm",
                  attrs: {
                    model: _vm.productForm,
                    rules: _vm.formRules,
                    "label-position": "top",
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
                                    loading: _vm.loading,
                                    plain: "",
                                    type: "success"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.submitForm("productForm")
                                    }
                                  }
                                },
                                [_vm._v("Save")]
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
    require("vue-hot-reload-api")      .rerender("data-v-537d6856", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-537d6856\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-537d6856\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("b0288c12", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-537d6856\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProductPageLayout.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-537d6856\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProductPageLayout.vue");
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
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-537d6856\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-537d6856\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/products/ProductPageLayout.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-537d6856"
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

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-537d6856", Component.options)
  } else {
    hotAPI.reload("data-v-537d6856", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});