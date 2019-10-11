<template>
    <div
        :style="{
            backgroundColor: rgbaOpacityReset(todolistColor, 0.4),
            borderLeft: `2px solid ${rgbaOpacityReset(todolistColor, 1)}`
        }"
        @click="handleBlockSelected"
        class="container-todolist-items"
    >
        <div class="todolist-items-title">
            {{ singleTodolist.todolistItemName }}
            <i
                class="el-icon-circle-close items-title-deleteIcon common-icon-animation"
                @click="handleBlockDeleteIconClicked"
            ></i>
        </div>
        <div class="todolist-items">
            <!-- <span>{{ index + 1 }}</span> -->
            <!-- eslint-disable -->
            <span
                v-for="(item, index) in singleTodolist.todolistItemContent"
                :key="index"
                :itemContent="item"
                :class="{ 'todolist-conplete': item.finished }"
                class="todolistItem-uneditable"
                >{{ index + 1 + '. ' + item.itemContent }}</span
            >
        </div>
        <div class="todolist-editTime">
            <span
                >创建时间：{{
                    timeValueToLocal(singleTodolist.createdTime)
                }}</span
            >
            <span
                >最后修改：{{
                    timeValueToLocal(singleTodolist.lastModifiedTime)
                }}</span
            >
        </div>
    </div>
</template>

<script>
import eventBus from '@/common/eventBus';
import { mapState, mapMutations } from 'vuex';
import { EVENT_DELETE_BLOCK } from '@/constants/';
import { timeValueToLocal } from '@/common/util';
// import TodolistItem from './TodolistItem';
export default {
    name: 'TodolistBlock',
    components: {
        // TodolistItem
    },
    props: {
        singleTodolist: {
            type: Object,
            default: () => {}
        },
        todolistColor: {
            type: String,
            default: '#666'
        }
    },
    computed: {
        ...mapState(['selectedBlockName'])
    },
    methods: {
        ...mapMutations(['setSelectedBlockName']),
        timeValueToLocal: timeValueToLocal,
        /* 根据todolist自身的颜色，设置每个todolistBlock的背景色，透明度自设置 */
        rgbaOpacityReset(rgba, opacity) {
            return rgba.slice(0, rgba.lastIndexOf(',') + 1) + opacity + ')';
        },
        handleBlockSelected() {
            if (
                this.singleTodolist.todolistItemName === this.selectedBlockName
            ) {
                this.setSelectedBlockName('');
            } else {
                this.setSelectedBlockName(this.singleTodolist.todolistItemName);
            }
        },
        handleBlockDeleteIconClicked() {
            this.$confirm(
                `确认要删除记录「${this.singleTodolist.todolistItemName}」吗，删除后将不可恢复？`,
                '提示',
                { type: 'warning' }
            )
                .then(() => {
                    eventBus.$emit(
                        EVENT_DELETE_BLOCK,
                        this.singleTodolist.todolistItemName
                    );
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }
};
</script>

<style lang="less">
.container-todolist-items {
    // width: calc(100% / 4);
    position: relative;
    min-width: 200px;
    max-width: 300px;
    margin: 5px 5px 0px 0px;
    padding: 5px 10px 45px 10px;
    border-radius: 4px;
    // break-inside: avoid;
    // color: #fff;
    .todolist-items-title {
        font-weight: bold;
        // margin: 0 0 5px 0;
        .items-title-deleteIcon {
            // color: #000;
            font-weight: bold;
            font-size: 18px;
            float: right;
            opacity: 0.5;
            &:hover {
                opacity: 1;
            }
        }
    }
    .todolist-items {
        display: flex;
        flex-flow: column nowrap;
        .todolistItem-uneditable {
            font-size: 14px;
            white-space: pre-wrap;
        }
        .todolist-conplete {
            text-decoration: line-through;
        }
    }
    .todolist-editTime {
        position: absolute;
        right: 10px;
        bottom: 5px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin: 5px 0 0 0;
        & span {
            // font-style: italic;
            font-size: 12px;
            // transform: scale(10 / 12);
        }
    }
}
</style>