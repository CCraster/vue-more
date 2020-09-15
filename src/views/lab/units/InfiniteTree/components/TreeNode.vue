<template>
  <div class="node-wrapper" :style="nodeStyle">
    <span
      :class="{
        'el-icon-folder-remove': !treeNode.isLeaf && !treeNode.clip,
        'el-icon-folder-add': !treeNode.isLeaf && treeNode.clip,
        'el-icon-price-tag': treeNode.isLeaf
      }"
      :style="{
        marginRight: '4px',
        transform: treeNode.isLeaf ? 'rotate(0.5turn)' : 'none'
      }"
    />
    <span :class="{}">{{
      treeNode.isLeaf ? treeNode.key + ': ' + treeNode.value : treeNode.key
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    treeNode: {
      type: Object,
      default: () => {}
    },
    // 缩紧pix值
    tabSize: {
      type: Number,
      default: 8
    },
    // y轴偏移量
    translateY: {
      type: Number,
      default: 0
    }
  },
  computed: {
    nodeStyle() {
      return {
        paddingLeft: this.tabSize * (this.treeNode.depth - 1) + 'px',
        transform: `translate(0, ${this.translateY}px)`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.node-wrapper {
  position: absolute;
  height: 22px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  // transition: background-color 0.3s;
  &:hover {
    background-color: fadeout(@--color-primary, 20%);
    color: white;
  }
}
</style>
