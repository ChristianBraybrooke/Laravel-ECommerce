<<<<<<< HEAD
webpackJsonp([26],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/estimates/Estimates.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _apiService = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");

var _apiService2 = _interopRequireDefault(_apiService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var forEach = __webpack_require__("./node_modules/lodash.foreach/index.js"); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

    name: 'Estimates',

    components: {
        DataTable: function DataTable() {
            return __webpack_require__.e/* import() */(32/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/DataTable.vue"));
        }
    },

    props: {},

    data: function data() {
        var h = this.$createElement;

        return {
            loading: false,
            errors: {},
            tableOptions: {
                collumns: [{
                    prop: 'ref_number',
                    sortable: true,
                    label: 'Ref',
                    align: 'left',
                    resizable: true
                }, {
                    prop: 'name',
                    sortable: true,
                    label: 'Customer',
                    formatter: function (row, column, cellValue) {
                        var _this = this;

                        var lines = [];
                        var address = [];
                        forEach(row.shipping_address, function (line, key) {
                            if (line) {
                                address.push(line);
                            }
                            lines.push(h('li', [line]));
                        });
                        return h(
                            'el-popover',
                            {
                                attrs: { trigger: 'hover', placement: 'top' }
                            },
                            [h(
                                'ul',
                                { 'class': 'order_address_list table_col_list' },
                                [lines]
                            ), h(
                                'el-button',
                                {
                                    attrs: { size: 'mini', plain: true },
                                    on: {
                                        'click': function click() {
                                            return _this.copy(address.join(', '));
                                        }
                                    }
                                },
                                ['Copy']
                            ), h(
                                'div',
                                { slot: 'reference' },
                                [h('strong', [row.customer.first_name, ' ', row.customer.last_name])]
                            )]
                        );
                        // return <div><ul class="order_address_list table_col_list">{lines}</ul><el-button size="mini" plain on-click={() => this.copy(address.join(', '))}>Copy</el-button></div>
                    }.bind(this),
                    align: 'left',
                    resizable: false
                }, {
                    prop: 'created_at.date',
                    sortable: true,
                    label: 'Created',
                    align: 'left',
                    resizable: true
                }, {
                    prop: 'items',
                    sortable: true,
                    label: 'Summary',
                    align: 'left',
                    resizable: false,
                    formatter: function formatter(row, column, cellValue) {
                        var items = [];
                        var total = [];
                        forEach(row.items, function (item) {
                            var real_quantity = Array(item.quantity).fill().map(function (_, i) {
                                return i * i;
                            });
                            real_quantity.forEach(function () {
                                total.push(item.name);
                            });
                            items.push(h('li', [item.quantity + ' * ' + item.name]));
                        });

                        return h(
                            'el-popover',
                            {
                                attrs: { trigger: 'hover', placement: 'top' }
                            },
                            [h(
                                'ul',
                                { 'class': 'order_items_list table_col_list' },
                                [items]
                            ), h(
                                'div',
                                { slot: 'reference' },
                                [h('strong', [total.length, ' items'])]
                            )]
                        );
                    }
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
                    prop: 'invoice',
                    sortable: true,
                    label: 'Create Invoice',
                    formatter: function (row, column, cellValue) {
                        var _this2 = this;

                        return h(
                            'el-button',
                            {
                                on: {
                                    'click': function click() {
                                        return _this2.createInvoice(row);
                                    }
                                },
                                attrs: { type: 'success', size: 'mini', plain: true },
                                'class': 'action_btn' },
                            ['Create Invoice']
                        );
                    }.bind(this),
                    align: 'left',
                    resizable: true
                }]
            }
        };
    },


    computed: {},

    watch: {},

    mounted: function mounted() {
        console.log('Estimates.vue mounted.');
    },


    methods: {
        createInvoice: function createInvoice(val) {
            var _this3 = this;

            val.status = 'Awaiting Payment';
            _apiService2.default.persist("put", {
                path: "orders/" + val.id,
                object: val
            }).then(function (data) {

                _this3.$router.push({ name: 'orders' });
                // this.loading = false;
                // this.data = data.data;
            }).catch(function (error) {
                // this.loading = false;
                // this.errors = error;
            });
        }
    }

};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74b8879f\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/Estimates.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\nul.order_address_list {\n    list-style: none;\n    -webkit-margin-before: 0;\n    -webkit-padding-start: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-74b8879f\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/estimates/Estimates.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "data-table",
    {
      attrs: {
        "type-name": "estimate",
        "base-url": "orders",
        "edit-path": "estimates",
        "bulk-update-url": "orders/bulk",
        "with-params": { withStatus: "estimate" },
        "request-with": "content",
        "table-options": _vm.tableOptions,
        "request-includes": ["created_at"],
        "create-form": {}
      },
      scopedSlots: _vm._u([
        {
          key: "actionButtons",
          fn: function(props) {
            return [
              _c(
                "el-popover",
                { attrs: { trigger: "hover", placement: "top" } },
                [
                  _c(
                    "router-link",
                    {
                      attrs: {
                        to: {
                          path: props.editPathFormated + "/" + props.row.id
                        }
                      }
                    },
                    [
                      _c(
                        "el-button",
                        {
                          staticClass: "action_btn view_btn",
                          attrs: { size: "mini", type: "success" }
                        },
                        [_vm._v("View\n                ")]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      attrs: {
                        href:
                          "mailto:" +
                          props.row.customer.email +
                          "?subject=Order Ref " +
                          props.row.ref_number +
                          "&body=Hello " +
                          props.row.customer.first_name +
                          ","
                      }
                    },
                    [
                      _c(
                        "el-button",
                        {
                          staticClass: "action_btn view_btn",
                          attrs: { size: "mini", plain: "" }
                        },
                        [_vm._v("Email Customer\n                ")]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      attrs: {
                        href:
                          "/ecommerce-templates/invoice-download?reports=" +
                          props.row.id,
                        target: "_blank"
                      }
                    },
                    [
                      _c(
                        "el-button",
                        {
                          staticClass: "action_btn view_btn",
                          attrs: { size: "mini", plain: "" }
                        },
                        [_vm._v("Download PDF\n                ")]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      staticClass: "action_btn view_btn",
                      attrs: { size: "mini", type: "danger" },
                      on: {
                        click: function($event) {
                          props.delete(props.row)
                        }
                      }
                    },
                    [_vm._v("Delete\n            ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { attrs: { slot: "reference" }, slot: "reference" },
                    [
                      _c("el-button", { attrs: { size: "mini" } }, [
                        _vm._v("Actions")
                      ])
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
    },
    [
      _c(
        "template",
        { slot: "createButton" },
        [
          _c(
            "router-link",
            { attrs: { to: { name: "estimates.new" } } },
            [
              _c(
                "el-button",
                {
                  staticClass: "create_btn",
                  attrs: { type: "primary", plain: "" }
                },
                [_vm._v("New Estimate")]
              )
            ],
            1
          )
        ],
        1
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-74b8879f", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74b8879f\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/Estimates.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74b8879f\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/Estimates.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("e0409a28", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74b8879f\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Estimates.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74b8879f\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Estimates.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/pages/estimates/Estimates.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74b8879f\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/estimates/Estimates.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/estimates/Estimates.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-74b8879f\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/estimates/Estimates.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/estimates/Estimates.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-74b8879f", Component.options)
  } else {
    hotAPI.reload("data-v-74b8879f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});
=======
webpackJsonp([26],{"7YHC":function(t,e,r){(t.exports=r("FZ+f")(!1)).push([t.i,"ul.order_address_list{list-style:none;-webkit-margin-before:0;-webkit-padding-start:0}",""])},XFTX:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("data-table",{attrs:{"type-name":"estimate","base-url":"orders","edit-path":"estimates","bulk-update-url":"orders/bulk","with-params":{withStatus:"estimate"},"request-with":"content","table-options":t.tableOptions,"request-includes":["created_at"],"create-form":{}},scopedSlots:t._u([{key:"actionButtons",fn:function(e){return[r("el-popover",{attrs:{trigger:"hover",placement:"top"}},[r("router-link",{attrs:{to:{path:e.editPathFormated+"/"+e.row.id}}},[r("el-button",{staticClass:"action_btn view_btn",attrs:{size:"mini",type:"success"}},[t._v("View\n                ")])],1),t._v(" "),r("a",{attrs:{href:"mailto:"+e.row.customer.email+"?subject=Order Ref "+e.row.ref_number+"&body=Hello "+e.row.customer.first_name+","}},[r("el-button",{staticClass:"action_btn view_btn",attrs:{size:"mini",plain:""}},[t._v("Email Customer\n                ")])],1),t._v(" "),r("a",{attrs:{href:"/ecommerce-templates/invoice-download?reports="+e.row.id,target:"_blank"}},[r("el-button",{staticClass:"action_btn view_btn",attrs:{size:"mini",plain:""}},[t._v("Download PDF\n                ")])],1),t._v(" "),r("el-button",{staticClass:"action_btn view_btn",attrs:{size:"mini",type:"danger"},on:{click:function(t){e.delete(e.row)}}},[t._v("Delete\n            ")]),t._v(" "),r("div",{attrs:{slot:"reference"},slot:"reference"},[r("el-button",{attrs:{size:"mini"}},[t._v("Actions")])],1)],1)]}}])},[r("template",{slot:"createButton"},[r("router-link",{attrs:{to:{name:"estimates.new"}}},[r("el-button",{staticClass:"create_btn",attrs:{type:"primary",plain:""}},[t._v("New Estimate")])],1)],1)],2)},staticRenderFns:[]}},YS0X:function(t,e,r){var n=r("VU/8")(r("mITc"),r("XFTX"),!1,function(t){r("c0HM")},null,null);t.exports=n.exports},c0HM:function(t,e,r){var n=r("7YHC");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);r("rjj0")("421ba0c7",n,!0,{})},mITc:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,a=r("GzQy"),s=(n=a)&&n.__esModule?n:{default:n};var o=r("P/uL");e.default={name:"Estimates",components:{DataTable:function(){return r.e(32).then(r.bind(null,"bnM4"))}},props:{},data:function(){var t=this.$createElement;return{loading:!1,errors:{},tableOptions:{collumns:[{prop:"ref_number",sortable:!0,label:"Ref",align:"left",resizable:!0},{prop:"name",sortable:!0,label:"Customer",formatter:function(e,r,n){var a=this,s=[],i=[];return o(e.shipping_address,function(e,r){e&&i.push(e),s.push(t("li",[e]))}),t("el-popover",{attrs:{trigger:"hover",placement:"top"}},[t("ul",{class:"order_address_list table_col_list"},[s]),t("el-button",{attrs:{size:"mini",plain:!0},on:{click:function(){return a.copy(i.join(", "))}}},["Copy"]),t("div",{slot:"reference"},[t("strong",[e.customer.first_name," ",e.customer.last_name])])])}.bind(this),align:"left",resizable:!1},{prop:"created_at.date",sortable:!0,label:"Created",align:"left",resizable:!0},{prop:"items",sortable:!0,label:"Summary",align:"left",resizable:!1,formatter:function(e,r,n){var a=[],s=[];return o(e.items,function(e){Array(e.quantity).fill().map(function(t,e){return e*e}).forEach(function(){s.push(e.name)}),a.push(t("li",[e.quantity+" * "+e.name]))}),t("el-popover",{attrs:{trigger:"hover",placement:"top"}},[t("ul",{class:"order_items_list table_col_list"},[a]),t("div",{slot:"reference"},[t("strong",[s.length," items"])])])}},{prop:"amount",sortable:!0,label:"Total",formatter:function(t,e,r){return t.cart.currency?t.cart.currency+t.cart.totals.Total:"-"},align:"left",resizable:!0},{prop:"invoice",sortable:!0,label:"Create Invoice",formatter:function(e,r,n){var a=this;return t("el-button",{on:{click:function(){return a.createInvoice(e)}},attrs:{type:"success",size:"mini",plain:!0},class:"action_btn"},["Create Invoice"])}.bind(this),align:"left",resizable:!0}]}}},computed:{},watch:{},mounted:function(){},methods:{createInvoice:function(t){var e=this,r=window.ecommerceConfig.orders.statuses;t.status=r.STATUS_AWAITING_PAYMENT,s.default.persist("put",{path:"orders/"+t.id,object:t}).then(function(t){e.$router.push({name:"orders"})}).catch(function(t){})}}}}});
>>>>>>> 7de368b16432cd0b210639e646c65104496e39e4
