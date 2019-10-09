<template>
    <div class="container-editor">
        <div class="common-content-title">Todolist编辑</div>
        <div class="container-edit-item">
            <TodolistItem
                v-for="(item, index) in blockItemsData"
                :key="index"
                :itemContent="item"
                :itemIndex="index"
            />
        </div>
        <div class="container-add-item">
            <el-color-picker
                slot="prepend"
                class="editor-color-picker"
                size="small"
                v-model="newItem.itemColor"
            ></el-color-picker>
            <el-input
                placeholder="todolist item content"
                size="small"
                class="editor-add-input"
                v-model="newItem.itemContent"
            >
                <!-- <el-color-picker slot="prepend" class="editor-color-picker" size="small"></el-color-picker> -->
                <el-button slot="append" size="small" @click="addTodolistItem"
                    >添加</el-button
                >
            </el-input>
        </div>
    </div>
</template>

<script>
import eventBus from '@/common/eventBus';
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
        blockItemsData() {
            return this.selectedBlockData
                ? this.selectedBlockData.todolistItemContent
                : {};
        }
    },
    methods: {
        addTodolistItem() {
            this.newItem.lastModifiedTime = this.newItem.createdTime = new Date().valueOf();
            eventBus.$emit(EVENT_ADD_TODOLIST_ITEM, this.newItem);
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
        display: flex;
        padding: 0 10px;
        .editor-color-picker {
            // width: 40px;
            // box-sizing: border-box;
            // padding: 0 0px 0 6px;
            // border-radius: 4px;
            // border: 1px solid #dcdfe6;
            // background-color: #f5f7fa;
        }
        .editor-add-input {
            flex-grow: 1;
        }
    }
}
</style>
