webpackJsonp([9],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/config/Config.vue":
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

var upperFirst = __webpack_require__("./node_modules/lodash.upperfirst/index.js");
exports.default = {

    name: 'Config',

    components: {
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(22/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        },
        FilePickerModal: function FilePickerModal() {
            return __webpack_require__.e/* import() */(23/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/FilePickerModal.vue"));
        }
    },

    props: [],

    data: function data() {
        return {
            loading: false,
            settings: {},
            settingsErrors: {},
            settingsForm: {},
            collections: {},
            shopData: {},
            featured_product_types: {},
            users: {},
            currentTab: 'general'
        };
    },


    computed: {
        //
    },

    watch: {
        //
    },

    mounted: function mounted() {
        console.log('Config.vue mounted');
        this.getSettings();
        this.getCollections();
        this.getUsers();
    },


    methods: _extends({}, (0, _vuex.mapActions)(['setShopData']), {
        p: function p(path) {
            var segments = path.split('.');
            return function () {
                var obj = this;
                for (var i = 0; i < segments.length; i++) {
                    if (!obj) return;
                    obj = obj[segments[i]];
                }
                return obj;
            };
        },
        ucFirst: function ucFirst(value) {
            return upperFirst(value);
        },
        getSettings: function getSettings() {
            this.loading = true;
            this.settingsErrors = {};

            _apiService2.default.get({
                path: 'settings'
            }).then(function (data) {
                this.loading = false;
                this.settings = data.data;
                this.setShopData(data.shop_data);
                this.shopData = data.shop_data;
                if (!this.settings['Admin Notifications']) {
                    this.settings['Admin Notifications'] = [];
                }

                this.getFeaturedProductCollectionTypes();
            }.bind(this)).catch(function (error) {
                this.loading = false;
                this.settingsErrors = error;
            }.bind(this));
        },
        getCollections: function getCollections() {
            _apiService2.default.get({
                path: 'collections'
            }).then(function (data) {
                this.collections = data.data;
            }.bind(this)).catch(function (error) {
                this.settingsErrors = error;
            }.bind(this));
        },
        getFeaturedProductCollectionTypes: function getFeaturedProductCollectionTypes() {

            if (this.settings['Home Featured Product Collection']) {
                _apiService2.default.get({
                    path: 'collections/' + this.settings['Home Featured Product Collection'] + '/types'
                }).then(function (data) {
                    this.featured_product_types = data.data;
                }.bind(this)).catch(function (error) {
                    this.settingsErrors = error;
                }.bind(this));
            } else {
                this.featured_product_types = {};
            }
        },
        getUsers: function getUsers() {
            _apiService2.default.get({
                path: 'users',
                params: {
                    withRole: 'admin'
                }
            }).then(function (data) {
                this.users = data.data;
            }.bind(this)).catch(function (error) {
                this.settingsErrors = error;
            }.bind(this));
        },
        submitForm: function submitForm(formName) {
            this.loading = true;
            this.settingsErrors = {};

            _apiService2.default.persist('post', {
                path: 'settings',
                object: {
                    settings: this.settings
                }
            }).then(function (data) {
                this.loading = false;
                this.settings = data.data;
            }.bind(this)).catch(function (error) {
                this.loading = false;
                this.settingsErrors = error;
            }.bind(this));
        },
        displayFilePicker: function displayFilePicker(ref) {
            if (this.$refs[ref]) {
                this.$refs[ref].openModal();
            }
        },
        handleFilesChosen: function handleFilesChosen(data) {
            this.$set(this.settings, data.id, data.files);
        },
        handleFilesUnChosen: function handleFilesUnChosen(data) {
            this.$set(this.settings, data.id, data.files);
        }
    })

};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72f7a707\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/config/Config.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.config_select[data-v-72f7a707] {\n    width: 100%\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/lodash.upperfirst/index.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
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
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

module.exports = upperFirst;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-72f7a707\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/config/Config.vue":
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
        "el-row",
        { attrs: { align: "middle", type: "flex" } },
        [
          _c("el-col", { attrs: { span: 12 } }, [
            _c("h1", { staticClass: "page_title" }, [_vm._v("Config")])
          ])
        ],
        1
      ),
      _vm._v(" "),
      Object.keys(_vm.settingsErrors).length > 0
        ? _c("errors", { attrs: { errors: _vm.settingsErrors } })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-row",
        { attrs: { type: "flex" } },
        [
          _c(
            "el-col",
            { attrs: { md: 24 } },
            [
              _c(
                "el-form",
                {
                  ref: "settingsForm",
                  attrs: {
                    "label-position": "top",
                    model: _vm.settings,
                    "label-width": "120px"
                  },
                  nativeOn: {
                    keyup: function($event) {
                      if (
                        !("button" in $event) &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      ) {
                        return null
                      }
                      _vm.submitForm("settingsForm")
                    }
                  }
                },
                [
                  _c(
                    "el-row",
                    { attrs: { gutter: 20 } },
                    [
                      _c(
                        "el-tabs",
                        {
                          model: {
                            value: _vm.currentTab,
                            callback: function($$v) {
                              _vm.currentTab = $$v
                            },
                            expression: "currentTab"
                          }
                        },
                        [
                          _c(
                            "el-tab-pane",
                            { attrs: { label: "General", name: "general" } },
                            [
                              _c(
                                "el-row",
                                { attrs: { gutter: 20 } },
                                [
                                  _c("el-col", { attrs: { md: 12 } }, [
                                    _c("h5", [_vm._v("Site Information")])
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
                                    { attrs: { md: { span: 8, offset: 4 } } },
                                    [
                                      _vm.settings
                                        ? _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: "Site Url",
                                                size: "small",
                                                prop: "url"
                                              }
                                            },
                                            [
                                              _c("el-input", {
                                                attrs: { disabled: "" },
                                                model: {
                                                  value: _vm.settings["url"],
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.settings,
                                                      "url",
                                                      $$v
                                                    )
                                                  },
                                                  expression: "settings['url']"
                                                }
                                              })
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
                                    { attrs: { md: { span: 8, offset: 4 } } },
                                    [
                                      _vm.settings
                                        ? _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: "Contact Phone",
                                                size: "small",
                                                prop: "Contact Phone"
                                              }
                                            },
                                            [
                                              _c("el-input", {
                                                model: {
                                                  value:
                                                    _vm.settings[
                                                      "Contact Phone"
                                                    ],
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.settings,
                                                      "Contact Phone",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "settings['Contact Phone']"
                                                }
                                              })
                                            ],
                                            1
                                          )
                                        : _vm._e()
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "el-col",
                                    { attrs: { md: { span: 8 } } },
                                    [
                                      _vm.settings
                                        ? _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: "Contact Email",
                                                size: "small",
                                                prop: "Contact Email"
                                              }
                                            },
                                            [
                                              _c("el-input", {
                                                model: {
                                                  value:
                                                    _vm.settings[
                                                      "Contact Email"
                                                    ],
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.settings,
                                                      "Contact Email",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "settings['Contact Email']"
                                                }
                                              })
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
                              _c("hr", { staticClass: "form_hr" }),
                              _vm._v(" "),
                              _c(
                                "el-row",
                                { attrs: { gutter: 20 } },
                                [
                                  _c("el-col", { attrs: { md: 12 } }, [
                                    _c("h5", [_vm._v("Admin Notifications")])
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
                                    { attrs: { md: { span: 8, offset: 4 } } },
                                    [
                                      _vm.settings
                                        ? _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: "Admin Notifications",
                                                prop: "Admin Notifications",
                                                size: "small"
                                              }
                                            },
                                            [
                                              _c(
                                                "el-select",
                                                {
                                                  staticClass: "config_select",
                                                  attrs: {
                                                    placeholder: "Select",
                                                    multiple: "",
                                                    filterable: ""
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.settings[
                                                        "Admin Notifications"
                                                      ],
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.settings,
                                                        "Admin Notifications",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "settings['Admin Notifications']"
                                                  }
                                                },
                                                _vm._l(_vm.users, function(
                                                  user
                                                ) {
                                                  return user.name
                                                    ? _c("el-option", {
                                                        key: user.name.full,
                                                        attrs: {
                                                          label: user.name.full,
                                                          value: user.id
                                                        }
                                                      })
                                                    : _vm._e()
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
                              ),
                              _vm._v(" "),
                              _c("hr", { staticClass: "form_hr" }),
                              _vm._v(" "),
                              _c(
                                "el-row",
                                { attrs: { gutter: 20 } },
                                [
                                  _c("el-col", { attrs: { md: 12 } }, [
                                    _c("h5", [_vm._v("Order Information")])
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
                                    { attrs: { md: { span: 8, offset: 4 } } },
                                    [
                                      _vm.settings
                                        ? _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: "Invoice Number Prefix",
                                                prop: "Invoice Number Prefix",
                                                size: "small"
                                              }
                                            },
                                            [
                                              _c("el-input", {
                                                model: {
                                                  value:
                                                    _vm.settings[
                                                      "Invoice Number Prefix"
                                                    ],
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.settings,
                                                      "Invoice Number Prefix",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "settings['Invoice Number Prefix']"
                                                }
                                              })
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
                                    { attrs: { md: { span: 8, offset: 4 } } },
                                    [
                                      _vm.settings
                                        ? _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: "Currency",
                                                prop: "Currency",
                                                size: "small"
                                              }
                                            },
                                            [
                                              _c("el-input", {
                                                model: {
                                                  value:
                                                    _vm.settings["Currency"],
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.settings,
                                                      "Currency",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "settings['Currency']"
                                                }
                                              })
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
                                    { attrs: { md: { span: 5, offset: 4 } } },
                                    [
                                      _vm.settings
                                        ? _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label:
                                                  "Price Thousand Seperator",
                                                prop:
                                                  "Price Thousand Seperator",
                                                size: "small"
                                              }
                                            },
                                            [
                                              _c(
                                                "el-select",
                                                {
                                                  staticClass: "config_select",
                                                  attrs: {
                                                    placeholder: "Select"
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.settings[
                                                        "Price Thousand Seperator"
                                                      ],
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.settings,
                                                        "Price Thousand Seperator",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "settings['Price Thousand Seperator']"
                                                  }
                                                },
                                                [
                                                  _c("el-option", {
                                                    key: 0,
                                                    attrs: {
                                                      label: ",",
                                                      value: ","
                                                    }
                                                  }),
                                                  _vm._v(" "),
                                                  _c("el-option", {
                                                    key: 1,
                                                    attrs: {
                                                      label: "",
                                                      value: ""
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
                                    "el-col",
                                    { attrs: { md: { span: 5 } } },
                                    [
                                      _vm.settings
                                        ? _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label:
                                                  "Price Decimal Seperator",
                                                prop: "Price Decimal Seperator",
                                                size: "small"
                                              }
                                            },
                                            [
                                              _c(
                                                "el-select",
                                                {
                                                  staticClass: "config_select",
                                                  attrs: {
                                                    placeholder: "Select"
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.settings[
                                                        "Price Decimal Seperator"
                                                      ],
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.settings,
                                                        "Price Decimal Seperator",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "settings['Price Decimal Seperator']"
                                                  }
                                                },
                                                [
                                                  _c("el-option", {
                                                    key: 0,
                                                    attrs: {
                                                      label: ",",
                                                      value: ","
                                                    }
                                                  }),
                                                  _vm._v(" "),
                                                  _c("el-option", {
                                                    key: 1,
                                                    attrs: {
                                                      label: ".",
                                                      value: "."
                                                    }
                                                  }),
                                                  _vm._v(" "),
                                                  _c("el-option", {
                                                    key: 2,
                                                    attrs: {
                                                      label: ":",
                                                      value: ":"
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
                                    "el-col",
                                    { attrs: { md: { span: 5 } } },
                                    [
                                      _vm.settings
                                        ? _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label:
                                                  "Price Numer of Decimals",
                                                prop: "Price Numer of Decimals",
                                                size: "small"
                                              }
                                            },
                                            [
                                              _c(
                                                "el-select",
                                                {
                                                  staticClass: "config_select",
                                                  attrs: {
                                                    placeholder: "Select"
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.settings[
                                                        "Price Numer of Decimals"
                                                      ],
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.settings,
                                                        "Price Numer of Decimals",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "settings['Price Numer of Decimals']"
                                                  }
                                                },
                                                [
                                                  _c("el-option", {
                                                    key: 0,
                                                    attrs: {
                                                      label: 0,
                                                      value: 0
                                                    }
                                                  }),
                                                  _vm._v(" "),
                                                  _c("el-option", {
                                                    key: 2,
                                                    attrs: {
                                                      label: 2,
                                                      value: 2
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
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("hr", { staticClass: "form_hr" }),
                              _vm._v(" "),
                              _c(
                                "el-row",
                                { attrs: { gutter: 20 } },
                                [
                                  _c("el-col", { attrs: { md: 12 } }, [
                                    _c("h5", [_vm._v("Order Information")])
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
                                    { attrs: { md: { span: 8, offset: 4 } } },
                                    [
                                      _vm.settings
                                        ? _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: "Shipping Rate",
                                                prop: "Shipping Rate",
                                                size: "small"
                                              }
                                            },
                                            [
                                              _c("el-input", {
                                                model: {
                                                  value:
                                                    _vm.settings[
                                                      "Shipping Rate"
                                                    ],
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.settings,
                                                      "Shipping Rate",
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "settings['Shipping Rate']"
                                                }
                                              })
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
                          ),
                          _vm._v(" "),
                          _c(
                            "el-tab-pane",
                            {
                              attrs: {
                                label: "Site Images",
                                name: "site_images"
                              }
                            },
                            [
                              _c(
                                "el-col",
                                { attrs: { lg: 12, md: 24 } },
                                _vm._l(_vm.shopData.site_images, function(
                                  image
                                ) {
                                  return _vm.settings
                                    ? _c(
                                        "el-form-item",
                                        {
                                          key: image,
                                          attrs: { label: image, prop: image }
                                        },
                                        [
                                          _vm.settings
                                            ? _c("file-picker-modal", {
                                                attrs: {
                                                  "current-files":
                                                    _vm.settings[image] &&
                                                    _vm.settings[image][0]
                                                      ? [_vm.settings[image][0]]
                                                      : undefined,
                                                  "show-btn": true,
                                                  name: image,
                                                  selectable: 1,
                                                  "picker-id": image
                                                },
                                                on: {
                                                  "update:files": function(
                                                    val
                                                  ) {
                                                    return (_vm.settings[
                                                      image
                                                    ] = val)
                                                  }
                                                }
                                              })
                                            : _vm._e()
                                        ],
                                        1
                                      )
                                    : _vm._e()
                                })
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "el-tab-pane",
                            {
                              attrs: {
                                label: "Collection Mappings",
                                name: "collection_mappings"
                              }
                            },
                            [
                              _c(
                                "el-col",
                                { attrs: { lg: 12, md: 24 } },
                                _vm._l(
                                  _vm.shopData.collection_mappings,
                                  function(mapping) {
                                    return _vm.settings
                                      ? _c(
                                          "el-form-item",
                                          {
                                            key: mapping,
                                            attrs: {
                                              label: mapping,
                                              prop: mapping
                                            }
                                          },
                                          [
                                            _c(
                                              "el-select",
                                              {
                                                staticClass: "config_select",
                                                attrs: {
                                                  placeholder: "Select"
                                                },
                                                model: {
                                                  value: _vm.settings[mapping],
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.settings,
                                                      mapping,
                                                      $$v
                                                    )
                                                  },
                                                  expression:
                                                    "settings[mapping]"
                                                }
                                              },
                                              _vm._l(_vm.collections, function(
                                                type
                                              ) {
                                                return _c("el-option", {
                                                  key: type.name,
                                                  attrs: {
                                                    label: type.name,
                                                    value: type.id
                                                  }
                                                })
                                              })
                                            )
                                          ],
                                          1
                                        )
                                      : _vm._e()
                                  }
                                )
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
                                      _vm.submitForm("settingsForm")
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
    require("vue-hot-reload-api")      .rerender("data-v-72f7a707", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72f7a707\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/config/Config.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72f7a707\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/config/Config.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("39ecfb6c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72f7a707\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Config.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72f7a707\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Config.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/pages/config/Config.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72f7a707\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/config/Config.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/config/Config.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-72f7a707\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/config/Config.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-72f7a707"
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
Component.options.__file = "resources/assets/admin-spa/pages/config/Config.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-72f7a707", Component.options)
  } else {
    hotAPI.reload("data-v-72f7a707", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});