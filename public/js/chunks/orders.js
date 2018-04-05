<<<<<<< HEAD
webpackJsonp([0],{"+VPL":function(t,e){var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[r("el-breadcrumb",{staticClass:"breadcrumbs",attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{name:"orders"}}},[t._v("Orders")]),t._v(" "),r("el-breadcrumb-item",[t._v("New Order")]),t._v(" "),r("el-breadcrumb-item",{attrs:{to:{name:"orders.step1"}}},[t._v("Step 1")]),t._v(" "),r("el-breadcrumb-item",{attrs:{to:{name:"orders.step2"}}},[t._v("Step 2")]),t._v(" "),r("el-breadcrumb-item",[t._v("Step 3")])],1),t._v(" "),r("el-row",{attrs:{align:"middle",type:"flex"}},[r("el-col",{attrs:{span:12}},[r("h1",{staticClass:"page_title"},[t._v("New Order "),t.order.id?r("span",[t._v(" - #"+t._s(t.order.id))]):t._e()])])],1),t._v(" "),Object.keys(t.orderErrors).length>0?r("errors",{attrs:{errors:t.orderErrors}}):t._e(),t._v(" "),r("el-form",{ref:"orderForm",attrs:{"label-position":"top",model:t.order},nativeOn:{submit:function(t){t.preventDefault()}}},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:12}},[r("h5",[t._v("Payment Information")])])],1),t._v(" "),r("card-payment-form",{ref:"paymentForm",attrs:{form:t.order,loading:t.loading,"on-token-creation":t.onTokenCreation}}),t._v(" "),r("el-row",{staticStyle:{"margin-top":"40px"},attrs:{gutter:20}},[r("el-col",{attrs:{md:{span:24}}},[r("el-button",{attrs:{type:"success",plain:""},on:{click:function(e){t.processSubmit("orderForm")}}},[t._v("Complete Payment")])],1)],1)],1)],1)},o=[];t.exports={render:r,staticRenderFns:o}},"/FJ2":function(t,e,r){e=t.exports=r("FZ+f")(void 0),e.push([t.i,"",""])},"1iqI":function(t,e,r){var o=r("/FJ2");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);r("rjj0")("63894130",o,!0)},"1wGH":function(t,e,r){e=t.exports=r("FZ+f")(void 0),e.push([t.i,"",""])},"3IRH":function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},"55SM":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},n=r("GzQy"),a=function(t){return t&&t.__esModule?t:{default:t}}(n),s=r("NYxO");e.default={name:"orderStepOne",components:{Errors:function(){return r.e(20).then(r.bind(null,"DqGP"))},AddressForm:function(){return r.e(36).then(r.bind(null,"G1R4"))}},props:{},data:function(){return{loading:!1,orderErrors:{},formRules:{"customer.first_name":[{required:!0,message:"The first name is required",trigger:"blur"}],"customer.last_name":[{required:!0,message:"The last name is required",trigger:"blur"}],"customer.phone":[{required:!0,message:"The phone number is required",trigger:"blur"}],"customer.email":[{required:!0,message:"The email is required",trigger:"blur"},{type:"email",message:"Please enter a valid email address"}]}}},computed:o({},(0,s.mapGetters)(["order"])),watch:{order:{handler:function(t){this.$store.commit("SET_ORDER",t)},deep:!0}},mounted:function(){},methods:o({},(0,s.mapActions)(["resetOrder"]),{processSubmit:function(t,e){var r=this;this.$refs[t].validate(function(t){if(!t)return!1;r.loading=!0,r.order.id?a.default.persist("put",{path:"orders/"+r.order.id,object:r.order}).then(function(t){this.loading=!1,e&&this.$router.push({name:"orders.step2"})}.bind(r)).catch(function(t){this.loading=!1,this.orderErrors=t}.bind(r)):a.default.persist("post",{path:"orders",object:r.order}).then(function(t){this.loading=!1,this.$set(this.order,"id",t.data.id),this.$router.push({name:"orders.step2"})}.bind(r)).catch(function(t){this.loading=!1,this.orderErrors=t}.bind(r))})}})}},"8r4o":function(t,e){function r(t,e,r,o){for(var n=-1,a=$(j((e-t)/(r||1)),0),s=Array(a);a--;)s[o?a:++n]=t,t+=r;return s}function o(t,e){return!!(e=null==e?_:e)&&("number"==typeof t||P.test(t))&&t>-1&&t%1==0&&t<e}function n(t,e,r){if(!d(r))return!1;var n=typeof e;return!!("number"==n?s(r)&&o(e,r.length):"string"==n&&e in r)&&a(r[e],t)}function a(t,e){return t===e||t!==t&&e!==e}function s(t){return null!=t&&l(t.length)&&!i(t)}function i(t){var e=d(t)?O.call(t):"";return e==b||e==g}function l(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=_}function d(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function u(t){return!!t&&"object"==typeof t}function c(t){return"symbol"==typeof t||u(t)&&O.call(t)==y}function p(t){if(!t)return 0===t?t:0;if((t=m(t))===f||t===-f){return(t<0?-1:1)*h}return t===t?t:0}function m(t){if("number"==typeof t)return t;if(c(t))return v;if(d(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=d(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(w,"");var r=C.test(t);return r||F.test(t)?k(t.slice(2),r?2:8):x.test(t)?v:+t}var f=1/0,_=9007199254740991,h=1.7976931348623157e308,v=NaN,b="[object Function]",g="[object GeneratorFunction]",y="[object Symbol]",w=/^\s+|\s+$/g,x=/^[-+]0x[0-9a-f]+$/i,C=/^0b[01]+$/i,F=/^0o[0-7]+$/i,P=/^(?:0|[1-9]\d*)$/,k=parseInt,S=Object.prototype,O=S.toString,j=Math.ceil,$=Math.max,A=function(t){return function(e,o,a){return a&&"number"!=typeof a&&n(e,o,a)&&(o=a=void 0),e=p(e),void 0===o?(o=e,e=0):o=p(o),a=void 0===a?e<o?1:-1:p(a),r(e,o,a,t)}}();t.exports=A},FubQ:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},n=r("GzQy"),a=function(t){return t&&t.__esModule?t:{default:t}}(n),s=r("NYxO"),i=r("etT0"),l=r("P/uL"),d=r("R3sX"),u=r("dzSQ"),c=r("8r4o");e.default={name:"NewOrderStepTwo",components:{Errors:function(){return r.e(20).then(r.bind(null,"DqGP"))}},props:{},data:function(){return{loading:!1,showProductModal:!1,addProductForm:{edit:!1,product:{quantity:1}},productAddErrors:{},operators:{"+":function(t,e){return parseInt(t)+parseInt(e)},"-":function(t,e){return parseInt(t)-parseInt(e)}},products:[],productProps:{value:"id",label:"name",children:"variants"}}},computed:o({},(0,s.mapGetters)(["order","shopData","orderTotals"]),{quantityRange:function(){return c(1,251)},shippingRange:function(){return c(0,250,10)}}),watch:{order:{handler:function(t){this.$store.commit("SET_ORDER",t)},deep:!0}},mounted:function(){this.order.id||this.$router.push({name:"orders.step1"})},methods:o({},(0,s.mapActions)(["deleteOrderItem","editOrderItem"]),{formattedPrice:function(t){var e=parseInt(t.price),r=e,o=0;l(t.options,function(t){t.price_mutator&&t.price_value&&(r=this.operators[t.price_mutator](r,t.price_value),o=this.operators[t.price_mutator](o,t.price_value))}.bind(this));var n=t.quantity?t.quantity:1,a=r*n;return o*=n,{"Base Price":e,"Sub-Total":e*n,Extras:o,Total:a}},closeAndClearModal:function(t){var e=this;this.$confirm("Are you sure to close the product selector?").then(function(r){e.productAddErrors={},e.$refs.addProductForm.resetFields(),e.addProductForm={edit:!1,product:{quantity:1}},t?t():e.showProductModal=!1}).catch(function(t){})},handleProductChange:function(t){var e=this.findProductById(u(t));this.addProductForm.product=e,this.$set(this.addProductForm.product,"options",{})},requestProductVariants:d(function(t){var e=this.getIndexFromId(t);this.loading=!0,a.default.get({path:"products/"+t+"/variants",params:{include:["blank_variants","type","options","price","effects_price"],with:["orderForm.sections.fields"]}}).then(function(t){this.loading=!1,this.products[e].variants=t.data}.bind(this)).catch(function(t){this.loading=!1}.bind(this))},1e3),handleAddProductBtnClick:function(){this.showProductModal=!0,this.loading=!0,a.default.get({path:"products",params:{no_variants:!0,include:["blank_variants","type","options","price","effects_price"],with:["orderForm.sections.fields"]}}).then(function(t){this.loading=!1,this.products=t.data}.bind(this)).catch(function(t){this.loading=!1}.bind(this))},getIndexFromId:function(t){if(t){var e=i(this.products,function(e){return e.id===parseInt(t)});return-1===e?null:e}return null},findProductById:function(t){var e=null;return t&&l(this.products,function(r){r.id===parseInt(t)?e=r:l(r.variants,function(r){r.id===parseInt(t)&&(e=r)})}),e},addProductToTable:function(){this.$store.commit("ADD_PRODUCT_TO_ORDER",this.addProductForm.product),this.showProductModal=!1},editProductOnTable:function(){this.editOrderItem(this.addProductForm.product),this.showProductModal=!1},deleteRow:function(t,e){this.deleteOrderItem(e)},editRow:function(t,e){this.addProductForm.edit=!0,this.addProductForm.product=e,this.showProductModal=!0},optionLabel:function(t){return t.price_mutator&&t.price_value?t.name+" ("+t.price_mutator+" £"+t.price_value+")":t.name},itemRowNameFormatter:function(t,e,r){var o=this.$createElement,n=o("p",[t.variant.name?t.variant.name+" / ":"",o("strong",[t.name])]);if(t.options){var a=[];return l(t.options,function(t,e){var r=t.name?t.name:t;a.push(o("li",[e,": ",r]))}),o("div",[n," ",o("ul",{class:"order_item_options"},[a])])}return o("div",[n])},processSubmit:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.loading=!0,a.default.persist("put",{path:"orders/"+this.order.id,object:this.order}).then(function(e){this.loading=!1,t&&this.$router.push({name:"orders.step3"})}.bind(this)).catch(function(t){this.loading=!1}.bind(this))}})}},J71i:function(t,e,r){var o=r("NmxS");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);r("rjj0")("53bfbbbe",o,!0)},K2Yr:function(t,e,r){function o(t){r("1iqI")}var n=r("VU/8"),a=r("55SM"),s=r("QYUN"),i=o,l=n(a,s,!1,i,null,null);t.exports=l.exports},Kskl:function(t,e,r){function o(t){r("U86w")}var n=r("VU/8"),a=r("Vhmr"),s=r("+VPL"),i=o,l=n(a,s,!1,i,null,null);t.exports=l.exports},MIBT:function(t,e,r){e=t.exports=r("FZ+f")(void 0),e.push([t.i,".form_option_section{border-bottom:2px dashed #e4e7ed;padding:10px 0;margin-bottom:10px}ul.order_item_options{list-style:circle;font-size:13px;padding:0 25px}",""])},NKYa:function(t,e,r){var o=r("1wGH");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);r("rjj0")("41daae1d",o,!0)},NdxR:function(t,e){var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[r("el-breadcrumb",{staticClass:"breadcrumbs",attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{name:"orders"}}},[t._v("Orders")]),t._v(" "),t.order.invoice?r("el-breadcrumb-item",[t._v(t._s(t.order.invoice.number))]):t._e()],1),t._v(" "),r("el-row",{attrs:{align:"middle"}},[r("el-col",{attrs:{sm:24,lg:12}},[t.order.invoice?r("h1",{staticClass:"page_title"},[t._v("Order: "+t._s(t.order.invoice.number)+" "),t.order.status?r("el-tag",{attrs:{type:"info",size:"large"}},[t._v(t._s(t.order.status))]):t._e()],1):t._e()]),t._v(" "),r("el-col",{attrs:{sm:24,lg:12}},[r("el-button",{staticStyle:{float:"right","margin-bottom":"20px"},attrs:{type:"success",plain:""},on:{click:t.preparePrint}},[t._v("Print Invoice")]),t._v(" "),!t.loading&&t.printUrl?r("iframe",{staticStyle:{position:"absolute",top:"-9999px",left:"-9999px",border:"0px",overfow:"none","z-index":"-1"},attrs:{id:"printLinkIframe",name:"printLinkIframe",src:t.printUrl},on:{load:t.printInvoice}}):t._e()],1)],1),t._v(" "),Object.keys(t.orderErrors).length>0?r("errors",{attrs:{errors:t.orderErrors}}):t._e(),t._v(" "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:24}},[t.orderStatuses?r("el-form",{attrs:{model:t.order}},[r("el-select",{attrs:{placeholder:"Select"},model:{value:t.order.status,callback:function(e){t.$set(t.order,"status",e)},expression:"order.status"}},t._l(t.orderStatuses,function(t,e){return r("el-option",{key:e,attrs:{label:t,value:e}})})),t._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",size:"small",loading:t.loading},on:{click:function(e){t.updateOrder()}}},[t._v("Save")])],1)],1):t._e()],1)],1),t._v(" "),r("el-row",{attrs:{gutter:20}},[r("el-col",{staticStyle:{"margin-bottom":"50px"},attrs:{md:24,lg:12}},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[t._v("Shipping Address "),t.order.use_billing_for_shipping?r("el-tag",{attrs:{size:"mini"}},[t._v("Using Billing")]):t._e()],1),t._v(" "),r("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:function(e){t.edit_shipping=!t.edit_shipping}}},[t._v(t._s(t.edit_shipping?"Cancel":"Edit"))])],1),t._v(" "),t._l(t.order.shipping_address,function(e,o){return t.edit_shipping?t._e():r("div",{key:e,staticClass:"text item"},[r("strong",[t._v(t._s(o)+":")]),t._v(" "+t._s(e)+"\n              ")])}),t._v(" "),t.edit_shipping?r("el-form",{ref:"editShippingForm",attrs:{model:t.order,"label-width":"120px",size:"mini"}},[r("el-form-item",{attrs:{label:"Use Billing Address",prop:"use_billing_for_shipping"}},[r("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.order.use_billing_for_shipping,callback:function(e){t.$set(t.order,"use_billing_for_shipping",e)},expression:"order.use_billing_for_shipping"}})],1),t._v(" "),t._l(t.order.shipping_address,function(e,o){return r("el-form-item",{key:e,attrs:{label:o,prop:t.order[o]}},[r("el-input",{attrs:{disabled:t.order.use_billing_for_shipping,autofocus:!0},model:{value:t.order.shipping_address[o],callback:function(e){t.$set(t.order.shipping_address,o,e)},expression:"order.shipping_address[key]"}})],1)}),t._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:function(e){t.updateOrder()}}},[t._v("Save")])],1)],2):t._e()],2)],1),t._v(" "),r("el-col",{staticStyle:{"margin-bottom":"50px"},attrs:{md:24,lg:12}},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[t._v("Billing Address")]),t._v(" "),r("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:function(e){t.edit_billing=!t.edit_billing}}},[t._v(t._s(t.edit_billing?"Cancel":"Edit"))])],1),t._v(" "),t._l(t.order.billing_address,function(e,o){return t.edit_billing?t._e():r("div",{key:e,staticClass:"text item"},[r("strong",[t._v(t._s(o)+":")]),t._v(" "+t._s(e)+"\n              ")])}),t._v(" "),t.edit_billing?r("el-form",{ref:"editShippingForm",attrs:{model:t.order.billing_address,"label-width":"120px",size:"mini"}},[t._l(t.order.billing_address,function(e,o){return r("el-form-item",{key:e,attrs:{label:o,prop:o}},[r("el-input",{attrs:{autofocus:!0},model:{value:t.order.billing_address[o],callback:function(e){t.$set(t.order.billing_address,o,e)},expression:"order.billing_address[key]"}})],1)}),t._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:function(e){t.updateOrder()}}},[t._v("Save")])],1)],2):t._e()],2)],1)],1),t._v(" "),r("el-row",{staticStyle:{"margin-bottom":"50px"},attrs:{gutter:20}},[r("el-col",{attrs:{span:24}},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("span",[t._v("Customer Information")]),t._v(" "),r("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"}},[t._v("Edit")])],1),t._v(" "),t.order.customer?r("div",{staticClass:"text item"},[r("strong",[t._v("Name:")]),t._v(" "+t._s(t.order.customer.full_name)+"\n              ")]):t._e(),t._v(" "),t.order.customer?r("div",{staticClass:"text item"},[r("strong",[t._v("Email:")]),t._v(" "+t._s(t.order.customer.email)+"\n              ")]):t._e(),t._v(" "),t.order.customer?r("div",{staticClass:"text item"},[r("strong",[t._v("Phone:")]),t._v(" "+t._s(t.order.customer.phone)+"\n              ")]):t._e()])],1)],1),t._v(" "),t.order.items?r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:24}},[r("el-card",{staticClass:"box-card"},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.order.items}},[r("el-table-column",{attrs:{prop:"name",label:"Product"}}),t._v(" "),r("el-table-column",{attrs:{prop:"price",formatter:function(e,r,o){return t.order.cart.currency+e.price},label:"Price"}}),t._v(" "),r("el-table-column",{attrs:{prop:"qty",label:"Quantity"}}),t._v(" "),r("el-table-column",{attrs:{prop:"subtotal",formatter:function(e,r,o){return t.order.cart.currency+e.subtotal},label:"Total"}})],1),t._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.orderTotals}},[r("el-table-column"),t._v(" "),r("el-table-column"),t._v(" "),r("el-table-column",{attrs:{prop:"total",label:""}}),t._v(" "),r("el-table-column",{attrs:{prop:"value",label:""}})],1)],1)],1)],1):t._e(),t._v(" "),r("el-popover",{ref:"deleteOrderPop",attrs:{placement:"top",width:"160"}},[r("p",[t._v("Delete Order?")]),t._v(" "),r("div",{staticStyle:{"text-align":"right",margin:"0"}},[r("el-button",{attrs:{type:"primary",size:"mini",plain:""},on:{click:function(e){t.$refs.deleteOrderPop.doClose()}}},[t._v("cancel")]),t._v(" "),r("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(e){t.deleteOrder()}}},[t._v("confirm")])],1)]),t._v(" "),r("el-button",{directives:[{name:"popover",rawName:"v-popover:deleteOrderPop",arg:"deleteOrderPop"}],staticStyle:{"margin-top":"40px"},attrs:{size:"small",plain:"",type:"danger"}},[t._v("Delete")])],1)},o=[];t.exports={render:r,staticRenderFns:o}},NmxS:function(t,e,r){e=t.exports=r("FZ+f")(void 0),e.push([t.i,"",""])},PASv:function(t,e,r){var o=r("MIBT");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);r("rjj0")("40a6a64c",o,!0)},QYUN:function(t,e){var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[r("el-breadcrumb",{staticClass:"breadcrumbs",attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{name:"orders"}}},[t._v("Orders")]),t._v(" "),r("el-breadcrumb-item",[t._v("New Order")]),t._v(" "),r("el-breadcrumb-item",[t._v("Step 1")])],1),t._v(" "),r("el-row",{attrs:{align:"middle",type:"flex"}},[r("el-col",{attrs:{span:12}},[r("h1",{staticClass:"page_title"},[t._v("New Order "),t.order.first_name&&t.order.last_name?r("span",[t._v(" - "+t._s(t.order.first_name+" "+t.order.last_name))]):t._e()]),t._v(" "),r("el-button",{attrs:{type:"danger",plain:"",size:"mini"},on:{click:t.resetOrder}},[t._v("Reset Order")])],1)],1),t._v(" "),r("hr",{staticClass:"page_hr"}),t._v(" "),Object.keys(t.orderErrors).length>0?r("errors",{attrs:{errors:t.orderErrors}}):t._e(),t._v(" "),r("el-form",{ref:"orderForm",attrs:{rules:t.formRules,"label-position":"top",model:t.order},nativeOn:{submit:function(t){t.preventDefault()}}},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:12}},[r("h5",[t._v("Customer Information")])])],1),t._v(" "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:{span:16,offset:4}}},[r("el-form-item",{attrs:{label:"Customer Company",size:"small",prop:"customer.company"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.order.customer.company,callback:function(e){t.$set(t.order.customer,"company",e)},expression:"order.customer.company"}})],1)],1)],1),t._v(" "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:{span:8,offset:4}}},[r("el-form-item",{attrs:{label:"Customer First Name",size:"small",prop:"customer.first_name"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.order.customer.first_name,callback:function(e){t.$set(t.order.customer,"first_name",e)},expression:"order.customer.first_name"}})],1)],1),t._v(" "),r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Customer Last Name",size:"small",prop:"customer.last_name"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.order.customer.last_name,callback:function(e){t.$set(t.order.customer,"last_name",e)},expression:"order.customer.last_name"}})],1)],1)],1),t._v(" "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:{span:8,offset:4}}},[r("el-form-item",{attrs:{label:"Customer Phone",size:"small",prop:"customer.phone"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.order.customer.phone,callback:function(e){t.$set(t.order.customer,"phone",e)},expression:"order.customer.phone"}})],1)],1),t._v(" "),r("el-col",{attrs:{md:8}},[r("el-form-item",{attrs:{label:"Customer Email",size:"small",prop:"customer.email"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.order.customer.email,callback:function(e){t.$set(t.order.customer,"email",e)},expression:"order.customer.email"}})],1)],1)],1),t._v(" "),r("hr"),t._v(" "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:12}},[r("h5",[t._v("Billing Adress")])])],1),t._v(" "),r("address-form",{attrs:{form:t.order.billing_address,prop:"billing_address"}}),t._v(" "),r("hr"),t._v(" "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:12}},[r("h5",[t._v("Shipping Adress")])])],1),t._v(" "),r("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:20}},[r("el-col",{attrs:{md:{span:20,offset:4}}},[r("el-checkbox",{model:{value:t.order.use_billing_for_shipping,callback:function(e){t.$set(t.order,"use_billing_for_shipping",e)},expression:"order.use_billing_for_shipping"}},[t._v("Same As Billing Address")])],1)],1),t._v(" "),t.order.use_billing_for_shipping?t._e():r("address-form",{attrs:{form:t.order.shipping_address}}),t._v(" "),r("el-row",{staticStyle:{"margin-top":"40px"},attrs:{gutter:20}},[r("el-col",{attrs:{md:{span:24}}},[t.order.id?r("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.processSubmit("orderForm",!1)}}},[t._v("Save Changes")]):t._e(),t._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.processSubmit("orderForm",!0)}}},[t._v("Choose Products")])],1)],1)],1)],1)},o=[];t.exports={render:r,staticRenderFns:o}},U86w:function(t,e,r){var o=r("q1Ls");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);r("rjj0")("3a7c034a",o,!0)},Vhmr:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},n=r("GzQy"),a=function(t){return t&&t.__esModule?t:{default:t}}(n),s=r("NYxO");e.default={name:"orderStepThree",components:{CardPaymentForm:function(){return r.e(35).then(r.bind(null,"sAw/"))},Errors:function(){return r.e(20).then(r.bind(null,"DqGP"))}},props:{},data:function(){return{loading:!1,orderErrors:{}}},computed:o({},(0,s.mapGetters)(["order"])),watch:{order:{handler:function(t){this.$store.commit("SET_ORDER",t)},deep:!0}},mounted:function(){this.order.id||this.$router.push({name:"orders.step1"})},methods:{processSubmit:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return!1;e.loading=!0,e.$refs.paymentForm.createToken()})},onTokenCreation:function(t,e,r){!t&&this.order.id&&a.default.persist("post",{path:"orders/"+this.order.id+"/payment",object:this.order}).then(function(t){this.loading=!1,this.$router.push({name:"orders.view",params:{orderId:this.order.id}})}.bind(this)).catch(function(t){this.loading=!1}.bind(this))}}}},drDl:function(t,e,r){function o(t){r("PASv")}var n=r("VU/8"),a=r("FubQ"),s=r("lGIi"),i=o,l=n(a,s,!1,i,null,null);t.exports=l.exports},dzSQ:function(t,e){function r(t){var e=t?t.length:0;return e?t[e-1]:void 0}t.exports=r},etT0:function(t,e,r){(function(t,r){function o(t,e){for(var r=-1,o=t?t.length:0;++r<o;)if(e(t[r],r,t))return!0;return!1}function n(t,e,r,o){for(var n=t.length,a=r+(o?1:-1);o?a--:++a<n;)if(e(t[a],a,t))return a;return-1}function a(t){return function(e){return null==e?void 0:e[t]}}function s(t,e){for(var r=-1,o=Array(t);++r<t;)o[r]=e(r);return o}function i(t,e){return null==t?void 0:t[e]}function l(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}function d(t){var e=-1,r=Array(t.size);return t.forEach(function(t,o){r[++e]=[o,t]}),r}function u(t){var e=-1,r=Array(t.size);return t.forEach(function(t){r[++e]=t}),r}function c(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var o=t[e];this.set(o[0],o[1])}}function p(){this.__data__=Ke?Ke(null):{}}function m(t){return this.has(t)&&delete this.__data__[t]}function f(t){var e=this.__data__;if(Ke){var r=e[t];return r===qt?void 0:r}return Re.call(e,t)?e[t]:void 0}function _(t){var e=this.__data__;return Ke?void 0!==e[t]:Re.call(e,t)}function h(t,e){return this.__data__[t]=Ke&&void 0===e?qt:e,this}function v(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var o=t[e];this.set(o[0],o[1])}}function b(){this.__data__=[]}function g(t){var e=this.__data__,r=q(e,t);return!(r<0)&&(r==e.length-1?e.pop():Be.call(e,r,1),!0)}function y(t){var e=this.__data__,r=q(e,t);return r<0?void 0:e[r][1]}function w(t){return q(this.__data__,t)>-1}function x(t,e){var r=this.__data__,o=q(r,t);return o<0?r.push([t,e]):r[o][1]=e,this}function C(t){var e=-1,r=t?t.length:0;for(this.clear();++e<r;){var o=t[e];this.set(o[0],o[1])}}function F(){this.__data__={hash:new c,map:new(Ye||v),string:new c}}function P(t){return nt(this,t).delete(t)}function k(t){return nt(this,t).get(t)}function S(t){return nt(this,t).has(t)}function O(t,e){return nt(this,t).set(t,e),this}function j(t){var e=-1,r=t?t.length:0;for(this.__data__=new C;++e<r;)this.add(t[e])}function $(t){return this.__data__.set(t,qt),this}function A(t){return this.__data__.has(t)}function E(t){this.__data__=new v(t)}function T(){this.__data__=new v}function I(t){return this.__data__.delete(t)}function N(t){return this.__data__.get(t)}function z(t){return this.__data__.has(t)}function R(t,e){var r=this.__data__;if(r instanceof v){var o=r.__data__;if(!Ye||o.length<Rt-1)return o.push([t,e]),this;r=this.__data__=new C(o)}return r.set(t,e),this}function D(t,e){var r=lr(t)||yt(t)?s(t.length,String):[],o=r.length,n=!!o;for(var a in t)!e&&!Re.call(t,a)||n&&("length"==a||lt(a,o))||r.push(a);return r}function q(t,e){for(var r=t.length;r--;)if(gt(t[r][0],e))return r;return-1}function M(t,e){e=dt(e,t)?[e]:tt(e);for(var r=0,o=e.length;null!=t&&r<o;)t=t[_t(e[r++])];return r&&r==o?t:void 0}function L(t){return De.call(t)}function U(t,e){return null!=t&&e in Object(t)}function B(t,e,r,o,n){return t===e||(null==t||null==e||!Pt(t)&&!kt(e)?t!==t&&e!==e:G(t,e,B,r,o,n))}function G(t,e,r,o,n,a){var s=lr(t),i=lr(e),d=Yt,u=Yt;s||(d=sr(t),d=d==Vt?ee:d),i||(u=sr(e),u=u==Vt?ee:u);var c=d==ee&&!l(t),p=u==ee&&!l(e),m=d==u;if(m&&!c)return a||(a=new E),s||dr(t)?et(t,e,r,o,n,a):rt(t,e,d,r,o,n,a);if(!(n&Lt)){var f=c&&Re.call(t,"__wrapped__"),_=p&&Re.call(e,"__wrapped__");if(f||_){var h=f?t.value():t,v=_?e.value():e;return a||(a=new E),r(h,v,o,n,a)}}return!!m&&(a||(a=new E),ot(t,e,r,o,n,a))}function Q(t,e,r,o){var n=r.length,a=n,s=!o;if(null==t)return!a;for(t=Object(t);n--;){var i=r[n];if(s&&i[2]?i[1]!==t[i[0]]:!(i[0]in t))return!1}for(;++n<a;){i=r[n];var l=i[0],d=t[l],u=i[1];if(s&&i[2]){if(void 0===d&&!(l in t))return!1}else{var c=new E;if(o)var p=o(d,u,l,t,e,c);if(!(void 0===p?B(u,d,o,Mt|Lt,c):p))return!1}}return!0}function V(t){return!(!Pt(t)||ct(t))&&(Ct(t)||l(t)?qe:ve).test(ht(t))}function Y(t){return kt(t)&&Ft(t.length)&&!!ye[De.call(t)]}function H(t){return"function"==typeof t?t:null==t?Nt:"object"==typeof t?lr(t)?K(t[0],t[1]):J(t):zt(t)}function Z(t){if(!pt(t))return Ge(t);var e=[];for(var r in Object(t))Re.call(t,r)&&"constructor"!=r&&e.push(r);return e}function J(t){var e=at(t);return 1==e.length&&e[0][2]?ft(e[0][0],e[0][1]):function(r){return r===t||Q(r,t,e)}}function K(t,e){return dt(t)&&mt(e)?ft(_t(t),e):function(r){var o=Et(r,t);return void 0===o&&o===e?Tt(r,t):B(e,o,void 0,Mt|Lt)}}function W(t){return function(e){return M(e,t)}}function X(t){if("string"==typeof t)return t;if(St(t))return ar?ar.call(t):"";var e=t+"";return"0"==e&&1/t==-Ut?"-0":e}function tt(t){return lr(t)?t:ir(t)}function et(t,e,r,n,a,s){var i=a&Lt,l=t.length,d=e.length;if(l!=d&&!(i&&d>l))return!1;var u=s.get(t);if(u&&s.get(e))return u==e;var c=-1,p=!0,m=a&Mt?new j:void 0;for(s.set(t,e),s.set(e,t);++c<l;){var f=t[c],_=e[c];if(n)var h=i?n(_,f,c,e,t,s):n(f,_,c,t,e,s);if(void 0!==h){if(h)continue;p=!1;break}if(m){if(!o(e,function(t,e){if(!m.has(e)&&(f===t||r(f,t,n,a,s)))return m.add(e)})){p=!1;break}}else if(f!==_&&!r(f,_,n,a,s)){p=!1;break}}return s.delete(t),s.delete(e),p}function rt(t,e,r,o,n,a,s){switch(r){case ie:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case se:return!(t.byteLength!=e.byteLength||!o(new Le(t),new Le(e)));case Ht:case Zt:case te:return gt(+t,+e);case Jt:return t.name==e.name&&t.message==e.message;case re:case ne:return t==e+"";case Xt:var i=d;case oe:var l=a&Lt;if(i||(i=u),t.size!=e.size&&!l)return!1;var c=s.get(t);if(c)return c==e;a|=Mt,s.set(t,e);var p=et(i(t),i(e),o,n,a,s);return s.delete(t),p;case ae:if(nr)return nr.call(t)==nr.call(e)}return!1}function ot(t,e,r,o,n,a){var s=n&Lt,i=It(t),l=i.length;if(l!=It(e).length&&!s)return!1;for(var d=l;d--;){var u=i[d];if(!(s?u in e:Re.call(e,u)))return!1}var c=a.get(t);if(c&&a.get(e))return c==e;var p=!0;a.set(t,e),a.set(e,t);for(var m=s;++d<l;){u=i[d];var f=t[u],_=e[u];if(o)var h=s?o(_,f,u,e,t,a):o(f,_,u,t,e,a);if(!(void 0===h?f===_||r(f,_,o,n,a):h)){p=!1;break}m||(m="constructor"==u)}if(p&&!m){var v=t.constructor,b=e.constructor;v!=b&&"constructor"in t&&"constructor"in e&&!("function"==typeof v&&v instanceof v&&"function"==typeof b&&b instanceof b)&&(p=!1)}return a.delete(t),a.delete(e),p}function nt(t,e){var r=t.__data__;return ut(e)?r["string"==typeof e?"string":"hash"]:r.map}function at(t){for(var e=It(t),r=e.length;r--;){var o=e[r],n=t[o];e[r]=[o,n,mt(n)]}return e}function st(t,e){var r=i(t,e);return V(r)?r:void 0}function it(t,e,r){e=dt(e,t)?[e]:tt(e);for(var o,n=-1,a=e.length;++n<a;){var s=_t(e[n]);if(!(o=null!=t&&r(t,s)))break;t=t[s]}if(o)return o;var a=t?t.length:0;return!!a&&Ft(a)&&lt(s,a)&&(lr(t)||yt(t))}function lt(t,e){return!!(e=null==e?Bt:e)&&("number"==typeof t||ge.test(t))&&t>-1&&t%1==0&&t<e}function dt(t,e){if(lr(t))return!1;var r=typeof t;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=t&&!St(t))||(de.test(t)||!le.test(t)||null!=e&&t in Object(e))}function ut(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}function ct(t){return!!Ne&&Ne in t}function pt(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||Te)}function mt(t){return t===t&&!Pt(t)}function ft(t,e){return function(r){return null!=r&&(r[t]===e&&(void 0!==e||t in Object(r)))}}function _t(t){if("string"==typeof t||St(t))return t;var e=t+"";return"0"==e&&1/t==-Ut?"-0":e}function ht(t){if(null!=t){try{return ze.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function vt(t,e,r){var o=t?t.length:0;if(!o)return-1;var a=null==r?0:jt(r);return a<0&&(a=Qe(o+a,0)),n(t,H(e,3),a)}function bt(t,e){if("function"!=typeof t||e&&"function"!=typeof e)throw new TypeError(Dt);var r=function(){var o=arguments,n=e?e.apply(this,o):o[0],a=r.cache;if(a.has(n))return a.get(n);var s=t.apply(this,o);return r.cache=a.set(n,s),s};return r.cache=new(bt.Cache||C),r}function gt(t,e){return t===e||t!==t&&e!==e}function yt(t){return xt(t)&&Re.call(t,"callee")&&(!Ue.call(t,"callee")||De.call(t)==Vt)}function wt(t){return null!=t&&Ft(t.length)&&!Ct(t)}function xt(t){return kt(t)&&wt(t)}function Ct(t){var e=Pt(t)?De.call(t):"";return e==Kt||e==Wt}function Ft(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=Bt}function Pt(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function kt(t){return!!t&&"object"==typeof t}function St(t){return"symbol"==typeof t||kt(t)&&De.call(t)==ae}function Ot(t){if(!t)return 0===t?t:0;if((t=$t(t))===Ut||t===-Ut){return(t<0?-1:1)*Gt}return t===t?t:0}function jt(t){var e=Ot(t),r=e%1;return e===e?r?e-r:e:0}function $t(t){if("number"==typeof t)return t;if(St(t))return Qt;if(Pt(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=Pt(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(me,"");var r=he.test(t);return r||be.test(t)?we(t.slice(2),r?2:8):_e.test(t)?Qt:+t}function At(t){return null==t?"":X(t)}function Et(t,e,r){var o=null==t?void 0:M(t,e);return void 0===o?r:o}function Tt(t,e){return null!=t&&it(t,e,U)}function It(t){return wt(t)?D(t):Z(t)}function Nt(t){return t}function zt(t){return dt(t)?a(_t(t)):W(t)}var Rt=200,Dt="Expected a function",qt="__lodash_hash_undefined__",Mt=1,Lt=2,Ut=1/0,Bt=9007199254740991,Gt=1.7976931348623157e308,Qt=NaN,Vt="[object Arguments]",Yt="[object Array]",Ht="[object Boolean]",Zt="[object Date]",Jt="[object Error]",Kt="[object Function]",Wt="[object GeneratorFunction]",Xt="[object Map]",te="[object Number]",ee="[object Object]",re="[object RegExp]",oe="[object Set]",ne="[object String]",ae="[object Symbol]",se="[object ArrayBuffer]",ie="[object DataView]",le=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,de=/^\w*$/,ue=/^\./,ce=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,pe=/[\\^$.*+?()[\]{}|]/g,me=/^\s+|\s+$/g,fe=/\\(\\)?/g,_e=/^[-+]0x[0-9a-f]+$/i,he=/^0b[01]+$/i,ve=/^\[object .+?Constructor\]$/,be=/^0o[0-7]+$/i,ge=/^(?:0|[1-9]\d*)$/,ye={};ye["[object Float32Array]"]=ye["[object Float64Array]"]=ye["[object Int8Array]"]=ye["[object Int16Array]"]=ye["[object Int32Array]"]=ye["[object Uint8Array]"]=ye["[object Uint8ClampedArray]"]=ye["[object Uint16Array]"]=ye["[object Uint32Array]"]=!0,ye[Vt]=ye[Yt]=ye[se]=ye[Ht]=ye[ie]=ye[Zt]=ye[Jt]=ye[Kt]=ye[Xt]=ye[te]=ye[ee]=ye[re]=ye[oe]=ye[ne]=ye["[object WeakMap]"]=!1;var we=parseInt,xe="object"==typeof t&&t&&t.Object===Object&&t,Ce="object"==typeof self&&self&&self.Object===Object&&self,Fe=xe||Ce||Function("return this")(),Pe="object"==typeof e&&e&&!e.nodeType&&e,ke=Pe&&"object"==typeof r&&r&&!r.nodeType&&r,Se=ke&&ke.exports===Pe,Oe=Se&&xe.process,je=function(){try{return Oe&&Oe.binding("util")}catch(t){}}(),$e=je&&je.isTypedArray,Ae=Array.prototype,Ee=Function.prototype,Te=Object.prototype,Ie=Fe["__core-js_shared__"],Ne=function(){var t=/[^.]+$/.exec(Ie&&Ie.keys&&Ie.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),ze=Ee.toString,Re=Te.hasOwnProperty,De=Te.toString,qe=RegExp("^"+ze.call(Re).replace(pe,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Me=Fe.Symbol,Le=Fe.Uint8Array,Ue=Te.propertyIsEnumerable,Be=Ae.splice,Ge=function(t,e){return function(r){return t(e(r))}}(Object.keys,Object),Qe=Math.max,Ve=st(Fe,"DataView"),Ye=st(Fe,"Map"),He=st(Fe,"Promise"),Ze=st(Fe,"Set"),Je=st(Fe,"WeakMap"),Ke=st(Object,"create"),We=ht(Ve),Xe=ht(Ye),tr=ht(He),er=ht(Ze),rr=ht(Je),or=Me?Me.prototype:void 0,nr=or?or.valueOf:void 0,ar=or?or.toString:void 0;c.prototype.clear=p,c.prototype.delete=m,c.prototype.get=f,c.prototype.has=_,c.prototype.set=h,v.prototype.clear=b,v.prototype.delete=g,v.prototype.get=y,v.prototype.has=w,v.prototype.set=x,C.prototype.clear=F,C.prototype.delete=P,C.prototype.get=k,C.prototype.has=S,C.prototype.set=O,j.prototype.add=j.prototype.push=$,j.prototype.has=A,E.prototype.clear=T,E.prototype.delete=I,E.prototype.get=N,E.prototype.has=z,E.prototype.set=R;var sr=L;(Ve&&sr(new Ve(new ArrayBuffer(1)))!=ie||Ye&&sr(new Ye)!=Xt||He&&"[object Promise]"!=sr(He.resolve())||Ze&&sr(new Ze)!=oe||Je&&"[object WeakMap]"!=sr(new Je))&&(sr=function(t){var e=De.call(t),r=e==ee?t.constructor:void 0,o=r?ht(r):void 0;if(o)switch(o){case We:return ie;case Xe:return Xt;case tr:return"[object Promise]";case er:return oe;case rr:return"[object WeakMap]"}return e});var ir=bt(function(t){t=At(t);var e=[];return ue.test(t)&&e.push(""),t.replace(ce,function(t,r,o,n){e.push(o?n.replace(fe,"$1"):r||t)}),e});bt.Cache=C;var lr=Array.isArray,dr=$e?function(t){return function(e){return t(e)}}($e):Y;r.exports=vt}).call(e,r("DuR2"),r("3IRH")(t))},hkaY:function(t,e,r){function o(t){r("NKYa")}var n=r("VU/8"),a=r("sLQm"),s=r("NdxR"),i=o,l=n(a,s,!1,i,null,null);t.exports=l.exports},lGIi:function(t,e){var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[r("el-breadcrumb",{staticClass:"breadcrumbs",attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:{name:"orders"}}},[t._v("Orders")]),t._v(" "),r("el-breadcrumb-item",[t._v("New Order")]),t._v(" "),r("el-breadcrumb-item",{attrs:{to:{name:"orders.step1"}}},[t._v("Step 1")]),t._v(" "),r("el-breadcrumb-item",[t._v("Step 2")])],1),t._v(" "),r("el-row",{attrs:{align:"middle",type:"flex"}},[r("el-col",{attrs:{span:12}},[r("h1",{staticClass:"page_title"},[t._v("New Order "),t.order.id?r("span",[t._v(" - #"+t._s(t.order.id))]):t._e()])])],1),t._v(" "),t.order.items?r("el-row",{staticStyle:{"margin-top":"20px","margin-bottom":"20px"},attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.handleAddProductBtnClick}},[t._v("Add Product(s)")])],1),t._v(" "),r("el-form",{attrs:{model:t.order}},[r("el-col",{attrs:{span:12}},[r("el-form-item",{attrs:{label:"Shipping Rate"}},[r("el-select",{attrs:{size:"mini"},model:{value:t.order.shipping_rate,callback:function(e){t.$set(t.order,"shipping_rate",e)},expression:"order.shipping_rate"}},t._l(t.shippingRange,function(t){return r("el-option",{key:t,attrs:{value:t}})}))],1)],1)],1)],1):t._e(),t._v(" "),t.order.items?r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:24}},[r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.order.items}},[r("el-table-column",{attrs:{prop:"name",label:"Product",formatter:t.itemRowNameFormatter}}),t._v(" "),r("el-table-column",{attrs:{prop:"price",formatter:function(e,r,o){return t.shopData.currency+(t.formattedPrice(e)?t.formattedPrice(e)["Base Price"]:0)},label:"Price"}}),t._v(" "),r("el-table-column",{attrs:{prop:"qty",formatter:function(t,e,r){return t.quantity?t.quantity:1},label:"Quantity"}}),t._v(" "),r("el-table-column",{attrs:{prop:"subtotal",formatter:function(e,r,o){return t.shopData.currency+(t.formattedPrice(e)?t.formattedPrice(e)["Sub-Total"]:0)},label:"Sub-Total"}}),t._v(" "),r("el-table-column",{attrs:{prop:"total",formatter:function(e,r,o){return t.shopData.currency+(t.formattedPrice(e)?t.formattedPrice(e).Extras:0)},label:"Extras"}}),t._v(" "),r("el-table-column",{attrs:{prop:"total",formatter:function(e,r,o){return t.shopData.currency+(t.formattedPrice(e)?t.formattedPrice(e).Total:0)},label:"Total"}}),t._v(" "),r("el-table-column",{attrs:{label:"Actions"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{staticClass:"action_btn",attrs:{size:"mini",plain:"",type:"primary"},on:{click:function(r){t.editRow(e.$index,e.row)}}},[t._v("Edit\n                        ")]),t._v(" "),r("el-button",{staticClass:"action_btn delete_btn",attrs:{size:"mini",type:"danger"},on:{click:function(r){t.deleteRow(e.$index,e.row)}}},[t._v("Delete\n                        ")])]}}])})],1),t._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.orderTotals}},[r("el-table-column"),t._v(" "),r("el-table-column"),t._v(" "),r("el-table-column"),t._v(" "),r("el-table-column"),t._v(" "),r("el-table-column"),t._v(" "),r("el-table-column",{attrs:{prop:"total",label:""}}),t._v(" "),r("el-table-column",{attrs:{prop:"value",label:"",formatter:function(e,r,o){return t.shopData.currency+o}}})],1)],1)],1):t._e(),t._v(" "),r("el-dialog",{attrs:{title:(t.addProductForm.edit?"Edit":"Add")+" Product","close-on-click-modal":!1,"before-close":t.closeAndClearModal,visible:t.showProductModal,width:"70%"},on:{"update:visible":function(e){t.showProductModal=e}}},[r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[Object.keys(t.productAddErrors).length>0?r("errors",{attrs:{errors:t.productAddErrors}}):t._e(),t._v(" "),r("el-form",{ref:"addProductForm",attrs:{"label-position":"top",model:t.addProductForm},nativeOn:{submit:function(t){t.preventDefault()}}},[t.addProductForm.edit?t._e():r("div",{staticClass:"form_option_section"},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:12}},[r("h5",[t._v("Product Type")])])],1),t._v(" "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:{span:16,offset:4}}},[r("el-form-item",{attrs:{label:"Choose Product",size:"small",prop:"product"}},[r("el-cascader",{staticStyle:{width:"100%"},attrs:{options:t.products,props:t.productProps},on:{change:t.handleProductChange,"active-item-change":t.requestProductVariants}})],1)],1)],1)],1),t._v(" "),t.addProductForm.product.options&&t.addProductForm.product.order_form?[t._l(t.addProductForm.product.order_form.sections.data,function(e){return t.addProductForm.product.order_form.sections?[e.fields?[e.fields.data.length>0?r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:12}},[r("h5",[t._v(t._s(e.name))])])],1):t._e(),t._v(" "),e.fields.data.length>0?r("div",{staticClass:"form_option_section"},t._l(e.fields.data,function(e){return r("el-row",{key:e.id,attrs:{gutter:20}},[r("el-col",{attrs:{md:{span:16,offset:4}}},[r("el-form-item",{attrs:{label:e.name,size:"small",prop:"product.options["+e.name+"]"}},["text"===e.type?r("el-input",{model:{value:t.addProductForm.product.options[e.name],callback:function(r){t.$set(t.addProductForm.product.options,e.name,r)},expression:"addProductForm.product.options[field.name]"}}):t._e(),t._v(" "),"select"===e.type?r("el-select",{model:{value:t.addProductForm.product.options[e.name],callback:function(r){t.$set(t.addProductForm.product.options,e.name,r)},expression:"addProductForm.product.options[field.name]"}},t._l(e.options,function(e){return r("el-option",{key:e.id,attrs:{value:e,label:t.optionLabel(e)}})})):t._e()],1)],1)],1)})):t._e()]:t._e()]:t._e()})]:t._e(),t._v(" "),t.addProductForm.product.id?r("div",{staticClass:"form_option_section"},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:12}},[r("h5",[t._v("Quantity")])])],1),t._v(" "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:{span:16,offset:4}}},[r("el-form-item",{attrs:{label:"Quantity",size:"small",prop:"product.quantity"}},[r("el-select",{model:{value:t.addProductForm.product.quantity,callback:function(e){t.$set(t.addProductForm.product,"quantity",e)},expression:"addProductForm.product.quantity"}},t._l(t.quantityRange,function(t){return r("el-option",{key:t,attrs:{value:t}})}))],1)],1)],1)],1):t._e(),t._v(" "),t.addProductForm.product.id?r("div",{staticClass:"form_option_section"},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:12}},[r("h5",[t._v("Price")])])],1),t._v(" "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:{span:16,offset:4}}},t._l(t.formattedPrice(t.addProductForm.product),function(e,o){return r("p",[r("strong",[t._v(t._s(o)+":")]),t._v(" "+t._s(t.shopData.currency)+t._s(e))])}))],1)],1):t._e()],2),t._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.closeAndClearModal(null)}}},[t._v(t._s(t.addProductForm.edit?"Discard Changes":"Cancel"))]),t._v(" "),t.addProductForm.edit?t._e():r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.addProductToTable()}}},[t._v("Add Product")]),t._v(" "),t.addProductForm.edit?r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.editProductOnTable()}}},[t._v("Save Changes")]):t._e()],1)],1)]),t._v(" "),r("el-row",{staticStyle:{"margin-top":"40px"},attrs:{gutter:20}},[r("el-col",{attrs:{md:{span:24}}},[r("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.processSubmit(!1)}}},[t._v("Save Changes")]),t._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.processSubmit()}}},[t._v("Process Payment")])],1)],1)],1)},o=[];t.exports={render:r,staticRenderFns:o}},q1Ls:function(t,e,r){e=t.exports=r("FZ+f")(void 0),e.push([t.i,"",""])},sLQm:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},n=r("GzQy"),a=function(t){return t&&t.__esModule?t:{default:t}}(n),s=r("NYxO"),i=r("P/uL");e.default={name:"ViewOrder",components:{Errors:function(){return r.e(20).then(r.bind(null,"DqGP"))}},props:{orderId:{type:String,required:!0}},data:function(){return{orderErrors:{},loading:!1,order:{},shopData:{},edit_billing:!1,edit_shipping:!1,shippingForm:{},invoiceLoaded:!1,orderStatuses:{},printUrl:null}},computed:{orderAmount:function(){return this.shopData.currency+this.order.amount/100},orderTotals:function(){var t=[];return i(this.order.cart.totals,function(e,r){t.push({total:r,value:this.order.cart.currency+e})}.bind(this)),t}},watch:{},mounted:function(){this.getOrder()},methods:o({},(0,s.mapActions)(["setShopData"]),{getOrder:function(){this.orderErrors={},this.loading=!0,a.default.get({path:"orders/"+this.orderId,params:{}}).then(function(t){this.loading=!1,this.order=t.data,this.orderStatuses=t.statuses,this.shopData=t.shop_data,this.setShopData(t.shop_data)}.bind(this)).catch(function(t){this.loading=!1,this.orderErrors=t}.bind(this))},updateOrder:function(){this.orderErrors={},this.loading=!0,a.default.persist("put",{path:"orders/"+this.orderId,object:this.order}).then(function(t){this.loading=!1,this.order=t.data,this.shopData=t.shop_data,this.orderStatuses=t.statuses,this.setShopData(t.shop_data),this.edit_billing=!1,this.edit_shipping=!1}.bind(this)).catch(function(t){this.loading=!1,this.orderErrors=t}.bind(this))},deleteOrder:function(){this.loading=!0,a.default.delete({path:"orders/"+this.order.id}).then(function(){this.loading=!1,this.$message({message:"Successfully deleted order",type:"success",showClose:!0}),this.$router.push({name:"orders"})}.bind(this)).catch(function(){this.loading=!1}.bind(this))},preparePrint:function(){this.printUrl=this.shopData.url+"/ecommerce-templates/invoice?reports="+this.order.id},printInvoice:function(){navigator.userAgent.match(/opera/i)||navigator.userAgent.match(/trident/i)||navigator.userAgent.match(/msie/i)&&window.addEventListener?window.open(this.printUrl,"_blank"):(frames.printLinkIframe.focus(),frames.printLinkIframe.print()),this.printUrl=null}})}},vZP4:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r("GzQy"),n=function(t){return t&&t.__esModule?t:{default:t}}(o),a=r("P/uL");e.default={name:"Orders",components:{DataTable:function(){return r.e(25).then(r.bind(null,"bnM4"))}},props:[],data:function(){var t=this.$createElement;return{loading:!1,products:{},invoiceLoaded:!1,printUrl:null,ordersCreateForm:{},createFormRules:{customer_first_name:[{required:!0,message:"The first name is required",trigger:"blur"},{min:3,max:200,message:"The first name length should be more than 3 characters",trigger:"blur"}],customer_last_name:[{required:!0,message:"The last name is required",trigger:"blur"},{min:3,max:200,message:"The last name length should be more than 3 characters",trigger:"blur"}],customer_email:[{required:!0,message:"The email is required",trigger:"blur"},{min:3,max:200,message:"The email length should be more than 3 characters",trigger:"blur"}]},tableOptions:{border:!0,stripe:!0,showSearch:!0,showHeader:!0,showNewBtn:!0,showRefreshBtn:!0,showHeadHr:!0,showTitle:!0,viewText:"View",deleteText:"",collumns:[{prop:"id",sortable:!0,label:"ID",align:"left",resizable:!0},{prop:"name",sortable:!0,label:"Customer Name",formatter:function(t,e,r){return t.customer.full_name},align:"left",resizable:!0},{prop:"amount",sortable:!0,label:"Total",formatter:function(t,e,r){return t.cart.currency?t.cart.currency+t.cart.totals.Total:"-"},align:"left",resizable:!0},{prop:"created_at.human",sortable:!0,label:"Order Placed",align:"left",resizable:!0},{prop:"status",sortable:!0,label:"Status",formatter:function(e,r,o){var n="Completed"==e.status?"success":"Processing"==e.status?"danger":"info";return t("el-tag",{attrs:{type:n,size:"medium"}},[e.status])},align:"left",resizable:!0}],bulkOptions:[{value:"completed",label:"Mark Complete"},{value:"print",label:"Print Invoice(s)",action:function(t,e,r){var o=[];a(r,function(t,e){var r=0===e?"?":"&";o.push(r+"reports["+e+"]="+t.id)}.bind(this));var n=e.url+"/ecommerce-templates/invoice"+o.join("");this.printUrl=n}.bind(this)}]}}},computed:{},watch:{},mounted:function(){},methods:{print:function(){frames.printLinkIframe.focus(),frames.printLinkIframe.print(),this.printUrl=null},handleCreateNew:function(t){this.loading=!0,n.default.get({path:"products",params:{limit:"1000"}}).then(function(t){this.products=t.data,this.loading=!1}.bind(this)).catch(function(t){this.loading=!1}.bind(this))}}}},vbMC:function(t,e){var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[!t.loading&&t.printUrl?r("iframe",{staticStyle:{position:"absolute",top:"-9999px",left:"-9999px",border:"0px",overfow:"none","z-index":"-1"},attrs:{id:"printLinkIframe",name:"printLinkIframe",src:t.printUrl},on:{load:t.print}}):t._e(),t._v(" "),r("data-table",{attrs:{"type-name":"order","full-modal":!0,"table-options":t.tableOptions,"create-form":t.ordersCreateForm,"create-form-rules":t.createFormRules},on:{createNew:t.handleCreateNew},scopedSlots:t._u([{key:"createForm",fn:function(e){return[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Customer First Name",prop:"first_name"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.first_name,callback:function(e){t.$set(t.ordersCreateForm,"first_name",e)},expression:"ordersCreateForm.first_name"}})],1)],1),t._v(" "),r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Customer Last Name",prop:"last_name"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.last_name,callback:function(e){t.$set(t.ordersCreateForm,"last_name",e)},expression:"ordersCreateForm.last_name"}})],1)],1)],1),t._v(" "),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Customer Email",prop:"email"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.email,callback:function(e){t.$set(t.ordersCreateForm,"email",e)},expression:"ordersCreateForm.email"}})],1)],1),t._v(" "),r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Customer Phone",prop:"phone"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.phone,callback:function(e){t.$set(t.ordersCreateForm,"phone",e)},expression:"ordersCreateForm.phone"}})],1)],1)],1),t._v(" "),r("el-row",{staticStyle:{"margin-top":"50px"},attrs:{gutter:20}},[r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Billing Address Line 1",prop:"billing_address_line1"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.billing_address_line1,callback:function(e){t.$set(t.ordersCreateForm,"billing_address_line1",e)},expression:"ordersCreateForm.billing_address_line1"}})],1)],1),t._v(" "),r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Billing Address Line 2",prop:"billing_address_line2"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.billing_address_line2,callback:function(e){t.$set(t.ordersCreateForm,"billing_address_line2",e)},expression:"ordersCreateForm.billing_address_line2"}})],1)],1),t._v(" "),r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Billing Address Town",prop:"billing_address_town"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.billing_address_town,callback:function(e){t.$set(t.ordersCreateForm,"billing_address_town",e)},expression:"ordersCreateForm.billing_address_town"}})],1)],1),t._v(" "),r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Billing Address County",prop:"billing_address_county"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.billing_address_county,callback:function(e){t.$set(t.ordersCreateForm,"billing_address_county",e)},expression:"ordersCreateForm.billing_address_county"}})],1)],1),t._v(" "),r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Billing Address Postcode",prop:"billing_address_postcode"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.billing_address_postcode,callback:function(e){t.$set(t.ordersCreateForm,"billing_address_postcode",e)},expression:"ordersCreateForm.billing_address_postcode"}})],1)],1),t._v(" "),r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Billing Address Country",prop:"billing_address_country"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.billing_address_country,callback:function(e){t.$set(t.ordersCreateForm,"billing_address_country",e)},expression:"ordersCreateForm.billing_address_country"}})],1)],1)],1),t._v(" "),r("el-row",{staticStyle:{"margin-top":"50px"},attrs:{gutter:20}},[r("el-col",{attrs:{md:24}},[r("el-form-item",{attrs:{label:"Shipping Address Same As Billing",prop:"same_shipping_address"}},[r("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.ordersCreateForm.same_shipping_address,callback:function(e){t.$set(t.ordersCreateForm,"same_shipping_address",e)},expression:"ordersCreateForm.same_shipping_address"}})],1)],1),t._v(" "),t.ordersCreateForm.same_shipping_address?t._e():r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Shipping Address Line 1",prop:"shipping_address_line1"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.shipping_address_line1,callback:function(e){t.$set(t.ordersCreateForm,"shipping_address_line1",e)},expression:"ordersCreateForm.shipping_address_line1"}})],1)],1),t._v(" "),t.ordersCreateForm.same_shipping_address?t._e():r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Shipping Address Line 2",prop:"shipping_address_line2"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.shipping_address_line2,callback:function(e){t.$set(t.ordersCreateForm,"shipping_address_line2",e)},expression:"ordersCreateForm.shipping_address_line2"}})],1)],1),t._v(" "),t.ordersCreateForm.same_shipping_address?t._e():r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Shipping Address Town",prop:"shipping_address_town"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.shipping_address_town,callback:function(e){t.$set(t.ordersCreateForm,"shipping_address_town",e)},expression:"ordersCreateForm.shipping_address_town"}})],1)],1),t._v(" "),t.ordersCreateForm.same_shipping_address?t._e():r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Shipping Address County",prop:"shipping_address_county"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.shipping_address_county,callback:function(e){t.$set(t.ordersCreateForm,"shipping_address_county",e)},expression:"ordersCreateForm.shipping_address_county"}})],1)],1),t._v(" "),t.ordersCreateForm.same_shipping_address?t._e():r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Shipping Address Postcode",prop:"shipping_address_postcode"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.shipping_address_postcode,callback:function(e){t.$set(t.ordersCreateForm,"shipping_address_postcode",e)},expression:"ordersCreateForm.shipping_address_postcode"}})],1)],1),t._v(" "),t.ordersCreateForm.same_shipping_address?t._e():r("el-col",{attrs:{md:12}},[r("el-form-item",{attrs:{label:"Shipping Address Country",prop:"shipping_address_country"}},[r("el-input",{attrs:{autofocus:!0,"auto-complete":"off"},model:{value:t.ordersCreateForm.shipping_address_country,callback:function(e){t.$set(t.ordersCreateForm,"shipping_address_country",e)},expression:"ordersCreateForm.shipping_address_country"}})],1)],1)],1),t._v(" "),r("el-row",{staticStyle:{"margin-top":"50px"},attrs:{gutter:20}},[r("el-col",{attrs:{md:12}},[t.products?r("el-form-item",{attrs:{label:"Products",prop:"products"}},[r("el-select",{staticClass:"collection_type_select",staticStyle:{width:"100%"},attrs:{filterable:"",multiple:"","allow-create":"",placeholder:"Select"},model:{value:t.ordersCreateForm.products,callback:function(e){t.$set(t.ordersCreateForm,"products",e)},expression:"ordersCreateForm.products"}},t._l(t.products,function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1):t._e()],1)],1)]}}])},[r("template",{attrs:{slot:"createButton"},slot:"createButton"},[r("router-link",{attrs:{to:{name:"orders.step1"}}},[r("el-button",{staticClass:"create_btn",attrs:{type:"primary",plain:""}},[t._v("New Order")])],1)],1)],2)],1)},o=[];t.exports={render:r,staticRenderFns:o}},"x/hs":function(t,e,r){function o(t){r("J71i")}var n=r("VU/8"),a=r("vZP4"),s=r("vbMC"),i=o,l=n(a,s,!1,i,null,null);t.exports=l.exports}});
=======
webpackJsonp([0],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepOne.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _apiService = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");

var _apiService2 = _interopRequireDefault(_apiService);

var _vuex = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    name: 'orderStepOne',

    components: {
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(20/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        },
        AddressForm: function AddressForm() {
            return __webpack_require__.e/* import() */(36).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/AddressForm.vue"));
        }
    },

    props: {},

    data: function data() {
        return {
            loading: false,
            orderErrors: {},
            formRules: {
                'customer.first_name': [{ required: true, message: 'The first name is required', trigger: 'blur' }],
                'customer.last_name': [{ required: true, message: 'The last name is required', trigger: 'blur' }],
                'customer.phone': [{ required: true, message: 'The phone number is required', trigger: 'blur' }],
                'customer.email': [{ required: true, message: 'The email is required', trigger: 'blur' }, { type: 'email', message: 'Please enter a valid email address' }]
            }
        };
    },


    computed: _extends({}, (0, _vuex.mapGetters)(['order'])),

    watch: {
        order: {
            handler: function handler(order) {
                this.$store.commit('SET_ORDER', order);
            },
            deep: true
        }
    },

    mounted: function mounted() {
        console.log('orderStepOne.vue Mounted');
    },


    methods: _extends({}, (0, _vuex.mapActions)(['resetOrder']), {

        /**
         * Process the form submission and determine what to do next
         *
         * @param String form
         * @param Boolean toNextPage
         * @return void
         */
        processSubmit: function processSubmit(formName, toNextPage) {
            var _this = this;

            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    _this.loading = true;
                    if (_this.order.id) {
                        _apiService2.default.persist('put', {
                            path: 'orders/' + _this.order.id,
                            object: _this.order
                        }).then(function (data) {
                            this.loading = false;
                            // this.$store.commit('SET_ORDER', data.data);
                            if (toNextPage) {
                                this.$router.push({ name: 'orders.step2' });
                            }
                        }.bind(_this)).catch(function (error) {
                            this.loading = false;
                            this.orderErrors = error;
                        }.bind(_this));
                    } else {
                        _apiService2.default.persist('post', {
                            path: 'orders',
                            object: _this.order
                        }).then(function (data) {
                            this.loading = false;
                            this.$set(this.order, 'id', data.data.id);
                            // this.$store.commit('SET_ORDER', data.data);
                            this.$router.push({ name: 'orders.step2' });
                        }.bind(_this)).catch(function (error) {
                            this.loading = false;
                            this.orderErrors = error;
                        }.bind(_this));
                    }
                } else {
                    return false;
                }
            });
        }
    })
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepThree.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _apiService = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");

