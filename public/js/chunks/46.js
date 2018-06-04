webpackJsonp([46],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/productTable.vue":
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

var _vuex = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");

var _order = __webpack_require__("./resources/assets/admin-spa/utils/order.js");

var _order2 = _interopRequireDefault(_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var forEach = __webpack_require__("./node_modules/lodash.foreach/index.js");

exports.default = {

    name: 'ProductTable',

    components: {
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(24/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        },
        productForm: function productForm() {
            return __webpack_require__.e/* import() */(47/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/productForm.vue"));
        }
    },

    props: {
        editable: {
            type: Boolean,
            required: false,
            default: function _default() {
                return false;
            }
        },
        products: {
            type: Array,
            required: true
        },
        collumns: {
            type: Array,
            required: false,
            default: function _default() {
                return this.defaultCollumns;
            }
        },
        options: {
            type: Object,
            required: false,
            default: function _default() {
                return this.defaultOptions;
            }
        }
    },

    data: function data() {
        return {
            loading: false,
            mergedOptions: {},
            defaultOptions: {},
            defaultCollumns: [{
                prop: 'name',
                label: 'Product',
                formatter: function (row, column, cellValue) {
                    return this.itemRowNameFormatter(row, column, cellValue);
                }.bind(this)
            }, {
                prop: 'price',
                label: 'Price',
                formatter: function (row, column, cellValue) {
                    return this.formatPrice(row.price, this.shopData.currency);
                }.bind(this)
            }, {
                prop: 'quantity',
                label: 'Quantity',
                formatter: function (row, column, cellValue) {
                    return row.quantity ? row.quantity : 1;
                }.bind(this)
            }, {
                prop: 'subtotal',
                label: 'Sub-Total',
                formatter: function (row, column, cellValue) {
                    return this.formatPrice(_order2.default.productSubTotal(row), this.shopData.currency);
                }.bind(this)
            }, {
                prop: 'extras',
                label: 'Extras',
                formatter: function (row, column, cellValue) {
                    return this.formatPrice(_order2.default.productExtras(row), this.shopData.currency);
                }.bind(this)
            }, {
                prop: 'total',
                label: 'Total',
                formatter: function (row, column, cellValue) {
                    return this.formatPrice(_order2.default.productTotal(row), this.shopData.currency);
                }.bind(this)
            }, {
                prop: 'actions',
                label: 'Actions',
                template: function (scope) {
                    return this.itemRowActionsFormatter(scope);
                }.bind(this)
            }]
        };
    },


    computed: _extends({}, (0, _vuex.mapGetters)(['shopData', 'orderTotals']), {
        totals: function totals() {
            return _order2.default.totals(this.products);
        },
        totalSpan: function totalSpan() {
            var numberOfCollumns = this.collumns ? this.collumns.length : 0;
            numberOfCollumns = numberOfCollumns > 2 ? numberOfCollumns - 2 : 0;
            return [].concat(_toConsumableArray(Array(parseInt(numberOfCollumns)).keys()));
        }
    }),

    watch: {},

    mounted: function mounted() {
        console.log('ProductTable.vue Mounted');
        Object.assign(this.mergedOptions, this.defaultOptions, this.options);
    },


    methods: {
        itemRowNameFormatter: function itemRowNameFormatter(row, column, cellValue) {
            var h = this.$createElement;

            if (this.objectHas(row, 'variant.name')) {
                var row_name = h('p', [h('strong', [row.variant.name + ' / ']), row.name]);
            } else {
                var row_name = h('p', [h('strong', [row.name])]);
            }

            if (row.options) {
                var items = [];
                forEach(row.options, function (value, key) {
                    var new_value = value ? value.name : value;
                    items.push(h('li', [key, ': ', new_value]));
                });

                return h('div', [row_name, ' ', h(
                    'ul',
                    { 'class': 'order_item_options' },
                    [items]
                )]);
            }
            return h('div', [row_name]);
        },
        itemRowActionsFormatter: function itemRowActionsFormatter(scope) {
            // return <product-form edit-form={true} product={scope.row}></product-form>
        }
    }
};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d6ac1b8a\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/productTable.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-d6ac1b8a\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/productTable.vue":
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
        "el-table",
        { staticStyle: { width: "100%" }, attrs: { data: _vm.products } },
        _vm._l(_vm.collumns, function(collumn, key) {
          return _c(
            "el-table-column",
            {
              key: key,
              attrs: {
                prop: collumn.prop,
                label: collumn.label,
                formatter: collumn.formatter ? collumn.formatter : null
              }
            },
            [collumn.template ? void 0 : _vm._e()],
            2
          )
        })
      ),
      _vm._v(" "),
      _c(
        "el-table",
        { staticStyle: { width: "100%" }, attrs: { data: _vm.orderTotals } },
        [
          _vm._l(_vm.totalSpan, function(col, key) {
            return _c("el-table-column", { key: key })
          }),
          _vm._v(" "),
          _c("el-table-column", { attrs: { prop: "total", label: "" } }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: {
              prop: "value",
              label: "",
              formatter: function(row, column, cellValue) {
                return _vm.formatPrice(cellValue, _vm.shopData.currency)
              }
            }
          })
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
    require("vue-hot-reload-api")      .rerender("data-v-d6ac1b8a", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d6ac1b8a\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/productTable.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d6ac1b8a\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/productTable.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("1c245150", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d6ac1b8a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./productTable.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d6ac1b8a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./productTable.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/components/productTable.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d6ac1b8a\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/productTable.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/productTable.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-d6ac1b8a\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/productTable.vue")
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
Component.options.__file = "resources/assets/admin-spa/components/productTable.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d6ac1b8a", Component.options)
  } else {
    hotAPI.reload("data-v-d6ac1b8a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/admin-spa/utils/operators.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var operators = exports.operators = {
    '+': function _(a, b) {
        return parseFloat(a) + parseFloat(b);
    },
    '-': function _(a, b) {
        return parseFloat(a) - parseFloat(b);
    }
};

/***/ }),

/***/ "./resources/assets/admin-spa/utils/order.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _operators = __webpack_require__("./resources/assets/admin-spa/utils/operators.js");

var forEach = __webpack_require__("./node_modules/lodash.foreach/index.js");

exports.default = {
    productSubTotal: function productSubTotal(product) {
        return parseFloat(product.price) * parseInt(product.quantity);
    },
    productExtras: function productExtras(product) {
        var extras = 0;
        if (product.options) {
            forEach(product.options, function (option) {
                if (option) {
                    if (option.price_mutator && option.price_value) {
                        extras = _operators.operators[option.price_mutator](extras, option.price_value);
                    }
                }
            });
        }
        return extras;
    },
    productTotal: function productTotal(product) {
        return parseFloat(this.productExtras(product)) + parseFloat(this.productSubTotal(product));
    },
    totals: function totals(products) {
        var shipping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var sub_total = 0;
        var extras = 0;
        forEach(products, function (product, key) {
            var quantity = product.quantity ? product.quantity : 1;
            sub_total = sub_total + parseFloat(product.price) * parseInt(quantity);

            forEach(product.options ? product.options : [], function (option) {
                if (option) {
                    if (option.price_mutator && option.price_value) {
                        extras = extras + _operators.operators[option.price_mutator](0, option.price_value) * parseInt(quantity);
                    }
                }
            });
        });

        var vat = (parseFloat(sub_total) + parseFloat(extras) + parseFloat(shipping)) * 0.2;
        return [{
            total: 'Sub-Total',
            value: parseFloat(sub_total)
        }, {
            total: 'Extras',
            value: parseFloat(extras)
        }, {
            total: 'Shipping',
            value: parseFloat(shipping)
        }, {
            total: 'VAT',
            value: parseFloat(vat)
        }, {
            total: 'Total',
            value: parseFloat(sub_total) + parseFloat(extras) + parseFloat(shipping) + parseFloat(vat)
        }];
    }
};

/***/ })

});