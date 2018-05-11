webpackJsonp([38],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/ProductAddForm.vue":
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

var range = __webpack_require__("./node_modules/lodash.range/index.js");

var formTemplate = {
    product: {
        quantity: 1,
        variants: {
            data: [],
            order_form: {}
        }
    }
};

exports.default = {

    name: 'ProductAddForm',

    components: {
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(23/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        }
    },

    props: {
        editForm: {
            type: Boolean,
            required: false,
            default: function _default() {
                return false;
            }
        }
    },

    data: function data() {
        return {
            loading: true,
            showModal: false,
            errors: {},
            form: formTemplate,
            productCategory: '',
            productFirst: '',
            collectionToShow: {
                types: {
                    data: []
                }
            }
        };
    },


    computed: _extends({}, (0, _vuex.mapGetters)(['shopData']), {
        quantityRange: function quantityRange() {
            return range(1, 251);
        },
        productsToShow: function productsToShow() {
            if (this.productCategory) {
                return this.productCategory.products.data;
            }
            return [];
        },
        productVariantsToShow: function productVariantsToShow() {
            if (this.productFirst) {
                return this.productFirst.variants.data;
            }
            return [];
        }
    }),

    watch: {
        productCategory: function productCategory() {
            this.productFirst = '';
        },

        productFirst: function productFirst(value) {
            if (this.objectHas(value, 'variants.data')) {
                if (value.variants.data.length >= 1) {
                    this.form.product = {};
                } else {
                    this.form.product = value;
                }
            } else {
                this.form.product = {};
            }
        }
    },

    mounted: function mounted() {
        console.log('ProductAddForm.vue Mounted');

        this.getProductCollection();
    },


    methods: {
        getProductCollection: function getProductCollection() {
            if (this.shopData.collection_mappings_values) {
                var product_category_id = this.shopData.collection_mappings_values['Product Categories Collection'];
                this.loading = true;
                _apiService2.default.get({
                    path: "collections/" + product_category_id,
                    params: {
                        include: ['type', 'options', 'price', 'effects_price', 'no_shop_data'],
                        with: ['types.products.variants.orderForm.sections.fields']
                    }
                }).then(function (data) {
                    this.collectionToShow = data.data;
                    this.loading = false;
                }.bind(this)).catch(function (error) {
                    this.loading = false;
                    this.errors = error;
                }.bind(this));
            }
        },
        closeAndClearModal: function closeAndClearModal() {
            var _this = this;

            this.$confirm('Are you sure to close the product selector?').then(function (_) {
                _this.clearAll();
                _this.showModal = false;
            }).catch(function (_) {});
        },
        clearAll: function clearAll() {
            this.errors = {};
            this.form = formTemplate;
            this.productCategory = '';
            this.productFirst = '';
        },
        addProduct: function addProduct() {},
        saveProduct: function saveProduct() {}
    }
};

/***/ }),

