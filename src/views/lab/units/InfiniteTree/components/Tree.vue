<template>
  <div>
    <tree-node
      v-for="(node, index) in treeNodeList"
      :key="index"
      :treeNode="node"
      :tabSize="tabSize"
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
    }
  },
  components: {
    TreeNode
  },
  data() {
    return {
      treeNodeList: [],
      tabSize: 16
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
  }
}
</script>

<style></style>