var _apiService2 = _interopRequireDefault(_apiService);

var _vuex = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    name: 'orderStepThree',

    components: {
        CardPaymentForm: function CardPaymentForm() {
            return __webpack_require__.e/* import() */(35).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/CardPaymentForm.vue"));
        },
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(20/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        }
    },

    props: {},

    data: function data() {
        return {
            loading: false,
            orderErrors: {}
        };
    },


    computed: _extends({}, (0, _vuex.mapGetters)(['order'])),

    watch: {
        order: {
            handler: function handler(order) {
                this.$store.commit('SET_ORDER', order);
            },
            deep: true
        }
    },

    mounted: function mounted() {
        console.log('orderStepThree.vue Mounted');
        if (!this.order.id) {
            this.$router.push({ name: 'orders.step1' });
        }
    },


    methods: {
        processSubmit: function processSubmit(ref) {
            var _this = this;

            this.$refs[ref].validate(function (valid) {
                if (valid) {
                    _this.loading = true;
                    _this.$refs.paymentForm.createToken();
                } else {
                    return false;
                }
            });
        },
        onTokenCreation: function onTokenCreation(has_error, token_object, error_object) {
            if (!has_error && this.order.id) {
                _apiService2.default.persist("post", {
                    path: "orders/" + this.order.id + "/payment",
                    object: this.order
                }).then(function (data) {
                    this.loading = false;
                    this.$router.push({ name: 'orders.view', params: { orderId: this.order.id } });
                    // this.data = data.data;
                }.bind(this)).catch(function (error) {
                    this.loading = false;
                    // this.errors = error;
                }.bind(this));
            }
        }
    }
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepTwo.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _apiService = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");

