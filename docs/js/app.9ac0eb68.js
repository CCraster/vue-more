(function(t){function e(e){for(var n,r,a=e[0],l=e[1],c=e[2],d=0,f=[];d<a.length;d++)r=a[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&f.push(i[r][0]),i[r]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(f.length)f.shift()();return s.push.apply(s,c||[]),o()}function o(){for(var t,e=0;e<s.length;e++){for(var o=s[e],n=!0,r=1;r<o.length;r++){var l=o[r];0!==i[l]&&(n=!1)}n&&(s.splice(e--,1),t=a(a.s=o[0]))}return t}var n={},i={app:0},s=[];function r(t){return a.p+"js/"+({about:"about"}[t]||t)+"."+{about:"3e4081be"}[t]+".js"}function a(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.e=function(t){var e=[],o=i[t];if(0!==o)if(o)e.push(o[2]);else{var n=new Promise(function(e,n){o=i[t]=[e,n]});e.push(o[2]=n);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,a.nc&&l.setAttribute("nonce",a.nc),l.src=r(t);var c=new Error;s=function(e){l.onerror=l.onload=null,clearTimeout(d);var o=i[t];if(0!==o){if(o){var n=e&&("load"===e.type?"missing":e.type),s=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+n+": "+s+")",c.name="ChunkLoadError",c.type=n,c.request=s,o[1](c)}i[t]=void 0}};var d=setTimeout(function(){s({type:"timeout",target:l})},12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(e)},a.m=t,a.c=n,a.d=function(t,e,o){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(o,n,function(e){return t[e]}.bind(null,n));return o},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/vue-more/",a.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var u=c;s.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"0e8d":function(t,e,o){t.exports=o.p+"img/todo-page-icon.c55469fe.jpg"},"21e0":function(t,e,o){"use strict";var n=o("c42c"),i=o.n(n);i.a},"232c":function(t,e,o){"use strict";var n=o("d024"),i=o.n(n);i.a},"2b02":function(t,e,o){"use strict";var n=o("cb2f"),i=o.n(n);i.a},"352e":function(t,e,o){},"4a85":function(t,e,o){"use strict";var n=o("9080"),i=o.n(n);i.a},"50be":function(t,e,o){"use strict";var n=o("74ba"),i=o.n(n);i.a},"556a":function(t,e,o){},"56d7":function(t,e,o){"use strict";o.r(e);o("cadf"),o("551c"),o("f751"),o("097d");var n=o("2b0e"),i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("router-view")],1)},s=[],r={},a=r,l=(o("afa2"),o("2877")),c=Object(l["a"])(a,i,s,!1,null,"6df37dce",null),d=c.exports,u=o("8c4f"),f=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"login"},[o("vue-particles",{staticClass:"particles",attrs:{color:"#453999",linesColor:"#453999"}}),o("LoginPanel")],1)},p=[],m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login-container"},[n("header",{staticClass:"login-header"},[n("img",{staticClass:"img-portrait",attrs:{id:"portrait-root",alt:"portrait-root",src:o("8aeb")},on:{click:function(e){return t.portraitClicked(e)}}}),n("img",{staticClass:"img-portrait",attrs:{id:"portrait-guest",alt:"portrait-guest",src:o("e8c9")},on:{click:function(e){return t.portraitClicked(e)}}}),n("span",[t._v(t._s(t.currentUser))])]),n("section",{staticClass:"login-content"},[n("div",{staticClass:"login-input-container"},[n("el-input",{directives:[{name:"show",rawName:"v-show",value:t.rootPortraitHighlighted,expression:"rootPortraitHighlighted"}],attrs:{placeholder:"输入暗号吧，少年",size:"small","prefix-icon":"el-icon-key","show-password":""},model:{value:t.loginPassword,callback:function(e){t.loginPassword=e},expression:"loginPassword"}}),n("span",{directives:[{name:"show",rawName:"v-show",value:t.rootPortraitHighlighted,expression:"rootPortraitHighlighted"}],staticClass:"login-forget-tip",on:{click:t.forgetPasswordLinkClicked}},[t._v("忘记密码?")]),n("span",{directives:[{name:"show",rawName:"v-show",value:!t.rootPortraitHighlighted,expression:"!rootPortraitHighlighted"}],staticClass:"login-guest-tip"},[t._v("你可以选择「登陆」查看受限内容，或者，尝试一下「有东西」。")])],1),n("div",{staticClass:"login-button-container"},[n("el-button",{attrs:{size:"small",type:"primary",plain:""},on:{click:function(e){return t.handleLoginButtonClick("login")}}},[t._v("登陆")]),n("el-button",{attrs:{size:"small",type:"warning",plain:""},on:{click:function(e){return t.handleLoginButtonClick("cancel")}}},[t._v("\n                "+t._s(t.rootPortraitHighlighted?"取消":"有东西")+"\n            ")])],1)])])},h=[],g=(o("8e6e"),o("ac6a"),o("456d"),o("96cf"),o("3b8d")),v=o("bd86"),b=o("01e8"),O=o.n(b);n["default"].use(O.a);var C=n["default"].prototype.$anime;function w(t){var e=1300;C({targets:t,easing:"easeInOutBack",duration:e,top:["75%","25%"],opacity:[0,1]})}function y(t,e,o){var n=500,i=C.timeline({easing:"easeInOutQuad",autoplay:!1,duration:n}).add({targets:t,width:[80,30],translateX:function(){return"#portrait-root"===t?[-40,-70]:[-40,40]},translateY:[-40,-15],rotateY:[0,150]}).add({targets:e,width:[30,80],translateX:function(){return"#portrait-root"===t?[40,-40]:[-70,-40]},translateY:[-15,-40],rotateY:[150,0]},0).add({targets:o,backgroundColor:function(){return"#portrait-root"===t?["rgba(123, 195, 253, 0.745)","rgba(246, 117, 5, 0.745)"]:["rgba(246, 117, 5, 0.745)","rgba(123, 195, 253, 0.745)"]}},0);return i}var T=o("bc3a"),k=o.n(T),j=o("5c96"),P=o.n(j);function _(t){var e=t.url,o=t.data,n=t.method;return k.a[n||"post"](e,o).then(function(t){return console.log(t),t}).catch(function(t){j["Message"].error(t),console.log(t)})}k.a.defaults.headers.common["Authorization"]="token ba3a1e6ed492de21ee63de53400f8ccf2a08663e";var N="https://api.github.com",D="6f63ac9cf42770a1ab4699b1620a8729",x="85649915f0fac602008b7e1b3f485337",$="add-todolist-item",I="edit-item",S="delete-item",R=[{name:"博客",index:"blog"},{name:"Todo List",index:"todolist"},{name:"我，这只咸鱼",index:"aboutme"}],B=[{name:"博客",index:"blog"},{name:"我，这只咸鱼",index:"aboutme"}];function E(t){return _({url:"".concat(N,"/gists/").concat(t),method:"get"})}function L(t,e){var o={files:Object(v["a"])({},e.oldFileName,{content:JSON.stringify(e),filename:e.fileName})};return _({url:"".concat(N,"/gists/").concat(t),data:o,method:"patch"})}function H(t,e){var o={files:Object(v["a"])({},e.fileName,{content:JSON.stringify(e)})};return _({url:"".concat(N,"/gists/").concat(t),data:o,method:"patch"})}function M(t,e){var o={files:Object(v["a"])({},e,null)};return _({url:"".concat(N,"/gists/").concat(t),data:o,method:"patch"})}function A(t){return t.data.files}var U=o("2f62");function z(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),o.push.apply(o,n)}return o}function J(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?z(o,!0).forEach(function(e){Object(v["a"])(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):z(o).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}var F={name:"LoginPanel",data:function(){return{rootPortraitHighlighted:!0,rootPortraitHighlight:null,guestPortraitHighlight:null,loginPassword:""}},computed:J({},Object(U["c"])(["isRootUserLogin"]),{currentUser:function(){return this.rootPortraitHighlighted?"Craster":"Guest"}}),mounted:function(){w(".login-container"),this.rootPortraitHighlight=y("#portrait-guest","#portrait-root",".login-container"),this.guestPortraitHighlight=y("#portrait-root","#portrait-guest",".login-container")},methods:J({},Object(U["b"])(["setIsRootUserLogin"]),{portraitClicked:function(t){var e=t.target.id;"portrait-root"===e&&!1===this.rootPortraitHighlighted?(this.rootPortraitHighlight.play(),this.rootPortraitHighlighted=!0):"portrait-guest"===e&&!0===this.rootPortraitHighlighted&&(this.guestPortraitHighlight.play(),this.rootPortraitHighlighted=!1)},forgetPasswordLinkClicked:function(){this.$message({message:"重置密码什么的是不可能有的啦，密码都能忘，还是别登陆了！",type:"warning"})},handleLoginButtonClick:function(){var t=Object(g["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:"login"===e?this.rootPortraitHighlighted?this.handleRootUserLogin():this.handleGuestUserLogin():this.rootPortraitHighlighted?this.$message({message:"抱歉，「取消」功能是根据颜值开启的！",type:"error"}):this.$message({message:"抱歉，「访客有东西」功能仍在开发中！",type:"warning"});case 1:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),handleRootUserLogin:function(){var t=Object(g["a"])(regeneratorRuntime.mark(function t(){var e,o;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(this.loginPassword){t.next=3;break}return this.$message({message:"请输入密码以登陆！",type:"warning"}),t.abrupt("return");case 3:return t.next=5,E(D);case 5:e=t.sent,o=JSON.parse(A(e)["user.js"].content),this.loginPassword===o.password?(this.$message({message:"Bingo, welcome!",type:"success"}),this.setIsRootUserLogin(),this.$router.push("home")):this.$message({message:"抱歉，您输入的密码有误！",type:"error"});case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),handleGuestUserLogin:function(){this.$message({message:"可惜，你其实可以做的更好！",type:"warning"}),this.$router.push("home")}})},Y=F,G=(o("a28f"),Object(l["a"])(Y,m,h,!1,null,"1a982b9d",null)),V=G.exports,X={name:"Login",components:{LoginPanel:V},data:function(){return{}},mounted:function(){},computed:{},methods:{}},q=X,Q=(o("21e0"),Object(l["a"])(q,f,p,!1,null,"11401db7",null)),K=Q.exports,W=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("div",{staticClass:"home-header"},[n("img",{attrs:{src:o("93d3")}}),n("el-menu",{staticClass:"header-menu",attrs:{"default-active":t.activeMenu,mode:"horizontal","background-color":"#007add","text-color":"#fff","active-text-color":"#f67505"},on:{select:t.handleMenuSelect}},t._l(t.userMenu,function(e){return n("el-menu-item",{key:e.index,attrs:{index:e.index}},[t._v(t._s(e.name))])}),1),n("div",{staticClass:"header-user"},[t._v("Hi, "+t._s(t.loginUserName)+"!")])],1),n("div",{staticClass:"home-main"},[n(t.menus[t.activeMenu],{tag:"component"})],1),n("div",{staticClass:"home-footer"},[n("Footer")],1)])},Z=[],tt=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},et=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"container-footer"},[o("span",[t._v("Today is less, tomorrow will more.")]),o("span",[t._v("Copyright© 2019")])])}],ot=(o("232c"),{}),nt=Object(l["a"])(ot,tt,et,!1,null,"3517711c",null),it=nt.exports,st=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},rt=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-todoPage"},[n("img",{staticClass:"img-portrait",attrs:{alt:"todo-page-icon",src:o("0e8d")}}),n("span",[t._v("别急，努力搬砖中")])])}],at=(o("50be"),{}),lt=Object(l["a"])(at,st,rt,!1,null,"d3b1c654",null),ct=lt.exports,dt=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"container-todolist"},[o("TodolistNav",{staticClass:"container-todolist-nav",attrs:{todolists:t.todolists}}),o("TodolistDetail",{staticClass:"container-todolist-detail",attrs:{todolistData:t.todolists[t.selectedTodolistName]}}),o("TodolistEditor",{staticClass:"container-todolist-editor",attrs:{selectedBlockData:t.selectedBlockData}}),o("AddTagDialog",{attrs:{visible:t.showAddTagDialog,options:t.addTagDialogConfig.options},on:{"add-todolist":t.addTodoList,"update:visible":function(e){t.showAddTagDialog=e}}})],1)},ut=[],ft=new n["default"],pt=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-dialog",{staticClass:"add-tag-dialog",attrs:{title:t.options.title,visible:t.visible,width:"380px"},on:{"update:visible":t.updateVisible}},[o("div",{staticClass:"add-tag-nameContainer"},[o("span",[t._v("Todolist名称：")]),o("el-input",{staticClass:"add-tag-nameContainer-nameInput",attrs:{placeholder:"请输入todolist名称",maxlength:"8",size:"small","show-word-limit":""},model:{value:t.options.todolistName,callback:function(e){t.$set(t.options,"todolistName",e)},expression:"options.todolistName"}})],1),o("div",{staticClass:"add-tag-colorContainer"},[o("span",[t._v("颜色标志：")]),o("el-color-picker",{attrs:{size:"small",predefine:t.predefineColors,"show-alpha":""},model:{value:t.options.todolistColor,callback:function(e){t.$set(t.options,"todolistColor",e)},expression:"options.todolistColor"}})],1),o("div",{staticClass:"add-tag-buttonsContainer"},[o("el-button",{attrs:{size:"small"},on:{click:function(e){return t.updateVisible(!1)}}},[t._v("取消")]),o("el-button",{attrs:{size:"small"},on:{click:t.confirmAddTodolist}},[t._v("确认")])],1)])},mt=[],ht={name:"AddTagDialog",props:{visible:{type:Boolean,default:!1},options:{type:Object,default:function(){}}},data:function(){return{predefineColors:["#ff4500","#ff8c00","#ffd700","#90ee90","#00ced1","#1e90ff","#c71585","rgba(255, 69, 0, 0.68)","rgb(255, 120, 0)","hsv(51, 100, 98)","hsva(120, 40, 94, 0.5)","hsl(181, 100%, 37%)","hsla(209, 100%, 56%, 0.73)","#c7158577"]}},computed:{todolistData:function(){return{oldFileName:"create"===this.options.type?this.options.todolistName:this.options.oldTodolistName,fileName:this.options.todolistName,todolistColor:this.options.todolistColor,todolistContent:this.options.todolistContent}}},methods:{updateVisible:function(t){this.$emit("update:visible",t)},confirmAddTodolist:function(){""!==this.options.todolistName?(this.$emit("add-todolist",this.todolistData),this.updateVisible(!1)):this.$message({message:"请输入Todolist名称！",type:"error"})}}},gt=ht,vt=(o("c327"),Object(l["a"])(gt,pt,mt,!1,null,null,null)),bt=vt.exports,Ot=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"todolist-nav"},[o("div",{staticClass:"common-content-title"},[t._v("Todo List")]),o("div",{staticClass:"todolist-nav-items"},t._l(t.todolists,function(t,e){return o("Rag",{key:e,attrs:{todolist:t}})}),1),o("div",{staticClass:"todolist-nav-add"},[o("i",{staticClass:"el-icon-circle-plus-outline",on:{click:t.handleAddTodolistIconClicked}})])])},Ct=[],wt=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"container-tag",class:{selectedRag:t.isSelected},style:{backgroundColor:t.todolistContent.todolistColor},on:{click:function(e){return t.handleTodolistRagClicked(t.todolistContent.fileName)}}},[o("span",[t._v(t._s(t.todolistContent.fileName))]),o("i",{staticClass:"el-icon-circle-close",on:{click:t.handleDeleteIconClicked}}),o("i",{staticClass:"el-icon-setting",on:{click:t.handleSettingIconClicked}})])},yt=[];function Tt(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),o.push.apply(o,n)}return o}function kt(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?Tt(o,!0).forEach(function(e){Object(v["a"])(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):Tt(o).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}var jt={name:"Rag",props:["todolist"],computed:kt({},Object(U["c"])(["selectedTodolistName"]),{todolistContent:function(){return JSON.parse(this.todolist.content)},isSelected:function(){return this.todolist.filename===this.selectedTodolistName}}),methods:kt({},Object(U["b"])(["setSelectedTodolistName"]),{handleTodolistRagClicked:function(t){t===this.selectedTodolistName?this.setSelectedTodolistName(""):this.setSelectedTodolistName(t)},handleDeleteIconClicked:function(){var t=this;this.$confirm("确认要删除Todolist「".concat(this.todolist.filename,"」吗，删除后将不可恢复？"),"提示",{type:"warning"}).then(function(){ft.$emit("delete-todolist",t.todolist.filename)}).catch(function(t){console.log(t)})},handleSettingIconClicked:function(){ft.$emit("reconfig-todolist",this.todolist.filename)}})},Pt=jt,_t=(o("4a85"),Object(l["a"])(Pt,wt,yt,!1,null,null,null)),Nt=_t.exports,Dt={name:"TodolistNav",components:{Rag:Nt},props:{todolists:{type:Object,default:function(){}}},methods:{handleAddTodolistIconClicked:function(){ft.$emit("show-add-dialog")}}},xt=Dt,$t=(o("d091"),Object(l["a"])(xt,Ot,Ct,!1,null,null,null)),It=$t.exports,St=function(){var t=this,e=t.$createElement,o=t._self._c||e;return t.todolistData?o("div",{staticClass:"todolistDetail"},t._l(t.todolistContent.todolistContent,function(e,n){return o("TodolistBlock",{key:n,attrs:{singleTodolist:e,todolistColor:t.todolistContent.todolistColor}})}),1):o("div",{staticClass:"hasNoSelectedTodolist"},[t._v("还没选择Todolist！")])},Rt=[],Bt=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"container-todolist-items",style:{backgroundColor:t.rgbaOpacityReset(t.todolistColor,.5)},on:{click:t.handleBlockSelected}},[o("div",t._l(t.singleTodolist.todolistItemContent,function(e,n){return o("span",{key:n,staticClass:"todolistItem-uneditable",class:{"todolist-conplete":e.finished},attrs:{itemContent:e}},[t._v("\n            "+t._s(n+1+". "+e.itemContent)+"\n        ")])}),0)])},Et=[];function Lt(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),o.push.apply(o,n)}return o}function Ht(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?Lt(o,!0).forEach(function(e){Object(v["a"])(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):Lt(o).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}var Mt={name:"TodolistBlock",components:{},props:{singleTodolist:{type:Object,default:function(){}},todolistColor:{type:String,default:"#666"}},computed:Ht({},Object(U["c"])(["selectedBlockName"])),methods:Ht({},Object(U["b"])(["setSelectedBlockName"]),{rgbaOpacityReset:function(t,e){return t.slice(0,t.lastIndexOf(",")+1)+e+")"},handleBlockSelected:function(){this.setSelectedBlockName(this.singleTodolist.todolistItemName)}})},At=Mt,Ut=(o("a448"),Object(l["a"])(At,Bt,Et,!1,null,null,null)),zt=Ut.exports,Jt={name:"TodolistDetail",components:{TodolistBlock:zt},props:{todolistData:{type:Object,default:function(){}}},computed:{todolistContent:function(){return this.todolistData?JSON.parse(this.todolistData.content):{}}}},Ft=Jt,Yt=(o("2b02"),Object(l["a"])(Ft,St,Rt,!1,null,null,null)),Gt=Yt.exports,Vt=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"container-editor"},[o("div",{staticClass:"common-content-title"},[t._v("Todolist编辑")]),o("div",{staticClass:"container-edit-item"},t._l(t.blockItemsData,function(t,e){return o("TodolistItem",{key:e,attrs:{itemContent:t,itemIndex:e}})}),1),o("div",{staticClass:"container-add-item"},[o("el-color-picker",{staticClass:"editor-color-picker",attrs:{slot:"prepend",size:"small"},slot:"prepend",model:{value:t.newItem.itemColor,callback:function(e){t.$set(t.newItem,"itemColor",e)},expression:"newItem.itemColor"}}),o("el-input",{staticClass:"editor-add-input",attrs:{placeholder:"todolist item content",size:"small"},model:{value:t.newItem.itemContent,callback:function(e){t.$set(t.newItem,"itemContent",e)},expression:"newItem.itemContent"}},[o("el-button",{attrs:{slot:"append",size:"small"},on:{click:t.addTodolistItem},slot:"append"},[t._v("添加")])],1)],1)])},Xt=[],qt=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("input",{attrs:{type:"checkbox"},domProps:{checked:t.itemContent.finished},on:{change:t.handleItemChecked}}),o("span",[t._v(t._s(t.itemContent.itemContent))]),o("i",{staticClass:"el-icon-circle-close",on:{click:t.handleDeleteItemIconClicked}})])},Qt=[],Kt=(o("c5f6"),{name:"TodolistItem",props:{itemContent:{type:Object,default:function(){}},itemIndex:{type:Number}},methods:{handleItemChecked:function(t){this.itemContent.finished=t.target.checked,this.itemContent.lastModifiedTime=(new Date).valueOf(),ft.$emit(I,this.itemContent,this.itemIndex)},handleDeleteItemIconClicked:function(){ft.$emit(S,this.itemIndex)}}}),Wt=Kt,Zt=Object(l["a"])(Wt,qt,Qt,!1,null,null,null),te=Zt.exports,ee={name:"TodolistEditor",components:{TodolistItem:te},data:function(){return{newItem:{itemColor:"#aaa",itemContent:"",createdTime:"",lastModifiedTime:"",finished:!1}}},props:{selectedBlockData:{type:Object,default:function(){}}},computed:{blockItemsData:function(){return this.selectedBlockData?this.selectedBlockData.todolistItemContent:{}}},methods:{addTodolistItem:function(){this.newItem.lastModifiedTime=this.newItem.createdTime=(new Date).valueOf(),ft.$emit($,this.newItem)}}},oe=ee,ne=(o("d887"),Object(l["a"])(oe,Vt,Xt,!1,null,null,null)),ie=ne.exports;function se(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),o.push.apply(o,n)}return o}function re(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?se(o,!0).forEach(function(e){Object(v["a"])(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):se(o).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}var ae={name:"TodoList",components:{AddTagDialog:bt,TodolistNav:It,TodolistDetail:Gt,TodolistEditor:ie},data:function(){return{todolists:{},showAddTagDialog:!1,addTagDialogConfig:{options:{type:"",title:"",todolistName:"",todolistColor:"",todolistContent:{}}}}},computed:re({},Object(U["c"])(["selectedTodolistName","selectedBlockName"]),{selectedBlockData:function(){return this.selectedTodolistName?JSON.parse(this.todolists[this.selectedTodolistName].content)["todolistContent"][this.selectedBlockName]:{}}}),watch:{todolists:{deep:!0,handler:function(){}}},beforeMount:function(){this.getTodolist()},mounted:function(){ft.$on("delete-todolist",this.deleteTodolist),ft.$on("reconfig-todolist",this.reconfigTodolist),ft.$on("show-add-dialog",this.showAddTodolistDialog),ft.$on($,this.addTodolistItem),ft.$on(I,this.editBlockItem),ft.$on(S,this.deleteBlockItem)},beforeDestroy:function(){ft.$off("delete-todolist",this.deleteTodolist),ft.$off("reconfig-todolist",this.reconfigTodolist),ft.$off("show-add-dialog",this.showAddTodolistDialog),ft.$off($,this.addTodolistItem)},methods:{getTodolist:function(){var t=Object(g["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.t0=A,t.next=3,E(x);case 3:t.t1=t.sent,this.todolists=(0,t.t0)(t.t1);case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),showAddTodolistDialog:function(){this.addTagDialogConfig.options={type:"create",title:"新建Todo List",todolistName:"",todolistColor:"rgba(0, 122, 221, 0.8)",todolistContent:{}},this.showAddTagDialog=!0},addTodoList:function(){var t=Object(g["a"])(regeneratorRuntime.mark(function t(e){var o,n,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,L(x,e);case 2:o=t.sent,200===o.status?(n="create"===this.addTagDialogConfig.options.type?"新Todolist添加成功！":"更改Todolist配置成功！",this.$message.success(n),this.todolists=A(o)):(i="create"===this.addTagDialogConfig.options.type?"添加Todolist失败！":"更改Todolist配置失败！",this.$message.error(i));case 4:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),deleteTodolist:function(){var t=Object(g["a"])(regeneratorRuntime.mark(function t(e){var o;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,M(x,e);case 2:o=t.sent,200===o.status?(this.$message.success("Todolist删除成功！"),this.todolists=A(o)):this.$message.error("Todolist删除失败！");case 4:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),reconfigTodolist:function(t){var e=JSON.parse(this.todolists[t].content);this.addTagDialogConfig.options={type:"reconfig",title:"更改配置",oldTodolistName:e.fileName,todolistName:e.fileName,todolistColor:e.todolistColor,todolistContent:e.todolistContent},this.showAddTagDialog=!0},addTodolistItem:function(){var t=Object(g["a"])(regeneratorRuntime.mark(function t(e){var o,n,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return o=this.getTodayDate(),n=JSON.parse(this.todolists[this.selectedTodolistName].content),n.todolistContent[o]||(n.todolistContent[o]={todolistItemName:o,todolistItemContent:[],createdTime:(new Date).valueOf(),lastModifiedTime:(new Date).valueOf()}),n.todolistContent[o].todolistItemContent.push(e),n.todolistContent[o].lastModifiedTime=(new Date).valueOf(),t.next=6,H(x,n);case 6:i=t.sent,200===i.status?(this.$message.success("添加Todolist Item成功！"),this.todolists=A(i)):this.$message.error("添加Todolist Item失败！");case 8:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),editBlockItem:function(){var t=Object(g["a"])(regeneratorRuntime.mark(function t(e,o){var n,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=JSON.parse(this.todolists[this.selectedTodolistName].content),n.todolistContent[this.selectedBlockName].lastModifiedTime=e.lastModifiedTime,n.todolistContent[this.selectedBlockName]["todolistItemContent"][o]=e,t.next=5,H(x,n);case 5:i=t.sent,200===i.status?(this.$message.success("Todolist Item「更改状态」成功！"),this.todolists=A(i)):this.$message.error("Todolist Item「更改状态」失败！");case 7:case"end":return t.stop()}},t,this)}));function e(e,o){return t.apply(this,arguments)}return e}(),deleteBlockItem:function(){var t=Object(g["a"])(regeneratorRuntime.mark(function t(e){var o,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return o=JSON.parse(this.todolists[this.selectedTodolistName].content),o.todolistContent[this.selectedBlockName].lastModifiedTime=(new Date).valueOf(),o.todolistContent[this.selectedBlockName]["todolistItemContent"].splice(e,1),t.next=5,H(x,o);case 5:n=t.sent,200===n.status?(this.$message.success("Todolist Item「删除」成功！"),this.todolists=A(n)):this.$message.error("Todolist Item「删除」失败！");case 7:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),getTodayDate:function(){var t=new Date,e=2;return t.getFullYear()+(Array(e).join("0")+(t.getMonth()+1)).slice(-e)+(Array(e).join("0")+t.getDate()).slice(-e)}}},le=ae,ce=(o("f910"),Object(l["a"])(le,dt,ut,!1,null,null,null)),de=ce.exports;function ue(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),o.push.apply(o,n)}return o}function fe(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?ue(o,!0).forEach(function(e){Object(v["a"])(t,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):ue(o).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))})}return t}var pe={name:"Home",components:{Footer:it,TodoPage:ct},data:function(){return{menus:{blog:ct,todolist:de,aboutme:ct}}},computed:fe({},Object(U["c"])(["isRootUserLogin"]),{userMenu:function(){return this.isRootUserLogin?R:B},activeMenu:function(){return this.$route.params.menuName},loginUserName:function(){return this.isRootUserLogin?"Craster":"Guest"}}),methods:{handleMenuSelect:function(t){this.activeMenu!==t&&this.$router.push(t)}}},me=pe,he=(o("de16"),Object(l["a"])(me,W,Z,!1,null,null,null)),ge=he.exports;n["default"].use(u["a"]);var ve=new u["a"]({routes:[{path:"/",name:"login",component:K},{path:"/home",redirect:"/home/todolist"},{path:"/home/:menuName",component:ge},{path:"/about",name:"about",component:function(){return o.e("about").then(o.bind(null,"f820"))}}]});n["default"].use(U["a"]);var be=new U["a"].Store({state:{isRootUserLogin:!1,selectedTodolistName:"",selectedBlockName:""},getters:{},mutations:{setIsRootUserLogin:function(t){t.isRootUserLogin=!0},setSelectedTodolistName:function(t,e){t.selectedTodolistName=e},setSelectedBlockName:function(t,e){t.selectedBlockName=e}},actions:{}}),Oe=(o("0fae"),o("98c9"));o("352e");n["default"].use(P.a),n["default"].use(O.a),n["default"].use(Oe["a"]),n["default"].config.productionTip=!1,new n["default"]({router:ve,store:be,render:function(t){return t(d)}}).$mount("#app")},"656c":function(t,e,o){},"74ba":function(t,e,o){},"8aeb":function(t,e,o){t.exports=o.p+"img/root.c9e17205.png"},9080:function(t,e,o){},"93d3":function(t,e,o){t.exports=o.p+"img/logo_1.50c2f0ec.png"},"963a":function(t,e,o){},9710:function(t,e,o){},"974a":function(t,e,o){},"988d":function(t,e,o){},a28f:function(t,e,o){"use strict";var n=o("656c"),i=o.n(n);i.a},a448:function(t,e,o){"use strict";var n=o("556a"),i=o.n(n);i.a},ad24:function(t,e,o){},afa2:function(t,e,o){"use strict";var n=o("963a"),i=o.n(n);i.a},c327:function(t,e,o){"use strict";var n=o("988d"),i=o.n(n);i.a},c42c:function(t,e,o){},cb2f:function(t,e,o){},d024:function(t,e,o){},d091:function(t,e,o){"use strict";var n=o("9710"),i=o.n(n);i.a},d887:function(t,e,o){"use strict";var n=o("974a"),i=o.n(n);i.a},de16:function(t,e,o){"use strict";var n=o("f3e7"),i=o.n(n);i.a},e8c9:function(t,e,o){t.exports=o.p+"img/guest.66202463.png"},f3e7:function(t,e,o){},f910:function(t,e,o){"use strict";var n=o("ad24"),i=o.n(n);i.a}});