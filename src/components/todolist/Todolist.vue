<template>
    <div class="container-todolist">
        <TodolistNav class="container-todolist-nav" :todolists="todolists" />
        <TodolistDetail
            class="container-todolist-detail"
            :todolistData="selectedTodolistData"
        />
        <TodolistEditor
            :selectedBlockData="selectedBlockData"
            class="container-todolist-editor"
        />
        <AddTagDialog
            @add-todolist="addTodoList"
            :visible.sync="showAddTagDialog"
            :options="addTagDialogConfig.options"
            :confirm="addTodoList"
        />
    </div>
</template>

<script>
import eventBus from '@/common/eventBus';
import { mapState, mapMutations } from 'vuex';
import { path } from 'ramda';
import {
    GIST_TODOLIST,
    EVENT_ADD_TODOLIST_ITEM,
    EVENT_EDIT_ITEM,
    EVENT_DELETE_ITEM,
    EVENT_CHANGE_TODOLIST_MODE
} from '@/constants/';
import GistApi from '@/apis/gist';
import { getGistFiles, formatTodolistData } from '@/common/util';
import AddTagDialog from '@/components/page/AddTagDialog';
import TodolistNav from './TodolistNav';
import TodolistDetail from './TodolistDetail';
import TodolistEditor from './TodolistEditor';