var _apiService2 = _interopRequireDefault(_apiService);

var _vuex = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findIndex = __webpack_require__("./node_modules/lodash.findindex/index.js");
var forEach = __webpack_require__("./node_modules/lodash.foreach/index.js");
var throttle = __webpack_require__("./node_modules/lodash.throttle/index.js");
var last = __webpack_require__("./node_modules/lodash.last/index.js");
var range = __webpack_require__("./node_modules/lodash.range/index.js");

exports.default = {

    name: 'NewOrderStepTwo',

    components: {
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(20/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        }
    },

    props: {},

    data: function data() {
        return {
            loading: false,
            showProductModal: false,
            addProductForm: {
                edit: false,
                product: {
                    quantity: 1
                }
            },
            productAddErrors: {},
            operators: {
                '+': function _(a, b) {
                    return parseInt(a) + parseInt(b);
                },
                '-': function _(a, b) {
                    return parseInt(a) - parseInt(b);
                }
            },
            products: [],
            productProps: {
                value: 'id',
                label: 'name',
                children: 'variants'
            }
        };
    },


    computed: _extends({}, (0, _vuex.mapGetters)(['order', 'shopData', 'orderTotals']), {
        quantityRange: function quantityRange() {
            return range(1, 251);
        },
        shippingRange: function shippingRange() {
            return range(0, 250, 10);
        }
    }),

    watch: {
        order: {
            handler: function handler(order) {
                this.$store.commit('SET_ORDER', order);
            },
            deep: true
        }
    },

    mounted: function mounted() {
        console.log('NewOrderStepTwo.vue Mounted');
        if (!this.order.id) {
            this.$router.push({ name: 'orders.step1' });
        }
    },


    methods: _extends({}, (0, _vuex.mapActions)(['deleteOrderItem', 'editOrderItem']), {
        formattedPrice: function formattedPrice(product) {
            var base_price = parseInt(product.price);
            var base_with_extras = base_price;
            var extras = 0;
            if (product.options) {
                forEach(product.options, function (option) {
                    if (option) {
                        if (option.price_mutator && option.price_value) {
                            base_with_extras = this.operators[option.price_mutator](base_with_extras, option.price_value);
                            extras = this.operators[option.price_mutator](extras, option.price_value);
                        }
                    }
                }.bind(this));
            }

            var quantity = product.quantity ? product.quantity : 1;
            var total = base_with_extras * quantity;
            extras = extras * quantity;
            return {
                'Base Price': base_price,
                'Sub-Total': base_price * quantity,
                'Extras': extras,
                'Total': total
            };
        },


        /**
         * Check the user wants to close the modal and then clear everything
         *
         * @param Mixed done
         * @return void
         */
        closeAndClearModal: function closeAndClearModal(done) {
            var _this = this;

            this.$confirm('Are you sure to close the product selector?').then(function (_) {
                _this.productAddErrors = {};
                _this.addProductForm = {
                    edit: false,
                    product: {
                        quantity: 1
                    }
                };
                _this.showProductModal = false;
            }).catch(function (_) {});
        },


        /**
         * Set the product on the form data model
         *
         * @param Array val
         * @return void
         */
        handleProductChange: function handleProductChange(val) {
            var chosenProduct = this.findProductById(last(val));
            this.addProductForm.product = chosenProduct;
            this.$set(this.addProductForm.product, 'options', {});
        },


        /**
         * Retrieve the product variants from the server
         *
         * @param Int val
         * @return void
         */
        requestProductVariants: throttle(function (val) {
            var productIndex = this.getIndexFromId(val);
            this.loading = true;
            _apiService2.default.get({
                path: 'products/' + val + '/variants',
                params: {
                    include: ['blank_variants', 'type', 'options', 'price', 'effects_price'],
                    with: ['orderForm.sections.fields']
                }
            }).then(function (data) {
                this.loading = false;
                this.products[productIndex].variants = data.data;
            }.bind(this)).catch(function (error) {
                this.loading = false;
            }.bind(this));
        }, 1000),

        /**
         * Do everything that needs to be done when the user adds a product
         *
         * @return void
         */
        handleAddProductBtnClick: function handleAddProductBtnClick() {
            this.showProductModal = true;
            this.loading = true;

            _apiService2.default.get({
                path: 'products',
                params: {
                    no_variants: true,
                    include: ['blank_variants', 'type', 'options', 'price', 'effects_price'],
                    with: ['orderForm.sections.fields']
                }
            }).then(function (data) {
                this.loading = false;
                this.products = data.data;
            }.bind(this)).catch(function (error) {
                this.loading = false;
            }.bind(this));
        },
        getIndexFromId: function getIndexFromId(id) {
            if (id) {
                var productIndex = findIndex(this.products, function (p) {
                    return p.id === parseInt(id);
                });
                return productIndex === -1 ? null : productIndex;
            }

            return null;
        },
        findProductById: function findProductById(id) {
            var product = null;
            if (id) {
                forEach(this.products, function (p) {
                    if (p.id === parseInt(id)) {
                        product = p;
                    } else {
                        forEach(p.variants, function (v) {
                            if (v.id === parseInt(id)) {
                                product = v;
                            }
                        });
                    }
                });
            }
            return product;
        },
        addProductToTable: function addProductToTable() {
            this.$store.commit('ADD_PRODUCT_TO_ORDER', this.addProductForm.product);
            this.showProductModal = false;
        },
        editProductOnTable: function editProductOnTable() {
            this.editOrderItem(this.addProductForm.product);
            this.showProductModal = false;
        },
        deleteRow: function deleteRow(index, row) {
            this.deleteOrderItem(row);
        },
        editRow: function editRow(index, row) {
            this.addProductForm.edit = true;
            this.addProductForm.product = row;
            this.showProductModal = true;
        },
        optionLabel: function optionLabel(option) {
            if (option) {
                if (option.price_mutator && option.price_value) {
                    return option.name + ' (' + option.price_mutator + ' £' + option.price_value + ')';
                }
            }
            return option.name;
        },
        itemRowNameFormatter: function itemRowNameFormatter(row, column, cellValue) {
            var h = this.$createElement;

            var row_name = h('p', [row.variant.name ? row.variant.name + ' / ' : '', h('strong', [row.name])]);

            if (row.options) {
                var items = [];
                forEach(row.options, function (value, key) {
                    var new_value = value.name ? value.name : value;
                    items.push(h('li', [key, ': ', new_value]));
                });

                return h('div', [row_name, ' ', h(
                    'ul',
                    { 'class': 'order_item_options' },
                    [items]
                )]);
            }
            return h('div', [row_name]);
        },
        processSubmit: function processSubmit() {
            var navigate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this.loading = true;
            _apiService2.default.persist('put', {
                path: "orders/" + this.order.id,
                object: this.order
            }).then(function (data) {
                this.loading = false;
                if (navigate) {
                    this.$router.push({ name: 'orders.step3' });
                }
            }.bind(this)).catch(function (error) {
                this.loading = false;
            }.bind(this));
        }
    })
};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _apiService = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");

