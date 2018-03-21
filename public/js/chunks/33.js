webpackJsonp([33],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/components/FormFieldComponent.vue":
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

    name: 'FormFieldComponent',

    components: {},

    props: {
        model: {
            type: Object,
            required: true
        },
        section: {
            type: Object,
            required: true
        }
    },

    data: function data() {
        return {
            fieldOptions: [{
                label: 'Text',
                value: 'text'
            }, {
                label: 'Number',
                value: 'number'
            }, {
                label: 'Radio',
                value: 'radio'
            }, {
                label: 'Select',
                value: 'select'
            }],
            showRulesModal: false,
            showOptionsModal: false
        };
    },


    computed: {
        needsOptions: function needsOptions() {
            if (this.model.type === 'radio') {
                return true;
            }
            if (this.model.type === 'select') {
                return true;
            }
            return false;
        }
    },

    watch: {},

    mounted: function mounted() {
        console.log('FormFieldComponent.vue Mounted');
    },


    methods: {
        deleteField: function deleteField(field) {
            this.section.fields.data.splice(this.section.fields.data.indexOf(field), 1);
        },
        addOption: function addOption() {
            this.model.options.push({});
        },
        deleteOption: function deleteOption(option, options) {
            options.splice(options.indexOf(option), 1);
        }
    }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3fca07c6\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/components/FormFieldComponent.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3fca07c6\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/components/FormFieldComponent.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "el-row",
        {
          class:
            "form_field_row " + (_vm.model.rules.required ? "required" : ""),
          attrs: { gutter: 20 }
        },
        [
          _c(
            "el-col",
            { attrs: { md: 4 } },
            [
              _c(
                "el-form-item",
                { attrs: { label: "Name", size: "small", prop: "name" } },
                [
                  _c("el-input", {
                    attrs: { autofocus: true },
                    model: {
                      value: _vm.model.name,
                      callback: function($$v) {
                        _vm.$set(_vm.model, "name", $$v)
                      },
                      expression: "model.name"
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
            { attrs: { md: 6 } },
            [
              _c(
                "el-form-item",
                {
                  attrs: {
                    label: "Description",
                    size: "small",
                    prop: "description"
                  }
                },
                [
                  _c("el-input", {
                    attrs: { autofocus: true },
                    model: {
                      value: _vm.model.description,
                      callback: function($$v) {
                        _vm.$set(_vm.model, "description", $$v)
                      },
                      expression: "model.description"
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
            { attrs: { md: 4 } },
            [
              _c(
                "el-form-item",
                { attrs: { label: "Type", size: "small", prop: "type" } },
                [
                  _c(
                    "el-select",
                    {
                      attrs: { placeholder: "Type" },
                      model: {
                        value: _vm.model.type,
                        callback: function($$v) {
                          _vm.$set(_vm.model, "type", $$v)
                        },
                        expression: "model.type"
                      }
                    },
                    _vm._l(_vm.fieldOptions, function(option) {
                      return _c("el-option", {
                        key: option.value,
                        attrs: { label: option.label, value: option.value }
                      })
                    })
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-col",
            { attrs: { md: 2 } },
            [
              _c(
                "el-form-item",
                { attrs: { label: "", size: "small", prop: "rules" } },
                [
                  _c(
                    "el-button",
                    {
                      attrs: { plain: "", size: "mini", type: "primary" },
                      on: {
                        click: function($event) {
                          _vm.showRulesModal = true
                        }
                      }
                    },
                    [_vm._v("Show Rules")]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm.needsOptions
            ? _c(
                "el-col",
                { attrs: { md: 2 } },
                [
                  _c(
                    "el-form-item",
                    { attrs: { label: "", size: "small", prop: "options" } },
                    [
                      _c(
                        "el-button",
                        {
                          attrs: { plain: "", size: "mini", type: "primary" },
                          on: {
                            click: function($event) {
                              _vm.showOptionsModal = true
                            }
                          }
                        },
                        [_vm._v("Show Options")]
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
            "el-col",
            { attrs: { md: 2 } },
            [
              _c(
                "el-form-item",
                { attrs: { label: "", size: "small", prop: "delete" } },
                [
                  _c(
                    "el-button",
                    {
                      attrs: { size: "mini", type: "danger" },
                      on: {
                        click: function($event) {
                          _vm.deleteField(_vm.model)
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
      ),
      _vm._v(" "),
      _vm.showRulesModal
        ? _c(
            "el-dialog",
            {
              attrs: {
                title: _vm.model.name + " Rules",
                visible: _vm.showRulesModal,
                width: "70%"
              },
              on: {
                "update:visible": function($event) {
                  _vm.showRulesModal = $event
                }
              }
            },
            [
              _c(
                "el-row",
                { attrs: { type: "flex" } },
                [
                  _c(
                    "el-col",
                    { attrs: { span: 24 } },
                    [
                      _c(
                        "el-form-item",
                        { attrs: { label: "Required", prop: "required" } },
                        [
                          _c("el-switch", {
                            attrs: {
                              "active-color": "#13ce66",
                              "inactive-color": "#ff4949"
                            },
                            model: {
                              value: _vm.model.rules.required,
                              callback: function($$v) {
                                _vm.$set(_vm.model.rules, "required", $$v)
                              },
                              expression: "model.rules.required"
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
                      attrs: { type: "primary" },
                      on: {
                        click: function($event) {
                          _vm.showRulesModal = false
                        }
                      }
                    },
                    [_vm._v("Done")]
                  )
                ],
                1
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showOptionsModal
        ? _c(
            "el-dialog",
            {
              attrs: {
                title: _vm.model.name + " Options",
                visible: _vm.showOptionsModal,
                width: "70%"
              },
              on: {
                "update:visible": function($event) {
                  _vm.showOptionsModal = $event
                }
              }
            },
            [
              _vm._l(_vm.model.options, function(option) {
                return _vm.model.options
                  ? _c(
                      "el-row",
                      {
                        key: option.id,
                        staticClass: "form_field_row",
                        attrs: { gutter: 20 }
                      },
                      [
                        _c(
                          "el-col",
                          { attrs: { md: 4 } },
                          [
                            _c(
                              "el-form-item",
                              {
                                attrs: {
                                  label: "Label",
                                  size: "small",
                                  prop: "label"
                                }
                              },
                              [
                                _c("el-input", {
                                  attrs: { autofocus: true },
                                  model: {
                                    value: option.name,
                                    callback: function($$v) {
                                      _vm.$set(option, "name", $$v)
                                    },
                                    expression: "option.name"
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
                          { attrs: { md: 4 } },
                          [
                            _c(
                              "el-form-item",
                              {
                                attrs: {
                                  label: "Value",
                                  size: "small",
                                  prop: "value"
                                }
                              },
                              [
                                _c("el-input", {
                                  attrs: { autofocus: true },
                                  model: {
                                    value: option.value,
                                    callback: function($$v) {
                                      _vm.$set(option, "value", $$v)
                                    },
                                    expression: "option.value"
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
                          { attrs: { md: 2 } },
                          [
                            _c(
                              "el-form-item",
                              {
                                attrs: {
                                  label: "",
                                  size: "small",
                                  prop: "delete"
                                }
                              },
                              [
                                _c(
                                  "el-button",
                                  {
                                    attrs: { size: "mini", type: "danger" },
                                    on: {
                                      click: function($event) {
                                        _vm.deleteOption(
                                          option,
                                          _vm.model.options
                                        )
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
                  : _vm._e()
              }),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: {
                    type: "info",
                    size: "mini",
                    icon: "el-icon-plus",
                    plain: ""
                  },
                  on: { click: _vm.addOption }
                },
                [_vm._v("Add Option")]
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
                      attrs: { type: "primary" },
                      on: {
                        click: function($event) {
                          _vm.showOptionsModal = false
                        }
                      }
                    },
                    [_vm._v("Done")]
                  )
                ],
                1
              )
            ],
            2
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
    require("vue-hot-reload-api")      .rerender("data-v-3fca07c6", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3fca07c6\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/components/FormFieldComponent.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3fca07c6\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/components/FormFieldComponent.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("30efd716", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3fca07c6\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./FormFieldComponent.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3fca07c6\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./FormFieldComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/components/FormFieldComponent.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3fca07c6\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/components/FormFieldComponent.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/components/FormFieldComponent.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3fca07c6\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/components/FormFieldComponent.vue")
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
Component.options.__file = "resources/assets/admin-spa/components/FormFieldComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3fca07c6", Component.options)
  } else {
    hotAPI.reload("data-v-3fca07c6", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});