/***/ "./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ddbb425c\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductAddForm.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"ProductAddForm.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-ddbb425c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/ProductAddForm.vue":
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
          attrs: { loading: _vm.loading, size: "small", type: "primary" },
          on: {
            click: function($event) {
              _vm.showModal = true
            }
          }
        },
        [
          _vm._v(
            _vm._s(_vm.loading ? "Loading Products" : "Add Product(s)") + "\n  "
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: (_vm.editForm ? "Edit" : "Add") + " Product",
            "close-on-click-modal": false,
            "before-close": _vm.closeAndClearModal,
            visible: _vm.showModal,
            width: "70%"
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
                  ref: "addProductForm",
                  attrs: { "label-position": "top", model: _vm.form },
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
                                        size: "small",
                                        prop: "productCategory"
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
                                                value: _vm.productCategory,
                                                callback: function($$v) {
                                                  _vm.productCategory = $$v
                                                },
                                                expression: "productCategory"
                                              }
                                            },
                                            _vm._l(
                                              _vm.collectionToShow.types.data,
                                              function(type) {
                                                return _c(
                                                  "el-radio-button",
                                                  {
                                                    key: type.id,
                                                    attrs: { label: type }
                                                  },
                                                  [_vm._v(_vm._s(type.name))]
                                                )
                                              }
                                            )
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
                                  value: _vm.productCategory,
                                  expression: "productCategory"
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
                                        size: "small",
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
                                              attrs: { size: "small" },
                                              model: {
                                                value: _vm.productFirst,
                                                callback: function($$v) {
                                                  _vm.productFirst = $$v
                                                },
                                                expression: "productFirst"
                                              }
                                            },
                                            _vm._l(_vm.productsToShow, function(
                                              product
                                            ) {
                                              return _c(
                                                "el-radio-button",
                                                {
                                                  key: product.id,
                                                  attrs: { label: product }
                                                },
                                                [_vm._v(_vm._s(product.name))]
                                              )
                                            })
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
                                    _vm.productFirst &&
                                    _vm.productVariantsToShow.length >= 1,
                                  expression:
                                    "productFirst && productVariantsToShow.length >= 1"
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
                                        size: "small",
                                        prop: "product"
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
                                              _vm.productVariantsToShow,
                                              function(variant) {
                                                return _c(
                                                  "el-radio-button",
                                                  {
                                                    key: variant.id,
                                                    attrs: { label: variant }
                                                  },
                                                  [_vm._v(_vm._s(variant.name))]
                                                )
                                              }
                                            )
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
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.objectHas(_vm.form, "product.id"),
                          expression: "objectHas(form, 'product.id')"
                        }
                      ]
                    },
                    [
                      _c(
                        "el-row",
                        { attrs: { gutter: 20 } },
                        [
                          _c("el-col", { attrs: { md: 12 } }, [
                            _c("h5", [_vm._v("Quantity")])
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
                                    label: "Quantity",
                                    size: "small",
                                    prop: "product.quantity"
                                  }
                                },
                                [
                                  _c(
                                    "el-select",
                                    {
                                      model: {
                                        value: _vm.form.product.quantity,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.form.product,
                                            "quantity",
                                            $$v
                                          )
                                        },
                                        expression: "form.product.quantity"
                                      }
                                    },
                                    _vm._l(_vm.quantityRange, function(range) {
                                      return _c("el-option", {
                                        key: range,
                                        attrs: { value: range }
                                      })
                                    })
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
                  _c(
                    "el-button",
                    {
                      on: {
                        click: function($event) {
                          _vm.closeAndClearModal(null)
                        }
                      }
                    },
                    [
                      _vm._v(
                        _vm._s(_vm.editForm ? "Discard Changes" : "Cancel")
                      )
                    ]
                  ),
                  _vm._v(" "),
                  !_vm.editForm
                    ? _c(
                        "el-button",
                        {
                          attrs: { type: "primary" },
                          on: {
                            click: function($event) {
                              _vm.addProduct()
                            }
                          }
                        },
                        [_vm._v("Add Product")]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.editForm
                    ? _c(
                        "el-button",
                        {
                          attrs: { type: "primary" },
                          on: {
                            click: function($event) {
                              _vm.saveProduct()
                            }
                          }
                        },
                        [_vm._v("Save Changes")]
                      )
                    : _vm._e()
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
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ddbb425c", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ddbb425c\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductAddForm.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ddbb425c\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductAddForm.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("ff5c7608", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ddbb425c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProductAddForm.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ddbb425c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProductAddForm.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/components/ProductAddForm.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ddbb425c\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductAddForm.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/ProductAddForm.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-ddbb425c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/ProductAddForm.vue")
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
Component.options.__file = "resources/assets/admin-spa/components/ProductAddForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ddbb425c", Component.options)
  } else {
    hotAPI.reload("data-v-ddbb425c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});
//# sourceMappingURL=38.js.map