webpackJsonp([15],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/products/ViewProduct.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _apiService = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");

var _apiService2 = _interopRequireDefault(_apiService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    name: 'ViewProduct',

    components: {
        ProductPageLayout: function ProductPageLayout() {
            return __webpack_require__.e/* import() */(26/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/pages/products/ProductPageLayout.vue"));
        }
    },

    props: {
        productId: {
            type: String,
            required: true
        }
    },

    data: function data() {
        return {
            collections: {},
            collectionErrors: {}
        };
    },


    computed: {
        productFormRules: function productFormRules() {
            return {
                name: [{ required: true, message: 'The product name field is required', trigger: 'blur' }],
                slug: [{ required: true, message: 'The product slug field is required', trigger: 'blur' }]
            };
        }
    },

    watch: {
        //
    },

    mounted: function mounted() {
        console.log('ViewProduct.vue mounted');
        this.getCollections();
    },


    methods: {

        /**
         * Get the collections with their types from the server.
         *
         * @return void
         */
        getCollections: function getCollections() {
            _apiService2.default.get({
                path: 'collections',
                params: {
                    with: 'types'
                }
            }).then(function (data) {
                this.collections = data.data;
            }.bind(this)).catch(function (error) {
                this.collectionErrors = error;
            }.bind(this));
        }
    }

}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ "./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9aab8f92\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/products/ViewProduct.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "\n.collection_type_select[data-v-9aab8f92] {\n    width: 100%;\n}\n.product_variant_card[data-v-9aab8f92] {\n    margin: 30px 0px;\n}\n.product_variant_card.minimised .el-card__body[data-v-9aab8f92] {\n    padding: 0px!important;\n}\n", "", {"version":3,"sources":["/Users/christianbraybrooke/composer_packages/chrisbraybrooke/laravel-ecommerce/resources/assets/admin-spa/pages/products/resources/assets/admin-spa/pages/products/ViewProduct.vue"],"names":[],"mappings":";AAgKA;IACA,YAAA;CACA;AACA;IACA,iBAAA;CACA;AACA;IACA,uBAAA;CACA","file":"ViewProduct.vue","sourcesContent":["<template lang=\"html\">\n    <div>\n        <product-page-layout :product-id=\"productId\"\n                             :current-page=\"'/products/' + productId\"\n                             :request-with=\"['collectionTypes', 'content']\"\n                             :request-includes=\"['live_at', 'slug', 'list_in_shop', 'featured']\"\n                             :form-rules=\"productFormRules\">\n            <template slot=\"product_page\"\n                      slot-scope=\"props\">\n\n                <el-row type=\"flex\">\n                    <el-col :span=\"4\">\n                        <el-form-item v-if=\"props.productForm.live_at\" label=\"Live\" prop=\"live_at.live\" size=\"small\">\n                            <el-switch v-model=\"props.productForm.live_at.live\"\n                                       active-color=\"#13ce66\"\n                                       inactive-color=\"#ff4949\">\n                            </el-switch>\n                        </el-form-item>\n                    </el-col>\n                    <el-col :span=\"4\">\n                        <el-form-item label=\"List In Shop\" prop=\"list_in_shop\" size=\"small\">\n                            <el-switch v-model=\"props.productForm.list_in_shop\"\n                                       active-color=\"#13ce66\"\n                                       inactive-color=\"#ff4949\">\n                            </el-switch>\n                        </el-form-item>\n                    </el-col>\n                    <el-col :span=\"4\">\n                        <el-form-item label=\"Featured\" prop=\"featured\" size=\"small\">\n                            <el-switch v-model=\"props.productForm.featured\"\n                                       active-color=\"#13ce66\"\n                                       inactive-color=\"#ff4949\">\n                            </el-switch>\n                        </el-form-item>\n                    </el-col>\n                </el-row>\n\n                <el-row :gutter=\"20\">\n                    <el-col :lg=\"12\" :md=\"24\">\n                        <el-form-item label=\"Name\" prop=\"name\" size=\"small\">\n                            <el-input :autofocus=\"true\" v-model=\"props.productForm.name\"></el-input>\n                        </el-form-item>\n                    </el-col>\n                    <el-col :lg=\"12\" :md=\"24\">\n                        <el-form-item label=\"Slug / Url\" prop=\"slug\" size=\"small\">\n                            <el-input v-model=\"props.productForm.slug\">\n                                <template slot=\"prepend\">{{ getSiteBaseURL }}products/</template>\n                            </el-input>\n                        </el-form-item>\n                    </el-col>\n                </el-row>\n\n                <el-row v-if=\"props.productForm.content\" :gutter=\"20\">\n                    <template v-for=\"content in props.productForm.content.data\">\n                        <el-col :lg=\"12\" :md=\"24\">\n                            <el-form-item :label=\"content.content_name\" :prop=\"content.content_name\" size=\"small\">\n                                <el-input type=\"textarea\" :autosize=\"{ minRows: 5 }\" :autofocus=\"true\" v-model=\"content.content\"></el-input>\n                            </el-form-item>\n                        </el-col>\n                    </template>\n                </el-row>\n\n                <errors v-if=\"Object.keys(collectionErrors).length > 0\" :errors=\"collectionErrors\"></errors>\n\n                <el-row :gutter=\"20\">\n                    <template v-for=\"collection in collections\">\n                        <el-col :md=\"6\" :sm=\"12\" :xs=\"24\">\n                            <el-form-item v-if=\"props.productForm.collections && collections\" :label=\"collection.name\" :prop=\"'collections.data.collection_types_sync' + [collection.id - 1]\" size=\"small\">\n                                <el-select class=\"collection_type_select\" v-model=\"props.productForm.collections.data.collection_types_sync[collection.id]\" filterable multiple allow-create placeholder=\"Select\">\n                                    <el-option v-for=\"type in collection.types.data\"\n                                               :key=\"type.name\"\n                                               :label=\"type.name\"\n                                               :value=\"type.id\">\n                                    </el-option>\n                                </el-select>\n                            </el-form-item>\n                        </el-col>\n                    </template>\n                </el-row>\n            </template>\n        </product-page-layout>\n    </div>\n</template>\n\n<script>\nimport api from \"../../services/api-service.js\";\n\nexport default {\n\n      name: 'ViewProduct',\n\n      components: {\n          ProductPageLayout: () => import('./ProductPageLayout.vue'),\n      },\n\n      props: {\n          productId: {\n              type: String,\n              required: true,\n          },\n      },\n\n      data () {\n          return {\n              collections: {},\n              collectionErrors: {},\n          }\n      },\n\n      computed: {\n          productFormRules()\n          {\n              return {\n                  name: [\n                    { required: true, message: 'The product name field is required', trigger: 'blur' },\n                  ],\n                  slug: [\n                    { required: true, message: 'The product slug field is required', trigger: 'blur' },\n                  ],\n              };\n          },\n      },\n\n      watch: {\n          //\n      },\n\n      mounted () {\n          console.log('ViewProduct.vue mounted');\n          this.getCollections();\n      },\n\n      methods: {\n\n          /**\n           * Get the collections with their types from the server.\n           *\n           * @return void\n           */\n           getCollections()\n           {\n               api.get({\n                   path: 'collections',\n                   params: {\n                     with: 'types'\n                   }\n               })\n               .then(function (data) {\n                   this.collections = data.data;\n               }.bind(this))\n               .catch(function (error) {\n                   this.collectionErrors = error;\n               }.bind(this));\n           },\n      },\n\n}\n</script>\n\n<style lang=\"css\" scoped>\n.collection_type_select {\n    width: 100%;\n}\n.product_variant_card {\n    margin: 30px 0px;\n}\n.product_variant_card.minimised .el-card__body {\n    padding: 0px!important;\n}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-9aab8f92\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/products/ViewProduct.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("product-page-layout", {
        attrs: {
          "product-id": _vm.productId,
          "current-page": "/products/" + _vm.productId,
          "request-with": ["collectionTypes", "content"],
          "request-includes": ["live_at", "slug", "list_in_shop", "featured"],
          "form-rules": _vm.productFormRules
        },
        scopedSlots: _vm._u([
          {
            key: "product_page",
            fn: function(props) {
              return [
                _c(
                  "el-row",
                  { attrs: { type: "flex" } },
                  [
                    _c(
                      "el-col",
                      { attrs: { span: 4 } },
                      [
                        props.productForm.live_at
                          ? _c(
                              "el-form-item",
                              {
                                attrs: {
                                  label: "Live",
                                  prop: "live_at.live",
                                  size: "small"
                                }
                              },
                              [
                                _c("el-switch", {
                                  attrs: {
                                    "active-color": "#13ce66",
                                    "inactive-color": "#ff4949"
                                  },
                                  model: {
                                    value: props.productForm.live_at.live,
                                    callback: function($$v) {
                                      _vm.$set(
                                        props.productForm.live_at,
                                        "live",
                                        $$v
                                      )
                                    },
                                    expression: "props.productForm.live_at.live"
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
                      { attrs: { span: 4 } },
                      [
                        _c(
                          "el-form-item",
                          {
                            attrs: {
                              label: "List In Shop",
                              prop: "list_in_shop",
                              size: "small"
                            }
                          },
                          [
                            _c("el-switch", {
                              attrs: {
                                "active-color": "#13ce66",
                                "inactive-color": "#ff4949"
                              },
                              model: {
                                value: props.productForm.list_in_shop,
                                callback: function($$v) {
                                  _vm.$set(
                                    props.productForm,
                                    "list_in_shop",
                                    $$v
                                  )
                                },
                                expression: "props.productForm.list_in_shop"
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
                      { attrs: { span: 4 } },
                      [
                        _c(
                          "el-form-item",
                          {
                            attrs: {
                              label: "Featured",
                              prop: "featured",
                              size: "small"
                            }
                          },
                          [
                            _c("el-switch", {
                              attrs: {
                                "active-color": "#13ce66",
                                "inactive-color": "#ff4949"
                              },
                              model: {
                                value: props.productForm.featured,
                                callback: function($$v) {
                                  _vm.$set(props.productForm, "featured", $$v)
                                },
                                expression: "props.productForm.featured"
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
                      { attrs: { lg: 12, md: 24 } },
                      [
                        _c(
                          "el-form-item",
                          {
                            attrs: {
                              label: "Name",
                              prop: "name",
                              size: "small"
                            }
                          },
                          [
                            _c("el-input", {
                              attrs: { autofocus: true },
                              model: {
                                value: props.productForm.name,
                                callback: function($$v) {
                                  _vm.$set(props.productForm, "name", $$v)
                                },
                                expression: "props.productForm.name"
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
                          {
                            attrs: {
                              label: "Slug / Url",
                              prop: "slug",
                              size: "small"
                            }
                          },
                          [
                            _c(
                              "el-input",
                              {
                                model: {
                                  value: props.productForm.slug,
                                  callback: function($$v) {
                                    _vm.$set(props.productForm, "slug", $$v)
                                  },
                                  expression: "props.productForm.slug"
                                }
                              },
                              [
                                _c("template", { slot: "prepend" }, [
                                  _vm._v(
                                    _vm._s(_vm.getSiteBaseURL) + "products/"
                                  )
                                ])
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
                props.productForm.content
                  ? _c(
                      "el-row",
                      { attrs: { gutter: 20 } },
                      [
                        _vm._l(props.productForm.content.data, function(
                          content
                        ) {
                          return [
                            _c(
                              "el-col",
                              { attrs: { lg: 12, md: 24 } },
                              [
                                _c(
                                  "el-form-item",
                                  {
                                    attrs: {
                                      label: content.content_name,
                                      prop: content.content_name,
                                      size: "small"
                                    }
                                  },
                                  [
                                    _c("el-input", {
                                      attrs: {
                                        type: "textarea",
                                        autosize: { minRows: 5 },
                                        autofocus: true
                                      },
                                      model: {
                                        value: content.content,
                                        callback: function($$v) {
                                          _vm.$set(content, "content", $$v)
                                        },
                                        expression: "content.content"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ]
                        })
                      ],
                      2
                    )
                  : _vm._e(),
                _vm._v(" "),
                Object.keys(_vm.collectionErrors).length > 0
                  ? _c("errors", { attrs: { errors: _vm.collectionErrors } })
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "el-row",
                  { attrs: { gutter: 20 } },
                  [
                    _vm._l(_vm.collections, function(collection) {
                      return [
                        _c(
                          "el-col",
                          { attrs: { md: 6, sm: 12, xs: 24 } },
                          [
                            props.productForm.collections && _vm.collections
                              ? _c(
                                  "el-form-item",
                                  {
                                    attrs: {
                                      label: collection.name,
                                      prop:
                                        "collections.data.collection_types_sync" +
                                        [collection.id - 1],
                                      size: "small"
                                    }
                                  },
                                  [
                                    _c(
                                      "el-select",
                                      {
                                        staticClass: "collection_type_select",
                                        attrs: {
                                          filterable: "",
                                          multiple: "",
                                          "allow-create": "",
                                          placeholder: "Select"
                                        },
                                        model: {
                                          value:
                                            props.productForm.collections.data
                                              .collection_types_sync[
                                              collection.id
                                            ],
                                          callback: function($$v) {
                                            _vm.$set(
                                              props.productForm.collections.data
                                                .collection_types_sync,
                                              collection.id,
                                              $$v
                                            )
                                          },
                                          expression:
                                            "props.productForm.collections.data.collection_types_sync[collection.id]"
                                        }
                                      },
                                      _vm._l(collection.types.data, function(
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
                          ],
                          1
                        )
                      ]
                    })
                  ],
                  2
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
    require("vue-hot-reload-api")      .rerender("data-v-9aab8f92", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9aab8f92\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/products/ViewProduct.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9aab8f92\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/products/ViewProduct.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("248ab437", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9aab8f92\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewProduct.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9aab8f92\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewProduct.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/pages/products/ViewProduct.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9aab8f92\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/products/ViewProduct.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/products/ViewProduct.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-9aab8f92\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/products/ViewProduct.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9aab8f92"
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
Component.options.__file = "resources/assets/admin-spa/pages/products/ViewProduct.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9aab8f92", Component.options)
  } else {
    hotAPI.reload("data-v-9aab8f92", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});
//# sourceMappingURL=view-product.js.map