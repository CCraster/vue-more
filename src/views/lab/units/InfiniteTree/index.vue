<template>
  <div class="infinite-tree-wrapper" v-loading="loading">
    <div class="tree-wrapper" :style="{}" @scroll="throttleScroll">
      <tree
        v-model="jsonCode"
        :renderNodePosRange="renderNodePosRange"
        :is-infinite-tree="true"
      />
    </div>
    <!-- <codemirror
      :value="formatedJsonCode"
      :options="cmOption"
      class="json-wrapper"
    /> -->
    <div class="tool-wrapper">
      <el-input
        size="mini"
        placeholder="10, 3 => 节点数, 最大层数"
        style="width: 180px;margin-right: 5px"
        v-model="fakeConfig"
      ></el-input>
      <el-button type="primary" size="mini" @click="fakeData"
        >Fake Data</el-button
      >
    </div>
  </div>
</template>

<script>
import Tree from './components/Tree.vue'
import JSON5 from 'json5'
import {
  fakeTreeJsonData,
  setChildrenStatus,
  checkAncestorStatus,
  treeJson2List
} from './utils.js'
import { throttle, getValueFromPath } from '@/utils/util.js'
import { generateTreeNode } from './utils'

import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/selection/active-line.js'

export default {
  name: 'InfiniteTree',
  components: {
    codemirror,
    Tree
  },
  data() {
    return {
      fakeConfig: '50000, 3', // fake数据默认配置
      loading: false, // fake数据过程
      renderNodePosRange: [0, 100], // 记录需要渲染的节点的下标最小&最大值
      throttleScroll: () => {},
      jsonCode: [],
      nodeNum: 0, // 节点总数
      cmOption: {
        // tabSize: 2,
        readOnly: true,
        styleActiveLine: true,
        lineNumbers: true,
        // styleSelectedText: true,
        line: true,
        // foldGutter: true,
        // smartIndent: true,
        // gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        // highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        mode: 'text/javascript',
        // // hint.js options
        // hintOptions: {
        //   // 当匹配只有一项的时候是否自动补全
        //   completeSingle: false
        // },
        // //快捷键 可提供三种模式 sublime、emacs、vim
        // keyMap: 'sublime',
        // matchBrackets: true,
        // showCursorWhenSelecting: true,
        theme: 'default'
        // extraKeys: { Ctrl: 'autocomplete' }
      }
    }
  },
  computed: {
    formatedJsonCode() {
      return JSON5.stringify(this.jsonCode, false, 2)
    }
  },
  mounted() {
    this.jsonCode = fakeTreeJsonData(10000, 3)
    this.nodeNum = treeJson2List(this.jsonCode).length

    this.throttleScroll = throttle(this.onScroll, 50)

    this.$eventBus.$on('infiniteTree/changeNode', this.handleChangeNode)
    this.$eventBus.$on('infiniteTree/selectNode', this.handleSelectNode)
    this.$eventBus.$on('infiniteTree/openNode', this.handleOpenNode)
    this.$eventBus.$on('infiniteTree/deleteNode', this.handleDeleteNode)
    this.$eventBus.$on(
      'infiniteTree/addChildrenNode',
      this.handleAddChildrenNode
    )
    this.$eventBus.$on('infiniteTree/addBrotherNode', this.handleAddBrotherNode)
  },
  beforeDestroy() {
    this.$eventBus.$off('infiniteTree/changeNode', this.handleChangeNode)
    this.$eventBus.$off('infiniteTree/selectNode', this.handleSelectNode)
    this.$eventBus.$off('infiniteTree/openNode', this.handleOpenNode)
    this.$eventBus.$off('infiniteTree/deleteNode', this.handleDeleteNode)
    this.$eventBus.$off(
      'infiniteTree/addChildrenNode',
      this.handleAddChildrenNode
    )
    this.$eventBus.$off(
      'infiniteTree/addBrotherNode',
      this.handleAddBrotherNode
    )
  },
  methods: {
    fakeData() {
      let config = this.fakeConfig.split(',').map(d => parseInt(d))
      // this.loading = true
      // setTimeout(() => {
      //   console.time()
      //   this.jsonCode = fakeJsonData(...config)
      //   console.timeEnd()
      // }, 0)

      this.jsonCode = fakeTreeJsonData(...config)
      this.nodeNum = treeJson2List(this.jsonCode).length
      // this.$nextTick(() => {
      //   this.loading = false
      // })

      // setTimeout(() => {
      //   this.loading = false
      // }, 1000)
    },
    onScroll(e) {
      // console.log('start: ', Date.now())
      const config = {
        nodeHeight: 22, // 节点高度
        visibleOffset: 2 // 视窗上下visibleOffset个高度的节点渲染
      }
      // const nodeNum = parseInt(this.fakeConfig.split(',')[0])
      let scrollTop = e.target.scrollTop,
        targetHeight = e.target.clientHeight
      if (scrollTop !== 0 && !scrollTop) return

      let startVisiblePos = scrollTop - targetHeight * config.visibleOffset,
        endVisiblePos = scrollTop + targetHeight * (config.visibleOffset + 1)
      startVisiblePos = startVisiblePos > 0 ? startVisiblePos : 0
      endVisiblePos =
        endVisiblePos < config.nodeHeight * this.nodeNum
          ? endVisiblePos
          : config.nodeHeight * this.nodeNum
      this.renderNodePosRange = [
        Math.floor(startVisiblePos / config.nodeHeight),
        Math.ceil(endVisiblePos / config.nodeHeight)
      ]
      // console.log('end: ', Date.now())
    },
    makeNewJsonCode() {
      this.jsonCode = [...this.jsonCode]
    },
    // 增 - 增加兄弟节点
    handleAddBrotherNode(path) {
      let node = getValueFromPath(this.jsonCode, path.slice(0, -1))
      let addIndex = path[path.length - 1]
      node.splice(addIndex + 1, 0, generateTreeNode('new node'))
      this.makeNewJsonCode()
    },
    // 增 - 增加子节点
    handleAddChildrenNode(path) {
      let node = getValueFromPath(this.jsonCode, path)
      node.children.unshift(generateTreeNode('new node'))
      this.makeNewJsonCode()
    },
    // 删
    handleDeleteNode(path) {
      let node = getValueFromPath(this.jsonCode, path.slice(0, -1))
      let deleteIndex = path[path.length - 1]
      node.splice(deleteIndex, 1)
      this.makeNewJsonCode()
    },
    // 改
    handleChangeNode(path, newName) {
      let node = getValueFromPath(this.jsonCode, path)
      node.name = newName
      this.makeNewJsonCode()
    },
    // 选择node
    handleSelectNode(path, selected) {
      let node = getValueFromPath(this.jsonCode, path)
      setChildrenStatus(node, 'selected', selected) // 设置后代节点
      checkAncestorStatus(this.jsonCode, path.slice(0, -1), selected) // 检查祖先的选中状态
      this.makeNewJsonCode()
    },
    // 折叠 / 展开节点
    handleOpenNode(path) {
      let node = getValueFromPath(this.jsonCode, path)
      node.state.opened = !node.state.opened
      this.makeNewJsonCode()
    }
  }
}
</script>
<style lang="less">
.CodeMirror {
  height: 100%;
  // width: 100%;
}
</style>
<style lang="less" scoped>
.infinite-tree-wrapper {
  height: 100%;
  display: flex;
  flex-grow: 1;
  position: relative;
  .tree-wrapper {
    width: 50%;
    padding: 10px 8px;
    overflow: scroll;
    -webkit-overflow-scrolling: auto;
    .common-left-border-primary;
  }

  .json-wrapper {
    width: 50%;
    overflow: scroll;
    .common-left-border-primary;
  }

  .tool-wrapper {
    position: absolute;
    right: 10px;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 280px;
    height: 40px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: fadeout(@--color-primary, 80%);
    opacity: 0.7;
    z-index: 2;
  }
}
</style>
