webpackJsonp([51],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/NewProductForm.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_services_api_service__ = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_product_form_RadioFormField__ = __webpack_require__("./resources/assets/admin-spa/components/product-form/RadioFormField.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_product_form_RadioFormField___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_components_product_form_RadioFormField__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_product_form_NumberFormField__ = __webpack_require__("./resources/assets/admin-spa/components/product-form/NumberFormField.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_product_form_NumberFormField___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_components_product_form_NumberFormField__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_product_form_SelectFormField__ = __webpack_require__("./resources/assets/admin-spa/components/product-form/SelectFormField.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_product_form_SelectFormField___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_components_product_form_SelectFormField__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_product_form_TextFormField__ = __webpack_require__("./resources/assets/admin-spa/components/product-form/TextFormField.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_product_form_TextFormField___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_components_product_form_TextFormField__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_product_form_TextareaFormField__ = __webpack_require__("./resources/assets/admin-spa/components/product-form/TextareaFormField.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_product_form_TextareaFormField___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_components_product_form_TextareaFormField__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'NewProductForm',
  components: {
    RadioFormField: __WEBPACK_IMPORTED_MODULE_2_components_product_form_RadioFormField___default.a,
    NumberFormField: __WEBPACK_IMPORTED_MODULE_3_components_product_form_NumberFormField___default.a,
    SelectFormField: __WEBPACK_IMPORTED_MODULE_4_components_product_form_SelectFormField___default.a,
    TextFormField: __WEBPACK_IMPORTED_MODULE_5_components_product_form_TextFormField___default.a,
    TextareaFormField: __WEBPACK_IMPORTED_MODULE_6_components_product_form_TextareaFormField___default.a
  },
  props: {
    button: {
      type: Object,
      required: false,
      default: function _default() {
        return {};
      }
    },
    dialog: {
      type: Object,
      required: false,
      default: function _default() {
        return {};
      }
    },
    onProductAdd: {
      type: Function,
      required: false,
      default: function _default() {}
    },
    editForm: {
      type: Boolean,
      required: false,
      default: function _default() {
        return false;
      }
    },
    product: {
      type: Object,
      required: false,
      default: function _default() {
        return {};
      }
    },
    onModalClose: {
      type: Function,
      required: false,
      default: function _default(instance) {
        instance.$confirm('Are you sure to close the product selector?').then(function (_) {
          instance.clearAll();
          instance.showModal = false;
        }).catch(function (_) {});
      }
    },
    includes: {
      type: Array,
      required: false,
      default: function _default() {
        return [];
      }
    },
    with: {
      type: Array,
      required: false,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      loading: true,
      customisationForm: {
        options: {},
        product: {
          order_form: {
            sections: {
              data: []
            }
          }
        }
      },
      form: {
        category: {
          products: {
            data: []
          }
        },
        product: {
          variants: {
            data: []
          }
        },
        variant: {}
      },
      showModal: false,
      productCollection: {
        types: {
          data: []
        }
      }
    };
  },
  computed: _objectSpread({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['shopData']), {
    defaultButton: function defaultButton() {
      return {
        text: 'Add Product (New)',
        loading: 'Loading Products',
        type: 'success',
        size: 'large',
        plain: false,
        class: ''
      };
    },
    mergedButton: function mergedButton() {
      return _objectSpread({}, this.defaultButton, this.button);
    },
    defaultDialog: function defaultDialog() {
      return {
        title: "".concat(this.editForm ? 'Edit' : 'Add', " Product"),
        closeOnClick: true,
        width: '70%'
      };
    },
    mergedDialog: function mergedDialog() {
      return _objectSpread({}, this.defaultDialog, this.dialog);
    },
    defaultIncludes: function defaultIncludes() {
      return ['type', 'options', 'price', 'effects_price', 'no_shop_data', 'description', 'order', 'rules'];
    },
    mergedIncludes: function mergedIncludes() {
      return [].concat(_toConsumableArray(this.defaultIncludes), _toConsumableArray(this.includes));
    },
    defaultWith: function defaultWith() {
      return ['types.products.variants.orderForm.sections.fields', 'types.products.variants.variant', 'types.products.orderForm.sections.fields'];
    },
    mergedWith: function mergedWith() {
      return [].concat(_toConsumableArray(this.defaultWith), _toConsumableArray(this.with));
    },
    readyForCustomisationForm: function readyForCustomisationForm() {
      if (this.form.product.id && this.form.product.variants.data.length === 0) {
        return true;
      }

      if (this.form.variant.id) {
        return true;
      }
    }
  }),
  watch: {
    'form.category.id': function formCategoryId(val) {
      this.resetForm();
    },
    'form.product.id': function formProductId(val) {
      if (this.readyForCustomisationForm) {
        this.setCustomisationProduct(this.form.product);
      } else {
        this.resetCustomisationForm();
      }
    },
    'form.variant.id': function formVariantId(val) {
      if (this.readyForCustomisationForm) {
        this.setCustomisationProduct(this.form.variant);
      }
    }
  },
  mounted: function mounted() {
    if (this.editForm) {
      this.loading = false;
      this.form.product = this.product;
    } else {
      this.getData();
    }
  },
  methods: {
    getData: function getData() {
      if (this.shopData.collection_mappings_values) {
        var productCatId = this.shopData.collection_mappings_values['Product Categories Collection'];
        this.loading = true;
        __WEBPACK_IMPORTED_MODULE_1_services_api_service__["a" /* default */].get({
          path: 'collections/' + productCatId,
          params: {
            include: this.mergedIncludes,
            with: this.mergedWith
          }
        }).then(function (data) {
          this.productCollection = data.data;
          this.loading = false;
        }.bind(this)).catch(function (error) {
          this.loading = false;
          this.errors = error;
        }.bind(this));
      }
    },
    resetForm: function resetForm() {
      this.form.product = {
        variants: {
          data: []
        }
      };
      this.form.variant = {};
    },
    clearAll: function clearAll() {
      this.form.category = {
        products: {
          data: []
        }
      };
      this.resetForm();
    },
    resetCustomisationForm: function resetCustomisationForm() {
      this.customisationForm = {
        options: {},
        product: {
          order_form: {
            sections: {
              data: []
            }
          }
        }
      };
    },
    setCustomisationProduct: function setCustomisationProduct(val) {
      var product = _objectSpread({}, {}, val);

      this.customisationForm.product = product;
    },
    openModal: function openModal() {
      if (this.editForm) {
        this.form.product = this.product;
      }

      this.showModal = true;
    },
    closeAndClearModal: function closeAndClearModal() {
      this.onModalClose(this);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/product-form/NumberFormField.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NumberFormField'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/product-form/RadioFormField.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'RadioFormField'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/product-form/SelectFormField.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'SelectFormField'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/product-form/TextFormField.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'TextFormField'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/product-form/TextareaFormField.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'TextareaFormField'
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-16f61edc\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/RadioFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-348a6b8b\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/TextareaFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-454b33f8\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/TextFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5767ea6e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/SelectFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-95f46cc8\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/NumberFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-daa94062\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/NewProductForm.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.tooltip_wrap[data-v-daa94062] {\n  float: left;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-16f61edc\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/product-form/RadioFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-16f61edc", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-348a6b8b\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/product-form/TextareaFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-348a6b8b", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-454b33f8\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/product-form/TextFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-454b33f8", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5767ea6e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/product-form/SelectFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5767ea6e", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-95f46cc8\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/product-form/NumberFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-95f46cc8", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-daa94062\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/NewProductForm.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "el-button",
        {
          class: _vm.mergedButton.class,
          attrs: {
            loading: _vm.loading,
            size: _vm.mergedButton.size,
            plain: _vm.mergedButton.plain,
            type: _vm.mergedButton.type
          },
          on: { click: _vm.openModal }
        },
        [
          _vm._v(
            _vm._s(
              _vm.loading ? _vm.mergedButton.loading : _vm.mergedButton.text
            ) + "\n  "
          )
        ]
      ),
      _vm._v(" "),
      _vm.showModal
        ? _c(
            "el-dialog",
            {
              attrs: {
                title: _vm.mergedDialog.title,
                "close-on-click-modal": _vm.mergedDialog.closeOnClick,
                "before-close": _vm.closeAndClearModal,
                visible: _vm.showModal,
                width: _vm.mergedDialog.width
              },
              on: {
                "update:visible": function($event) {
                  _vm.showModal = $event
                }
              }
            },
            [
              _c(
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
                    "el-form",
                    {
                      ref: "productAddForm",
                      attrs: { model: _vm.form, "label-position": "top" },
                      nativeOn: {
                        submit: function($event) {
                          $event.preventDefault()
                        }
                      }
                    },
                    [
                      !_vm.editForm
                        ? _c(
                            "div",
                            { staticClass: "form_option_section" },
                            [
                              _c(
                                "el-row",
                                { attrs: { gutter: 20 } },
                                [
                                  _c("el-col", { attrs: { md: 12 } }, [
                                    _c("h5", [_vm._v("Product Type")])
                                  ])
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
                                    { attrs: { md: { span: 16, offset: 4 } } },
                                    [
                                      _c(
                                        "el-form-item",
                                        {
                                          attrs: {
                                            label: "Choose Category",
                                            prop: "category"
                                          }
                                        },
                                        [
                                          _c(
                                            "div",
                                            [
                                              _c(
                                                "el-radio-group",
                                                {
                                                  staticClass:
                                                    "product_form_radio",
                                                  model: {
                                                    value: _vm.form.category,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.form,
                                                        "category",
                                                        $$v
                                                      )
                                                    },
                                                    expression: "form.category"
                                                  }
                                                },
                                                _vm._l(
                                                  _vm.productCollection.types
                                                    .data,
                                                  function(type) {
                                                    return _c(
                                                      "el-radio-button",
                                                      {
                                                        key: type.id,
                                                        attrs: { label: type }
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(type.name) +
                                                            "\n                    "
                                                        )
                                                      ]
                                                    )
                                                  }
                                                ),
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
                              _c(
                                "el-row",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: _vm.form.category.id,
                                      expression: "form.category.id"
                                    }
                                  ],
                                  attrs: { gutter: 20 }
                                },
                                [
                                  _c(
                                    "el-col",
                                    { attrs: { md: { span: 16, offset: 4 } } },
                                    [
                                      _c(
                                        "el-form-item",
                                        {
                                          attrs: {
                                            label: "Choose Product",
                                            prop: "productFirst"
                                          }
                                        },
                                        [
                                          _c(
                                            "div",
                                            [
                                              _c(
                                                "el-radio-group",
                                                {
                                                  staticClass:
                                                    "product_form_radio",
                                                  model: {
                                                    value: _vm.form.product,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.form,
                                                        "product",
                                                        $$v
                                                      )
                                                    },
                                                    expression: "form.product"
                                                  }
                                                },
                                                _vm._l(
                                                  _vm.form.category.products
                                                    .data,
                                                  function(product) {
                                                    return _c(
                                                      "div",
                                                      {
                                                        key: product.id,
                                                        staticClass:
                                                          "tooltip_wrap"
                                                      },
                                                      [
                                                        !parseInt(
                                                          product.price
                                                        ) == 0
                                                          ? _c(
                                                              "el-tooltip",
                                                              {
                                                                attrs: {
                                                                  content:
                                                                    _vm.shopData
                                                                      .currency +
                                                                    product.price,
                                                                  placement:
                                                                    "top",
                                                                  effect:
                                                                    "light"
                                                                }
                                                              },
                                                              [
                                                                _c(
                                                                  "el-radio-button",
                                                                  {
                                                                    attrs: {
                                                                      label: product
                                                                    }
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      _vm._s(
                                                                        product.name
                                                                      )
                                                                    )
                                                                  ]
                                                                )
                                                              ],
                                                              1
                                                            )
                                                          : _c(
                                                              "el-radio-button",
                                                              {
                                                                attrs: {
                                                                  label: product
                                                                }
                                                              },
                                                              [
                                                                _vm._v(
                                                                  _vm._s(
                                                                    product.name
                                                                  ) +
                                                                    "\n                      "
                                                                )
                                                              ]
                                                            )
                                                      ],
                                                      1
                                                    )
                                                  }
                                                ),
                                                0
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
                              _c(
                                "el-row",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value:
                                        _vm.form.product.variants.data.length >=
                                        1,
                                      expression:
                                        "form.product.variants.data.length >= 1"
                                    }
                                  ],
                                  attrs: { gutter: 20 }
                                },
                                [
                                  _c(
                                    "el-col",
                                    { attrs: { md: { span: 16, offset: 4 } } },
                                    [
                                      _c(
                                        "el-form-item",
                                        {
                                          attrs: {
                                            label: "Choose Variant",
                                            prop: "variant"
                                          }
                                        },
                                        [
                                          _c(
                                            "div",
                                            [
                                              _vm.form.product.variants.data
                                                .length < 10
                                                ? _c(
                                                    "el-radio-group",
                                                    {
                                                      staticClass:
                                                        "product_form_radio",
                                                      model: {
                                                        value: _vm.form.variant,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.$set(
                                                            _vm.form,
                                                            "variant",
                                                            $$v
                                                          )
                                                        },
                                                        expression:
                                                          "form.variant"
                                                      }
                                                    },
                                                    _vm._l(
                                                      _vm.form.product.variants
                                                        .data,
                                                      function(variant) {
                                                        return _c(
                                                          "el-tooltip",
                                                          {
                                                            key: variant.id,
                                                            attrs: {
                                                              content:
                                                                _vm.shopData
                                                                  .currency +
                                                                variant.price,
                                                              placement: "top",
                                                              effect: "light"
                                                            }
                                                          },
                                                          [
                                                            _c(
                                                              "el-radio-button",
                                                              {
                                                                attrs: {
                                                                  label: variant
                                                                }
                                                              },
                                                              [
                                                                _vm._v(
                                                                  "\n                        " +
                                                                    _vm._s(
                                                                      variant.name
                                                                    ) +
                                                                    "\n                      "
                                                                )
                                                              ]
                                                            )
                                                          ],
                                                          1
                                                        )
                                                      }
                                                    ),
                                                    1
                                                  )
                                                : _c(
                                                    "el-select",
                                                    {
                                                      attrs: {
                                                        size: "small",
                                                        filterable: "",
                                                        "value-key": "id"
                                                      },
                                                      model: {
                                                        value: _vm.form.variant,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.$set(
                                                            _vm.form,
                                                            "variant",
                                                            $$v
                                                          )
                                                        },
                                                        expression:
                                                          "form.variant"
                                                      }
                                                    },
                                                    _vm._l(
                                                      _vm.form.product.variants
                                                        .data,
                                                      function(variant) {
                                                        return _c(
                                                          "el-option",
                                                          {
                                                            key: variant.id,
                                                            attrs: {
                                                              label:
                                                                variant.name +
                                                                " - " +
                                                                (_vm.shopData
                                                                  .currency +
                                                                  variant.price),
                                                              value: variant
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                      " +
                                                                _vm._s(
                                                                  variant.name
                                                                ) +
                                                                " - "
                                                            ),
                                                            _c("strong", [
                                                              _vm._v(
                                                                _vm._s(
                                                                  _vm.shopData
                                                                    .currency +
                                                                    variant.price
                                                                )
                                                              )
                                                            ])
                                                          ]
                                                        )
                                                      }
                                                    ),
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
                              )
                            ],
                            1
                          )
                        : _vm._e()
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "el-form",
                    {
                      ref: "productCustomisationForm",
                      attrs: {
                        model: _vm.customisationForm,
                        "label-position": "top"
                      },
                      nativeOn: {
                        submit: function($event) {
                          $event.preventDefault()
                        }
                      }
                    },
                    [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.customisationForm.product.id,
                              expression: "customisationForm.product.id"
                            }
                          ]
                        },
                        [
                          _vm.customisationForm.product.order_form
                            ? _vm._l(
                                _vm.customisationForm.product.order_form
                                  .sections.data,
                                function(section) {
                                  return _c(
                                    "div",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: section.fields.data.length > 0,
                                          expression:
                                            "section.fields.data.length > 0"
                                        }
                                      ],
                                      key: section.id
                                    },
                                    [
                                      _c(
                                        "el-row",
                                        { attrs: { gutter: 20 } },
                                        [
                                          _c("el-col", { attrs: { md: 12 } }, [
                                            _c("h5", [
                                              _vm._v(_vm._s(section.name))
                                            ])
                                          ])
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "form_option_section" },
                                        [
                                          _c(
                                            "el-row",
                                            { attrs: { gutter: 20 } },
                                            [
                                              _c(
                                                "el-col",
                                                {
                                                  attrs: {
                                                    md: { span: 16, offset: 4 }
                                                  }
                                                },
                                                _vm._l(
                                                  section.fields.data,
                                                  function(field) {
                                                    return _c(
                                                      "div",
                                                      { key: field.id },
                                                      [
                                                        _c(
                                                          field.type +
                                                            "-form-field",
                                                          {
                                                            tag: "component",
                                                            attrs: {
                                                              form:
                                                                _vm
                                                                  .customisationForm
                                                                  .options,
                                                              product:
                                                                _vm
                                                                  .customisationForm
                                                                  .product,
                                                              section: section,
                                                              field: field,
                                                              prop:
                                                                "" + field.name
                                                            }
                                                          }
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  }
                                                ),
                                                0
                                              )
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c("hr")
                                    ],
                                    1
                                  )
                                }
                              )
                            : _vm._e()
                        ],
                        2
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      staticClass: "dialog-footer",
                      attrs: { slot: "footer" },
                      slot: "footer"
                    },
                    [
                      !_vm.editForm
                        ? _c(
                            "el-button",
                            {
                              on: {
                                click: function($event) {
                                  _vm.closeAndClearModal()
                                }
                              }
                            },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.editForm ? "Discard Changes" : "Cancel"
                                ) + "\n        "
                              )
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.editForm
                        ? _c(
                            "el-button",
                            {
                              attrs: {
                                disabled: !_vm.readyForCustomisationForm,
                                type: "primary",
                                plain: ""
                              }
                            },
                            [_vm._v("Finish & Add Another\n        ")]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.editForm
                        ? _c(
                            "el-button",
                            {
                              attrs: {
                                disabled: !_vm.readyForCustomisationForm,
                                type: "primary"
                              }
                            },
                            [_vm._v("Finish\n        ")]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.editForm
                        ? _c("el-button", { attrs: { type: "primary" } }, [
                            _vm._v("Save Changes\n        ")
                          ])
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            ]
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
    require("vue-hot-reload-api")      .rerender("data-v-daa94062", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-16f61edc\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/RadioFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-16f61edc\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/RadioFormField.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("6d08235e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-16f61edc\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./RadioFormField.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-16f61edc\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./RadioFormField.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-348a6b8b\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/TextareaFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-348a6b8b\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/TextareaFormField.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("6c8ac646", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-348a6b8b\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TextareaFormField.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-348a6b8b\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TextareaFormField.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-454b33f8\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/TextFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-454b33f8\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/TextFormField.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("789f46f6", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-454b33f8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TextFormField.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-454b33f8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TextFormField.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5767ea6e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/SelectFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5767ea6e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/SelectFormField.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("4341ca10", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5767ea6e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SelectFormField.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5767ea6e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./SelectFormField.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-95f46cc8\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/NumberFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-95f46cc8\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/NumberFormField.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("4181490c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-95f46cc8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NumberFormField.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-95f46cc8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NumberFormField.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-daa94062\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/NewProductForm.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-daa94062\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/NewProductForm.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("53a30c58", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-daa94062\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NewProductForm.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-daa94062\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./NewProductForm.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/components/NewProductForm.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-daa94062\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/NewProductForm.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/NewProductForm.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-daa94062\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/NewProductForm.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-daa94062"
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
Component.options.__file = "resources/assets/admin-spa/components/NewProductForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-daa94062", Component.options)
  } else {
    hotAPI.reload("data-v-daa94062", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/admin-spa/components/product-form/NumberFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-95f46cc8\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/NumberFormField.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/product-form/NumberFormField.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-95f46cc8\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/product-form/NumberFormField.vue")
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
Component.options.__file = "resources/assets/admin-spa/components/product-form/NumberFormField.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-95f46cc8", Component.options)
  } else {
    hotAPI.reload("data-v-95f46cc8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/admin-spa/components/product-form/RadioFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-16f61edc\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/RadioFormField.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/product-form/RadioFormField.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-16f61edc\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/product-form/RadioFormField.vue")
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
Component.options.__file = "resources/assets/admin-spa/components/product-form/RadioFormField.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-16f61edc", Component.options)
  } else {
    hotAPI.reload("data-v-16f61edc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/admin-spa/components/product-form/SelectFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5767ea6e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/SelectFormField.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/product-form/SelectFormField.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5767ea6e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/product-form/SelectFormField.vue")
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
Component.options.__file = "resources/assets/admin-spa/components/product-form/SelectFormField.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5767ea6e", Component.options)
  } else {
    hotAPI.reload("data-v-5767ea6e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/admin-spa/components/product-form/TextFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-454b33f8\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/TextFormField.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/product-form/TextFormField.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-454b33f8\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/product-form/TextFormField.vue")
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
Component.options.__file = "resources/assets/admin-spa/components/product-form/TextFormField.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-454b33f8", Component.options)
  } else {
    hotAPI.reload("data-v-454b33f8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/admin-spa/components/product-form/TextareaFormField.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-348a6b8b\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/product-form/TextareaFormField.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/product-form/TextareaFormField.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-348a6b8b\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/product-form/TextareaFormField.vue")
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
Component.options.__file = "resources/assets/admin-spa/components/product-form/TextareaFormField.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-348a6b8b", Component.options)
  } else {
    hotAPI.reload("data-v-348a6b8b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});