var _apiService2 = _interopRequireDefault(_apiService);

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var forEach = __webpack_require__("./node_modules/lodash.foreach/index.js");
exports.default = {

    name: 'Orders',

    components: {
        DataTable: function DataTable() {
            return __webpack_require__.e/* import() */(25/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/DataTable.vue"));
        }
    },

    props: [],

    data: function data() {
        var h = this.$createElement;

        return {
            loading: false,
            products: {},
            invoiceLoaded: false,
            printUrl: null,
            ordersCreateForm: {},
            createFormRules: {
                customer_first_name: [{ required: true, message: 'The first name is required', trigger: 'blur' }, { min: 3, max: 200, message: 'The first name length should be more than 3 characters', trigger: 'blur' }],
                customer_last_name: [{ required: true, message: 'The last name is required', trigger: 'blur' }, { min: 3, max: 200, message: 'The last name length should be more than 3 characters', trigger: 'blur' }],
                customer_email: [{ required: true, message: 'The email is required', trigger: 'blur' }, { min: 3, max: 200, message: 'The email length should be more than 3 characters', trigger: 'blur' }]
            },
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
                deleteText: '',
                collumns: [{
                    prop: 'id',
                    sortable: true,
                    label: 'ID',
                    align: 'left',
                    resizable: true
                }, {
                    prop: 'name',
                    sortable: true,
                    label: 'Customer Name',
                    formatter: function formatter(row, column, cellValue) {
                        return row.customer.full_name;
                    },
                    align: 'left',
                    resizable: true
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
                    prop: 'created_at.human',
                    sortable: true,
                    label: 'Order Placed',
                    align: 'left',
                    resizable: true
                }, {
                    prop: 'status',
                    sortable: true,
                    label: 'Status',
                    formatter: function formatter(row, column, cellValue) {
                        var type = row.status == 'Completed' ? 'success' : row.status == 'Processing' ? 'danger' : 'info';

                        return h(
                            'el-tag',
                            {
                                attrs: { type: type, size: 'medium' }
                            },
                            [row.status]
                        );
                    },
                    align: 'left',
                    resizable: true
                }],
                bulkOptions: [{
                    value: 'completed',
                    label: 'Mark Complete'
                }, {
                    value: 'print',
                    label: 'Print Invoice(s)',
                    action: function (data, shopData, bulkSelected) {
                        var ids = [];
                        forEach(bulkSelected, function (value, key) {
                            var sep = key === 0 ? '?' : '&';
                            ids.push(sep + 'reports[' + key + ']=' + value.id);
                        }.bind(this));

                        var url = shopData.url + '/ecommerce-templates/invoice' + ids.join('');

                        this.printUrl = url;
                    }.bind(this)
                }]
            }
        };
    },


    computed: {},

    watch: {},

    mounted: function mounted() {
        console.log('Orders.vue mounted');
    },


    methods: {

        /**
         * Open the print dialog.
         *
         * @return void
         */
        print: function print() {
            frames['printLinkIframe'].focus();
            frames['printLinkIframe'].print();

            this.printUrl = null;
        },
        handleCreateNew: function handleCreateNew(data) {
            this.loading = true;

            _apiService2.default.get({
                path: 'products',
                params: {
                    limit: '1000'
                }
            }).then(function (data) {
                this.products = data.data;
                this.loading = false;
            }.bind(this)).catch(function (errors) {
                this.loading = false;
            }.bind(this));
        }
    }

};

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _apiService = __webpack_require__("./resources/assets/admin-spa/services/api-service.js");

