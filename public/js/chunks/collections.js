webpackJsonp([2],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/collections/Collections.vue":
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

exports.default = {

  components: {
    DataTable: function DataTable() {
      return __webpack_require__.e/* import() */(25/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/DataTable.vue"));
    }
  },

  mounted: function mounted() {
    console.log('Collections.vue Mounted.');
  },
  data: function data() {
    return {};
  }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/collections/ViewCollection.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _apiService = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");

var _apiService2 = _interopRequireDefault(_apiService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    components: {
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(22/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        },
        DataTable: function DataTable() {
            return __webpack_require__.e/* import() */(25/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/DataTable.vue"));
        },
        FilePickerModal: function FilePickerModal() {
            return __webpack_require__.e/* import() */(23/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/FilePickerModal.vue"));
        }
    },

    props: {
        collectionId: {
            type: String,
            required: true
        }
    },

    mounted: function mounted() {
        console.log('ViewCollection.vue Mounted');
        this.getCollection();
    },


    computed: {
        collectionName: function collectionName() {
            return this.collection.individual_name ? this.collection.individual_name.toLowerCase() : 'collection';
        },
        createFormRules: function createFormRules() {
            return {
                name: [{ required: true, message: 'The ' + this.collectionName + ' name field is required', trigger: 'blur' }]
            };
        },
        collectionFormRules: function collectionFormRules() {
            return {
                name: [{ required: true, message: 'The ' + this.collectionName + ' name field is required', trigger: 'blur' }],
                individual_name: [{ required: true, message: 'The ' + this.collectionName + ' individual name field is required', trigger: 'blur' }],
                slug: [{ required: true, message: 'The ' + this.collectionName + ' slug field is required', trigger: 'blur' }]
            };
        }
    },

    data: function data() {
        var h = this.$createElement;

        return {
            tableOptions: {
                border: false,
                stripe: false,
                showSearch: true,
                showHeader: true,
                showNewBtn: true,
                showRefreshBtn: true,
                showHeadHr: false,
                showTitle: false,
                viewText: 'View',
                deleteText: 'Delete',
                bulkOptions: [{
                    value: 'draft',
                    label: 'Mark Draft'
                }, {
                    value: 'live',
                    label: 'Mark Live'
                }, {
                    value: 'delete',
                    label: 'Delete'
                }],
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
                    resizable: true
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
                        return row.live_at.live ? h('i', { 'class': 'el-icon-check' }) : h('i', { 'class': 'el-icon-close' });
                    },
                    resizable: true
                }]
            },
            showFilePicker: false,
            uploadFileList: [],
            collectionErrors: {},
            collection: {},
            collectionStore: {},
            loading: false
        };
    },


    methods: {
        /**
         * Get information about this collection.
         *
         * @return void
         */
        getCollection: function getCollection() {
            _apiService2.default.get({
                path: 'collections/' + this.collectionId,
                params: {
                    include: ['individual_name', 'slug'],
                    with: ['media']
                }
            }).then(function (data) {
                this.collectionErrors = {};
                this.collection = data.data;
                if (data.data.header_img.url) {
                    this.showFilePicker = true;
                }
                this.collectionStore.push(Vue.util.extend({}, data));
            }.bind(this)).catch(function (errors) {
                if (errors.code && errors.code === 404) {
                    this.$router.push({ path: 'not-found' });
                }

                this.collectionErrors = errors;
            }.bind(this));
        },
        submitForm: function submitForm(formName) {
            var _this = this;

            this.collectionErrors = {};
            this.loading = true;

            this.collection.with = ['media'];
            this.collection.include = ['individual_name', 'slug'];

            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    _apiService2.default.persist('put', {
                        path: 'collections/' + _this.collectionId,
                        object: _this.collection
                    }).then(function (data) {
                        this.loading = false;

                        this.collection = data.data;

                        this.$message({
                            message: this.collection.name + ' updated',
                            type: 'success',
                            showClose: true
                        });
                    }.bind(_this)).catch(function (error) {
                        this.collectionErrors = error;
                        this.loading = false;
                    }.bind(_this));
                } else {
                    _this.loading = false;
                    return false;
                }
            });
        },
        displayFilePicker: function displayFilePicker() {
            this.showFilePicker = true;
            if (this.$refs.filePicker) {
                this.$refs.filePicker.openModal();
            }
        },
        handleFilesChosen: function handleFilesChosen(data) {
            this.$set(this.collection, data.id, data.files);
        },
        handleFilesUnChosen: function handleFilesUnChosen(data) {
            this.$set(this.collection, data.id, data.files);
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
//
//
//
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

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2383e233\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/collections/Collections.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b1811c16\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/collections/ViewCollection.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-2383e233\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/collections/Collections.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("data-table", {
    attrs: {
      "type-name": "collection",
      "request-includes": ["live_at", "created_at"],
      "bulk-update-url": "collections/bulk"
    }
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2383e233", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-b1811c16\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/collections/ViewCollection.vue":
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
      _c(
        "el-breadcrumb",
        {
          staticClass: "breadcrumbs",
          attrs: { "separator-class": "el-icon-arrow-right" }
        },
        [
          _c("el-breadcrumb-item", { attrs: { to: { name: "collections" } } }, [
            _vm._v("Collections")
          ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v(_vm._s(_vm.collection.name))])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-row",
        { attrs: { align: "middle" } },
        [
          _c("el-col", { attrs: { span: 24 } }, [
            _c("h1", { staticClass: "page_title" }, [
              _vm._v(_vm._s(_vm.collection.name))
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      Object.keys(_vm.collectionErrors).length > 0
        ? _c("errors", { attrs: { errors: _vm.collectionErrors } })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-row",
        { attrs: { gutter: 40 } },
        [
          _c(
            "el-col",
            {
              staticClass: "col_right_border",
              attrs: { sm: 24, md: 24, lg: 12 }
            },
            [
              _c(
                "el-form",
                {
                  ref: "collectionForm",
                  attrs: {
                    "label-position": "top",
                    model: _vm.collection,
                    rules: _vm.collectionFormRules,
                    "label-width": "120px"
                  },
                  nativeOn: {
                    keyup: function($event) {
                      if (
                        !("button" in $event) &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      ) {
                        return null
                      }
                      _vm.submitForm("collectionForm")
                    }
                  }
                },
                [
                  _c(
                    "el-row",
                    { attrs: { gutter: 20 } },
                    [
                      _c(
                        "el-col",
                        { attrs: { md: 24 } },
                        [
                          _vm.collection.live_at
                            ? _c(
                                "el-form-item",
                                {
                                  attrs: { label: "Live", prop: "live_at.live" }
                                },
                                [
                                  _c("el-switch", {
                                    attrs: {
                                      "active-color": "#13ce66",
                                      "inactive-color": "#ff4949"
                                    },
                                    model: {
                                      value: _vm.collection.live_at.live,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.collection.live_at,
                                          "live",
                                          $$v
                                        )
                                      },
                                      expression: "collection.live_at.live"
                                    }
                                  })
                                ],
                                1
                              )
                            : _vm._e()
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
                        { attrs: { md: 12, sm: 24 } },
                        [
                          _c(
                            "el-form-item",
                            { attrs: { label: "Name", prop: "name" } },
                            [
                              _c("el-input", {
                                attrs: { autofocus: true },
                                model: {
                                  value: _vm.collection.name,
                                  callback: function($$v) {
                                    _vm.$set(_vm.collection, "name", $$v)
                                  },
                                  expression: "collection.name"
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
                        { attrs: { md: 12, sm: 24 } },
                        [
                          _c(
                            "el-form-item",
                            {
                              attrs: {
                                label: "Individual Name",
                                prop: "individual_name"
                              }
                            },
                            [
                              _c("el-input", {
                                model: {
                                  value: _vm.collection.individual_name,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.collection,
                                      "individual_name",
                                      $$v
                                    )
                                  },
                                  expression: "collection.individual_name"
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
                        { attrs: { md: 24 } },
                        [
                          _c(
                            "el-form-item",
                            { attrs: { label: "Slug / Url", prop: "slug" } },
                            [
                              _c(
                                "el-input",
                                {
                                  model: {
                                    value: _vm.collection.slug,
                                    callback: function($$v) {
                                      _vm.$set(_vm.collection, "slug", $$v)
                                    },
                                    expression: "collection.slug"
                                  }
                                },
                                [
                                  _c("template", { slot: "prepend" }, [
                                    _vm._v(_vm._s(_vm.getSiteBaseURL))
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
                  _c(
                    "el-form-item",
                    { attrs: { label: "Header Img", prop: "header_img" } },
                    [
                      _c(
                        "el-button",
                        {
                          attrs: { type: "info", plain: "", size: "mini" },
                          on: { click: _vm.displayFilePicker }
                        },
                        [
                          _vm._v("Select File "),
                          _c("i", { staticClass: "el-icon-document" })
                        ]
                      ),
                      _vm._v(" "),
                      _vm.showFilePicker
                        ? _c("file-picker-modal", {
                            ref: "filePicker",
                            attrs: {
                              "current-files": _vm.collection.header_img
                                ? [_vm.collection.header_img]
                                : undefined,
                              name: "Header Img",
                              selectable: 1,
                              "picker-id": "header_img",
                              "open-on-mount": _vm.collection.header_img
                                ? false
                                : true
                            },
                            on: {
                              filesChosen: _vm.handleFilesChosen,
                              filesUnChosen: _vm.handleFilesUnChosen
                            }
                          })
                        : _vm._e()
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
                            "el-form-item",
                            [
                              _c(
                                "el-button",
                                {
                                  attrs: {
                                    plain: "",
                                    type: "success",
                                    loading: _vm.loading
                                  },
                                  on: {
                                    click: function($event) {
                                      _vm.submitForm("collectionForm")
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
              staticClass: "half_table_col",
              attrs: { sm: 24, md: 24, lg: 12 }
            },
            [
              _c("data-table", {
                attrs: {
                  "type-name": _vm.collectionName,
                  "table-options": _vm.tableOptions,
                  "edit-path": "/collections/" + _vm.collectionId + "/types",
                  "create-form-rules": _vm.createFormRules,
                  "base-url": "collections/" + _vm.collectionId + "/types",
                  "request-includes": ["live_at", "created_at"],
                  "bulk-update-url":
                    "collections/" + _vm.collectionId + "/types/bulk"
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
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b1811c16", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2383e233\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/collections/Collections.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2383e233\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/collections/Collections.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("da1a3828", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2383e233\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Collections.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2383e233\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Collections.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b1811c16\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/collections/ViewCollection.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b1811c16\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/collections/ViewCollection.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("757abc68", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b1811c16\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewCollection.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b1811c16\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewCollection.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/pages/collections/Collections.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2383e233\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/collections/Collections.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/collections/Collections.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-2383e233\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/collections/Collections.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/collections/Collections.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2383e233", Component.options)
  } else {
    hotAPI.reload("data-v-2383e233", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/admin-spa/pages/collections/ViewCollection.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b1811c16\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/collections/ViewCollection.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/collections/ViewCollection.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-b1811c16\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/collections/ViewCollection.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/collections/ViewCollection.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b1811c16", Component.options)
  } else {
    hotAPI.reload("data-v-b1811c16", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});