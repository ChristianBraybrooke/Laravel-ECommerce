webpackJsonp([24],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/estimates/NewEstimate.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_utils_order__ = __webpack_require__("./resources/assets/admin-spa/utils/order.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_services_api_service__ = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");
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


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NewEstimate',
  components: {
    NewProductForm: function NewProductForm() {
      return __webpack_require__.e/* import() */(36).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/NewProductForm.vue"));
    },
    ProductTable: function ProductTable() {
      return __webpack_require__.e/* import() */(35).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/ProductTable.vue"));
    },
    Errors: function Errors() {
      return __webpack_require__.e/* import() */(31/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
    },
    CustomerInformationForm: function CustomerInformationForm() {
      return __webpack_require__.e/* import() */(40).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/CustomerInformationForm.vue"));
    },
    OrderRef: function OrderRef() {
      return __webpack_require__.e/* import() */(39).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/OrderRef.vue"));
    }
  },
  props: {
    isProForma: {
      type: Boolean,
      required: false,
      default: function _default() {
        return false;
      }
    }
  },
  data: function data() {
    return {
      loading: false,
      errors: {},
      order: {
        status: null,
        customer: {},
        shipping_rate: 80,
        discount_rate: 0,
        billing_address: {},
        shipping_address: {},
        items: [],
        cart: {
          totals: {
            Shipping: 80,
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
      return __WEBPACK_IMPORTED_MODULE_0_utils_order__["a" /* default */].totals(this.order.items, this.order.cart.totals['Shipping'], this.order.cart.totals['Discount']);
    },
    documentName: function documentName() {
      return this.isProForma ? 'Pro-Forma' : 'Estimate';
    }
  },
  mounted: function mounted() {
    console.log('NewEstimate.vue mounted!');
    this.order.status = this.documentName;
  },
  methods: {
    addProductToTable: function addProductToTable(product) {
      this.order.items.push(product);
    },
    updateProductOnTable: function updateProductOnTable(product) {//
    },
    processSubmit: function processSubmit() {
      var _this = this;

      this.loading = true;
      this.errors = {};
      __WEBPACK_IMPORTED_MODULE_1_services_api_service__["a" /* default */].persist('post', {
        path: 'orders',
        object: this.order
      }).then(function (data) {
        _this.loading = false;

        _this.$router.push({
          name: 'orders.view',
          params: {
            orderId: data.data.id.toString()
          }
        });
      }).catch(function (error) {
        _this.loading = false;
        _this.errors = error;
      });
    },
    handleProductUpdate: function handleProductUpdate(obj) {
      var currentProduct = this.order.items[obj.index];

      var product = _objectSpread({}, currentProduct, obj.product);

      this.order.items.splice(obj.index, 1, product);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2a173688\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/NewEstimate.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

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
          _c("el-breadcrumb-item", [_vm._v("New " + _vm._s(_vm.documentName))])
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
              _vm._v(
                "New " +
                  _vm._s(_vm.documentName) +
                  " " +
                  _vm._s(_vm.order.ref ? "- " + _vm.order.ref : "")
              )
            ])
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
          attrs: { model: _vm.order, "label-position": "top" },
          nativeOn: {
            submit: function($event) {
              $event.preventDefault()
            }
          }
        },
        [
          _c("order-ref", { attrs: { form: _vm.order } }),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("customer-information-form", { attrs: { form: _vm.order } })
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
              _c("new-product-form", {
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
                      "order-totals": _vm.orderTotals,
                      "on-product-update": _vm.handleProductUpdate
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
                [_vm._v("Create " + _vm._s(_vm.documentName))]
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
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/estimates/NewEstimate.vue")
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