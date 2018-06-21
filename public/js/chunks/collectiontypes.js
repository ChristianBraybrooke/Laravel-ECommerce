webpackJsonp([23],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/collection-types/ViewCollectionType.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _apiService = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");

var _apiService2 = _interopRequireDefault(_apiService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var has = __webpack_require__("./node_modules/lodash.has/index.js"); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

    name: 'ViewCollectionType',

    components: {
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(28/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        },
        FilePickerModal: function FilePickerModal() {
            return __webpack_require__.e/* import() */(30/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/FilePickerModal.vue"));
        },
        ContentComponent: function ContentComponent() {
            return __webpack_require__.e/* import() */(32).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/ContentComponent.vue"));
        }
    },

    props: {
        collectionId: {
            type: String,
            required: true
        },
        editorOption: {
            modules: {
                toolbar: [['bold', 'italic', 'underline', 'strike'], ['blockquote'], [{ 'header': 1 }, { 'header': 2 }], [{ 'list': 'ordered' }, { 'list': 'bullet' }], [{ 'align': [] }], ['clean'], ['link', 'video']]
            }
        },
        typeId: {
            type: String,
            required: true
        }
    },

    data: function data() {
        return {
            loading: false,
            collectionTypeErrors: {},
            collectionType: {}
        };
    },


    computed: {
        typeName: function typeName() {
            return this.collectionType.individual_name ? this.collectionType.individual_name.toLowerCase() : 'collection type';
        },
        collectionTypeFormRules: function collectionTypeFormRules() {
            return {
                name: [{ required: true, message: 'The ' + this.typeName + ' name field is required', trigger: 'blur' }],
                individual_name: [{ required: true, message: 'The ' + this.typeName + ' individual name field is required', trigger: 'blur' }],
                slug: [{ required: true, message: 'The ' + this.typeName + ' slug field is required', trigger: 'blur' }]
            };
        }
    },

    watch: {},

    mounted: function mounted() {
        console.log('ViewCollectionType.vue Mounted');
        this.getCollectionType();
    },


    methods: {
        objectHas: function objectHas(haystack, needle) {
            return has(haystack, needle);
        },
        getCollectionType: function getCollectionType() {

            this.loading = true;
            this.collectionTypeErrors = {};

            _apiService2.default.get({
                path: 'collections/' + this.collectionId + '/types/' + this.typeId,
                params: {
                    with: ['collection', 'media', 'content'],
                    include: ['individual_name', 'slug', 'live_at']
                }
            }).then(function (data) {
                this.loading = false;
                this.collectionType = data.data;

                if (this.collectionType.meta.options) {
                    this.collectionType.meta.options.forEach(function (option) {
                        option.value.forEach(function (value) {
                            if (value.value.__fileDialogOpen === true) {
                                value.value.__fileDialogOpen = false;
                            }
                        }.bind(this));
                    }.bind(this));
                }
            }.bind(this)).catch(function (error) {
                this.loading = false;
                this.collectionTypeErrors = error;
            }.bind(this));
        },
        submitForm: function submitForm(formName) {
            var _this = this;

            this.collectionTypeErrors = {};
            this.collectionType.with = ['collection', 'media', 'content'];
            this.collectionType.include = ['individual_name', 'slug', 'live_at'];
            this.loading = true;

            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    _apiService2.default.persist('put', {
                        path: 'collections/' + _this.collectionId + '/types/' + _this.typeId,
                        object: _this.collectionType
                    }).then(function (data) {
                        this.loading = false;

                        this.collectionType = data.data;

                        this.$message({
                            message: this.collectionType.name + ' updated',
                            type: 'success',
                            showClose: true
                        });
                    }.bind(_this)).catch(function (error) {
                        this.collectionTypeErrors = error;
                        this.loading = false;
                    }.bind(_this));
                } else {
                    _this.loading = false;
                    return false;
                }
            });
        },
        displayFilePicker: function displayFilePicker(filePicker) {
            if (this.$refs[filePicker]) {
                this.$refs[filePicker].openModal();
            }
        },
        handleFilesChosen: function handleFilesChosen(data) {
            this.$set(this.collectionType, data.id, data.files);
        },
        handleFilesUnChosen: function handleFilesUnChosen(data) {
            this.$set(this.collectionType, data.id, data.files);
        },
        handleOptionFilesChosen: function handleOptionFilesChosen(data) {
            var optionsIndex = this.collectionType.meta.options.indexOf(data.id.option);
            var value = this.collectionType.meta.options[optionsIndex].values[this.collectionType.meta.options[optionsIndex].values.indexOf(data.id.value)];

            value.value.file = data.files[0];
        },
        handleOptionFilesUnChosen: function handleOptionFilesUnChosen(data) {
            var optionsIndex = this.collectionType.meta.options.indexOf(data.id.option);
            var value = this.collectionType.meta.options[optionsIndex].values[this.collectionType.meta.options[optionsIndex].values.indexOf(data.id.value)];

            value.value.file = data.files;
        },
        addSpecification: function addSpecification(meta) {
            var set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (!set) {
                set = { value: '' };
            }
            if (!this.collectionType.meta[meta]) {
                this.$set(this.collectionType.meta, meta, []);
            }
            this.collectionType.meta[meta].push({
                key: '',
                values: [set]
            });
        },
        addSpecificationValue: function addSpecificationValue(value, meta) {
            var set = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            if (!set) {
                set = { value: '' };
            }
            this.collectionType.meta[meta][this.collectionType.meta[meta].indexOf(value)].values.push(set);
        }
    }

};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-588cb50c\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/collection-types/ViewCollectionType.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-588cb50c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/collection-types/ViewCollectionType.vue":
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
      _vm.collectionType.collection
        ? _c(
            "el-breadcrumb",
            {
              staticClass: "breadcrumbs",
              attrs: { "separator-class": "el-icon-arrow-right" }
            },
            [
              _c(
                "el-breadcrumb-item",
                { attrs: { to: { name: "collections" } } },
                [_vm._v("Collections")]
              ),
              _vm._v(" "),
              _c(
                "el-breadcrumb-item",
                {
                  attrs: {
                    to: {
                      name: "collections.view",
                      params: {
                        collectionId: _vm.collectionType.collection.id.toString()
                      }
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.collectionType.collection.name))]
              ),
              _vm._v(" "),
              _c("el-breadcrumb-item", [
                _vm._v(_vm._s(_vm.collectionType.name))
              ])
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-row",
        { attrs: { align: "middle", type: "flex" } },
        [
          _c("el-col", { attrs: { span: 12 } }, [
            _c("h1", { staticClass: "page_title" }, [
              _vm._v(_vm._s(_vm.collectionType.name))
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      Object.keys(_vm.collectionTypeErrors).length > 0
        ? _c("errors", { attrs: { errors: _vm.collectionTypeErrors } })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-row",
        { attrs: { type: "flex" } },
        [
          _c(
            "el-col",
            { attrs: { md: 24 } },
            [
              _c(
                "el-form",
                {
                  ref: "collectionTypeForm",
                  attrs: {
                    "label-position": "top",
                    model: _vm.collectionType,
                    rules: _vm.collectionTypeFormRules,
                    "label-width": "120px"
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
                          _vm.collectionType.live_at
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
                                      value: _vm.collectionType.live_at.live,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.collectionType.live_at,
                                          "live",
                                          $$v
                                        )
                                      },
                                      expression: "collectionType.live_at.live"
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
                        { attrs: { lg: 8, md: 12, sm: 24 } },
                        [
                          _c(
                            "el-form-item",
                            { attrs: { label: "Name", prop: "name" } },
                            [
                              _c("el-input", {
                                attrs: { autofocus: true },
                                model: {
                                  value: _vm.collectionType.name,
                                  callback: function($$v) {
                                    _vm.$set(_vm.collectionType, "name", $$v)
                                  },
                                  expression: "collectionType.name"
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
                        { attrs: { lg: 8, md: 12, sm: 24 } },
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
                                  value: _vm.collectionType.individual_name,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.collectionType,
                                      "individual_name",
                                      $$v
                                    )
                                  },
                                  expression: "collectionType.individual_name"
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
                        { attrs: { lg: 8, md: 24 } },
                        [
                          _c(
                            "el-form-item",
                            { attrs: { label: "Slug / Url", prop: "slug" } },
                            [
                              _c(
                                "el-input",
                                {
                                  model: {
                                    value: _vm.collectionType.slug,
                                    callback: function($$v) {
                                      _vm.$set(_vm.collectionType, "slug", $$v)
                                    },
                                    expression: "collectionType.slug"
                                  }
                                },
                                [
                                  _c("template", { slot: "prepend" }, [
                                    _vm._v(
                                      _vm._s(_vm.getSiteBaseURL) +
                                        _vm._s(
                                          this.collectionType.collection
                                            ? this.collectionType.collection
                                                .slug
                                            : ""
                                        ) +
                                        "/"
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
                  _vm.collectionType.content
                    ? _c(
                        "el-row",
                        { attrs: { gutter: 20 } },
                        [
                          _vm.collectionType.content
                            ? _c("content-component", {
                                attrs: { content: _vm.collectionType.content }
                              })
                            : _vm._e()
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "el-row",
                    { attrs: { gutter: 20 } },
                    [
                      _c(
                        "el-col",
                        { attrs: { md: 6 } },
                        [
                          _c(
                            "el-form-item",
                            { attrs: { label: "Main Img", prop: "main_img" } },
                            [
                              _vm.objectHas(_vm.collectionType, "main_img")
                                ? _c("file-picker-modal", {
                                    ref: "filePickerMain",
                                    attrs: {
                                      "show-btn": true,
                                      "current-files": _vm.collectionType
                                        .main_img
                                        ? [_vm.collectionType.main_img]
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
                                label: "Secondary Img",
                                prop: "secondary_img"
                              }
                            },
                            [
                              _vm.objectHas(_vm.collectionType, "secondary_img")
                                ? _c("file-picker-modal", {
                                    ref: "filePickerSecondary",
                                    attrs: {
                                      "show-btn": true,
                                      "current-files": _vm.collectionType
                                        .secondary_img
                                        ? [_vm.collectionType.secondary_img]
                                        : undefined,
                                      name: "Secondary Img",
                                      selectable: 1,
                                      "picker-id": "secondary_img",
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
                      ),
                      _vm._v(" "),
                      _c(
                        "el-col",
                        { attrs: { md: 6 } },
                        [
                          _c(
                            "el-form-item",
                            {
                              attrs: { label: "Third Img", prop: "third_img" }
                            },
                            [
                              _vm.objectHas(_vm.collectionType, "third_img")
                                ? _c("file-picker-modal", {
                                    ref: "filePickerThird",
                                    attrs: {
                                      "show-btn": true,
                                      "current-files": _vm.collectionType
                                        .third_img
                                        ? [_vm.collectionType.third_img]
                                        : undefined,
                                      name: "Third Img",
                                      selectable: 1,
                                      "picker-id": "third_img",
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
                  ),
                  _vm._v(" "),
                  _vm.collectionType.meta
                    ? _c(
                        "el-row",
                        { attrs: { gutter: 20 } },
                        [
                          _vm._l(
                            _vm.collectionType.meta.specifications,
                            function(spec) {
                              return [
                                _c(
                                  "el-col",
                                  { attrs: { md: 12 } },
                                  [
                                    _c(
                                      "el-form-item",
                                      {
                                        attrs: {
                                          label: "Specification",
                                          prop: "key"
                                        }
                                      },
                                      [
                                        _c("el-input", {
                                          attrs: { autofocus: true },
                                          model: {
                                            value: spec.key,
                                            callback: function($$v) {
                                              _vm.$set(spec, "key", $$v)
                                            },
                                            expression: "spec.key"
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
                                  { attrs: { md: 12 } },
                                  [
                                    _vm._l(spec.values, function(value) {
                                      return [
                                        _c(
                                          "el-form-item",
                                          {
                                            attrs: {
                                              label: "Specification Value",
                                              prop: "value"
                                            }
                                          },
                                          [
                                            _c("el-input", {
                                              attrs: { autofocus: true },
                                              model: {
                                                value: value.value,
                                                callback: function($$v) {
                                                  _vm.$set(value, "value", $$v)
                                                },
                                                expression: "value.value"
                                              }
                                            })
                                          ],
                                          1
                                        )
                                      ]
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "el-button",
                                      {
                                        attrs: { type: "primary", plain: "" },
                                        on: {
                                          click: function($event) {
                                            _vm.addSpecificationValue(
                                              spec,
                                              "specifications"
                                            )
                                          }
                                        }
                                      },
                                      [_vm._v("Add Specification Value")]
                                    )
                                  ],
                                  2
                                )
                              ]
                            }
                          ),
                          _vm._v(" "),
                          _c(
                            "el-button",
                            {
                              attrs: { type: "primary", plain: "" },
                              on: {
                                click: function($event) {
                                  _vm.addSpecification("specifications")
                                }
                              }
                            },
                            [_vm._v("Add Specification")]
                          )
                        ],
                        2
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.collectionType.meta
                    ? _c(
                        "el-row",
                        { attrs: { gutter: 20 } },
                        [
                          _vm._l(_vm.collectionType.meta.options, function(
                            option
                          ) {
                            return [
                              _c(
                                "el-col",
                                { attrs: { md: 12 } },
                                [
                                  _c(
                                    "el-form-item",
                                    {
                                      attrs: {
                                        label: "Option Type",
                                        prop: "key"
                                      }
                                    },
                                    [
                                      _c("el-input", {
                                        attrs: { autofocus: true },
                                        model: {
                                          value: option.key,
                                          callback: function($$v) {
                                            _vm.$set(option, "key", $$v)
                                          },
                                          expression: "option.key"
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
                                { attrs: { md: 12 } },
                                [
                                  _vm._l(option.values, function(
                                    value,
                                    optKey
                                  ) {
                                    return [
                                      _c(
                                        "el-col",
                                        { attrs: { md: 12 } },
                                        [
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: "Option Name",
                                                prop: "name"
                                              }
                                            },
                                            [
                                              _c("el-input", {
                                                attrs: { autofocus: true },
                                                model: {
                                                  value: value.value.name,
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      value.value,
                                                      "name",
                                                      $$v
                                                    )
                                                  },
                                                  expression: "value.value.name"
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
                                        { attrs: { md: 12 } },
                                        [
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: "Option Text",
                                                prop: "text"
                                              }
                                            },
                                            [
                                              _c("el-input", {
                                                attrs: { autofocus: true },
                                                model: {
                                                  value: value.value.text,
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      value.value,
                                                      "text",
                                                      $$v
                                                    )
                                                  },
                                                  expression: "value.value.text"
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
                                        { attrs: { md: 24 } },
                                        [
                                          _c(
                                            "el-form-item",
                                            {
                                              attrs: {
                                                label: "Option File",
                                                prop: "file"
                                              }
                                            },
                                            [
                                              value.value
                                                ? _c("file-picker-modal", {
                                                    ref:
                                                      "metaOptionFile_" +
                                                      optKey,
                                                    refInFor: true,
                                                    attrs: {
                                                      "current-files": value
                                                        .value.file
                                                        ? [value.value.file]
                                                        : undefined,
                                                      name: value.value.name,
                                                      selectable: 1,
                                                      "show-btn": true,
                                                      "picker-id": {
                                                        option: option,
                                                        value: value
                                                      },
                                                      "open-on-mount": false
                                                    },
                                                    on: {
                                                      filesChosen:
                                                        _vm.handleOptionFilesChosen,
                                                      filesUnChosen:
                                                        _vm.handleOptionFilesUnChosen
                                                    }
                                                  })
                                                : _vm._e()
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    ]
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "el-button",
                                    {
                                      attrs: { type: "primary", plain: "" },
                                      on: {
                                        click: function($event) {
                                          _vm.addSpecificationValue(
                                            option,
                                            "options",
                                            { value: { name: "", file: null } }
                                          )
                                        }
                                      }
                                    },
                                    [_vm._v("Add Option Value")]
                                  )
                                ],
                                2
                              )
                            ]
                          }),
                          _vm._v(" "),
                          _c(
                            "el-button",
                            {
                              attrs: { type: "primary", plain: "" },
                              on: {
                                click: function($event) {
                                  _vm.addSpecification("options", {
                                    value: {
                                      name: "",
                                      file: null,
                                      __fileDialogOpen: false
                                    }
                                  })
                                }
                              }
                            },
                            [_vm._v("Add Option")]
                          )
                        ],
                        2
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.collectionType.meta
                    ? _c(
                        "el-row",
                        { attrs: { gutter: 20 } },
                        [
                          _c(
                            "el-col",
                            { attrs: { md: 8 } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: "Featured Color",
                                    prop: "meta.featured_colour"
                                  }
                                },
                                [
                                  _c("el-color-picker", {
                                    model: {
                                      value:
                                        _vm.collectionType.meta.featured_colour,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.collectionType.meta,
                                          "featured_colour",
                                          $$v
                                        )
                                      },
                                      expression:
                                        "collectionType.meta.featured_colour"
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
                    : _vm._e(),
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
                                      _vm.submitForm("collectionTypeForm")
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
    require("vue-hot-reload-api")      .rerender("data-v-588cb50c", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-588cb50c\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/collection-types/ViewCollectionType.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-588cb50c\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/collection-types/ViewCollectionType.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("fed85abc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-588cb50c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewCollectionType.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-588cb50c\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ViewCollectionType.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./resources/assets/admin-spa/pages/collection-types/ViewCollectionType.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-588cb50c\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/admin-spa/pages/collection-types/ViewCollectionType.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/admin-spa/pages/collection-types/ViewCollectionType.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-588cb50c\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/admin-spa/pages/collection-types/ViewCollectionType.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/collection-types/ViewCollectionType.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-588cb50c", Component.options)
  } else {
    hotAPI.reload("data-v-588cb50c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});