webpackJsonp([18],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/products/Products.vue":
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DataTable: function DataTable() {
      return __webpack_require__.e/* import() */(32/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/DataTable.vue"));
    }
  },
  data: function data() {
    var _this = this;

    var h = this.$createElement;
    return {
      productsCreateForm: {},
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
        deleteText: 'Delete',
        collumns: [{
          prop: 'id',
          sortable: true,
          label: 'ID',
          align: 'left',
          resizable: true
        }, {
          prop: 'name',
          sortable: true,
          label: 'Name',
          align: 'left',
          formatter: function formatter(row, column, cellValue) {
            if (!row.variant) {
              return h("strong", [row.name]);
            } else {
              return h("span", [h("strong", [row.variant.name]), " / ", row.name]);
            }
          },
          resizable: true
        }, {
          prop: 'price',
          sortable: true,
          label: 'Price',
          align: 'left',
          resizable: true,
          formatter: function formatter(row, collumn, cellValue) {
            return _this.formatPrice(cellValue, '£');
          }
        }, {
          prop: 'can_customise',
          sortable: true,
          label: 'Customisable',
          align: 'left',
          resizable: true,
          formatter: function formatter(row, collumn, cellValue) {
            if (cellValue) {
              return h("i", {
                "class": "el-icon-check"
              });
            }
          }
        }, {
          prop: 'list_in_shop',
          sortable: true,
          label: 'In Shop',
          align: 'left',
          resizable: true,
          formatter: function formatter(row, collumn, cellValue) {
            if (cellValue) {
              return h("i", {
                "class": "el-icon-check"
              });
            }
          }
        }, {
          prop: 'featured',
          sortable: true,
          label: 'Featured',
          align: 'left',
          resizable: true,
          formatter: function formatter(row, collumn, cellValue) {
            if (cellValue) {
              return h("i", {
                "class": "el-icon-check"
              });
            }
          }
        }, {
          prop: 'created_at.human',
          sortable: true,
          label: 'Created',
          align: 'left',
          resizable: true
        }, {
          prop: 'live_at.live',
          sortable: true,
          label: 'Live',
          align: 'left',
          formatter: function formatter(row, column, cellValue) {
            return row.live_at.live ? h("i", {
              "class": "el-icon-check"
            }) : h("i", {
              "class": "el-icon-close"
            });
          },
          resizable: true
        }],
        bulkOptions: [{
          value: 'delete',
          label: 'Delete'
        }, {
          value: 'draft',
          label: 'Mark Draft'
        }, {
          value: 'live',
          label: 'Mark Live'
        }]
      }
    };
  },
  watch: {
    productsCreateForm: function productsCreateForm(value) {
      this.$emit('input', this.internalValue);
    }
  },
  mounted: function mounted() {
    console.log('Products.vue Mounted.');
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-155cae07\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/products/Products.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-155cae07\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/products/Products.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("data-table", {
    attrs: {
      "table-options": _vm.tableOptions,
      "request-includes": [
        "live_at",
        "created_at",
        "price",
        "can_customise",
        "list_in_shop",
        "featured"
      ],
      "create-form": _vm.productsCreateForm,
      "type-name": "product",
      "bulk-update-url": "products/bulk",
      "request-with": "variant"
    },
    scopedSlots: _vm._u([
      {
        key: "createForm",
        fn: function(props) {
          return [
            _c(
              "el-form-item",
              { attrs: { label: "Product Name", prop: "name" } },
              [
                _c("el-input", {
                  attrs: { autofocus: true, "auto-complete": "off" },
                  model: {
                    value: _vm.productsCreateForm.name,
                    callback: function($$v) {
                      _vm.$set(_vm.productsCreateForm, "name", $$v)
                    },
                    expression: "productsCreateForm.name"
                  }
                })
              ],
              1
            )
          ]
        }
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-155cae07", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-155cae07\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/products/Products.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-155cae07\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/products/Products.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("2939aa1e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-155cae07\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Products.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-155cae07\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Products.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/pages/products/Products.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-155cae07\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/products/Products.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/products/Products.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-155cae07\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/products/Products.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/products/Products.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-155cae07", Component.options)
  } else {
    hotAPI.reload("data-v-155cae07", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});