var _apiService2 = _interopRequireDefault(_apiService);

var _vuex = __webpack_require__("./node_modules/vuex/dist/vuex.esm.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var forEach = __webpack_require__("./node_modules/lodash.foreach/index.js");

exports.default = {

    name: 'ViewOrder',

    components: {
        Errors: function Errors() {
            return __webpack_require__.e/* import() */(20/* duplicate */).then(__webpack_require__.bind(null, "./resources/assets/admin-spa/components/Errors.vue"));
        }
    },

    props: {
        orderId: {
            type: String,
            required: true
        }
    },

    data: function data() {
        return {
            orderErrors: {},
            loading: false,
            order: {},
            shopData: {},
            edit_billing: false,
            edit_shipping: false,
            shippingForm: {},
            invoiceLoaded: false,
            orderStatuses: {},
            printUrl: null
        };
    },


    computed: {
        orderAmount: function orderAmount() {
            return this.shopData.currency + this.order.amount / 100;
        },
        orderTotals: function orderTotals() {
            var totals = [];
            forEach(this.order.cart.totals, function (value, key) {
                totals.push({
                    'total': key,
                    'value': this.order.cart.currency + value
                });
            }.bind(this));

            return totals;
        }
    },

    watch: {},

    mounted: function mounted() {
        console.log('ViewOrders.vue mounted');
        this.getOrder();
    },


    methods: _extends({}, (0, _vuex.mapActions)(['setShopData']), {

        /**
         * Get the order information from the server.
         *
         * @return void
         */
        getOrder: function getOrder() {
            this.orderErrors = {};
            this.loading = true;

            _apiService2.default.get({
                path: 'orders/' + this.orderId,
                params: {}
            }).then(function (data) {
                this.loading = false;
                this.order = data.data;
                this.orderStatuses = data.statuses;
                this.shopData = data.shop_data;
                this.setShopData(data.shop_data);
            }.bind(this)).catch(function (error) {
                this.loading = false;
                this.orderErrors = error;
            }.bind(this));
        },


        /**
         * Update the order.
         *
         * @return void
         */
        updateOrder: function updateOrder() {
            this.orderErrors = {};
            this.loading = true;

            _apiService2.default.persist('put', {
                path: 'orders/' + this.orderId,
                object: this.order
            }).then(function (data) {
                this.loading = false;
                this.order = data.data;
                this.shopData = data.shop_data;
                this.orderStatuses = data.statuses;
                this.setShopData(data.shop_data);
                this.edit_billing = false;
                this.edit_shipping = false;
            }.bind(this)).catch(function (error) {
                this.loading = false;
                this.orderErrors = error;
            }.bind(this));
        },


        /**
         * Delete the order.
         *
         * @return void
         */
        deleteOrder: function deleteOrder() {
            this.loading = true;
            _apiService2.default.delete({
                path: 'orders/' + this.order.id
            }).then(function () {
                this.loading = false;

                this.$message({
                    message: 'Successfully deleted order',
                    type: 'success',
                    showClose: true
                });

                this.$router.push({ name: 'orders' });
            }.bind(this)).catch(function () {
                this.loading = false;
            }.bind(this));
        },
        preparePrint: function preparePrint() {
            this.printUrl = this.shopData.url + '/ecommerce-templates/invoice?reports=' + this.order.id;
        },
        printInvoice: function printInvoice() {
            if (navigator.userAgent.match(/opera/i) || navigator.userAgent.match(/trident/i) || navigator.userAgent.match(/msie/i) && window.addEventListener) {
                window.open(this.printUrl, '_blank');
            } else {
                frames['printLinkIframe'].focus();
                frames['printLinkIframe'].print();
            }

            this.printUrl = null;
        }
    })

};

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-03d271d7\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepOne.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ac302b4\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1c3a22bd\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepTwo.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "/* Element Chalk Variables */\n/* Transition\n-------------------------- */\n/* Colors\n-------------------------- */\n/* 53a8ff */\n/* 66b1ff */\n/* 79bbff */\n/* 8cc5ff */\n/* a0cfff */\n/* b3d8ff */\n/* c6e2ff */\n/* d9ecff */\n/* ecf5ff */\n/* Link\n-------------------------- */\n/* Background\n-------------------------- */\n/* Border\n-------------------------- */\n/* Box-shadow\n-------------------------- */\n/* Fill\n-------------------------- */\n/* Font\n-------------------------- */\n/* Size\n-------------------------- */\n/* z-index\n-------------------------- */\n/* Disable base\n-------------------------- */\n/* Icon\n-------------------------- */\n/* Checkbox\n-------------------------- */\n/* Radio\n-------------------------- */\n/* Select\n-------------------------- */\n/* Alert\n-------------------------- */\n/* Message Box\n-------------------------- */\n/* Message\n-------------------------- */\n/* Notification\n-------------------------- */\n/* Input\n-------------------------- */\n/* Cascader\n-------------------------- */\n/* Group\n-------------------------- */\n/* Tab\n-------------------------- */\n/* Button\n-------------------------- */\n/* cascader\n-------------------------- */\n/* Switch\n-------------------------- */\n/* Dialog\n-------------------------- */\n/* Table\n-------------------------- */\n/* Pagination\n-------------------------- */\n/* Popover\n-------------------------- */\n/* Tooltip\n-------------------------- */\n/* Tag\n-------------------------- */\n/* Tree\n-------------------------- */\n/* Dropdown\n-------------------------- */\n/* Badge\n-------------------------- */\n/* Card\n--------------------------*/\n/* Slider\n--------------------------*/\n/* Steps\n--------------------------*/\n/* Menu\n--------------------------*/\n/* Rate\n--------------------------*/\n/* DatePicker\n--------------------------*/\n/* Loading\n--------------------------*/\n/* Scrollbar\n--------------------------*/\n/* Carousel\n--------------------------*/\n/* Collapse\n--------------------------*/\n/* Transfer\n--------------------------*/\n/* Header\n  --------------------------*/\n/* Footer\n--------------------------*/\n/* Main\n--------------------------*/\n/* Break-point\n--------------------------*/\n/* Custom */\n/* Menu\n-------------------------- */\n.form_option_section {\n  border-bottom: dashed 2px #e4e7ed;\n  padding: 10px 0px;\n  margin-bottom: 10px;\n}\nul.order_item_options {\n  list-style: circle;\n  font-size: 13px;\n  padding: 0px 25px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1e6ae6ea\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48ef0a62\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepThree.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/lodash.findindex/index.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result) {
    return result;
  }
  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity]
 *  The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array ? array.length : 0;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = findIndex;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash.last/index.js":
/***/ (function(module, exports) {

/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;


/***/ }),

/***/ "./node_modules/lodash.range/index.js":
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil,
    nativeMax = Math.max;

/**
 * The base implementation of `_.range` and `_.rangeRight` which doesn't
 * coerce arguments.
 *
 * @private
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */
function baseRange(start, end, step, fromRight) {
  var index = -1,
      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
      result = Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}

