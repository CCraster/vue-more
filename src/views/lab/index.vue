<template>
  <div class="lab">
    <div class="left">
      <div
        v-for="(item, index) of UNIT_LIST_PATH"
        :key="index"
        @click="goUnitView(item.path)"
        class="unit-wrapper"
      >
        {{ item.cname || '???' }}
      </div>
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>

<script>
import { UNIT_LIST_PATH } from '@/router/lab.js'
export default {
  name: 'Lab',
  data() {
    return {
      UNIT_LIST_PATH
    }
  },
  methods: {
    goUnitView(path) {
      let reg = new RegExp(path)
      if (reg.test(this.$route.path)) return
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
.lab {
  height: 100%;
  display: flex;
  .left {
    height: calc(100% - 20px);
    width: 360px;
    margin: 10px 10px 0 0;
    padding: 10px;
    box-shadow: 0px 6px 20px -6px #00000044;
    display: flex;
    align-items: flex-start;
    flex-shrink: 0;
    .unit-wrapper {
      margin-right: 5px;
      padding: 2px 5px;
      border: 1px solid @--color-primary;
    }
  }
  .right {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    height: calc(100% - 20px);
    margin: 10px 0 0 0;
    box-shadow: 0px 6px 20px -6px #00000044;
  }
}
</style>
