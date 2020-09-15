<template>
  <div :style="{ position: 'relative', height: 5000 * 22 + 'px' }">
    <tree-node
      v-for="(node, index) in shouldRenderNodeList"
      :key="index"
      :treeNode="node"
      :tabSize="tabSize"
      :translateY="(renderNodePosRange[0] + index) * treeNodeHeight"
    />
  </div>
</template>

<script>
import TreeNode from './TreeNode'
import { JsonObjectToTreeList } from '../utils.mjs'

export default {
  name: 'Tree',
  props: {
    value: {
      type: Object,
      default: () => {}
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
      tabSize: 16, // tree缩进px
      treeNodeHeight: 22 // 树节点高度
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          this.totalNodeList = JsonObjectToTreeList(newValue)
          this.computeShouldRenderNodeList()
        }
      }
    },
    renderNodePosRange: {
      handler() {
        this.computeShouldRenderNodeList()
      }
    }
  },
  methods: {
    computeShouldRenderNodeList() {
      if (this.renderNodePosRange.length === 2) {
        this.shouldRenderNodeList = this.totalNodeList.slice(
          this.renderNodePosRange[0],
          this.renderNodePosRange[1]
        )
      } else {
        this.shouldRenderNodeList = this.totalNodeList
      }
    }
  }
}
</script>

<style></style>
