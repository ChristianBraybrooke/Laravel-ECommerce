webpackJsonp([2],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue":
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var forEach = __webpack_require__("./node_modules/lodash.foreach/index.js");


/* harmony default export */ __webpack_exports__["default"] = ({

    name: 'Orders',

    components: {
        DataTable: function DataTable() {
            return __webpack_require__.e/* import() */(13/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/DataTable.vue"));
        }
    },

    props: [],

    data: function data() {
        var h = this.$createElement;

        return {
            loading: false,
            products: {},
            invoiceLoaded: false,
            printUrl: null,
            ordersCreateForm: {},
            createFormRules: {
                customer_first_name: [{ required: true, message: 'The first name is required', trigger: 'blur' }, { min: 3, max: 200, message: 'The first name length should be more than 3 characters', trigger: 'blur' }],
                customer_last_name: [{ required: true, message: 'The last name is required', trigger: 'blur' }, { min: 3, max: 200, message: 'The last name length should be more than 3 characters', trigger: 'blur' }],
                customer_email: [{ required: true, message: 'The email is required', trigger: 'blur' }, { min: 3, max: 200, message: 'The email length should be more than 3 characters', trigger: 'blur' }]
            },
            tableOptions: {
                border: true,
                stripe: true,
                showSearch: true,
                showHeader: true,
                showNewBtn: true,
                showRefreshBtn: true,
                showHeadHr: true,
                showTitle: true,
                viewText: 'View',
                deleteText: '',
                collumns: [{
                    prop: 'id',
                    sortable: true,
                    label: 'ID',
                    align: 'left',
                    resizable: true
                }, {
                    prop: 'name',
                    sortable: true,
                    label: 'Customer Name',
                    formatter: function formatter(row, column, cellValue) {
                        return row.customer.full_name;
                    },
                    align: 'left',
                    resizable: true
                }, {
                    prop: 'amount',
                    sortable: true,
                    label: 'Total',
                    formatter: function formatter(row, column, cellValue) {
                        return row.cart.currency ? row.cart.currency + row.cart.totals.Total : '-';
                    },
                    align: 'left',
                    resizable: true
                }, {
                    prop: 'created_at.human',
                    sortable: true,
                    label: 'Order Placed',
                    align: 'left',
                    resizable: true
                }, {
                    prop: 'status',
                    sortable: true,
                    label: 'Status',
                    formatter: function formatter(row, column, cellValue) {
                        var type = row.status == 'Completed' ? 'success' : row.status == 'Processing' ? 'danger' : 'info';

                        return h(
                            'el-tag',
                            {
                                attrs: { type: type, size: 'medium' }
                            },
                            [row.status]
                        );
                    },
                    align: 'left',
                    resizable: true
                }],
                bulkOptions: [{
                    value: 'completed',
                    label: 'Mark Complete'
                }, {
                    value: 'print',
                    label: 'Print Invoice(s)',
                    action: function (data, shopData, bulkSelected) {
                        var ids = [];
                        forEach(bulkSelected, function (value, key) {
                            var sep = key === 0 ? '?' : '&';
                            ids.push(sep + 'reports[' + key + ']=' + value.id);
                        }.bind(this));

                        var url = shopData.url + '/templates/invoice' + ids.join('');

                        this.printUrl = url;
                    }.bind(this)
                }]
            }
        };
    },


    computed: {},

    watch: {},

    mounted: function mounted() {
        console.log('Orders.vue mounted');
    },


    methods: {

        /**
         * Open the print dialog.
         *
         * @return void
         */
        print: function print() {
            frames['printLinkIframe'].focus();
            frames['printLinkIframe'].print();

            this.printUrl = null;
        },
        handleCreateNew: function handleCreateNew(data) {
            this.loading = true;

            __WEBPACK_IMPORTED_MODULE_0__services_api_service_js__["a" /* default */].get({
                path: 'products',
                params: {
                    limit: '1000'
                }
            }).then(function (data) {
                this.products = data.data;
                this.loading = false;
            }.bind(this)).catch(function (errors) {
                this.loading = false;
            }.bind(this));
        }
    }

});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_api_service_js__ = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var forEach = __webpack_require__("./node_modules/lodash.foreach/index.js");

/* harmony default export */ __webpack_exports__["default"] = ({

    name: 'ViewOrder',

    components: {
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(11/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        }
    },

    props: {
        orderId: {
            type: String,
            required: true
        }
    },

    data: function data() {
        return {
            orderErrors: {},
            loading: false,
            order: {},
            shopData: {},
            edit_billing: false,
            edit_shipping: false,
            shippingForm: {},
            invoiceLoaded: false,
            orderStatuses: {},
            printUrl: null
        };
    },


    computed: {
        orderAmount: function orderAmount() {
            return this.shopData.currency + this.order.amount / 100;
        },
        orderTotals: function orderTotals() {
            var totals = [];
            forEach(this.order.cart.totals, function (value, key) {
                totals.push({
                    'total': key,
                    'value': this.order.cart.currency + value
                });
            }.bind(this));

            return totals;
        }
    },

    watch: {},

    mounted: function mounted() {
        console.log('ViewOrders.vue mounted');
        this.getOrder();
    },


    methods: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['setShopData']), {

        /**
         * Get the order information from the server.
         *
         * @return void
         */
        getOrder: function getOrder() {
            this.orderErrors = {};
            this.loading = true;

            __WEBPACK_IMPORTED_MODULE_0__services_api_service_js__["a" /* default */].get({
                path: 'orders/' + this.orderId,
                params: {}
            }).then(function (data) {
                this.loading = false;
                this.order = data.data;
                this.orderStatuses = data.statuses;
                this.shopData = data.shop_data;
                this.setShopData(data.shop_data);
            }.bind(this)).catch(function (error) {
                this.loading = false;
                this.orderErrors = error;
            }.bind(this));
        },


        /**
         * Update the order.
         *
         * @return void
         */
        updateOrder: function updateOrder() {
            this.orderErrors = {};
            this.loading = true;

            __WEBPACK_IMPORTED_MODULE_0__services_api_service_js__["a" /* default */].persist('put', {
                path: 'orders/' + this.orderId,
                object: this.order
            }).then(function (data) {
                this.loading = false;
                this.order = data.data;
                this.shopData = data.shop_data;
                this.orderStatuses = data.statuses;
                this.setShopData(data.shop_data);
                this.edit_billing = false;
                this.edit_shipping = false;
            }.bind(this)).catch(function (error) {
                this.loading = false;
                this.orderErrors = error;
            }.bind(this));
        },
        preparePrint: function preparePrint() {
            this.printUrl = this.shopData.url + '/templates/invoice?reports=' + this.order.id;
        },
        printInvoice: function printInvoice() {
            if (navigator.userAgent.match(/opera/i) || navigator.userAgent.match(/trident/i) || navigator.userAgent.match(/msie/i) && window.addEventListener) {
                window.open(this.printUrl, '_blank');
            } else {
                frames['printLinkIframe'].focus();
                frames['printLinkIframe'].print();
            }

            this.printUrl = null;
        }
    })

});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ac302b4\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1e6ae6ea\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/lodash.foreach/index.js":
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _([1, 2]).forEach(function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, typeof iteratee == 'function' ? iteratee : identity);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = forEach;


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1ac302b4\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue":
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
          _c("el-breadcrumb-item", { attrs: { to: { name: "orders" } } }, [
            _vm._v("Orders")
          ]),
          _vm._v(" "),
          _vm.order.invoice
            ? _c("el-breadcrumb-item", [
                _vm._v(_vm._s(_vm.order.invoice.number))
              ])
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-row",
        { attrs: { align: "middle" } },
        [
          _c("el-col", { attrs: { sm: 24, lg: 12 } }, [
            _vm.order.invoice
              ? _c(
                  "h1",
                  { staticClass: "page_title" },
                  [
                    _vm._v("Order: " + _vm._s(_vm.order.invoice.number) + " "),
                    _vm.order.status
                      ? _c(
                          "el-tag",
                          { attrs: { type: "info", size: "large" } },
                          [_vm._v(_vm._s(_vm.order.status))]
                        )
                      : _vm._e()
                  ],
                  1
                )
              : _vm._e()
          ]),
          _vm._v(" "),
          _c(
            "el-col",
            { attrs: { sm: 24, lg: 12 } },
            [
              _c(
                "el-button",
                {
                  staticStyle: { float: "right", "margin-bottom": "20px" },
                  attrs: { type: "success", plain: "" },
                  on: { click: _vm.preparePrint }
                },
                [_vm._v("Print Invoice")]
              ),
              _vm._v(" "),
              !_vm.loading && _vm.printUrl
                ? _c("iframe", {
                    staticStyle: {
                      position: "absolute",
                      top: "-9999px",
                      left: "-9999px",
                      border: "0px",
                      overfow: "none",
                      "z-index": "-1"
                    },
                    attrs: {
                      id: "printLinkIframe",
                      name: "printLinkIframe",
                      src: _vm.printUrl
                    },
                    on: { load: _vm.printInvoice }
                  })
                : _vm._e()
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      Object.keys(_vm.orderErrors).length > 0
        ? _c("errors", { attrs: { errors: _vm.orderErrors } })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-row",
        { attrs: { gutter: 20 } },
        [
          _c(
            "el-col",
            { attrs: { span: 24 } },
            [
              _vm.orderStatuses
                ? _c(
                    "el-form",
                    { attrs: { model: _vm.order } },
                    [
                      _c(
                        "el-select",
                        {
                          attrs: { placeholder: "Select" },
                          model: {
                            value: _vm.order.status,
                            callback: function($$v) {
                              _vm.$set(_vm.order, "status", $$v)
                            },
                            expression: "order.status"
                          }
                        },
                        _vm._l(_vm.orderStatuses, function(status, key) {
                          return _c("el-option", {
                            key: key,
                            attrs: { label: status, value: key }
                          })
                        })
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        [
                          _c(
                            "el-button",
                            {
                              attrs: {
                                type: "primary",
                                size: "small",
                                loading: _vm.loading
                              },
                              on: {
                                click: function($event) {
                                  _vm.updateOrder()
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
                : _vm._e()
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
          _c(
            "el-col",
            {
              staticStyle: { "margin-bottom": "50px" },
              attrs: { md: 24, lg: 12 }
            },
            [
              _c(
                "el-card",
                { staticClass: "box-card" },
                [
                  _c(
                    "div",
                    {
                      staticClass: "clearfix",
                      attrs: { slot: "header" },
                      slot: "header"
                    },
                    [
                      _c(
                        "span",
                        [
                          _vm._v("Shipping Address "),
                          _vm.order.use_billing_for_shipping
                            ? _c("el-tag", { attrs: { size: "mini" } }, [
                                _vm._v("Using Billing")
                              ])
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-button",
                        {
                          staticStyle: { float: "right", padding: "3px 0" },
                          attrs: { type: "text" },
                          on: {
                            click: function($event) {
                              _vm.edit_shipping = !_vm.edit_shipping
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.edit_shipping ? "Cancel" : "Edit"))]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm._l(_vm.order.shipping_address, function(line, key) {
                    return !_vm.edit_shipping
                      ? _c("div", { key: line, staticClass: "text item" }, [
                          _c("strong", [_vm._v(_vm._s(key) + ":")]),
                          _vm._v(" " + _vm._s(line) + "\n              ")
                        ])
                      : _vm._e()
                  }),
                  _vm._v(" "),
                  _vm.edit_shipping
                    ? _c(
                        "el-form",
                        {
                          ref: "editShippingForm",
                          attrs: {
                            model: _vm.order,
                            "label-width": "120px",
                            size: "mini"
                          }
                        },
                        [
                          _c(
                            "el-form-item",
                            {
                              attrs: {
                                label: "Use Billing Address",
                                prop: "use_billing_for_shipping"
                              }
                            },
                            [
                              _c("el-switch", {
                                attrs: {
                                  "active-color": "#13ce66",
                                  "inactive-color": "#ff4949"
                                },
                                model: {
                                  value: _vm.order.use_billing_for_shipping,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.order,
                                      "use_billing_for_shipping",
                                      $$v
                                    )
                                  },
                                  expression: "order.use_billing_for_shipping"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _vm._l(_vm.order.shipping_address, function(
                            line,
                            key
                          ) {
                            return _c(
                              "el-form-item",
                              {
                                key: line,
                                attrs: { label: key, prop: _vm.order[key] }
                              },
                              [
                                _c("el-input", {
                                  attrs: {
                                    disabled:
                                      _vm.order.use_billing_for_shipping,
                                    autofocus: true
                                  },
                                  model: {
                                    value: _vm.order.shipping_address[key],
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.order.shipping_address,
                                        key,
                                        $$v
                                      )
                                    },
                                    expression: "order.shipping_address[key]"
                                  }
                                })
                              ],
                              1
                            )
                          }),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            [
                              _c(
                                "el-button",
                                {
                                  attrs: {
                                    type: "primary",
                                    loading: _vm.loading
                                  },
                                  on: {
                                    click: function($event) {
                                      _vm.updateOrder()
                                    }
                                  }
                                },
                                [_vm._v("Save")]
                              )
                            ],
                            1
                          )
                        ],
                        2
                      )
                    : _vm._e()
                ],
                2
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-col",
            {
              staticStyle: { "margin-bottom": "50px" },
              attrs: { md: 24, lg: 12 }
            },
            [
              _c(
                "el-card",
                { staticClass: "box-card" },
                [
                  _c(
                    "div",
                    {
                      staticClass: "clearfix",
                      attrs: { slot: "header" },
                      slot: "header"
                    },
                    [
                      _c("span", [_vm._v("Billing Address")]),
                      _vm._v(" "),
                      _c(
                        "el-button",
                        {
                          staticStyle: { float: "right", padding: "3px 0" },
                          attrs: { type: "text" },
                          on: {
                            click: function($event) {
                              _vm.edit_billing = !_vm.edit_billing
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.edit_billing ? "Cancel" : "Edit"))]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm._l(_vm.order.billing_address, function(line, key) {
                    return !_vm.edit_billing
                      ? _c("div", { key: line, staticClass: "text item" }, [
                          _c("strong", [_vm._v(_vm._s(key) + ":")]),
                          _vm._v(" " + _vm._s(line) + "\n              ")
                        ])
                      : _vm._e()
                  }),
                  _vm._v(" "),
                  _vm.edit_billing
                    ? _c(
                        "el-form",
                        {
                          ref: "editShippingForm",
                          attrs: {
                            model: _vm.order.billing_address,
                            "label-width": "120px",
                            size: "mini"
                          }
                        },
                        [
                          _vm._l(_vm.order.billing_address, function(
                            line,
                            key
                          ) {
                            return _c(
                              "el-form-item",
                              { key: line, attrs: { label: key, prop: key } },
                              [
                                _c("el-input", {
                                  attrs: { autofocus: true },
                                  model: {
                                    value: _vm.order.billing_address[key],
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.order.billing_address,
                                        key,
                                        $$v
                                      )
                                    },
                                    expression: "order.billing_address[key]"
                                  }
                                })
                              ],
                              1
                            )
                          }),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            [
                              _c(
                                "el-button",
                                {
                                  attrs: {
                                    type: "primary",
                                    loading: _vm.loading
                                  },
                                  on: {
                                    click: function($event) {
                                      _vm.updateOrder()
                                    }
                                  }
                                },
                                [_vm._v("Save")]
                              )
                            ],
                            1
                          )
                        ],
                        2
                      )
                    : _vm._e()
                ],
                2
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
        { staticStyle: { "margin-bottom": "50px" }, attrs: { gutter: 20 } },
        [
          _c(
            "el-col",
            { attrs: { span: 24 } },
            [
              _c("el-card", { staticClass: "box-card" }, [
                _c(
                  "div",
                  {
                    staticClass: "clearfix",
                    attrs: { slot: "header" },
                    slot: "header"
                  },
                  [
                    _c("span", [_vm._v("Customer Information")]),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        staticStyle: { float: "right", padding: "3px 0" },
                        attrs: { type: "text" }
                      },
                      [_vm._v("Edit")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.order.customer
                  ? _c("div", { staticClass: "text item" }, [
                      _c("strong", [_vm._v("Name:")]),
                      _vm._v(
                        " " +
                          _vm._s(_vm.order.customer.full_name) +
                          "\n              "
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.order.customer
                  ? _c("div", { staticClass: "text item" }, [
                      _c("strong", [_vm._v("Email:")]),
                      _vm._v(
                        " " +
                          _vm._s(_vm.order.customer.email) +
                          "\n              "
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.order.customer
                  ? _c("div", { staticClass: "text item" }, [
                      _c("strong", [_vm._v("Phone:")]),
                      _vm._v(
                        " " +
                          _vm._s(_vm.order.customer.phone) +
                          "\n              "
                      )
                    ])
                  : _vm._e()
              ])
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
                  _c(
                    "el-card",
                    { staticClass: "box-card" },
                    [
                      _c(
                        "el-table",
                        {
                          staticStyle: { width: "100%" },
                          attrs: { data: _vm.order.items }
                        },
                        [
                          _c("el-table-column", {
                            attrs: { prop: "name", label: "Product" }
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              prop: "price",
                              formatter: function(row, column, cellValue) {
                                return _vm.order.cart.currency + row.price
                              },
                              label: "Price"
                            }
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: { prop: "qty", label: "Quantity" }
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              prop: "subtotal",
                              formatter: function(row, column, cellValue) {
                                return _vm.order.cart.currency + row.price
                              },
                              label: "Total"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-table",
                        {
                          staticStyle: { width: "100%" },
                          attrs: { data: _vm.orderTotals }
                        },
                        [
                          _c("el-table-column"),
                          _vm._v(" "),
                          _c("el-table-column"),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: { prop: "total", label: "" }
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: { prop: "value", label: "" }
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
    require("vue-hot-reload-api")      .rerender("data-v-1ac302b4", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1e6ae6ea\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue":
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
      !_vm.loading && _vm.printUrl
        ? _c("iframe", {
            staticStyle: {
              position: "absolute",
              top: "-9999px",
              left: "-9999px",
              border: "0px",
              overfow: "none",
              "z-index": "-1"
            },
            attrs: {
              id: "printLinkIframe",
              name: "printLinkIframe",
              src: _vm.printUrl
            },
            on: { load: _vm.print }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("data-table", {
        attrs: {
          "type-name": "order",
          "full-modal": true,
          "table-options": _vm.tableOptions,
          "create-form": _vm.ordersCreateForm,
          "create-form-rules": _vm.createFormRules
        },
        on: { createNew: _vm.handleCreateNew },
        scopedSlots: _vm._u([
          {
            key: "createForm",
            fn: function(props) {
              return [
                _c(
                  "el-row",
                  { attrs: { gutter: 20 } },
                  [
                    _c(
                      "el-col",
                      { attrs: { md: 12 } },
                      [
                        _c(
                          "el-form-item",
                          {
                            attrs: {
                              label: "Customer First Name",
                              prop: "first_name"
                            }
                          },
                          [
                            _c("el-input", {
                              attrs: {
                                autofocus: true,
                                "auto-complete": "off"
                              },
                              model: {
                                value: _vm.ordersCreateForm.first_name,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.ordersCreateForm,
                                    "first_name",
                                    $$v
                                  )
                                },
                                expression: "ordersCreateForm.first_name"
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
                      { attrs: { md: 12 } },
                      [
                        _c(
                          "el-form-item",
                          {
                            attrs: {
                              label: "Customer Last Name",
                              prop: "last_name"
                            }
                          },
                          [
                            _c("el-input", {
                              attrs: {
                                autofocus: true,
                                "auto-complete": "off"
                              },
                              model: {
                                value: _vm.ordersCreateForm.last_name,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.ordersCreateForm,
                                    "last_name",
                                    $$v
                                  )
                                },
                                expression: "ordersCreateForm.last_name"
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
                  { attrs: { gutter: 20 } },
                  [
                    _c(
                      "el-col",
                      { attrs: { md: 12 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "Customer Email", prop: "email" } },
                          [
                            _c("el-input", {
                              attrs: {
                                autofocus: true,
                                "auto-complete": "off"
                              },
                              model: {
                                value: _vm.ordersCreateForm.email,
                                callback: function($$v) {
                                  _vm.$set(_vm.ordersCreateForm, "email", $$v)
                                },
                                expression: "ordersCreateForm.email"
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
                      { attrs: { md: 12 } },
                      [
                        _c(
                          "el-form-item",
                          { attrs: { label: "Customer Phone", prop: "phone" } },
                          [
                            _c("el-input", {
                              attrs: {
                                autofocus: true,
                                "auto-complete": "off"
                              },
                              model: {
                                value: _vm.ordersCreateForm.phone,
                                callback: function($$v) {
                                  _vm.$set(_vm.ordersCreateForm, "phone", $$v)
                                },
                                expression: "ordersCreateForm.phone"
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
                  {
                    staticStyle: { "margin-top": "50px" },
                    attrs: { gutter: 20 }
                  },
                  [
                    _c(
                      "el-col",
                      { attrs: { md: 12 } },
                      [
                        _c(
                          "el-form-item",
                          {
                            attrs: {
                              label: "Billing Address Line 1",
                              prop: "billing_address_line1"
                            }
                          },
                          [
                            _c("el-input", {
                              attrs: {
                                autofocus: true,
                                "auto-complete": "off"
                              },
                              model: {
                                value:
                                  _vm.ordersCreateForm.billing_address_line1,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.ordersCreateForm,
                                    "billing_address_line1",
                                    $$v
                                  )
                                },
                                expression:
                                  "ordersCreateForm.billing_address_line1"
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
                      { attrs: { md: 12 } },
                      [
                        _c(
                          "el-form-item",
                          {
                            attrs: {
                              label: "Billing Address Line 2",
                              prop: "billing_address_line2"
                            }
                          },
                          [
                            _c("el-input", {
                              attrs: {
                                autofocus: true,
                                "auto-complete": "off"
                              },
                              model: {
                                value:
                                  _vm.ordersCreateForm.billing_address_line2,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.ordersCreateForm,
                                    "billing_address_line2",
                                    $$v
                                  )
                                },
                                expression:
                                  "ordersCreateForm.billing_address_line2"
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
                      { attrs: { md: 12 } },
                      [
                        _c(
                          "el-form-item",
                          {
                            attrs: {
                              label: "Billing Address Town",
                              prop: "billing_address_town"
                            }
                          },
                          [
                            _c("el-input", {
                              attrs: {
                                autofocus: true,
                                "auto-complete": "off"
                              },
                              model: {
                                value:
                                  _vm.ordersCreateForm.billing_address_town,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.ordersCreateForm,
                                    "billing_address_town",
                                    $$v
                                  )
                                },
                                expression:
                                  "ordersCreateForm.billing_address_town"
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
                      { attrs: { md: 12 } },
                      [
                        _c(
                          "el-form-item",
                          {
                            attrs: {
                              label: "Billing Address County",
                              prop: "billing_address_county"
                            }
                          },
                          [
                            _c("el-input", {
                              attrs: {
                                autofocus: true,
                                "auto-complete": "off"
                              },
                              model: {
                                value:
                                  _vm.ordersCreateForm.billing_address_county,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.ordersCreateForm,
                                    "billing_address_county",
                                    $$v
                                  )
                                },
                                expression:
                                  "ordersCreateForm.billing_address_county"
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
                      { attrs: { md: 12 } },
                      [
                        _c(
                          "el-form-item",
                          {
                            attrs: {
                              label: "Billing Address Postcode",
                              prop: "billing_address_postcode"
                            }
                          },
                          [
                            _c("el-input", {
                              attrs: {
                                autofocus: true,
                                "auto-complete": "off"
                              },
                              model: {
                                value:
                                  _vm.ordersCreateForm.billing_address_postcode,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.ordersCreateForm,
                                    "billing_address_postcode",
                                    $$v
                                  )
                                },
                                expression:
                                  "ordersCreateForm.billing_address_postcode"
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
                      { attrs: { md: 12 } },
                      [
                        _c(
                          "el-form-item",
                          {
                            attrs: {
                              label: "Billing Address Country",
                              prop: "billing_address_country"
                            }
                          },
                          [
                            _c("el-input", {
                              attrs: {
                                autofocus: true,
                                "auto-complete": "off"
                              },
                              model: {
                                value:
                                  _vm.ordersCreateForm.billing_address_country,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.ordersCreateForm,
                                    "billing_address_country",
                                    $$v
                                  )
                                },
                                expression:
                                  "ordersCreateForm.billing_address_country"
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
                  {
                    staticStyle: { "margin-top": "50px" },
                    attrs: { gutter: 20 }
                  },
                  [
                    _c(
                      "el-col",
                      { attrs: { md: 24 } },
                      [
                        _c(
                          "el-form-item",
                          {
                            attrs: {
                              label: "Shipping Address Same As Billing",
                              prop: "same_shipping_address"
                            }
                          },
                          [
                            _c("el-switch", {
                              attrs: {
                                "active-color": "#13ce66",
                                "inactive-color": "#ff4949"
                              },
                              model: {
                                value:
                                  _vm.ordersCreateForm.same_shipping_address,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.ordersCreateForm,
                                    "same_shipping_address",
                                    $$v
                                  )
                                },
                                expression:
                                  "ordersCreateForm.same_shipping_address"
                              }
                            })
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    !_vm.ordersCreateForm.same_shipping_address
                      ? _c(
                          "el-col",
                          { attrs: { md: 12 } },
                          [
                            _c(
                              "el-form-item",
                              {
                                attrs: {
                                  label: "Shipping Address Line 1",
                                  prop: "shipping_address_line1"
                                }
                              },
                              [
                                _c("el-input", {
                                  attrs: {
                                    autofocus: true,
                                    "auto-complete": "off"
                                  },
                                  model: {
                                    value:
                                      _vm.ordersCreateForm
                                        .shipping_address_line1,
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.ordersCreateForm,
                                        "shipping_address_line1",
                                        $$v
                                      )
                                    },
                                    expression:
                                      "ordersCreateForm.shipping_address_line1"
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
                    !_vm.ordersCreateForm.same_shipping_address
                      ? _c(
                          "el-col",
                          { attrs: { md: 12 } },
                          [
                            _c(
                              "el-form-item",
                              {
                                attrs: {
                                  label: "Shipping Address Line 2",
                                  prop: "shipping_address_line2"
                                }
                              },
                              [
                                _c("el-input", {
                                  attrs: {
                                    autofocus: true,
                                    "auto-complete": "off"
                                  },
                                  model: {
                                    value:
                                      _vm.ordersCreateForm
                                        .shipping_address_line2,
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.ordersCreateForm,
                                        "shipping_address_line2",
                                        $$v
                                      )
                                    },
                                    expression:
                                      "ordersCreateForm.shipping_address_line2"
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
                    !_vm.ordersCreateForm.same_shipping_address
                      ? _c(
                          "el-col",
                          { attrs: { md: 12 } },
                          [
                            _c(
                              "el-form-item",
                              {
                                attrs: {
                                  label: "Shipping Address Town",
                                  prop: "shipping_address_town"
                                }
                              },
                              [
                                _c("el-input", {
                                  attrs: {
                                    autofocus: true,
                                    "auto-complete": "off"
                                  },
                                  model: {
                                    value:
                                      _vm.ordersCreateForm
                                        .shipping_address_town,
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.ordersCreateForm,
                                        "shipping_address_town",
                                        $$v
                                      )
                                    },
                                    expression:
                                      "ordersCreateForm.shipping_address_town"
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
                    !_vm.ordersCreateForm.same_shipping_address
                      ? _c(
                          "el-col",
                          { attrs: { md: 12 } },
                          [
                            _c(
                              "el-form-item",
                              {
                                attrs: {
                                  label: "Shipping Address County",
                                  prop: "shipping_address_county"
                                }
                              },
                              [
                                _c("el-input", {
                                  attrs: {
                                    autofocus: true,
                                    "auto-complete": "off"
                                  },
                                  model: {
                                    value:
                                      _vm.ordersCreateForm
                                        .shipping_address_county,
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.ordersCreateForm,
                                        "shipping_address_county",
                                        $$v
                                      )
                                    },
                                    expression:
                                      "ordersCreateForm.shipping_address_county"
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
                    !_vm.ordersCreateForm.same_shipping_address
                      ? _c(
                          "el-col",
                          { attrs: { md: 12 } },
                          [
                            _c(
                              "el-form-item",
                              {
                                attrs: {
                                  label: "Shipping Address Postcode",
                                  prop: "shipping_address_postcode"
                                }
                              },
                              [
                                _c("el-input", {
                                  attrs: {
                                    autofocus: true,
                                    "auto-complete": "off"
                                  },
                                  model: {
                                    value:
                                      _vm.ordersCreateForm
                                        .shipping_address_postcode,
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.ordersCreateForm,
                                        "shipping_address_postcode",
                                        $$v
                                      )
                                    },
                                    expression:
                                      "ordersCreateForm.shipping_address_postcode"
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
                    !_vm.ordersCreateForm.same_shipping_address
                      ? _c(
                          "el-col",
                          { attrs: { md: 12 } },
                          [
                            _c(
                              "el-form-item",
                              {
                                attrs: {
                                  label: "Shipping Address Country",
                                  prop: "shipping_address_country"
                                }
                              },
                              [
                                _c("el-input", {
                                  attrs: {
                                    autofocus: true,
                                    "auto-complete": "off"
                                  },
                                  model: {
                                    value:
                                      _vm.ordersCreateForm
                                        .shipping_address_country,
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.ordersCreateForm,
                                        "shipping_address_country",
                                        $$v
                                      )
                                    },
                                    expression:
                                      "ordersCreateForm.shipping_address_country"
                                  }
                                })
                              ],
                              1
                            )
                          ],
                          1
                        )
                      : _vm._e()
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "el-row",
                  {
                    staticStyle: { "margin-top": "50px" },
                    attrs: { gutter: 20 }
                  },
                  [
                    _c(
                      "el-col",
                      { attrs: { md: 12 } },
                      [
                        _vm.products
                          ? _c(
                              "el-form-item",
                              {
                                attrs: { label: "Products", prop: "products" }
                              },
                              [
                                _c(
                                  "el-select",
                                  {
                                    staticClass: "collection_type_select",
                                    staticStyle: { width: "100%" },
                                    attrs: {
                                      filterable: "",
                                      multiple: "",
                                      "allow-create": "",
                                      placeholder: "Select"
                                    },
                                    model: {
                                      value: _vm.ordersCreateForm.products,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.ordersCreateForm,
                                          "products",
                                          $$v
                                        )
                                      },
                                      expression: "ordersCreateForm.products"
                                    }
                                  },
                                  _vm._l(_vm.products, function(product) {
                                    return _c("el-option", {
                                      key: product.id,
                                      attrs: {
                                        label: product.name,
                                        value: product.id
                                      }
                                    })
                                  })
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
              ]
            }
          }
        ])
      })
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
    require("vue-hot-reload-api")      .rerender("data-v-1e6ae6ea", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ac302b4\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ac302b4\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("088e5270", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ac302b4\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./ViewOrder.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ac302b4\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./ViewOrder.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1e6ae6ea\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1e6ae6ea\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("35e68954", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1e6ae6ea\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Orders.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1e6ae6ea\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Orders.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/pages/orders/Orders.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1e6ae6ea\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1e6ae6ea\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/orders/Orders.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1e6ae6ea", Component.options)
  } else {
    hotAPI.reload("data-v-1e6ae6ea", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/admin-spa/pages/orders/ViewOrder.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ac302b4\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1ac302b4\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/orders/ViewOrder.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1ac302b4", Component.options)
  } else {
    hotAPI.reload("data-v-1ac302b4", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});