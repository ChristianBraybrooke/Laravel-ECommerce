<<<<<<< HEAD
webpackJsonp([24],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _apiService = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");

var _apiService2 = _interopRequireDefault(_apiService);

var _order = __webpack_require__("./resources/assets/admin-spa/utils/order.js");

var _order2 = _interopRequireDefault(_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

    name: 'ViewEstimate',

    components: {
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(31/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        },
        ProductTable: function ProductTable() {
            return __webpack_require__.e/* import() */(35).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/ProductTable.vue"));
        },
        ProductForm: function ProductForm() {
            return __webpack_require__.e/* import() */(36).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/ProductForm.vue"));
        }
    },

    props: {
        estimateId: {
            required: true,
            type: [String, Number]
        }
    },

    data: function data() {
        return {
            loading: false,
            estimate: {},
            errors: {}

        };
    },


    computed: {
        orderTotals: function orderTotals() {

            if (this.estimate.cart) {
                return _order2.default.totals(this.estimate.items, this.estimate.cart.totals['Shipping'], this.estimate.cart.totals['Discount']);
            }
            return [{}];
        }
    },

    watch: {},

    mounted: function mounted() {
        console.log('ViewEstimate.vue mounted!');
        this.getEstimate();
    },


    methods: {
        getEstimate: function getEstimate() {
            var _this = this;

            this.loading = true;

            _apiService2.default.get({
                path: 'orders/' + this.estimateId
            }).then(function (data) {
                _this.loading = false;
                _this.estimate = data.data;
            }).catch(function (error) {
                _this.errors = error;
                _this.loading = false;
            });
        },
        updateEstimate: function updateEstimate() {
            var _this2 = this;

            this.loading = true;

            _apiService2.default.persist('put', {
                path: 'orders/' + this.estimateId,
                object: this.estimate
            }).then(function (data) {
                _this2.loading = false;
                _this2.estimate = data.data;
            }).catch(function (error) {
                _this2.errors = error;
                _this2.loading = false;
            });
        }
    }

};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e5f516e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3e5f516e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var this$1 = this
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
          _c("el-breadcrumb-item", { attrs: { to: { name: "estimates" } } }, [
            _vm._v("Estimates")
          ]),
          _vm._v(" "),
          _vm.estimate.id
            ? _c("el-breadcrumb-item", [
                _vm._v(_vm._s(_vm.estimate.ref_number))
              ])
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      Object.keys(_vm.errors).length > 0
        ? _c("errors", { attrs: { errors: _vm.errors } })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-row",
        {
          staticStyle: { "margin-bottom": "20px", "margin-top": "20px" },
          attrs: { gutter: 20 }
        },
        [
          _c(
            "el-col",
            { attrs: { sm: 24 } },
            [
              _c("product-form", {
                attrs: {
                  "on-product-add": function(product) {
                    this$1.estimate.items.push(product)
                  }
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
        "el-row",
        {
          staticStyle: { "margin-bottom": "20px", "margin-top": "20px" },
          attrs: { gutter: 20 }
        },
        [
          _c(
            "el-col",
            { attrs: { sm: 24 } },
            [
              _c("product-table", {
                attrs: {
                  editable: true,
                  order: _vm.estimate,
                  "order-totals": _vm.orderTotals
                }
              })
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
                "el-button",
                {
                  attrs: { plain: "", type: "success", loading: _vm.loading },
                  on: {
                    click: function($event) {
                      _vm.updateEstimate()
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
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3e5f516e", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e5f516e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e5f516e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("56a1de37", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e5f516e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewEstimate.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e5f516e\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewEstimate.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e5f516e\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3e5f516e\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/estimates/ViewEstimate.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/estimates/ViewEstimate.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e5f516e", Component.options)
  } else {
    hotAPI.reload("data-v-3e5f516e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});
=======
webpackJsonp([24],{"5I1P":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[r("el-breadcrumb",{staticClass:"breadcrumbs",attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{name:"estimates"}}},[t._v("Estimates")]),t._v(" "),t.estimate.id?r("el-breadcrumb-item",[t._v(t._s(t.estimate.ref_number))]):t._e()],1),t._v(" "),Object.keys(t.errors).length>0?r("errors",{attrs:{errors:t.errors}}):t._e(),t._v(" "),r("el-row",{staticStyle:{"margin-bottom":"20px","margin-top":"20px"},attrs:{gutter:20}},[r("el-col",{attrs:{sm:24}},[r("product-form",{attrs:{"on-product-add":t.onProductAdd}})],1)],1),t._v(" "),r("el-row",{staticStyle:{"margin-bottom":"20px","margin-top":"20px"},attrs:{gutter:20}},[r("el-col",{attrs:{sm:24}},[r("product-table",{attrs:{editable:!0,order:t.estimate,"order-totals":t.orderTotals}})],1)],1),t._v(" "),r("hr",{staticClass:"page_hr"}),t._v(" "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{sm:24}},[r("el-button",{attrs:{plain:"",type:"success",loading:t.loading},on:{click:function(e){t.updateEstimate()}}},[t._v("Save")])],1)],1)],1)},staticRenderFns:[]}},MpRh:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(r("GzQy")),s=i(r("nCXa"));function i(t){return t&&t.__esModule?t:{default:t}}e.default={name:"ViewEstimate",components:{Errors:function(){return r.e(31).then(r.bind(null,"DqGP"))},ProductTable:function(){return r.e(35).then(r.bind(null,"tAls"))},ProductForm:function(){return r.e(36).then(r.bind(null,"mBvu"))}},props:{estimateId:{required:!0,type:[String,Number]}},data:function(){return{loading:!1,estimate:{},errors:{}}},computed:{orderTotals:function(){return this.estimate.cart?s.default.totals(this.estimate.items,this.estimate.cart.totals.Shipping,this.estimate.cart.totals.Discount):[{}]}},watch:{},mounted:function(){this.getEstimate()},methods:{onProductAdd:function(t){this.estimate.items.push(t)},getEstimate:function(){var t=this;this.loading=!0,a.default.get({path:"orders/"+this.estimateId}).then(function(e){t.loading=!1,t.estimate=e.data}).catch(function(e){t.errors=e,t.loading=!1})},updateEstimate:function(){var t=this;this.loading=!0,a.default.persist("put",{path:"orders/"+this.estimateId,object:this.estimate}).then(function(e){t.loading=!1,t.estimate=e.data}).catch(function(e){t.errors=e,t.loading=!1})}}}},XKD7:function(t,e,r){(t.exports=r("FZ+f")(!1)).push([t.i,"",""])},gryR:function(t,e,r){var a=r("VU/8")(r("MpRh"),r("5I1P"),!1,function(t){r("vlSB")},null,null);t.exports=a.exports},vlSB:function(t,e,r){var a=r("XKD7");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);r("rjj0")("7936de09",a,!0,{})}});
>>>>>>> 7de368b16432cd0b210639e646c65104496e39e4
