webpackJsonp([49],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/PrintDownloadButton.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'PrintDownloadButton',
  components: {},
  props: {
    orderId: {
      type: [String, Number],
      required: true
    },
    loadOnMount: {
      type: Boolean,
      required: false,
      "default": function _default() {
        return true;
      }
    },
    download: {
      type: Boolean,
      required: false,
      "default": function _default() {
        return true;
      }
    },
    printButton: {
      type: Object,
      required: false,
      "default": function _default() {
        return {};
      }
    },
    deliveryNote: {
      type: Boolean,
      required: false,
      "default": function _default() {
        return false;
      }
    }
  },
  data: function data() {
    return {
      loading: true,
      displayIframe: false,
      iframeLoaded: false,
      defaultPrintButton: {
        "class": '',
        type: 'success',
        size: 'small',
        style: 'float:right; margin-bottom:20px; margin-right:10px;',
        text: 'Print'
      }
    };
  },
  computed: _objectSpread({
    downloadLink: function downloadLink() {
      return "/ecommerce-templates/invoice-download?reports=".concat(this.orderId);
    },
    printUrl: function printUrl() {
      if (this.deliveryNote) {
        return "".concat(this.getSiteBaseURL, "ecommerce-templates/delivery-note?orders=").concat(this.orderId);
      }

      return "".concat(this.getSiteBaseURL, "ecommerce-templates/invoice?reports=").concat(this.orderId);
    },
    internalPrintButton: function internalPrintButton() {
      return _objectSpread({}, this.defaultPrintButton, this.printButton);
    }
  }, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["mapGetters"])(['shopData'])),
  watch: {
    'loading': function loading(val) {
      if (this.displayIframe && !this.loading && !this.loadOnMount) {
        this.navigateIframe();
      }
    }
  },
  mounted: function mounted() {
    if (this.loadOnMount) {
      this.displayIframe = true;
    } else {
      this.loading = false;
    }
  },
  methods: {
    printInvoice: function printInvoice() {
      if (!this.loadOnMount && !this.iframeLoaded) {
        this.loading = true;
        this.displayIframe = true;
      } else {
        this.navigateIframe();
      }
    },
    navigateIframe: function navigateIframe() {
      this.iframeLoaded = true;

      if (navigator.userAgent.match(/opera/i) || navigator.userAgent.match(/trident/i) || navigator.userAgent.match(/msie/i) && window.addEventListener) {
        window.open(this.printUrl, '_blank');
      } else {
        frames["printLinkIframe".concat(this.orderId)].focus();
        frames["printLinkIframe".concat(this.orderId)].print();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2652895b\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/PrintDownloadButton.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-2652895b\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/PrintDownloadButton.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticStyle: { display: "inline" } },
    [
      _vm.download
        ? _c(
            "a",
            { attrs: { href: _vm.downloadLink, target: "_blank" } },
            [
              _c(
                "el-button",
                {
                  staticClass: "action_btn view_btn",
                  attrs: { size: "small", plain: "" }
                },
                [_vm._v("Download PDF\n    ")]
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-button",
        {
          class: _vm.internalPrintButton.class,
          style: _vm.internalPrintButton.style,
          attrs: {
            disabled: _vm.loading,
            size: _vm.internalPrintButton.size,
            type: _vm.internalPrintButton.type
          },
          on: { click: _vm.printInvoice }
        },
        [_vm._v(_vm._s(_vm.internalPrintButton.text) + "\n  ")]
      ),
      _vm._v(" "),
      _vm.displayIframe
        ? _c("iframe", {
            staticStyle: {
              position: "absolute",
              top: "-9999px",
              left: "-9999px",
              border: "0px",
              overfow: "none",
              "z-index": "-1"
            },
            attrs: {
              id: "printLinkIframe" + _vm.orderId,
              src: _vm.printUrl,
              name: "printLinkIframe" + _vm.orderId
            },
            on: {
              load: function($event) {
                _vm.loading = false
              }
            }
          })
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
    require("vue-hot-reload-api")      .rerender("data-v-2652895b", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2652895b\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/PrintDownloadButton.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2652895b\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/PrintDownloadButton.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("7a8ffa35", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2652895b\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PrintDownloadButton.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2652895b\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PrintDownloadButton.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/components/PrintDownloadButton.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2652895b\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/components/PrintDownloadButton.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"@babel/preset-env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"]},\"forceAllTransforms\":true}]],\"plugins\":[\"@babel/plugin-proposal-object-rest-spread\",[\"@babel/plugin-transform-runtime\",{\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/components/PrintDownloadButton.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-2652895b\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/components/PrintDownloadButton.vue")
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
Component.options.__file = "resources/assets/admin-spa/components/PrintDownloadButton.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2652895b", Component.options)
  } else {
    hotAPI.reload("data-v-2652895b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});