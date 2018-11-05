webpackJsonp([19],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/pro-formas/ProFormas.vue":
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
//
//
//
//
//
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

  name: 'ProFormas',

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
              var realQuantity = Array(item.quantity).fill().map(function (_, i) {
                return i * i;
              });
              realQuantity.forEach(function () {
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
    console.log('ProFormas.vue mounted!');
  },


  methods: {
    createInvoice: function createInvoice(val) {
      var _this3 = this;

      var status = window.ecommerceConfig.orders.statuses;
      val.status = status.STATUS_PROCESSING;
      _apiService2.default.persist('put', {
        path: 'orders/' + val.id,
        object: val
      }).then(function (data) {
        _this3.$router.push({ name: 'orders' });
      }).catch(function (error) {
        _this3.errors = error;
      });
    }
  }

};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-09c979a2\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/pro-formas/ProFormas.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-09c979a2\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/pro-formas/ProFormas.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "data-table",
    {
      attrs: {
        "with-params": {
          withStatus: [
            "STATUS_PROFORMA",
            "STATUS_DRAFT",
            "STATUS_CANCELLED",
            "STATUS_AWAITING_PAYMENT",
            "STATUS_PAYMENT_FAILED"
          ]
        },
        "table-options": _vm.tableOptions,
        "request-includes": ["created_at"],
        "create-form": {},
        "type-name": "Pro Forma Order",
        "base-url": "orders",
        "edit-path": "orders",
        "bulk-update-url": "orders/bulk",
        "request-with": "content"
      },
      scopedSlots: _vm._u([
        {
          key: "actionButtons",
          fn: function(props) {
            return [
              _c(
                "el-popover",
                { attrs: { trigger: "click", placement: "top" } },
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
                        [_vm._v("View\n        ")]
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
                        [_vm._v("Email Customer\n        ")]
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
                        [_vm._v("Download PDF\n        ")]
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
                    [_vm._v("Delete\n      ")]
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
            {
              attrs: {
                to: { name: "estimates.new", params: { isProForma: true } }
              }
            },
            [
              _c(
                "el-button",
                {
                  staticClass: "create_btn",
                  attrs: { type: "primary", plain: "" }
                },
                [_vm._v("New Pro-Forma")]
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
    require("vue-hot-reload-api")      .rerender("data-v-09c979a2", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-09c979a2\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/pro-formas/ProFormas.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-09c979a2\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/pro-formas/ProFormas.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("667a3080", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-09c979a2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProFormas.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-09c979a2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProFormas.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/pages/pro-formas/ProFormas.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-09c979a2\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/pro-formas/ProFormas.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/pro-formas/ProFormas.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-09c979a2\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/pro-formas/ProFormas.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/pro-formas/ProFormas.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-09c979a2", Component.options)
  } else {
    hotAPI.reload("data-v-09c979a2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});