<template>
  <div :style="{ position: 'relative', height: 5000 * 22 + 'px' }">
    <tree-node
      v-for="(node, index) in treeNodeList"
      :key="index"
      :treeNode="node"
      :tabSize="tabSize"
      :translateY="index * treeNodeHeight"
      :shouldRender="isInfiniteTree ? shouldRender(index) : true"
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
    renderNodeList: {
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
      treeNodeList: [],
      tabSize: 16, // tree锁进px
      treeNodeHeight: 22 // 树节点高度
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue, oldValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          this.treeNodeList = JsonObjectToTreeList(newValue)
        }
      }
    }
  },
  methods: {
    shouldRender(index) {
      return index < this.renderNodeList[0] || index > this.renderNodeList[1]
        ? false
        : true
    }
  }
}
</script>

<style></style>
