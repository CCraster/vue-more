<template>
  <div
    :style="{ position: 'relative', height: totalNodeList.length * 22 + 'px' }"
    @mouseenter="handleMouseEnter(true)"
    @mouseleave="handleMouseEnter(false)"
  >
    <tree-node
      v-for="(node, index) in shouldRenderNodeList"
      :key="node.id"
      :treeNode="node"
      :tabSize="tabSize"
      :translateY="(renderNodePosRange[0] + index) * treeNodeHeight"
      @setFocusNode="handleSetFocusNode"
      :isNodeFocus="focusNode && node.id === focusNode.id"
    />
  </div>
</template>

<script>
import TreeNode from './TreeNode'
import { treeJson2List } from '../utils.js'

export default {
  name: 'Tree',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    renderNodePosRange: {
      type: Array,
      default: () => []
    },
    // 是否是无限滚动
    isInfiniteTree: {
      type: Boolean,
      default: true
    }
  },
  components: {
    TreeNode
  },
  data() {
    return {
      totalNodeList: [],
      shouldRenderNodeList: [],
      focusNode: null,
      isTreeFocus: false,
      tabSize: 16, // tree缩进px
      treeNodeHeight: 22 // 树节点高度
    }
  },
  watch: {
    value: {
      // deep: true,
      immediate: true,
      handler(newValue) {
        // if (true || JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        this.totalNodeList = treeJson2List(newValue)
        this.computeShouldRenderNodeList()
        // }
      }
    },
    renderNodePosRange: {
      handler() {
        this.computeShouldRenderNodeList()
      }
    }
  },
  mounted() {
    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    computeShouldRenderNodeList() {
      if (this.renderNodePosRange.length === 2) {
        // this.shouldRenderNodeList = this.totalNodeList.slice(
        //   this.renderNodePosRange[0],
        //   this.renderNodePosRange[1]
        // )
        this.shouldRenderNodeList.length = 0
        this.shouldRenderNodeList.push(
          ...this.totalNodeList.slice(
            this.renderNodePosRange[0],
            this.renderNodePosRange[1]
          )
        )
      } else {
        this.shouldRenderNodeList = this.totalNodeList
      }
    },
    handleMouseEnter(isFocus) {
      this.isTreeFocus = isFocus
    },
    handleKeyUp(e) {
      if (!this.isTreeFocus || !this.focusNode) return

      // 删除节点 - backspace
      if (e.keyCode === 8) {
        this.$eventBus.$emit('infiniteTree/deleteNode', this.focusNode.path)
        this.focusNode = null
      }

      // 添加子节点 - enter
      if (e.keyCode === 13) {
        this.$eventBus.$emit(
          'infiniteTree/addChildrenNode',
          this.focusNode.path
        )
      }

      // 添加兄弟节点 - tab
      if (e.keyCode === 9) {
        this.$eventBus.$emit('infiniteTree/addBrotherNode', this.focusNode.path)
      }
    },
    handleSetFocusNode(node) {
      this.focusNode = node
    }
  }
}
</script>

<style lang="less" scoped></style>
