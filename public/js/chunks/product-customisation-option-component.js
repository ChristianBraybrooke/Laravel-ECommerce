webpackJsonp([47],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/ProductCustomisationOptionComponent.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {

  name: 'ProductCustomisationOptionComponent',

  components: {
    FilePickerModal: function FilePickerModal() {
      return __webpack_require__.e/* import() */(33/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/FilePickerModal.vue"));
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
      productCustomisationOption: {}
    };
  },


  computed: {},

  watch: {},

  mounted: function mounted() {
    console.log('ProductCustomisationOptionComponent.vue mounted');
    this.productCustomisationOption = this.model;
  },


  methods: {
    displayFilePicker: function displayFilePicker(filePicker) {
      if (this.$refs[filePicker]) {
        this.$refs[filePicker].openModal();
      }
    },
    handleFilesChosen: function handleFilesChosen(data) {
      this.$set(this.productCustomisationOption, data.id, data.files);
    },
    handleFilesUnChosen: function handleFilesUnChosen(data) {
      this.$set(this.productCustomisationOption, data.id, data.files);
    },
    deleteOption: function deleteOption(option) {
      this.$emit('optionDeleted', option);
    }
  }

};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-158d6b9e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductCustomisationOptionComponent.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-158d6b9e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/ProductCustomisationOptionComponent.vue":
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
            { attrs: { lg: 8, md: 24 } },
            [
              _c(
                "el-form-item",
                { attrs: { label: "Name", prop: "name" } },
                [
                  _c("el-input", {
                    attrs: { autofocus: true },
                    model: {
                      value: _vm.productCustomisationOption.name,
                      callback: function($$v) {
                        _vm.$set(_vm.productCustomisationOption, "name", $$v)
                      },
                      expression: "productCustomisationOption.name"
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
            { attrs: { lg: 5, md: 24 } },
            [
              _c(
                "el-form-item",
                { attrs: { label: "Selector Img", prop: "selector_img" } },
                [
                  _vm.objectHas(_vm.productCustomisationOption, "selector_img")
                    ? _c("file-picker-modal", {
                        ref: "customisationSelectorFile",
                        attrs: {
                          "current-files": _vm.objectHas(
                            _vm.productCustomisationOption,
                            "selector_img.id"
                          )
                            ? [_vm.productCustomisationOption.selector_img]
                            : undefined,
                          name:
                            _vm.productCustomisationOption + " Selector Img",
                          selectable: 1,
                          "show-btn": true,
                          "picker-id": "selector_img"
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
          ),
          _vm._v(" "),
          _c(
            "el-col",
            { attrs: { lg: 5, md: 24 } },
            [
              _c(
                "el-form-item",
                { attrs: { label: "Main Img", prop: "main_img" } },
                [
                  _vm.objectHas(_vm.productCustomisationOption, "main_img")
                    ? _c("file-picker-modal", {
                        ref: "customisationOptionFile",
                        attrs: {
                          "current-files": _vm.objectHas(
                            _vm.productCustomisationOption,
                            "main_img.id"
                          )
                            ? [_vm.productCustomisationOption.main_img]
                            : undefined,
                          name: _vm.productCustomisationOption + " Main Img",
                          selectable: 1,
                          "show-btn": true,
                          "picker-id": "main_img"
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
          ),
          _vm._v(" "),
          _c(
            "el-col",
            { attrs: { lg: 3, md: 24 } },
            [
              _c(
                "el-form-item",
                { attrs: { label: "Default", prop: "default" } },
                [
                  _c("el-switch", {
                    attrs: {
                      "active-color": "#13ce66",
                      "inactive-color": "#ff4949"
                    },
                    model: {
                      value: _vm.productCustomisationOption.default,
                      callback: function($$v) {
                        _vm.$set(_vm.productCustomisationOption, "default", $$v)
                      },
                      expression: "productCustomisationOption.default"
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
            {
              staticClass: "customisation_option_delete_col",
              attrs: { lg: 3, md: 24 }
            },
            [
              _c(
                "el-form-item",
                { attrs: { label: "Actions" } },
                [
                  _c(
                    "el-button",
                    {
                      staticClass: "customisation_option_delete_btn",
                      attrs: { type: "danger", size: "mini" },
                      on: {
                        click: function($event) {
                          _vm.deleteOption(_vm.productCustomisationOption)
                        }
                      }
                    },
                    [_vm._v("Delete")]
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
    require("vue-hot-reload-api")      .rerender("data-v-158d6b9e", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-158d6b9e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductCustomisationOptionComponent.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-158d6b9e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductCustomisationOptionComponent.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("44008ba8", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-158d6b9e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProductCustomisationOptionComponent.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-158d6b9e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProductCustomisationOptionComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/components/ProductCustomisationOptionComponent.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-158d6b9e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/ProductCustomisationOptionComponent.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/ProductCustomisationOptionComponent.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-158d6b9e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/ProductCustomisationOptionComponent.vue")
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
Component.options.__file = "resources/assets/admin-spa/components/ProductCustomisationOptionComponent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-158d6b9e", Component.options)
  } else {
    hotAPI.reload("data-v-158d6b9e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});