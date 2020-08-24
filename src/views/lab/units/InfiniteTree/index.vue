<template>
  <div class="infinite-tree-wrapper" v-loading="loading">
    <div class="tree-wrapper">
      <tree v-model="jsonCode" />
    </div>
    <codemirror
      :value="formatedJsonCode"
      :options="cmOption"
      class="json-wrapper"
    />
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
import { fakeJsonData } from './utils.mjs'
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
      fakeConfig: '5000, 3', // fake数据默认配置
      loading: false, // fake数据过程
      jsonCode: fakeJsonData(5000, 3) || {
        a: {
          a1: 'a1',
          a2: {
            a3: 'a3'
          },
          a4: 'a4',
          a5: {
            a6: 'a6'
          },
          a7: {
            a8: 'a8'
          }
        },
        b: {
          b2: 'b2',
          b1: 'b1'
        }
      },
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
  methods: {
    fakeData() {
      let config = this.fakeConfig.split(',').map(d => parseInt(d))
      this.loading = true
      console.log(1)
      // this.$forceUpdate()
      setTimeout(() => {
        this.$nextTick(() => {
          this.jsonCode = fakeJsonData(...config)
          this.loading = false
        })
      }, 100)
      // this.$nextTick(() => {
      //   this.jsonCode = fakeJsonData(...config)
      //   this.loading = false
      //   console.log(2)
      // })
      // Promise.resolve().then(() => {
      //   this.jsonCode = fakeJsonData(...config)
      //   this.loading = false
      // })
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
    .common-left-border-primary;
  }

  .json-wrapper {
    width: 50%;
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