/**
 * Creates a `_.range` or `_.rangeRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new range function.
 */
function createRange(fromRight) {
  return function(start, end, step) {
    if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
      end = step = undefined;
    }
    // Ensure the sign of `-0` is preserved.
    start = toFinite(start);
    if (end === undefined) {
      end = start;
      start = 0;
    } else {
      end = toFinite(end);
    }
    step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
    return baseRange(start, end, step, fromRight);
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
 * `start` is specified without an `end` or `step`. If `end` is not specified,
 * it's set to `start` with `start` then set to `0`.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @param {number} [step=1] The value to increment or decrement by.
 * @returns {Array} Returns the range of numbers.
 * @see _.inRange, _.rangeRight
 * @example
 *
 * _.range(4);
 * // => [0, 1, 2, 3]
 *
 * _.range(-4);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 5);
 * // => [1, 2, 3, 4]
 *
 * _.range(0, 20, 5);
 * // => [0, 5, 10, 15]
 *
 * _.range(0, -4, -1);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 4, 0);
 * // => [1, 1, 1]
 *
 * _.range(0);
 * // => []
 */
var range = createRange();

module.exports = range;


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-03d271d7\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepOne.vue":
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
          _c("el-breadcrumb-item", { attrs: { to: { name: "orders" } } }, [
            _vm._v("Orders")
          ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v("New Order")]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v("Step 1")])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-row",
        { attrs: { align: "middle", type: "flex" } },
        [
          _c(
            "el-col",
            { attrs: { span: 12 } },
            [
              _c("h1", { staticClass: "page_title" }, [
                _vm._v("New Order "),
                _vm.order.first_name && _vm.order.last_name
                  ? _c("span", [
                      _vm._v(
                        " - " +
                          _vm._s(
                            _vm.order.first_name + " " + _vm.order.last_name
                          )
                      )
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "danger", plain: "", size: "mini" },
                  on: { click: _vm.resetOrder }
                },
                [_vm._v("Reset Order")]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("hr", { staticClass: "page_hr" }),
      _vm._v(" "),
      Object.keys(_vm.orderErrors).length > 0
        ? _c("errors", { attrs: { errors: _vm.orderErrors } })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-form",
        {
          ref: "orderForm",
          attrs: {
            rules: _vm.formRules,
            "label-position": "top",
            model: _vm.order
          },
          nativeOn: {
            submit: function($event) {
              $event.preventDefault()
            }
          }
        },
        [
          _c(
            "el-row",
            { attrs: { gutter: 20 } },
            [
              _c("el-col", { attrs: { md: 12 } }, [
                _c("h5", [_vm._v("Customer Information")])
              ])
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
                { attrs: { md: { span: 16, offset: 4 } } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "Customer Company",
                        size: "small",
                        prop: "customer.company"
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { autofocus: true, "auto-complete": "off" },
                        model: {
                          value: _vm.order.customer.company,
                          callback: function($$v) {
                            _vm.$set(_vm.order.customer, "company", $$v)
                          },
                          expression: "order.customer.company"
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
                { attrs: { md: { span: 8, offset: 4 } } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "Customer First Name",
                        size: "small",
                        prop: "customer.first_name"
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { autofocus: true, "auto-complete": "off" },
                        model: {
                          value: _vm.order.customer.first_name,
                          callback: function($$v) {
                            _vm.$set(_vm.order.customer, "first_name", $$v)
                          },
                          expression: "order.customer.first_name"
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
                { attrs: { md: 8 } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "Customer Last Name",
                        size: "small",
                        prop: "customer.last_name"
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { autofocus: true, "auto-complete": "off" },
                        model: {
                          value: _vm.order.customer.last_name,
                          callback: function($$v) {
                            _vm.$set(_vm.order.customer, "last_name", $$v)
                          },
                          expression: "order.customer.last_name"
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
                { attrs: { md: { span: 8, offset: 4 } } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "Customer Phone",
                        size: "small",
                        prop: "customer.phone"
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { autofocus: true, "auto-complete": "off" },
                        model: {
                          value: _vm.order.customer.phone,
                          callback: function($$v) {
                            _vm.$set(_vm.order.customer, "phone", $$v)
                          },
                          expression: "order.customer.phone"
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
                { attrs: { md: 8 } },
                [
                  _c(
                    "el-form-item",
                    {
                      attrs: {
                        label: "Customer Email",
                        size: "small",
                        prop: "customer.email"
                      }
                    },
                    [
                      _c("el-input", {
                        attrs: { autofocus: true, "auto-complete": "off" },
                        model: {
                          value: _vm.order.customer.email,
                          callback: function($$v) {
                            _vm.$set(_vm.order.customer, "email", $$v)
                          },
                          expression: "order.customer.email"
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
          _c("hr"),
          _vm._v(" "),
          _c(
            "el-row",
            { attrs: { gutter: 20 } },
            [
              _c("el-col", { attrs: { md: 12 } }, [
                _c("h5", [_vm._v("Billing Adress")])
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c("address-form", {
            attrs: { form: _vm.order.billing_address, prop: "billing_address" }
          }),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c(
            "el-row",
            { attrs: { gutter: 20 } },
            [
              _c("el-col", { attrs: { md: 12 } }, [
                _c("h5", [_vm._v("Shipping Adress")])
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-row",
            { staticStyle: { "margin-bottom": "20px" }, attrs: { gutter: 20 } },
            [
              _c(
                "el-col",
                { attrs: { md: { span: 20, offset: 4 } } },
                [
                  _c(
                    "el-checkbox",
                    {
                      model: {
                        value: _vm.order.use_billing_for_shipping,
                        callback: function($$v) {
                          _vm.$set(_vm.order, "use_billing_for_shipping", $$v)
                        },
                        expression: "order.use_billing_for_shipping"
                      }
                    },
                    [_vm._v("Same As Billing Address")]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          !_vm.order.use_billing_for_shipping
            ? _c("address-form", {
                attrs: { form: _vm.order.shipping_address }
              })
            : _vm._e(),
          _vm._v(" "),
          _c(
            "el-row",
            { staticStyle: { "margin-top": "40px" }, attrs: { gutter: 20 } },
            [
              _c(
                "el-col",
                { attrs: { md: { span: 24 } } },
                [
                  _vm.order.id
                    ? _c(
                        "el-button",
                        {
                          attrs: { type: "primary", plain: "" },
                          on: {
                            click: function($event) {
                              _vm.processSubmit("orderForm", false)
                            }
                          }
                        },
                        [_vm._v("Save Changes")]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary" },
                      on: {
                        click: function($event) {
                          _vm.processSubmit("orderForm", true)
                        }
                      }
                    },
                    [_vm._v("Choose Products")]
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
    require("vue-hot-reload-api")      .rerender("data-v-03d271d7", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1ac302b4\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue":
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
          _c("el-breadcrumb-item", { attrs: { to: { name: "orders" } } }, [
            _vm._v("Orders")
          ]),
          _vm._v(" "),
          _vm.order.invoice
            ? _c("el-breadcrumb-item", [
                _vm._v(_vm._s(_vm.order.invoice.number))
              ])
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-row",
        { attrs: { align: "middle" } },
        [
          _c("el-col", { attrs: { sm: 24, lg: 12 } }, [
            _vm.order.invoice
              ? _c(
                  "h1",
                  { staticClass: "page_title" },
                  [
                    _vm._v("Order: " + _vm._s(_vm.order.invoice.number) + " "),
                    _vm.order.status
                      ? _c(
                          "el-tag",
                          { attrs: { type: "info", size: "large" } },
                          [_vm._v(_vm._s(_vm.order.status))]
                        )
                      : _vm._e()
                  ],
                  1
                )
              : _vm._e()
          ]),
          _vm._v(" "),
          _c(
            "el-col",
            { attrs: { sm: 24, lg: 12 } },
            [
              _c(
                "el-button",
                {
                  staticStyle: { float: "right", "margin-bottom": "20px" },
                  attrs: { type: "success", plain: "" },
                  on: { click: _vm.preparePrint }
                },
                [_vm._v("Print Invoice")]
              ),
              _vm._v(" "),
              !_vm.loading && _vm.printUrl
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
                      id: "printLinkIframe",
                      name: "printLinkIframe",
                      src: _vm.printUrl
                    },
                    on: { load: _vm.printInvoice }
                  })
                : _vm._e()
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      Object.keys(_vm.orderErrors).length > 0
        ? _c("errors", { attrs: { errors: _vm.orderErrors } })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-row",
        { attrs: { gutter: 20 } },
        [
          _c(
            "el-col",
            { attrs: { span: 24 } },
            [
              _vm.orderStatuses
                ? _c(
                    "el-form",
                    { attrs: { model: _vm.order } },
                    [
                      _c(
                        "el-select",
                        {
                          attrs: { placeholder: "Select" },
                          model: {
                            value: _vm.order.status,
                            callback: function($$v) {
                              _vm.$set(_vm.order, "status", $$v)
                            },
                            expression: "order.status"
                          }
                        },
                        _vm._l(_vm.orderStatuses, function(status, key) {
                          return _c("el-option", {
                            key: key,
                            attrs: { label: status, value: key }
                          })
                        })
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        [
                          _c(
                            "el-button",
                            {
                              attrs: {
                                type: "primary",
                                size: "small",
                                loading: _vm.loading
                              },
                              on: {
                                click: function($event) {
                                  _vm.updateOrder()
                                }
                              }
                            },
                            [_vm._v("Save")]
                          )
                        ],
                        1
                      )
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
            {
              staticStyle: { "margin-bottom": "50px" },
              attrs: { md: 24, lg: 12 }
            },
            [
              _c(
                "el-card",
                { staticClass: "box-card" },
                [
                  _c(
                    "div",
                    {
                      staticClass: "clearfix",
                      attrs: { slot: "header" },
                      slot: "header"
                    },
                    [
                      _c(
                        "span",
                        [
                          _vm._v("Shipping Address "),
                          _vm.order.use_billing_for_shipping
                            ? _c("el-tag", { attrs: { size: "mini" } }, [
                                _vm._v("Using Billing")
                              ])
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-button",
                        {
                          staticStyle: { float: "right", padding: "3px 0" },
                          attrs: { type: "text" },
                          on: {
                            click: function($event) {
                              _vm.edit_shipping = !_vm.edit_shipping
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.edit_shipping ? "Cancel" : "Edit"))]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm._l(_vm.order.shipping_address, function(line, key) {
                    return !_vm.edit_shipping
                      ? _c("div", { key: line, staticClass: "text item" }, [
                          _c("strong", [_vm._v(_vm._s(key) + ":")]),
                          _vm._v(" " + _vm._s(line) + "\n              ")
                        ])
                      : _vm._e()
                  }),
                  _vm._v(" "),
                  _vm.edit_shipping
                    ? _c(
                        "el-form",
                        {
                          ref: "editShippingForm",
                          attrs: {
                            model: _vm.order,
                            "label-width": "120px",
                            size: "mini"
                          }
                        },
                        [
                          _c(
                            "el-form-item",
                            {
                              attrs: {
                                label: "Use Billing Address",
                                prop: "use_billing_for_shipping"
                              }
                            },
                            [
                              _c("el-switch", {
                                attrs: {
                                  "active-color": "#13ce66",
                                  "inactive-color": "#ff4949"
                                },
                                model: {
                                  value: _vm.order.use_billing_for_shipping,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.order,
                                      "use_billing_for_shipping",
                                      $$v
                                    )
                                  },
                                  expression: "order.use_billing_for_shipping"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _vm._l(_vm.order.shipping_address, function(
                            line,
                            key
                          ) {
                            return _c(
                              "el-form-item",
                              {
                                key: line,
                                attrs: { label: key, prop: _vm.order[key] }
                              },
                              [
                                _c("el-input", {
                                  attrs: {
                                    disabled:
                                      _vm.order.use_billing_for_shipping,
                                    autofocus: true
                                  },
                                  model: {
                                    value: _vm.order.shipping_address[key],
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.order.shipping_address,
                                        key,
                                        $$v
                                      )
                                    },
                                    expression: "order.shipping_address[key]"
                                  }
                                })
                              ],
                              1
                            )
                          }),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            [
                              _c(
                                "el-button",
                                {
                                  attrs: {
                                    type: "primary",
                                    loading: _vm.loading
                                  },
                                  on: {
                                    click: function($event) {
                                      _vm.updateOrder()
                                    }
                                  }
                                },
                                [_vm._v("Save")]
                              )
                            ],
                            1
                          )
                        ],
                        2
                      )
                    : _vm._e()
                ],
                2
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-col",
            {
              staticStyle: { "margin-bottom": "50px" },
              attrs: { md: 24, lg: 12 }
            },
            [
              _c(
                "el-card",
                { staticClass: "box-card" },
                [
                  _c(
                    "div",
                    {
                      staticClass: "clearfix",
                      attrs: { slot: "header" },
                      slot: "header"
                    },
                    [
                      _c("span", [_vm._v("Billing Address")]),
                      _vm._v(" "),
                      _c(
                        "el-button",
                        {
                          staticStyle: { float: "right", padding: "3px 0" },
                          attrs: { type: "text" },
                          on: {
                            click: function($event) {
                              _vm.edit_billing = !_vm.edit_billing
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.edit_billing ? "Cancel" : "Edit"))]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm._l(_vm.order.billing_address, function(line, key) {
                    return !_vm.edit_billing
                      ? _c("div", { key: line, staticClass: "text item" }, [
                          _c("strong", [_vm._v(_vm._s(key) + ":")]),
                          _vm._v(" " + _vm._s(line) + "\n              ")
                        ])
                      : _vm._e()
                  }),
                  _vm._v(" "),
                  _vm.edit_billing
                    ? _c(
                        "el-form",
                        {
                          ref: "editShippingForm",
                          attrs: {
                            model: _vm.order.billing_address,
                            "label-width": "120px",
                            size: "mini"
                          }
                        },
                        [
                          _vm._l(_vm.order.billing_address, function(
                            line,
                            key
                          ) {
                            return _c(
                              "el-form-item",
                              { key: line, attrs: { label: key, prop: key } },
                              [
                                _c("el-input", {
                                  attrs: { autofocus: true },
                                  model: {
                                    value: _vm.order.billing_address[key],
                                    callback: function($$v) {
                                      _vm.$set(
                                        _vm.order.billing_address,
                                        key,
                                        $$v
                                      )
                                    },
                                    expression: "order.billing_address[key]"
                                  }
                                })
                              ],
                              1
                            )
                          }),
                          _vm._v(" "),
                          _c(
                            "el-form-item",
                            [
                              _c(
                                "el-button",
                                {
                                  attrs: {
                                    type: "primary",
                                    loading: _vm.loading
                                  },
                                  on: {
                                    click: function($event) {
                                      _vm.updateOrder()
                                    }
                                  }
                                },
                                [_vm._v("Save")]
                              )
                            ],
                            1
                          )
                        ],
                        2
                      )
                    : _vm._e()
                ],
                2
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
        { staticStyle: { "margin-bottom": "50px" }, attrs: { gutter: 20 } },
        [
          _c(
            "el-col",
            { attrs: { span: 24 } },
            [
              _c("el-card", { staticClass: "box-card" }, [
                _c(
                  "div",
                  {
                    staticClass: "clearfix",
                    attrs: { slot: "header" },
                    slot: "header"
                  },
                  [
                    _c("span", [_vm._v("Customer Information")]),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        staticStyle: { float: "right", padding: "3px 0" },
                        attrs: { type: "text" }
                      },
                      [_vm._v("Edit")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.order.customer
                  ? _c("div", { staticClass: "text item" }, [
                      _c("strong", [_vm._v("Name:")]),
                      _vm._v(
                        " " +
                          _vm._s(_vm.order.customer.full_name) +
                          "\n              "
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.order.customer
                  ? _c("div", { staticClass: "text item" }, [
                      _c("strong", [_vm._v("Email:")]),
                      _vm._v(
                        " " +
                          _vm._s(_vm.order.customer.email) +
                          "\n              "
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.order.customer
                  ? _c("div", { staticClass: "text item" }, [
                      _c("strong", [_vm._v("Phone:")]),
                      _vm._v(
                        " " +
                          _vm._s(_vm.order.customer.phone) +
                          "\n              "
                      )
                    ])
                  : _vm._e()
              ])
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.order.items
        ? _c(
            "el-row",
            { attrs: { gutter: 20 } },
            [
              _c(
                "el-col",
                { attrs: { span: 24 } },
                [
                  _c(
                    "el-card",
                    { staticClass: "box-card" },
                    [
                      _c(
                        "el-table",
                        {
                          staticStyle: { width: "100%" },
                          attrs: { data: _vm.order.items }
                        },
                        [
                          _c("el-table-column", {
                            attrs: { prop: "name", label: "Product" }
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              prop: "price",
                              formatter: function(row, column, cellValue) {
                                return _vm.order.cart.currency + row.price
                              },
                              label: "Price"
                            }
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: { prop: "qty", label: "Quantity" }
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: {
                              prop: "subtotal",
                              formatter: function(row, column, cellValue) {
                                return _vm.order.cart.currency + row.subtotal
                              },
                              label: "Total"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-table",
                        {
                          staticStyle: { width: "100%" },
                          attrs: { data: _vm.orderTotals }
                        },
                        [
                          _c("el-table-column"),
                          _vm._v(" "),
                          _c("el-table-column"),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: { prop: "total", label: "" }
                          }),
                          _vm._v(" "),
                          _c("el-table-column", {
                            attrs: { prop: "value", label: "" }
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
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-popover",
        { ref: "deleteOrderPop", attrs: { placement: "top", width: "160" } },
        [
          _c("p", [_vm._v("Delete Order?")]),
          _vm._v(" "),
          _c(
            "div",
            { staticStyle: { "text-align": "right", margin: "0" } },
            [
              _c(
                "el-button",
                {
                  attrs: { type: "primary", size: "mini", plain: "" },
                  on: {
                    click: function($event) {
                      _vm.$refs.deleteOrderPop.doClose()
                    }
                  }
                },
                [_vm._v("cancel")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "danger", size: "mini" },
                  on: {
                    click: function($event) {
                      _vm.deleteOrder()
                    }
                  }
                },
                [_vm._v("confirm")]
              )
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "el-button",
        {
          directives: [
            {
              name: "popover",
              rawName: "v-popover:deleteOrderPop",
              arg: "deleteOrderPop"
            }
          ],
          staticStyle: { "margin-top": "40px" },
          attrs: { size: "small", plain: "", type: "danger" }
        },
        [_vm._v("Delete")]
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
    require("vue-hot-reload-api")      .rerender("data-v-1ac302b4", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1c3a22bd\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepTwo.vue":
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
          _c("el-breadcrumb-item", { attrs: { to: { name: "orders" } } }, [
            _vm._v("Orders")
          ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v("New Order")]),
          _vm._v(" "),
          _c(
            "el-breadcrumb-item",
            { attrs: { to: { name: "orders.step1" } } },
            [_vm._v("Step 1")]
          ),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v("Step 2")])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-row",
        { attrs: { align: "middle", type: "flex" } },
        [
          _c("el-col", { attrs: { span: 12 } }, [
            _c("h1", { staticClass: "page_title" }, [
              _vm._v("New Order "),
              _vm.order.id
                ? _c("span", [_vm._v(" - #" + _vm._s(_vm.order.id))])
                : _vm._e()
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _vm.order.items
        ? _c(
            "el-row",
            {
              staticStyle: { "margin-top": "20px", "margin-bottom": "20px" },
              attrs: { gutter: 20 }
            },
            [
              _c(
                "el-col",
                { attrs: { span: 12 } },
                [
                  _c(
                    "el-button",
                    {
                      attrs: { size: "small", type: "primary" },
                      on: { click: _vm.handleAddProductBtnClick }
                    },
                    [_vm._v("Add Product(s)")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form",
                { attrs: { model: _vm.order } },
                [
                  _c(
                    "el-col",
                    { attrs: { span: 12 } },
                    [
                      _c(
                        "el-form-item",
                        { attrs: { label: "Shipping Rate" } },
                        [
                          _c(
                            "el-select",
                            {
                              attrs: { size: "mini" },
                              model: {
                                value: _vm.order.shipping_rate,
                                callback: function($$v) {
                                  _vm.$set(_vm.order, "shipping_rate", $$v)
                                },
                                expression: "order.shipping_rate"
                              }
                            },
                            _vm._l(_vm.shippingRange, function(range) {
                              return _c("el-option", {
                                key: range,
                                attrs: { value: range }
                              })
                            })
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
        : _vm._e(),
      _vm._v(" "),
      _vm.order.items
        ? _c(
            "el-row",
            { attrs: { gutter: 20 } },
            [
              _c(
                "el-col",
                { attrs: { span: 24 } },
                [
                  _c(
                    "el-table",
                    {
                      staticStyle: { width: "100%" },
                      attrs: { data: _vm.order.items }
                    },
                    [
                      _c("el-table-column", {
                        attrs: {
                          prop: "name",
                          label: "Product",
                          formatter: _vm.itemRowNameFormatter
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "price",
                          formatter: function(row, column, cellValue) {
                            return (
                              _vm.shopData.currency +
                              (_vm.formattedPrice(row)
                                ? _vm.formattedPrice(row)["Base Price"]
                                : 0)
                            )
                          },
                          label: "Price"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "qty",
                          formatter: function(row, column, cellValue) {
                            return row.quantity ? row.quantity : 1
                          },
                          label: "Quantity"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "subtotal",
                          formatter: function(row, column, cellValue) {
                            return (
                              _vm.shopData.currency +
                              (_vm.formattedPrice(row)
                                ? _vm.formattedPrice(row)["Sub-Total"]
                                : 0)
                            )
                          },
                          label: "Sub-Total"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "total",
                          formatter: function(row, column, cellValue) {
                            return (
                              _vm.shopData.currency +
                              (_vm.formattedPrice(row)
                                ? _vm.formattedPrice(row)["Extras"]
                                : 0)
                            )
                          },
                          label: "Extras"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "total",
                          formatter: function(row, column, cellValue) {
                            return (
                              _vm.shopData.currency +
                              (_vm.formattedPrice(row)
                                ? _vm.formattedPrice(row)["Total"]
                                : 0)
                            )
                          },
                          label: "Total"
                        }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { label: "Actions" },
                        scopedSlots: _vm._u([
                          {
                            key: "default",
                            fn: function(scope) {
                              return [
                                _c(
                                  "el-button",
                                  {
                                    staticClass: "action_btn",
                                    attrs: {
                                      size: "mini",
                                      plain: "",
                                      type: "primary"
                                    },
                                    on: {
                                      click: function($event) {
                                        _vm.editRow(scope.$index, scope.row)
                                      }
                                    }
                                  },
                                  [_vm._v("Edit\n                        ")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "el-button",
                                  {
                                    staticClass: "action_btn delete_btn",
                                    attrs: { size: "mini", type: "danger" },
                                    on: {
                                      click: function($event) {
                                        _vm.deleteRow(scope.$index, scope.row)
                                      }
                                    }
                                  },
                                  [_vm._v("Delete\n                        ")]
                                )
                              ]
                            }
                          }
                        ])
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-table",
                    {
                      staticStyle: { width: "100%" },
                      attrs: { data: _vm.orderTotals }
                    },
                    [
                      _c("el-table-column"),
                      _vm._v(" "),
                      _c("el-table-column"),
                      _vm._v(" "),
                      _c("el-table-column"),
                      _vm._v(" "),
                      _c("el-table-column"),
                      _vm._v(" "),
                      _c("el-table-column"),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: { prop: "total", label: "" }
                      }),
                      _vm._v(" "),
                      _c("el-table-column", {
                        attrs: {
                          prop: "value",
                          label: "",
                          formatter: function(row, column, cellValue) {
                            return _vm.shopData.currency + cellValue
                          }
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
      _c(
        "el-dialog",
        {
          attrs: {
            title: (_vm.addProductForm.edit ? "Edit" : "Add") + " Product",
            "close-on-click-modal": false,
            "before-close": _vm.closeAndClearModal,
            visible: _vm.showProductModal,
            width: "70%"
          },
          on: {
            "update:visible": function($event) {
              _vm.showProductModal = $event
            }
          }
        },
        [
          _c(
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
              Object.keys(_vm.productAddErrors).length > 0
                ? _c("errors", { attrs: { errors: _vm.productAddErrors } })
                : _vm._e(),
              _vm._v(" "),
              _c(
                "el-form",
                {
                  ref: "addProductForm",
                  attrs: { "label-position": "top", model: _vm.addProductForm },
                  nativeOn: {
                    submit: function($event) {
                      $event.preventDefault()
                    }
                  }
                },
                [
                  !_vm.addProductForm.edit
                    ? _c(
                        "div",
                        { staticClass: "form_option_section" },
                        [
                          _c(
                            "el-row",
                            { attrs: { gutter: 20 } },
                            [
                              _c("el-col", { attrs: { md: 12 } }, [
                                _c("h5", [_vm._v("Product Type")])
                              ])
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
                                { attrs: { md: { span: 16, offset: 4 } } },
                                [
                                  _c(
                                    "el-form-item",
                                    {
                                      attrs: {
                                        label: "Choose Product",
                                        size: "small",
                                        prop: "product"
                                      }
                                    },
                                    [
                                      _c("el-cascader", {
                                        staticStyle: { width: "100%" },
                                        attrs: {
                                          options: _vm.products,
                                          props: _vm.productProps
                                        },
                                        on: {
                                          change: _vm.handleProductChange,
                                          "active-item-change":
                                            _vm.requestProductVariants
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
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.addProductForm.product.options &&
                  _vm.addProductForm.product.order_form
                    ? [
                        _vm._l(
                          _vm.addProductForm.product.order_form.sections.data,
                          function(section) {
                            return _vm.addProductForm.product.order_form
                              .sections
                              ? [
                                  section.fields
                                    ? [
                                        section.fields.data.length > 0
                                          ? _c(
                                              "el-row",
                                              { attrs: { gutter: 20 } },
                                              [
                                                _c(
                                                  "el-col",
                                                  { attrs: { md: 12 } },
                                                  [
                                                    _c("h5", [
                                                      _vm._v(
                                                        _vm._s(section.name)
                                                      )
                                                    ])
                                                  ]
                                                )
                                              ],
                                              1
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        section.fields.data.length > 0
                                          ? _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "form_option_section"
                                              },
                                              _vm._l(
                                                section.fields.data,
                                                function(field) {
                                                  return _c(
                                                    "el-row",
                                                    {
                                                      key: field.id,
                                                      attrs: { gutter: 20 }
                                                    },
                                                    [
                                                      _c(
                                                        "el-col",
                                                        {
                                                          attrs: {
                                                            md: {
                                                              span: 16,
                                                              offset: 4
                                                            }
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "el-form-item",
                                                            {
                                                              attrs: {
                                                                label:
                                                                  field.name,
                                                                size: "small",
                                                                prop:
                                                                  "product.options[" +
                                                                  field.name +
                                                                  "]"
                                                              }
                                                            },
                                                            [
                                                              field.type ===
                                                              "text"
                                                                ? _c(
                                                                    "el-input",
                                                                    {
                                                                      model: {
                                                                        value:
                                                                          _vm
                                                                            .addProductForm
                                                                            .product
                                                                            .options[
                                                                            field
                                                                              .name
                                                                          ],
                                                                        callback: function(
                                                                          $$v
                                                                        ) {
                                                                          _vm.$set(
                                                                            _vm
                                                                              .addProductForm
                                                                              .product
                                                                              .options,
                                                                            field.name,
                                                                            $$v
                                                                          )
                                                                        },
                                                                        expression:
                                                                          "addProductForm.product.options[field.name]"
                                                                      }
                                                                    }
                                                                  )
                                                                : _vm._e(),
                                                              _vm._v(" "),
                                                              field.type ===
                                                              "select"
                                                                ? _c(
                                                                    "el-select",
                                                                    {
                                                                      model: {
                                                                        value:
                                                                          _vm
                                                                            .addProductForm
                                                                            .product
                                                                            .options[
                                                                            field
                                                                              .name
                                                                          ],
                                                                        callback: function(
                                                                          $$v
                                                                        ) {
                                                                          _vm.$set(
                                                                            _vm
                                                                              .addProductForm
                                                                              .product
                                                                              .options,
                                                                            field.name,
                                                                            $$v
                                                                          )
                                                                        },
                                                                        expression:
                                                                          "addProductForm.product.options[field.name]"
                                                                      }
                                                                    },
                                                                    _vm._l(
                                                                      field.options,
                                                                      function(
                                                                        option
                                                                      ) {
                                                                        return _c(
                                                                          "el-option",
                                                                          {
                                                                            key:
                                                                              option.id,
                                                                            attrs: {
                                                                              value: option,
                                                                              label: _vm.optionLabel(
                                                                                option
                                                                              )
                                                                            }
                                                                          }
                                                                        )
                                                                      }
                                                                    )
                                                                  )
                                                                : _vm._e()
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
                                              )
                                            )
                                          : _vm._e()
                                      ]
                                    : _vm._e()
                                ]
                              : _vm._e()
                          }
                        )
                      ]
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.addProductForm.product.id
                    ? _c(
                        "div",
                        { staticClass: "form_option_section" },
                        [
                          _c(
                            "el-row",
                            { attrs: { gutter: 20 } },
                            [
                              _c("el-col", { attrs: { md: 12 } }, [
                                _c("h5", [_vm._v("Quantity")])
                              ])
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
                                { attrs: { md: { span: 16, offset: 4 } } },
                                [
                                  _c(
                                    "el-form-item",
                                    {
                                      attrs: {
                                        label: "Quantity",
                                        size: "small",
                                        prop: "product.quantity"
                                      }
                                    },
                                    [
                                      _c(
                                        "el-select",
                                        {
                                          model: {
                                            value:
                                              _vm.addProductForm.product
                                                .quantity,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.addProductForm.product,
                                                "quantity",
                                                $$v
                                              )
                                            },
                                            expression:
                                              "addProductForm.product.quantity"
                                          }
                                        },
                                        _vm._l(_vm.quantityRange, function(
                                          range
                                        ) {
                                          return _c("el-option", {
                                            key: range,
                                            attrs: { value: range }
                                          })
                                        })
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
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.addProductForm.product.id
                    ? _c(
                        "div",
                        { staticClass: "form_option_section" },
                        [
                          _c(
                            "el-row",
                            { attrs: { gutter: 20 } },
                            [
                              _c("el-col", { attrs: { md: 12 } }, [
                                _c("h5", [_vm._v("Price")])
                              ])
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
                                { attrs: { md: { span: 16, offset: 4 } } },
                                _vm._l(
                                  _vm.formattedPrice(
                                    _vm.addProductForm.product
                                  ),
                                  function(value, key) {
                                    return _c("p", [
                                      _c("strong", [_vm._v(_vm._s(key) + ":")]),
                                      _vm._v(
                                        " " +
                                          _vm._s(_vm.shopData.currency) +
                                          _vm._s(value)
                                      )
                                    ])
                                  }
                                )
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    : _vm._e()
                ],
                2
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
                      on: {
                        click: function($event) {
                          _vm.closeAndClearModal(null)
                        }
                      }
                    },
                    [
                      _vm._v(
                        _vm._s(
                          _vm.addProductForm.edit ? "Discard Changes" : "Cancel"
                        )
                      )
                    ]
                  ),
                  _vm._v(" "),
                  !_vm.addProductForm.edit
                    ? _c(
                        "el-button",
                        {
                          attrs: { type: "primary" },
                          on: {
                            click: function($event) {
                              _vm.addProductToTable()
                            }
                          }
                        },
                        [_vm._v("Add Product")]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.addProductForm.edit
                    ? _c(
                        "el-button",
                        {
                          attrs: { type: "primary" },
                          on: {
                            click: function($event) {
                              _vm.editProductOnTable()
                            }
                          }
                        },
                        [_vm._v("Save Changes")]
                      )
                    : _vm._e()
                ],
                1
              )
            ],
            1
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "el-row",
        { staticStyle: { "margin-top": "40px" }, attrs: { gutter: 20 } },
        [
          _c(
            "el-col",
            { attrs: { md: { span: 24 } } },
            [
              _c(
                "el-button",
                {
                  attrs: { type: "primary", plain: "" },
                  on: {
                    click: function($event) {
                      _vm.processSubmit(false)
                    }
                  }
                },
                [_vm._v("Save Changes")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "primary" },
                  on: {
                    click: function($event) {
                      _vm.processSubmit()
                    }
                  }
                },
                [_vm._v("Process Payment")]
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
    require("vue-hot-reload-api")      .rerender("data-v-1c3a22bd", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1e6ae6ea\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue":
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
      !_vm.loading && _vm.printUrl
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
              id: "printLinkIframe",
              name: "printLinkIframe",
              src: _vm.printUrl
            },
            on: { load: _vm.print }
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "data-table",
        {
          attrs: {
            "type-name": "order",
            "full-modal": true,
            "table-options": _vm.tableOptions,
            "create-form": _vm.ordersCreateForm,
            "create-form-rules": _vm.createFormRules
          },
          on: { createNew: _vm.handleCreateNew },
          scopedSlots: _vm._u([
            {
              key: "createForm",
              fn: function(props) {
                return [
                  _c(
                    "el-row",
                    { attrs: { gutter: 20 } },
                    [
                      _c(
                        "el-col",
                        { attrs: { md: 12 } },
                        [
                          _c(
                            "el-form-item",
                            {
                              attrs: {
                                label: "Customer First Name",
                                prop: "first_name"
                              }
                            },
                            [
                              _c("el-input", {
                                attrs: {
                                  autofocus: true,
                                  "auto-complete": "off"
                                },
                                model: {
                                  value: _vm.ordersCreateForm.first_name,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.ordersCreateForm,
                                      "first_name",
                                      $$v
                                    )
                                  },
                                  expression: "ordersCreateForm.first_name"
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
                                label: "Customer Last Name",
                                prop: "last_name"
                              }
                            },
                            [
                              _c("el-input", {
                                attrs: {
                                  autofocus: true,
                                  "auto-complete": "off"
                                },
                                model: {
                                  value: _vm.ordersCreateForm.last_name,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.ordersCreateForm,
                                      "last_name",
                                      $$v
                                    )
                                  },
                                  expression: "ordersCreateForm.last_name"
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
                        { attrs: { md: 12 } },
                        [
                          _c(
                            "el-form-item",
                            {
                              attrs: { label: "Customer Email", prop: "email" }
                            },
                            [
                              _c("el-input", {
                                attrs: {
                                  autofocus: true,
                                  "auto-complete": "off"
                                },
                                model: {
                                  value: _vm.ordersCreateForm.email,
                                  callback: function($$v) {
                                    _vm.$set(_vm.ordersCreateForm, "email", $$v)
                                  },
                                  expression: "ordersCreateForm.email"
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
                              attrs: { label: "Customer Phone", prop: "phone" }
                            },
                            [
                              _c("el-input", {
                                attrs: {
                                  autofocus: true,
                                  "auto-complete": "off"
                                },
                                model: {
                                  value: _vm.ordersCreateForm.phone,
                                  callback: function($$v) {
                                    _vm.$set(_vm.ordersCreateForm, "phone", $$v)
                                  },
                                  expression: "ordersCreateForm.phone"
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
                    {
                      staticStyle: { "margin-top": "50px" },
                      attrs: { gutter: 20 }
                    },
                    [
                      _c(
                        "el-col",
                        { attrs: { md: 12 } },
                        [
                          _c(
                            "el-form-item",
                            {
                              attrs: {
                                label: "Billing Address Line 1",
                                prop: "billing_address_line1"
                              }
                            },
                            [
                              _c("el-input", {
                                attrs: {
                                  autofocus: true,
                                  "auto-complete": "off"
                                },
                                model: {
                                  value:
                                    _vm.ordersCreateForm.billing_address_line1,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.ordersCreateForm,
                                      "billing_address_line1",
                                      $$v
                                    )
                                  },
                                  expression:
                                    "ordersCreateForm.billing_address_line1"
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
                                label: "Billing Address Line 2",
                                prop: "billing_address_line2"
                              }
                            },
                            [
                              _c("el-input", {
                                attrs: {
                                  autofocus: true,
                                  "auto-complete": "off"
                                },
                                model: {
                                  value:
                                    _vm.ordersCreateForm.billing_address_line2,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.ordersCreateForm,
                                      "billing_address_line2",
                                      $$v
                                    )
                                  },
                                  expression:
                                    "ordersCreateForm.billing_address_line2"
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
                                label: "Billing Address Town",
                                prop: "billing_address_town"
                              }
                            },
                            [
                              _c("el-input", {
                                attrs: {
                                  autofocus: true,
                                  "auto-complete": "off"
                                },
                                model: {
                                  value:
                                    _vm.ordersCreateForm.billing_address_town,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.ordersCreateForm,
                                      "billing_address_town",
                                      $$v
                                    )
                                  },
                                  expression:
                                    "ordersCreateForm.billing_address_town"
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
                                label: "Billing Address County",
                                prop: "billing_address_county"
                              }
                            },
                            [
                              _c("el-input", {
                                attrs: {
                                  autofocus: true,
                                  "auto-complete": "off"
                                },
                                model: {
                                  value:
                                    _vm.ordersCreateForm.billing_address_county,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.ordersCreateForm,
                                      "billing_address_county",
                                      $$v
                                    )
                                  },
                                  expression:
                                    "ordersCreateForm.billing_address_county"
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
                                label: "Billing Address Postcode",
                                prop: "billing_address_postcode"
                              }
                            },
                            [
                              _c("el-input", {
                                attrs: {
                                  autofocus: true,
                                  "auto-complete": "off"
                                },
                                model: {
                                  value:
                                    _vm.ordersCreateForm
                                      .billing_address_postcode,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.ordersCreateForm,
                                      "billing_address_postcode",
                                      $$v
                                    )
                                  },
                                  expression:
                                    "ordersCreateForm.billing_address_postcode"
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
                                label: "Billing Address Country",
                                prop: "billing_address_country"
                              }
                            },
                            [
                              _c("el-input", {
                                attrs: {
                                  autofocus: true,
                                  "auto-complete": "off"
                                },
                                model: {
                                  value:
                                    _vm.ordersCreateForm
                                      .billing_address_country,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.ordersCreateForm,
                                      "billing_address_country",
                                      $$v
                                    )
                                  },
                                  expression:
                                    "ordersCreateForm.billing_address_country"
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
                    {
                      staticStyle: { "margin-top": "50px" },
                      attrs: { gutter: 20 }
                    },
                    [
                      _c(
                        "el-col",
                        { attrs: { md: 24 } },
                        [
                          _c(
                            "el-form-item",
                            {
                              attrs: {
                                label: "Shipping Address Same As Billing",
                                prop: "same_shipping_address"
                              }
                            },
                            [
                              _c("el-switch", {
                                attrs: {
                                  "active-color": "#13ce66",
                                  "inactive-color": "#ff4949"
                                },
                                model: {
                                  value:
                                    _vm.ordersCreateForm.same_shipping_address,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.ordersCreateForm,
                                      "same_shipping_address",
                                      $$v
                                    )
                                  },
                                  expression:
                                    "ordersCreateForm.same_shipping_address"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      !_vm.ordersCreateForm.same_shipping_address
                        ? _c(
                            "el-col",
                            { attrs: { md: 12 } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: "Shipping Address Line 1",
                                    prop: "shipping_address_line1"
                                  }
                                },
                                [
                                  _c("el-input", {
                                    attrs: {
                                      autofocus: true,
                                      "auto-complete": "off"
                                    },
                                    model: {
                                      value:
                                        _vm.ordersCreateForm
                                          .shipping_address_line1,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.ordersCreateForm,
                                          "shipping_address_line1",
                                          $$v
                                        )
                                      },
                                      expression:
                                        "ordersCreateForm.shipping_address_line1"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.ordersCreateForm.same_shipping_address
                        ? _c(
                            "el-col",
                            { attrs: { md: 12 } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: "Shipping Address Line 2",
                                    prop: "shipping_address_line2"
                                  }
                                },
                                [
                                  _c("el-input", {
                                    attrs: {
                                      autofocus: true,
                                      "auto-complete": "off"
                                    },
                                    model: {
                                      value:
                                        _vm.ordersCreateForm
                                          .shipping_address_line2,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.ordersCreateForm,
                                          "shipping_address_line2",
                                          $$v
                                        )
                                      },
                                      expression:
                                        "ordersCreateForm.shipping_address_line2"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.ordersCreateForm.same_shipping_address
                        ? _c(
                            "el-col",
                            { attrs: { md: 12 } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: "Shipping Address Town",
                                    prop: "shipping_address_town"
                                  }
                                },
                                [
                                  _c("el-input", {
                                    attrs: {
                                      autofocus: true,
                                      "auto-complete": "off"
                                    },
                                    model: {
                                      value:
                                        _vm.ordersCreateForm
                                          .shipping_address_town,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.ordersCreateForm,
                                          "shipping_address_town",
                                          $$v
                                        )
                                      },
                                      expression:
                                        "ordersCreateForm.shipping_address_town"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.ordersCreateForm.same_shipping_address
                        ? _c(
                            "el-col",
                            { attrs: { md: 12 } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: "Shipping Address County",
                                    prop: "shipping_address_county"
                                  }
                                },
                                [
                                  _c("el-input", {
                                    attrs: {
                                      autofocus: true,
                                      "auto-complete": "off"
                                    },
                                    model: {
                                      value:
                                        _vm.ordersCreateForm
                                          .shipping_address_county,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.ordersCreateForm,
                                          "shipping_address_county",
                                          $$v
                                        )
                                      },
                                      expression:
                                        "ordersCreateForm.shipping_address_county"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.ordersCreateForm.same_shipping_address
                        ? _c(
                            "el-col",
                            { attrs: { md: 12 } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: "Shipping Address Postcode",
                                    prop: "shipping_address_postcode"
                                  }
                                },
                                [
                                  _c("el-input", {
                                    attrs: {
                                      autofocus: true,
                                      "auto-complete": "off"
                                    },
                                    model: {
                                      value:
                                        _vm.ordersCreateForm
                                          .shipping_address_postcode,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.ordersCreateForm,
                                          "shipping_address_postcode",
                                          $$v
                                        )
                                      },
                                      expression:
                                        "ordersCreateForm.shipping_address_postcode"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.ordersCreateForm.same_shipping_address
                        ? _c(
                            "el-col",
                            { attrs: { md: 12 } },
                            [
                              _c(
                                "el-form-item",
                                {
                                  attrs: {
                                    label: "Shipping Address Country",
                                    prop: "shipping_address_country"
                                  }
                                },
                                [
                                  _c("el-input", {
                                    attrs: {
                                      autofocus: true,
                                      "auto-complete": "off"
                                    },
                                    model: {
                                      value:
                                        _vm.ordersCreateForm
                                          .shipping_address_country,
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.ordersCreateForm,
                                          "shipping_address_country",
                                          $$v
                                        )
                                      },
                                      expression:
                                        "ordersCreateForm.shipping_address_country"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        : _vm._e()
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "el-row",
                    {
                      staticStyle: { "margin-top": "50px" },
                      attrs: { gutter: 20 }
                    },
                    [
                      _c(
                        "el-col",
                        { attrs: { md: 12 } },
                        [
                          _vm.products
                            ? _c(
                                "el-form-item",
                                {
                                  attrs: { label: "Products", prop: "products" }
                                },
                                [
                                  _c(
                                    "el-select",
                                    {
                                      staticClass: "collection_type_select",
                                      staticStyle: { width: "100%" },
                                      attrs: {
                                        filterable: "",
                                        multiple: "",
                                        "allow-create": "",
                                        placeholder: "Select"
                                      },
                                      model: {
                                        value: _vm.ordersCreateForm.products,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.ordersCreateForm,
                                            "products",
                                            $$v
                                          )
                                        },
                                        expression: "ordersCreateForm.products"
                                      }
                                    },
                                    _vm._l(_vm.products, function(product) {
                                      return _c("el-option", {
                                        key: product.id,
                                        attrs: {
                                          label: product.name,
                                          value: product.id
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
            { attrs: { slot: "createButton" }, slot: "createButton" },
            [
              _c(
                "router-link",
                { attrs: { to: { name: "orders.step1" } } },
                [
                  _c(
                    "el-button",
                    {
                      staticClass: "create_btn",
                      attrs: { type: "primary", plain: "" }
                    },
                    [_vm._v("New Order")]
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
    require("vue-hot-reload-api")      .rerender("data-v-1e6ae6ea", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-48ef0a62\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepThree.vue":
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
          _c("el-breadcrumb-item", { attrs: { to: { name: "orders" } } }, [
            _vm._v("Orders")
          ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v("New Order")]),
          _vm._v(" "),
          _c(
            "el-breadcrumb-item",
            { attrs: { to: { name: "orders.step1" } } },
            [_vm._v("Step 1")]
          ),
          _vm._v(" "),
          _c(
            "el-breadcrumb-item",
            { attrs: { to: { name: "orders.step2" } } },
            [_vm._v("Step 2")]
          ),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v("Step 3")])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-row",
        { attrs: { align: "middle", type: "flex" } },
        [
          _c("el-col", { attrs: { span: 12 } }, [
            _c("h1", { staticClass: "page_title" }, [
              _vm._v("New Order "),
              _vm.order.id
                ? _c("span", [_vm._v(" - #" + _vm._s(_vm.order.id))])
                : _vm._e()
            ])
          ])
        ],
        1
      ),
      _vm._v(" "),
      Object.keys(_vm.orderErrors).length > 0
        ? _c("errors", { attrs: { errors: _vm.orderErrors } })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-form",
        {
          ref: "orderForm",
          attrs: { "label-position": "top", model: _vm.order },
          nativeOn: {
            submit: function($event) {
              $event.preventDefault()
            }
          }
        },
        [
          _c(
            "el-row",
            { attrs: { gutter: 20 } },
            [
              _c("el-col", { attrs: { md: 12 } }, [
                _c("h5", [_vm._v("Payment Information")])
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c("card-payment-form", {
            ref: "paymentForm",
            attrs: {
              form: _vm.order,
              loading: _vm.loading,
              "on-token-creation": _vm.onTokenCreation
            }
          }),
          _vm._v(" "),
          _c(
            "el-row",
            { staticStyle: { "margin-top": "40px" }, attrs: { gutter: 20 } },
            [
              _c(
                "el-col",
                { attrs: { md: { span: 24 } } },
                [
                  _c(
                    "el-button",
                    {
                      attrs: { type: "success", plain: "" },
                      on: {
                        click: function($event) {
                          _vm.processSubmit("orderForm")
                        }
                      }
                    },
                    [_vm._v("Complete Payment")]
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
    require("vue-hot-reload-api")      .rerender("data-v-48ef0a62", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-03d271d7\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepOne.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-03d271d7\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepOne.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("56121a1b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-03d271d7\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./NewOrderStepOne.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-03d271d7\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./NewOrderStepOne.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ac302b4\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ac302b4\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("088e5270", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ac302b4\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./ViewOrder.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ac302b4\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./ViewOrder.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1c3a22bd\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepTwo.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1c3a22bd\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepTwo.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("e693bf12", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1c3a22bd\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./NewOrderStepTwo.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1c3a22bd\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./NewOrderStepTwo.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1e6ae6ea\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1e6ae6ea\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("35e68954", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1e6ae6ea\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Orders.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1e6ae6ea\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Orders.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48ef0a62\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepThree.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48ef0a62\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepThree.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("170faa96", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48ef0a62\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./NewOrderStepThree.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48ef0a62\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./NewOrderStepThree.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./resources/assets/admin-spa/pages/orders/NewOrderStepOne.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-03d271d7\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepOne.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepOne.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-03d271d7\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepOne.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/orders/NewOrderStepOne.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-03d271d7", Component.options)
  } else {
    hotAPI.reload("data-v-03d271d7", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/admin-spa/pages/orders/NewOrderStepThree.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48ef0a62\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepThree.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepThree.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-48ef0a62\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepThree.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/orders/NewOrderStepThree.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-48ef0a62", Component.options)
  } else {
    hotAPI.reload("data-v-48ef0a62", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/admin-spa/pages/orders/NewOrderStepTwo.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1c3a22bd\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepTwo.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepTwo.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1c3a22bd\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/orders/NewOrderStepTwo.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/orders/NewOrderStepTwo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1c3a22bd", Component.options)
  } else {
    hotAPI.reload("data-v-1c3a22bd", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/admin-spa/pages/orders/Orders.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1e6ae6ea\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1e6ae6ea\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/orders/Orders.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/orders/Orders.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1e6ae6ea", Component.options)
  } else {
    hotAPI.reload("data-v-1e6ae6ea", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/admin-spa/pages/orders/ViewOrder.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ac302b4\",\"scoped\":false,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\"]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-1ac302b4\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/admin-spa/pages/orders/ViewOrder.vue")
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
Component.options.__file = "resources/assets/admin-spa/pages/orders/ViewOrder.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1ac302b4", Component.options)
  } else {
    hotAPI.reload("data-v-1ac302b4", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});
>>>>>>> new-order
