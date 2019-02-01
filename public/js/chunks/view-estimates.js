webpackJsonp([23],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_services_api_service__ = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_utils_order__ = __webpack_require__("./resources/assets/admin-spa/utils/order.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'ViewEstimate',
  components: {
    Errors: function Errors() {
      return __webpack_require__.e/* import() */(31/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
    },
    ProductTable: function ProductTable() {
      return __webpack_require__.e/* import() */(35).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/ProductTable.vue"));
    },
    ProductForm: function ProductForm() {
      return __webpack_require__.e/* import() */(36).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/ProductForm.vue"));
    },
    PrintDownloadButton: function PrintDownloadButton() {
      return __webpack_require__.e/* import() */(49).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/PrintDownloadButton.vue"));
    }
  },
  props: {
    estimateId: {
      required: true,
      type: [String, Number]
    }
  },
  data: function data() {
    return {
      loading: false,
      estimate: {},
      errors: {}
    };
  },
  computed: {
    orderTotals: function orderTotals() {
      if (this.estimate.cart) {
        return __WEBPACK_IMPORTED_MODULE_1_utils_order__["a" /* default */].totals(this.estimate.items, this.estimate.cart.totals['Shipping'], this.estimate.cart.totals['Discount']);
      }

      return [{}];
    }
  },
  watch: {},
  mounted: function mounted() {
    console.log('ViewEstimate.vue mounted!');
    this.getEstimate();
  },
  methods: {
    onProductAdd: function onProductAdd(product) {
      console.log(product);
      this.estimate.items.push(product);
    },
    getEstimate: function getEstimate() {
      var _this = this;

      this.loading = true;
      __WEBPACK_IMPORTED_MODULE_0_services_api_service__["a" /* default */].get({
        path: 'orders/' + this.estimateId
      }).then(function (data) {
        _this.loading = false;
        _this.estimate = data.data;
      }).catch(function (error) {
        _this.errors = error;
        _this.loading = false;
      });
    },
    updateEstimate: function updateEstimate() {
      var _this2 = this;

      this.loading = true;
      __WEBPACK_IMPORTED_MODULE_0_services_api_service__["a" /* default */].persist('put', {
        path: 'orders/' + this.estimateId,
        object: this.estimate
      }).then(function (data) {
        _this2.loading = false;
        _this2.estimate = data.data;
      }).catch(function (error) {
        _this2.errors = error;
        _this2.loading = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e5f516e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3e5f516e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue":
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
          _vm.estimate.id
            ? _c("el-breadcrumb-item", [_vm._v(_vm._s(_vm.estimate.ref))])
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c("print-download-button", { attrs: { "order-id": _vm.estimateId } }),
      _vm._v(" "),
      _c(
        "router-link",
        {
          attrs: {
            to: {
              name: "orders.view",
              params: { orderId: "" + _vm.estimate.id }
            }
          }
        },
        [
          _c("el-button", { attrs: { type: "info", size: "mini" } }, [
            _vm._v("Edit Order")
          ])
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
        {
          staticStyle: { "margin-bottom": "20px", "margin-top": "20px" },
          attrs: { gutter: 20 }
        },
        [
          _c(
            "el-col",
            { attrs: { sm: 24 } },
            [
              _c("product-form", {
                attrs: { "on-product-add": _vm.onProductAdd }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-row",
        {
          staticStyle: { "margin-bottom": "20px", "margin-top": "20px" },
          attrs: { gutter: 20 }
        },
        [
          _c(
            "el-col",
            { attrs: { sm: 24 } },
            [
              _c("product-table", {
                attrs: {
                  editable: true,
                  order: _vm.estimate,
                  "order-totals": _vm.orderTotals
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
                "el-button",
                {
                  attrs: { loading: _vm.loading, plain: "", type: "success" },
                  on: {
                    click: function($event) {
                      _vm.updateEstimate()
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
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3e5f516e", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e5f516e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e5f516e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("56a1de37", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e5f516e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewEstimate.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e5f516e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewEstimate.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e5f516e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3e5f516e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/estimates/ViewEstimate.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e5f516e", Component.options)
  } else {
    hotAPI.reload("data-v-3e5f516e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});