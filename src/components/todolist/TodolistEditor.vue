<template>
    <div class="container-editor">
        <div class="common-content-title">Todolist编辑</div>
        <div
            v-if="JSON.stringify(selectedBlockData) !== '{}'"
            class="container-edit-item"
        >
            <TodolistItem
                v-for="(item, index) in blockItemsData"
                :key="index"
                :itemContent="item"
                :itemIndex="item.originIndex"
            />
        </div>
        <div v-else class="container-edit-item" style="text-align: center;">
            暂无数据。。。
        </div>
        <div class="container-add-item">
            <div
                ref="editor-textarea"
                id="editor-textarea"
                class="editor-textarea"
                placeholder="enter todolist content"
                @keydown="keyDownHander"
                contenteditable
            ></div>
            <div class="container-add-itemBt">
                <el-color-picker
                    slot="prepend"
                    class="editor-color-picker"
                    size="small"
                    v-model="newItem.itemColor"
                ></el-color-picker>
                <el-button
                    class="editor-add-input"
                    size="small"
                    @click="addTodolistItem"
                    >添加</el-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import eventBus from '@/common/eventBus';
import { mapState } from 'vuex';
import { EVENT_ADD_TODOLIST_ITEM } from '@/constants/';
import TodolistItem from './TodolistItem';

export default {
    name: 'TodolistEditor',
    components: {
        TodolistItem
    },
    data() {
        return {
            newItem: {
                itemColor: '#aaa',
                itemContent: '',
                createdTime: '',
                lastModifiedTime: '',
                finished: false
            }
        };
    },
    props: {
        selectedBlockData: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        ...mapState(['selectedTodolistType']),
        blockItemsData() {
            return this.selectedBlockData ? this.selectedBlockData.items : {};
        },
        isReportTypeTodolist() {
            return this.selectedTodolistType === 'report';
        }
    },
    methods: {
        /* 按下按键的处理函数 - 监听shift + enter */
        keyDownHander(e) {
            if (e.keyCode === 13 && e.shiftKey) {
                this.addTodolistItem();
            }
        },
        clearTextarea() {
            /**
             * 组合键shift+enter的触发，先触发keyDownHander，再触发enter
             * 所以会出现在keyDownHander中置空textare后多一“\n”的情况
             * 借助js任务机制，使用setTimeout
             */
            setTimeout(() => {
                this.$refs['editor-textarea'].innerText = '';
            });
        },
        addTodolistItem() {
            let textareaElement = document.getElementById('editor-textarea');
            if (textareaElement.innerText === '') {
                this.$notify.warning({
                    title: '提示：',
                    message: '输入信息为空！'
                });
                this.clearTextarea();
                return;
            } else if (
                JSON.stringify(this.selectedBlockData) !== '{}' &&
                this.isReportTypeTodolist
            ) {
                this.$notify.error({
                    title: '提示：',
                    message: 'report类型的todolist，只允许添加一条记录！'
                });
                this.clearTextarea();
                return;
            }
            this.newItem.itemContent = textareaElement.innerText;
            this.newItem.lastModifiedTime = this.newItem.createdTime = new Date().valueOf();
            eventBus.$emit(
                EVENT_ADD_TODOLIST_ITEM,
                JSON.parse(JSON.stringify(this.newItem)) // 用此方法避免每次添加的都是同一个对象的地址，导致后续修改前面的内容
            );
            // 重置输入
            this.clearTextarea();
        }
    }
};
</script>

<style lang="less">
.container-editor {
    font-size: 14px;
    .container-edit-item {
        padding: 0 10px;
        margin: 10px 0;
    }
    .container-add-item {
        padding: 0 10px;
        .editor-textarea {
            width: 100%;
            box-sizing: border-box;
            padding: 5px 10px;
            outline: 0 none;
            border: 1px solid #ccc;
            box-shadow: 0px 0px 2px #ccc;
            border-radius: 4px;
            transition: all 0.5s;
            &:hover,
            &:focus {
                border: 1px solid #007add;
                box-shadow: 0px 0px 2px #007add;
            }
            &[contentEditable='true']:empty:not(:focus):before {
                content: attr(placeholder);
                color: #aaa;
            }
        }
        .container-add-itemBt {
            display: flex;
            margin-top: 5px;
            justify-content: flex-end;
            .editor-color-picker {
                // width: 40px;
                // box-sizing: border-box;
                // padding: 0 0px 0 6px;
                // border-radius: 4px;
                // border: 1px solid #dcdfe6;
                // background-color: #f5f7fa;
            }
            .editor-add-input {
                margin-left: 5px;
            }
        }
    }
}
</style>