export default {
    name: 'TodoList',
    components: {
        AddTagDialog,
        TodolistNav,
        TodolistDetail,
        TodolistEditor
    },
    data() {
        return {
            todolists: {},
            showAddTagDialog: false,
            todolistShowMode: 'week',
            searchWord: '',
            addTagDialogConfig: {
                options: {
                    type: '',
                    title: '',
                    todolistName: '',
                    todolistType: '',
                    todolistColor: '',
                    todolistContent: {}
                }
            }
        };
    },
    computed: {
        ...mapState(['selectedTodolistName', 'selectedBlockName']),
        selectedTodolistData() {
            if (path([this.selectedTodolistName])(this.todolists)) {
                let todolistData = this.todolists[this.selectedTodolistName]
                    .content;
                todolistData = formatTodolistData(
                    todolistData,
                    this.todolistShowMode,
                    this.searchWord
                );
                return todolistData;
            }
            return {};
        },
        selectedBlockData() {
            if (
                path(['todolistContent', this.selectedBlockName])(
                    this.selectedTodolistData
                )
            ) {
                return this.selectedTodolistData.todolistContent[
                    this.selectedBlockName
                ];
            }
            return {};
        }
    },
    watch: {
        todolists: {
            deep: true,
            handler() {
                // console.log('change');
            }
        }
    },
    beforeMount() {
        this.getTodolist();
    },
    mounted() {
        eventBus.$on('delete-todolist', this.deleteTodolist);
        eventBus.$on('reconfig-todolist', this.reconfigTodolist);
        eventBus.$on('show-add-dialog', this.showAddTodolistDialog);
        eventBus.$on(EVENT_ADD_TODOLIST_ITEM, this.addTodolistItem);
        eventBus.$on(EVENT_EDIT_ITEM, this.editBlockItem);
        eventBus.$on(EVENT_DELETE_ITEM, this.deleteBlockItem);
        eventBus.$on(EVENT_CHANGE_TODOLIST_MODE, this.changeTodolistMode);
        eventBus.$on('enter-search-word', this.enterSearchWord);
    },
    beforeDestroy() {
        eventBus.$off('delete-todolist', this.deleteTodolist);
        eventBus.$off('reconfig-todolist', this.reconfigTodolist);
        eventBus.$off('show-add-dialog', this.showAddTodolistDialog);
        eventBus.$off(EVENT_ADD_TODOLIST_ITEM, this.addTodolistItem);
        eventBus.$off(EVENT_EDIT_ITEM, this.editBlockItem);
        eventBus.$off(EVENT_DELETE_ITEM, this.deleteBlockItem);
        eventBus.$off(EVENT_CHANGE_TODOLIST_MODE, this.changeTodolistMode);
    },
    methods: {
        ...mapMutations(['setSelectedBlockName']),
        /* 获取todolist的gist */
        async getTodolist() {
            const loading = this.$loading({
                lock: true,
                text: '加载中。。。',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.todolists = getGistFiles(
                await GistApi.getSingleGist(GIST_TODOLIST)
            );
            loading.close();
            // console.log(await GistApi.getSingleGist(GIST_TODOLIST));
            // console.log(typeof this.todolists['Craster'].content);
        },
        /* 增加todolist弹窗显示标志 */
        showAddTodolistDialog() {
            this.addTagDialogConfig.options = {
                title: '新建Todo List',
                fileName: '',
                todolistType: 'todolist',
                todolistColor: 'rgba(0, 122, 221, 1)',
                todolistContent: []
            };
            this.showAddTagDialog = true;
        },
        /* 添加todolist */
        async addTodoList(newTodolist) {
            let res = await GistApi.addGistFile(GIST_TODOLIST, newTodolist);
            if (res.status === 200) {
                let msg = '「新增 / 更改」Todolist成功！';
                this.$message.success(msg);
                this.todolists = getGistFiles(res);
            } else {
                let msg = '「新增 / 更改」Todolist配置失败！';
                this.$message.error(msg);
            }
        },
        /* 删除todolist */
        async deleteTodolist(gistFileName) {
            let res = await GistApi.deleteGistFile(GIST_TODOLIST, gistFileName);
            if (res.status === 200) {
                this.$message.success('Todolist删除成功！');
                this.todolists = getGistFiles(res);
            } else {
                this.$message.error('Todolist删除失败！');
            }
        },
        /* 监听reconfig-todolist的处理函数 */
        reconfigTodolist(reconfigTodolistName) {
            let reconfigTodolistContent = this.todolists[reconfigTodolistName]
                .content;
            this.addTagDialogConfig.options = {
                title: '更改配置',
                ...reconfigTodolistContent
            };
            this.showAddTagDialog = true;
        },
        /* 添加todolist item */
        async addTodolistItem(newTodolistItem) {
            if (!this.todolists[this.selectedTodolistName]) {
                this.$message.error('未选定todolist，无法进行添加！');
                return;
            }

            let todolist = this.todolists[this.selectedTodolistName].content;
            todolist.todolistContent.push(newTodolistItem);

            let res = await GistApi.editGistFile(GIST_TODOLIST, todolist);
            if (res.status === 200) {
                this.$message.success('添加Todolist Item成功！');
                // this.todolists = getGistFiles(res);
            } else {
                this.$message.error('添加Todolist Item失败！');
            }
        },
        /*  */
        async editBlockItem(item, index) {
            let todolist = this.todolists[this.selectedTodolistName].content;
            delete item['originIndex'];
            // !!!vue 监听不到直接通过数组下标修改的变化，参考：https://juejin.im/post/5bd181036fb9a05cdb107b0d
            todolist.todolistContent.splice(index, 1, item);

            let res = await GistApi.editGistFile(GIST_TODOLIST, todolist);
            if (res.status === 200) {
                this.$message.success('Todolist Item「更改状态」成功！');
                // this.todolists = getGistFiles(res);
            } else {
                this.$message.error('Todolist Item「更改状态」失败！');
            }
        },
        /*  */
        async deleteBlockItem(deleteItemArray) {
            let todolist = this.todolists[this.selectedTodolistName].content;
            todolist.todolistContent = todolist.todolistContent.filter(
                (item, index) => {
                    return !deleteItemArray.includes(index);
                }
            );
            this.todolists[this.selectedTodolistName].content = todolist;

            let res = await GistApi.editGistFile(GIST_TODOLIST, todolist);
            if (res.status === 200) {
                this.$message.success('Todolist Item「删除」成功！');
                // this.todolists = getGistFiles(res);
            } else {
                this.$message.error('Todolist Item「删除」失败！');
            }
        },
        /* 改变todolist的展示模式 */
        changeTodolistMode(mode) {
            this.todolistShowMode = mode;
        },
        /*  */
        enterSearchWord(searchWord) {
            this.searchWord = searchWord;
        }
    }
};
</script>

<style lang="less">
@color-boxShadow: #ccc;
.common-boxShadow-mixin() {
    box-shadow: 0px 0px 5px @color-boxShadow;
}
.container-todolist {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    padding: 0px 2px;
    box-sizing: border-box;
    overflow-y: scroll;
    .container-todolist-nav {
        width: 200px;
        flex-shrink: 0;
        margin: 6px 6px 0 0;
        border-radius: 2px;
        .common-boxShadow-mixin();
    }
    .container-todolist-detail {
        width: calc(100% - 200px - 300px);
        height: calc(100% - 12px);
        box-sizing: border-box;
        // flex-grow: 1;
        margin: 6px 6px 6px 0;
        border-radius: 2px;
        .common-boxShadow-mixin();
    }
    .container-todolist-editor {
        width: 300px;
        min-height: 200px;
        max-height: calc(100% - 12px - 6px);
        margin: 6px 0 6px 0;
        overflow: hidden;
        padding-bottom: 6px;
        .common-boxShadow-mixin();
    }
}
</style>
