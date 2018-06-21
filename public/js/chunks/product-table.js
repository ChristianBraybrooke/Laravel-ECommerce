webpackJsonp([33,40],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/ProductForm.vue":
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
//
//

var _apiService = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");

var _apiService2 = _interopRequireDefault(_apiService);

var _vuex = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var forEach = __webpack_require__("./node_modules/lodash.foreach/index.js");
var range = __webpack_require__("./node_modules/lodash.range/index.js");

var orderFormTemplate = {
    sections: {
        data: [{
            fields: {
                data: []
            }
        }]
    }
};

var formTemplate = {
    product: {
        quantity: 1,
        order_form: orderFormTemplate,
        options: {},
        variants: {
            data: [],
            order_form: orderFormTemplate
        }
    }
};

exports.default = {

    name: 'ProductForm',

    components: {
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(28/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        }
    },

    props: {
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
        onProductAdd: {
            type: Function,
            required: false,
            default: function _default() {
                return function (product) {};
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
        },
        orderForm: function orderForm() {
            return this.objectHas(this.form, 'product.order_form.sections.data') ? this.form.product.order_form.sections.data : [];
        }
    }),

    watch: {

        'form.product': function formProduct(val) {
            this.$set(this.form.product, 'options', {});
        },

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
        console.log('ProductForm.vue Mounted');

        if (!this.editForm) {
            this.getProductCollection();
        } else {
            this.loading = false;
            this.form.product = this.product;
        }
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
                        with: ['types.products.variants.orderForm.sections.fields', 'types.products.variants.variant']
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
        optionLabel: function optionLabel(option) {
            if (option) {
                if (option.price_mutator && option.price_value) {
                    return option.name + ' (' + option.price_mutator + ' £' + option.price_value + ')';
                }
                return option.name;
            }
            return '';
        },
        formattedPrice: function formattedPrice(product) {
            var base_price = parseFloat(product.price);
            var base_with_extras = base_price;
            var extras = 0;
            if (product.options) {
                forEach(product.options, function (option) {
                    if (option) {
                        if (option.price_mutator && option.price_value) {
                            base_with_extras = this.operators[option.price_mutator](base_with_extras, option.price_value);
                            extras = this.operators[option.price_mutator](extras, option.price_value);
                        }
                    }
                }.bind(this));
            }

            var quantity = product.quantity ? product.quantity : 1;
            var total = base_with_extras * quantity;
            extras = extras * quantity;
            return {
                'Base Price': base_price,
                'Sub-Total': base_price * quantity,
                'Extras': extras,
                'Total': total
            };
        },
        clearAll: function clearAll() {
            this.errors = {};
            this.form = formTemplate;
            this.productCategory = '';
            this.productFirst = '';
        },
        addProduct: function addProduct() {
            if (this.objectHas(this.form, 'product.id') && this.objectHas(this.form, 'product.quantity')) {
                this.showModal = false;
                this.onProductAdd(this.form.product);
                this.clearAll();
            }
        },
        saveProduct: function saveProduct() {
            this.showModal = false;
        }
    }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/ProductTable.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _babelHelperVueJsxMergeProps = __webpack_require__("./node_modules/babel-helper-vue-jsx-merge-props/index.js");

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

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

var _vuex = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");

var _ProductForm = __webpack_require__("./resources/assets/admin-spa/components/ProductForm.vue");

var _ProductForm2 = _interopRequireDefault(_ProductForm);

var _order = __webpack_require__("./resources/assets/admin-spa/utils/order.js");

var _order2 = _interopRequireDefault(_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var range = __webpack_require__("./node_modules/lodash.range/index.js");

var forEach = __webpack_require__("./node_modules/lodash.foreach/index.js");

exports.default = {

    name: 'ProductTable',

    components: {
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(28/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        },
        ProductForm: _ProductForm2.default
    },

    props: {
        editable: {
            type: Boolean,
            required: false,
            default: function _default() {
                return false;
            }
        },
        order: {
            type: Object,
            required: true
        },
        orderTotals: {
            type: Array,
            required: false,
            default: function _default() {
                return [];
            }
        },
        setCollumns: {
            type: Array,
            required: false,
            default: function _default() {
                return [];
            }
        },
        setOptions: {
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
            options: {},
            collumns: []
        };
    },


    computed: _extends({}, (0, _vuex.mapGetters)(['shopData']), {
        totals: function totals() {
            return order.totals(this.order.items);
        },
        totalSpan: function totalSpan() {
            var numberOfCollumns = this.collumns ? this.collumns.length : 0;
            numberOfCollumns = numberOfCollumns > 2 ? numberOfCollumns - (this.editable ? 3 : 2) : 0;
            return [].concat(_toConsumableArray(Array(parseInt(numberOfCollumns)).keys()));
        },
        defaultCollumns: function defaultCollumns() {
            var cols = [{
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
            }];

            if (this.editable) {
                cols.push({
                    prop: 'actions',
                    label: 'Actions',
                    formatter: function (row, column, cellValue) {
                        return this.itemRowActionsFormatter(row, column, cellValue);
                    }.bind(this)
                });
            }

            return cols;
        },
        defaultOptions: function defaultOptions() {
            return {};
        }
    }),

    watch: {},

    mounted: function mounted() {
        console.log('ProductTable.vue Mounted');

        if (this.setCollumns.length == 0) {
            this.collumns = this.defaultCollumns;
        } else {
            this.collumns = this.setCollumns;
        }

        if (!this.setOptions) {
            this.options = this.defaultOptions;
        } else {
            this.options = this.setOptions;
        }

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
        itemRowActionsFormatter: function itemRowActionsFormatter(row, column, cellValue) {
            var _this = this;

            var h = this.$createElement;

            return h('span', [h('product-form', {
                attrs: { 'edit-form': true, product: row }
            }), h(
                'el-button',
                {
                    attrs: { size: 'mini', type: 'danger' },
                    on: {
                        'click': function click() {
                            return _this.deleteRow(row);
                        }
                    }
                },
                ['Delete']
            )]);
        },
        shippingRowFormatter: function shippingRowFormatter(value) {
            var _this2 = this;

            var h = this.$createElement;

            var options = [];
            forEach(range(0, 250, 10), function (range) {
                options.push(h('el-option', { key: range, attrs: { value: range, label: this.formatPrice(range, this.shopData.currency) }
                }));
            }.bind(this));

            return this.editable ? h(
                'el-select',
                (0, _babelHelperVueJsxMergeProps2.default)([{
                    attrs: {
                        value: _this2.order.shipping_rate
                    },
                    on: {
                        'input': function input($$v) {
                            _this2.order.shipping_rate = $$v;
                        }
                    }
                }, {
                    directives: [{
                        name: 'model',
                        value: _this2.order.shipping_rate
                    }]
                }, {
                    attrs: { size: 'mini' },
                    style: 'max-width: 100px;' }]),
                [options]
            ) : this.formatPrice(this.order.shipping_rate, this.shopData.currency);
        },
        deleteRow: function deleteRow(row) {
            this.order.items.splice(this.order.items.indexOf(row), 1);
        }
    }
};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0222abc7\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductForm.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-626e365b\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductTable.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-0222abc7\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/ProductForm.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticStyle: { display: "initial" } },
    [
      _c(
        "el-button",
        {
          attrs: {
            loading: _vm.loading,
            size: _vm.editForm ? "mini" : "small",
            plain: _vm.editForm,
            type: "primary"
          },
          on: {
            click: function($event) {
              _vm.showModal = true
            }
          }
        },
        [
          _vm._v(
            _vm._s(
              _vm.editForm
                ? "Edit"
                : _vm.loading
                  ? "Loading Products"
                  : "Add Product(s)"
            ) + "\n  "
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
                                          _vm.productVariantsToShow.length < 10
                                            ? _c(
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
                                                        attrs: {
                                                          label: variant
                                                        }
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(variant.name)
                                                        )
                                                      ]
                                                    )
                                                  }
                                                )
                                              )
                                            : _c(
                                                "el-select",
                                                {
                                                  attrs: {
                                                    size: "small",
                                                    "value-key": "id"
                                                  },
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
                                                    return _c("el-option", {
                                                      key: variant.id,
                                                      attrs: {
                                                        label: variant.name,
                                                        value: variant
                                                      }
                                                    })
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
                      _vm._l(_vm.orderForm, function(section) {
                        return [
                          _c(
                            "el-row",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: section.fields.data.length > 0,
                                  expression: "section.fields.data.length > 0"
                                }
                              ],
                              attrs: { gutter: 20 }
                            },
                            [
                              _c("el-col", { attrs: { md: 12 } }, [
                                _c("h5", [_vm._v(_vm._s(section.name))])
                              ])
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: section.fields.data.length > 0,
                                  expression: "section.fields.data.length > 0"
                                }
                              ],
                              staticClass: "form_option_section"
                            },
                            _vm._l(section.fields.data, function(field) {
                              return _c(
                                "el-row",
                                { key: field.id, attrs: { gutter: 20 } },
                                [
                                  _c(
                                    "el-col",
                                    { attrs: { md: { span: 16, offset: 4 } } },
                                    [
                                      _c(
                                        "el-form-item",
                                        {
                                          attrs: {
                                            label: field.name,
                                            size: "small",
                                            prop:
                                              "product.options[" +
                                              field.name +
                                              "]"
                                          }
                                        },
                                        [
                                          field.type === "text"
                                            ? _c("el-input", {
                                                model: {
                                                  value:
                                                    _vm.form.product.options[
                                                      field.name
                                                    ],
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.form.product.options,
                                                      field.name,
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "form.product.options[field.name]"
                                                }
                                              })
                                            : _vm._e(),
                                          _vm._v(" "),
                                          field.type === "number"
                                            ? _c("el-input-number", {
                                                model: {
                                                  value:
                                                    _vm.form.product.options[
                                                      field.name
                                                    ],
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.form.product.options,
                                                      field.name,
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "form.product.options[field.name]"
                                                }
                                              })
                                            : _vm._e(),
                                          _vm._v(" "),
                                          field.type === "select"
                                            ? _c(
                                                "el-select",
                                                {
                                                  model: {
                                                    value:
                                                      _vm.form.product.options[
                                                        field.name
                                                      ],
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.form.product
                                                          .options,
                                                        field.name,
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "form.product.options[field.name]"
                                                  }
                                                },
                                                _vm._l(field.options, function(
                                                  option
                                                ) {
                                                  return _c("el-option", {
                                                    key: option.id,
                                                    attrs: {
                                                      value: option,
                                                      label: _vm.optionLabel(
                                                        option
                                                      )
                                                    }
                                                  })
                                                })
                                              )
                                            : _vm._e(),
                                          _vm._v(" "),
                                          field.type === "radio"
                                            ? _c(
                                                "div",
                                                [
                                                  _c(
                                                    "el-radio-group",
                                                    {
                                                      attrs: { size: "small" },
                                                      model: {
                                                        value:
                                                          _vm.form.product
                                                            .options[
                                                            field.name
                                                          ],
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.$set(
                                                            _vm.form.product
                                                              .options,
                                                            field.name,
                                                            $$v
                                                          )
                                                        },
                                                        expression:
                                                          "form.product.options[field.name]"
                                                      }
                                                    },
                                                    _vm._l(
                                                      field.options,
                                                      function(option) {
                                                        return _c(
                                                          "el-radio-button",
                                                          {
                                                            key: option.id,
                                                            attrs: {
                                                              label: option
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              _vm._s(
                                                                _vm.optionLabel(
                                                                  option
                                                                )
                                                              )
                                                            )
                                                          ]
                                                        )
                                                      }
                                                    )
                                                  )
                                                ],
                                                1
                                              )
                                            : _vm._e()
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            })
                          )
                        ]
                      }),
                      _vm._v(" "),
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
                      ),
                      _vm._v(" "),
                      _c(
                        "el-row",
                        { attrs: { gutter: 20 } },
                        [
                          _c("el-col", { attrs: { md: 12 } }, [
                            _c("h5", [_vm._v("Price")])
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
                            _vm._l(
                              _vm.formattedPrice(_vm.form.product),
                              function(value, key) {
                                return _c("p", [
                                  _c("strong", [_vm._v(_vm._s(key) + ":")]),
                                  _vm._v(
                                    " " +
                                      _vm._s(_vm.shopData.currency) +
                                      _vm._s(value)
                                  )
                                ])
                              }
                            )
                          )
                        ],
                        1
                      )
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
    require("vue-hot-reload-api")      .rerender("data-v-0222abc7", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-626e365b\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/ProductTable.vue":
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
        { staticStyle: { width: "100%" }, attrs: { data: _vm.order.items } },
        _vm._l(_vm.collumns, function(collumn, key) {
          return _c("el-table-column", {
            key: key,
            attrs: {
              prop: collumn.prop,
              label: collumn.label,
              formatter: collumn.formatter ? collumn.formatter : null
            }
          })
        })
      ),
      _vm._v(" "),
      _c(
        "el-table",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.orderTotals.length > 0,
              expression: "orderTotals.length > 0"
            }
          ],
          staticStyle: { width: "100%" },
          attrs: { data: _vm.orderTotals }
        },
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
                return row.total === "Shipping"
                  ? _vm.shippingRowFormatter(cellValue)
                  : _vm.formatPrice(cellValue, _vm.shopData.currency)
              }
            }
          }),
          _vm._v(" "),
          _vm.editable ? _c("el-table-column") : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-626e365b", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0222abc7\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductForm.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0222abc7\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductForm.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("7abf8f25", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0222abc7\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProductForm.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0222abc7\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProductForm.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-626e365b\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductTable.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-626e365b\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductTable.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("1fc925ea", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-626e365b\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProductTable.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-626e365b\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProductTable.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/components/ProductForm.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-0222abc7\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductForm.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/ProductForm.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-0222abc7\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/ProductForm.vue")
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
Component.options.__file = "resources/assets/admin-spa/components/ProductForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0222abc7", Component.options)
  } else {
    hotAPI.reload("data-v-0222abc7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/admin-spa/components/ProductTable.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-626e365b\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductTable.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/ProductTable.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-626e365b\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/ProductTable.vue")
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
Component.options.__file = "resources/assets/admin-spa/components/ProductTable.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-626e365b", Component.options)
  } else {
    hotAPI.reload("data-v-626e365b", Component.options)
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