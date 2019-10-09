<template>
    <div class="container-todolist">
        <TodolistNav class="container-todolist-nav" :todolists="todolists" />
        <TodolistDetail
            class="container-todolist-detail"
            :todolistData="todolists[selectedTodolistName]"
        />
        <TodolistEditor
            :selectedBlockData="selectedBlockData"
            class="container-todolist-editor"
        />
        <AddTagDialog
            @add-todolist="addTodoList"
            :visible.sync="showAddTagDialog"
            :options="addTagDialogConfig.options"
        />
    </div>
</template>

<script>
import eventBus from '@/common/eventBus';
import { mapState } from 'vuex';
import {
    GIST_TODOLIST,
    EVENT_ADD_TODOLIST_ITEM,
    EVENT_EDIT_ITEM,
    EVENT_DELETE_ITEM
} from '@/constants/';
import {
    getSingleGist,
    addGistFile,
    editGistFile,
    deleteGistFile
} from '@/apis/gistFetch';
import { getGistFiles } from '@/common/util';
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
            addTagDialogConfig: {
                options: {
                    type: '',
                    title: '',
                    todolistName: '',
                    todolistColor: '',
                    todolistContent: {}
                }
            }
        };
    },
    computed: {
        ...mapState(['selectedTodolistName', 'selectedBlockName']),
        selectedBlockData() {
            if (this.selectedTodolistName) {
                return JSON.parse(
                    this.todolists[this.selectedTodolistName].content
                )['todolistContent'][this.selectedBlockName];
            } else {
                return {};
            }
        }
    },
    watch: {
        todolists: {
            deep: true,
            handler() {}
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
    },
    beforeDestroy() {
        eventBus.$off('delete-todolist', this.deleteTodolist);
        eventBus.$off('reconfig-todolist', this.reconfigTodolist);
        eventBus.$off('show-add-dialog', this.showAddTodolistDialog);
        eventBus.$off(EVENT_ADD_TODOLIST_ITEM, this.addTodolistItem);
    },
    methods: {
        /* 获取todolist的gist */
        async getTodolist() {
            this.todolists = getGistFiles(await getSingleGist(GIST_TODOLIST));
        },
        /* 增加todolist弹窗显示标志 */
        showAddTodolistDialog() {
            this.addTagDialogConfig.options = {
                type: 'create',
                title: '新建Todo List',
                todolistName: '',
                todolistColor: 'rgba(0, 122, 221, 0.8)',
                todolistContent: {}
            };
            this.showAddTagDialog = true;
        },
        /* 添加todolist */
        async addTodoList(newTodolist) {
            let res = await addGistFile(GIST_TODOLIST, newTodolist);
            if (res.status === 200) {
                let msg =
                    this.addTagDialogConfig.options.type === 'create'
                        ? '新Todolist添加成功！'
                        : '更改Todolist配置成功！';
                this.$message.success(msg);
                this.todolists = getGistFiles(res);
            } else {
                let msg =
                    this.addTagDialogConfig.options.type === 'create'
                        ? '添加Todolist失败！'
                        : '更改Todolist配置失败！';
                this.$message.error(msg);
            }
        },
        /* 删除todolist */
        async deleteTodolist(gistFileName) {
            let res = await deleteGistFile(GIST_TODOLIST, gistFileName);
            if (res.status === 200) {
                this.$message.success('Todolist删除成功！');
                this.todolists = getGistFiles(res);
            } else {
                this.$message.error('Todolist删除失败！');
            }
        },
        /* 监听reconfig-todolist的处理函数 */
        reconfigTodolist(reconfigTodolistName) {
            let reconfigTodolistContent = JSON.parse(
                this.todolists[reconfigTodolistName].content
            );
            this.addTagDialogConfig.options = {
                type: 'reconfig',
                title: '更改配置',
                oldTodolistName: reconfigTodolistContent.fileName,
                todolistName: reconfigTodolistContent.fileName,
                todolistColor: reconfigTodolistContent.todolistColor,
                todolistContent: reconfigTodolistContent.todolistContent
            };
            this.showAddTagDialog = true;
        },
        /* 添加todolist item */
        async addTodolistItem(newTodolistItem) {
            let todayDate = this.getTodayDate(),
                todolist = JSON.parse(
                    this.todolists[this.selectedTodolistName].content
                );
            if (!todolist.todolistContent[todayDate]) {
                todolist.todolistContent[todayDate] = {
                    todolistItemName: todayDate,
                    todolistItemContent: [],
                    createdTime: new Date().valueOf(),
                    lastModifiedTime: new Date().valueOf()
                };
            }
            todolist.todolistContent[todayDate].todolistItemContent.push(
                newTodolistItem
            );
            todolist.todolistContent[
                todayDate
            ].lastModifiedTime = new Date().valueOf();

            let res = await editGistFile(GIST_TODOLIST, todolist);
            if (res.status === 200) {
                this.$message.success('添加Todolist Item成功！');
                this.todolists = getGistFiles(res);
            } else {
                this.$message.error('添加Todolist Item失败！');
            }
        },
        /*  */
        async editBlockItem(item, index) {
            let todolist = JSON.parse(
                this.todolists[this.selectedTodolistName].content
            );
            todolist.todolistContent[this.selectedBlockName].lastModifiedTime =
                item.lastModifiedTime;
            todolist.todolistContent[this.selectedBlockName][
                'todolistItemContent'
            ][index] = item;

            let res = await editGistFile(GIST_TODOLIST, todolist);
            if (res.status === 200) {
                this.$message.success('Todolist Item「更改状态」成功！');
                this.todolists = getGistFiles(res);
            } else {
                this.$message.error('Todolist Item「更改状态」失败！');
            }
        },
        /*  */
        async deleteBlockItem(index) {
            let todolist = JSON.parse(
                this.todolists[this.selectedTodolistName].content
            );
            todolist.todolistContent[
                this.selectedBlockName
            ].lastModifiedTime = new Date().valueOf();
            todolist.todolistContent[this.selectedBlockName][
                'todolistItemContent'
            ].splice(index, 1);

            let res = await editGistFile(GIST_TODOLIST, todolist);
            if (res.status === 200) {
                this.$message.success('Todolist Item「删除」成功！');
                this.todolists = getGistFiles(res);
            } else {
                this.$message.error('Todolist Item「删除」失败！');
            }
        },
        /* 获取此时的日期，格式：20191006 */
        getTodayDate() {
            let today = new Date(),
                formatLength = 2;
            return (
                today.getFullYear() +
                (Array(formatLength).join('0') + (today.getMonth() + 1)).slice(
                    -formatLength
                ) +
                (Array(formatLength).join('0') + today.getDate()).slice(
                    -formatLength
                )
            );
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
    display: flex;
    align-items: flex-start;
    .container-todolist-nav {
        width: 200px;
        flex-shrink: 0;
        margin: 6px 6px 0 0;
        border-radius: 2px;
        .common-boxShadow-mixin();
    }
    .container-todolist-detail {
        width: calc(100% - 200px - 300px);
        min-height: 600px;
        // flex-grow: 1;
        margin: 6px 6px 6px 0;
        border-radius: 2px;
        .common-boxShadow-mixin();
    }
    .container-todolist-editor {
        width: 300px;
        min-height: 400px;
        margin: 6px 0 0 0;
        .common-boxShadow-mixin();
    }
}
</style>
