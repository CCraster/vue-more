(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-14775f78"],{"76bb":function(t,n,i){},b634:function(t,n,i){"use strict";var e=i("76bb"),s=i.n(e);s.a},e7e8:function(t,n,i){"use strict";i.r(n);var e=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"container"},[i("div",{staticClass:"items"},t._l(t.divNames,function(n,e){return i("div",{key:e,staticClass:"item"},[t._v("\n      "+t._s(n)+"\n    ")])}),0),i("div",{staticClass:"container-button"},[i("el-button",{on:{click:t.randomScroll}},[t._v("滚动")]),i("span",{staticClass:"tip"},[t._v(t._s(t.tip))])],1)])},s=[],o={name:"ScrollAnimation",data:function(){return{divNames:["第1个div","第2个div","第3个div","第4个div","第5个div","第6个div","第7个div","第8个div","第9个div","第10个div","第11个div","第12个div"],tip:""}},methods:{randomScroll:function(){var t=document.getElementsByClassName("items")[0],n=(t.scrollWidth-t.clientWidth)*Math.random();this.tip="".concat(t.scrollLeft," -> ").concat(n),this.scrollTo(t,n,"strongEaseOut",300)},scrollTo:function(t,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"easeIn",e=arguments.length>3&&void 0!==arguments[3]?arguments[3]:300,s={linear:function(t,n,i,e){return i*t/e+n},easeIn:function(t,n,i,e){return i*(t/=e)*t+n},strongEaseIn:function(t,n,i,e){return i*(t/=e)*t*t*t*t+n},strongEaseOut:function(t,n,i,e){return i*((t=t/e-1)*t*t*t*t+1)+n},sineaseIn:function(t,n,i,e){return i*(t/=e)*t*t+n},sineaseOut:function(t,n,i,e){return i*((t=t/e-1)*t*t+1)+n}},o=t.scrollLeft,r=null,a=function a(c){r||(r=c);var l=s[i](c-r,o,n-o,e);t.scrollLeft=l,console.log(t.scrollLeft),(o>n&&t.scrollLeft>n||o<n&&t.scrollLeft<n)&&requestAnimationFrame(a)};requestAnimationFrame(a)}}},r=o,a=(i("b634"),i("2877")),c=Object(a["a"])(r,e,s,!1,null,null,null);n["default"]=c.exports}}]);