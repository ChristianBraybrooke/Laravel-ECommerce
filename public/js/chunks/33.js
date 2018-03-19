webpackJsonp([33],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/components/ProductVariantComponent.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

    name: 'ProductVariantComponent',

    components: {
        FilePickerModal: function FilePickerModal() {
            return __webpack_require__.e/* import() */(17/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/FilePickerModal.vue"));
        }
    },

    props: {
        model: {
            type: Object,
            required: true
        }
    },

    data: function data() {
        return {
            productVariant: {}
        };
    },


    computed: {},

    watch: {},

    mounted: function mounted() {
        console.log('ProductVariantComponent.vue mounted');
        this.productVariant = this.model;
    },


    methods: {
        displayFilePicker: function displayFilePicker(filePicker) {
            if (this.$refs[filePicker]) {
                this.$refs[filePicker].openModal();
            }
        },
        handleFilesChosen: function handleFilesChosen(data) {
            this.$set(this.productVariant, data.id, data.files);
        },
        handleFilesUnChosen: function handleFilesUnChosen(data) {
            this.$set(this.productVariant, data.id, data.files);
        }
    }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6aa222d8\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/components/ProductVariantComponent.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6aa222d8\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/components/ProductVariantComponent.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {},
    [
      _c(
        "el-row",
        { attrs: { gutter: 20 } },
        [
          _c(
            "el-col",
            { attrs: { lg: 12, md: 24 } },
            [
              _c(
                "el-form-item",
                { attrs: { label: "Name", prop: "name" } },
                [
                  _c("el-input", {
                    attrs: { autofocus: true },
                    model: {
                      value: _vm.productVariant.name,
                      callback: function($$v) {
                        _vm.$set(_vm.productVariant, "name", $$v)
                      },
                      expression: "productVariant.name"
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
            { attrs: { lg: 12, md: 24 } },
            [
              _c(
                "el-form-item",
                { attrs: { label: "Slug / Url", prop: "slug" } },
                [
                  _c(
                    "el-input",
                    {
                      model: {
                        value: _vm.productVariant.slug,
                        callback: function($$v) {
                          _vm.$set(_vm.productVariant, "slug", $$v)
                        },
                        expression: "productVariant.slug"
                      }
                    },
                    [
                      _c(
                        "template",
                        { attrs: { slot: "prepend" }, slot: "prepend" },
                        [_vm._v(_vm._s(_vm.getSiteBaseURL) + "products/")]
                      )
                    ],
                    2
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
          _c(
            "el-col",
            { attrs: { md: 24 } },
            [
              _c(
                "el-form-item",
                { attrs: { label: "Main Img", prop: "main_img" } },
                [
                  _c(
                    "el-button",
                    {
                      attrs: { type: "info", plain: "", size: "mini" },
                      on: {
                        click: function($event) {
                          _vm.displayFilePicker("mainImgFilePicker")
                        }
                      }
                    },
                    [
                      _vm._v("Select File "),
                      _c("i", { staticClass: "el-icon-document" })
                    ]
                  ),
                  _vm._v(" "),
                  _vm.productVariant
                    ? _c("file-picker-modal", {
                        ref: "mainImgFilePicker",
                        attrs: {
                          "current-files": _vm.productVariant.main_img
                            ? [_vm.productVariant.main_img]
                            : undefined,
                          name: "Main Img",
                          selectable: 1,
                          "picker-id": "main_img",
                          "open-on-mount": false
                        },
                        on: {
                          filesChosen: _vm.handleFilesChosen,
                          filesUnChosen: _vm.handleFilesUnChosen
                        }
                      })
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
    require("vue-hot-reload-api")      .rerender("data-v-6aa222d8", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6aa222d8\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/components/ProductVariantComponent.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6aa222d8\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/components/ProductVariantComponent.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("273c6a55", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6aa222d8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./ProductVariantComponent.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6aa222d8\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./ProductVariantComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/components/ProductVariantComponent.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6aa222d8\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/components/ProductVariantComponent.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/components/ProductVariantComponent.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6aa222d8\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/components/ProductVariantComponent.vue")
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
Component.options.__file = "resources/assets/admin-spa/components/ProductVariantComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6aa222d8", Component.options)
  } else {
    hotAPI.reload("data-v-6aa222d8", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});