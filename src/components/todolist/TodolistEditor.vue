<template>
    <div class="container-editor">
        <div class="common-content-title">Todolist编辑</div>
        <div class="container-edit-item">
            <TodolistItem
                v-for="(item, index) in blockItemsData"
                :key="index"
                :itemContent="item"
                :itemIndex="item.originIndex"
            />
        </div>
        <div class="container-add-item">
            <div
                id="editor-textarea"
                class="editor-textarea"
                placeholder="enter todolist content"
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
        addTodolistItem() {
            let textareaElement = document.getElementById('editor-textarea');
            if (textareaElement.innerText === '') {
                this.$notify.warning({
                    title: '提示：',
                    message: '输入信息为空！'
                });
                return;
            } else if (
                JSON.stringify(this.selectedBlockData) !== '{}' &&
                this.isReportTypeTodolist
            ) {
                this.$notify.error({
                    title: '提示：',
                    message: 'report类型的todolist，只允许添加一条记录！'
                });
                return;
            }
            this.newItem.itemContent = textareaElement.innerText;
            this.newItem.lastModifiedTime = this.newItem.createdTime = new Date().valueOf();
            eventBus.$emit(EVENT_ADD_TODOLIST_ITEM, this.newItem);
            // 重置输入
            textareaElement.innerText = '';
        }
    }
};
</script>

<style lang="less">
.container-editor {
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
            border: 1px solid #aaa;
            box-shadow: 0px 0px 2px #aaa;
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
