webpackJsonp([28],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/Dashboard.vue":
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

var _vuex = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");

exports.default = {

  name: 'Dashboard',

  components: {
    Errors: function Errors() {
      return __webpack_require__.e/* import() */(31/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
    }
  },

  props: {},

  data: function data() {
    return {
      loading: false
    };
  },


  computed: _extends({}, (0, _vuex.mapGetters)(['user', 'userErrors'])),

  watch: {},

  mounted: function mounted() {
    console.log('Dashboard.vue mounted');
    this.getUser();
  },


  methods: _extends({}, (0, _vuex.mapActions)(['getUser']))

};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31c5e82c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/Dashboard.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.welcome_text[data-v-31c5e82c] {\n    text-align: center;\n}\n.welcome_row[data-v-31c5e82c] {\n    margin-top: 40px;\n    margin-bottom: 40px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-31c5e82c\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/Dashboard.vue":
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
      Object.keys(_vm.userErrors).length > 0
        ? _c("errors", { attrs: { errors: _vm.userErrors } })
        : _vm._e(),
      _vm._v(" "),
      _c("h1", { staticClass: "welcome_text" }, [
        _vm._v("Welcome, " + _vm._s(_vm.user.name.first))
      ]),
      _vm._v(" "),
      _c(
        "el-row",
        { staticClass: "welcome_row", attrs: { gutter: 40 } },
        [
          _c(
            "el-col",
            { attrs: { md: 8 } },
            [
              _c("el-card", [
                _c(
                  "div",
                  {
                    staticClass: "clearfix",
                    attrs: { slot: "header" },
                    slot: "header"
                  },
                  [
                    _c("span", [_vm._v("Orders")]),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        staticStyle: { float: "right" },
                        attrs: { size: "mini", type: "primary", plain: "" }
                      },
                      [_vm._v("Create Order")]
                    )
                  ],
                  1
                )
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-col",
            { attrs: { md: 8 } },
            [
              _c("el-card", [
                _c(
                  "div",
                  {
                    staticClass: "clearfix",
                    attrs: { slot: "header" },
                    slot: "header"
                  },
                  [
                    _c("span", [_vm._v("Products")]),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        staticStyle: { float: "right" },
                        attrs: { size: "mini", type: "primary", plain: "" }
                      },
                      [_vm._v("Create Product")]
                    )
                  ],
                  1
                )
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-col",
            { attrs: { md: 8 } },
            [
              _c("el-card", [
                _c(
                  "div",
                  {
                    staticClass: "clearfix",
                    attrs: { slot: "header" },
                    slot: "header"
                  },
                  [
                    _c("span", [_vm._v("Pages")]),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        staticStyle: { float: "right" },
                        attrs: { size: "mini", type: "primary", plain: "" }
                      },
                      [_vm._v("Create Page")]
                    )
                  ],
                  1
                )
              ])
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
    require("vue-hot-reload-api")      .rerender("data-v-31c5e82c", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31c5e82c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/Dashboard.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31c5e82c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/Dashboard.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("9dddedbe", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31c5e82c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Dashboard.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31c5e82c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Dashboard.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/pages/Dashboard.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-31c5e82c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/Dashboard.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/Dashboard.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-31c5e82c\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/Dashboard.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-31c5e82c"
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
Component.options.__file = "resources/assets/admin-spa/pages/Dashboard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-31c5e82c", Component.options)
  } else {
    hotAPI.reload("data-v-31c5e82c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});