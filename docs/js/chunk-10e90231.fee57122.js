(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10e90231"],{"7cfb":function(e,t,o){},dbec:function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"node-wrapper",class:{"node-focus":e.isNodeFocus},style:e.nodeStyle,on:{click:e.onNodeClick}},[o("span",{staticClass:"check-box",class:{checked:e.treeNode.state.selected},on:{click:function(t){return t.stopPropagation(),e.onSelectNode(t)}}}),o("span",{class:{"el-icon-folder-remove":!e.treeNode.isLeaf&&e.treeNode.state.opened,"el-icon-folder-add":!e.treeNode.isLeaf&&!e.treeNode.state.opened,"el-icon-price-tag":e.treeNode.isLeaf},style:{marginRight:"4px",transform:e.treeNode.isLeaf?"rotate(0.5turn)":"none"},on:{click:function(t){return t.stopPropagation(),e.onNodeOpenClick(t)}}}),o("span",{class:{},attrs:{contenteditable:""},on:{click:function(e){e.stopPropagation()},blur:e.onNodeBlur}},[e._v(e._s(e.treeNode.name))])])},i=[],s=(o("7f7f"),o("c5f6"),{name:"TreeNode",props:{treeNode:{type:Object,default:function(){}},tabSize:{type:Number,default:8},translateY:{type:Number,default:0},isNodeFocus:{type:Boolean,default:!1}},data:function(){return{}},computed:{nodeDepth:function(){return this.treeNode.path.reduce(function(e,t){return"children"===t?e:e+1},0)},nodeStyle:function(){return{paddingLeft:this.tabSize*(this.nodeDepth-1)+"px",transform:"translate(0, ".concat(this.translateY,"px)")}}},methods:{onNodeOpenClick:function(){!this.treeNode.isLeaf&&this.$eventBus.$emit("infiniteTree/openNode",this.treeNode.path)},onSelectNode:function(){this.$eventBus.$emit("infiniteTree/selectNode",this.treeNode.path,!this.treeNode.state.selected)},onNodeClick:function(){var e=this.isNodeFocus?null:this.treeNode;this.$emit("setFocusNode",e)},onNodeBlur:function(e){e.target.innerHTML!==this.treeNode.name&&this.$eventBus.$emit("infiniteTree/changeNode",this.treeNode.path,e.target.innerHTML)}}}),d=s,r=(o("e091"),o("2877")),a=Object(r["a"])(d,n,i,!1,null,"848372cc",null);t["default"]=a.exports},e091:function(e,t,o){"use strict";var n=o("7cfb"),i=o.n(n);i.a},e326:function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{style:{position:"relative",height:22*e.totalNodeList.length+"px"},on:{mouseenter:function(t){return e.handleMouseEnter(!0)},mouseleave:function(t){return e.handleMouseEnter(!1)}}},e._l(e.shouldRenderNodeList,function(t,n){return o("tree-node",{key:t.id,attrs:{treeNode:t,tabSize:e.tabSize,translateY:(e.renderNodePosRange[0]+n)*e.treeNodeHeight,isNodeFocus:e.focusNode&&t.id===e.focusNode.id},on:{setFocusNode:e.handleSetFocusNode}})}),1)},i=[],s=o("75fc"),d=o("dbec"),r=o("b0c3"),a={name:"Tree",props:{value:{type:Array,default:function(){return[]}},renderNodePosRange:{type:Array,default:function(){return[]}},isInfiniteTree:{type:Boolean,default:!0}},components:{TreeNode:d["default"]},data:function(){return{shouldRenderNodeList:[],focusNode:null,isTreeFocus:!1,tabSize:16,treeNodeHeight:22}},watch:{value:{immediate:!0,handler:function(e){this.totalNodeList=Object(r["treeJson2List"])(e),this.computeShouldRenderNodeList()}},renderNodePosRange:{handler:function(){this.computeShouldRenderNodeList()}}},mounted:function(){window.addEventListener("keyup",this.handleKeyUp)},beforeDestroy:function(){window.removeEventListener("keyup",this.handleKeyUp)},methods:{computeShouldRenderNodeList:function(){var e;2===this.renderNodePosRange.length?(this.shouldRenderNodeList.length=0,(e=this.shouldRenderNodeList).push.apply(e,Object(s["a"])(this.totalNodeList.slice(this.renderNodePosRange[0],this.renderNodePosRange[1])))):this.shouldRenderNodeList=this.totalNodeList},handleMouseEnter:function(e){this.isTreeFocus=e},handleKeyUp:function(e){this.isTreeFocus&&this.focusNode&&(8===e.keyCode&&(this.$eventBus.$emit("infiniteTree/deleteNode",this.focusNode.path),this.focusNode=null),13===e.keyCode&&this.$eventBus.$emit("infiniteTree/addChildrenNode",this.focusNode.path),9===e.keyCode&&this.$eventBus.$emit("infiniteTree/addBrotherNode",this.focusNode.path))},handleSetFocusNode:function(e){this.focusNode=e}}},u=a,c=o("2877"),l=Object(c["a"])(u,n,i,!1,null,"4dd18c21",null);t["default"]=l.exports}}]);