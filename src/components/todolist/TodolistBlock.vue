<template>
    <div
        :style="{
            backgroundColor: rgbaOpacityReset(todolistColor, 0.4),
            borderLeft: `2px solid ${rgbaOpacityReset(todolistColor, 1)}`
        }"
        @click="handleBlockSelected"
        @dblclick.native="handleBlockSelected"
        :class="{ 'common-div-highlight': isBlockSelected }"
        class="container-todolist-items"
    >
        <div class="todolist-items-title">
            <i
                v-if="!isBlockItemAllFinished && !isReportTypeTodolist"
                class="el-icon-warning"
            ></i>
            <!-- <i v-else class="el-icon-success" :style="{ color: rgbaOpacityReset(todolistColor, 1)}"></i> -->
            {{ singleTodolist.title }}
            <i
                class="el-icon-circle-close items-title-deleteIcon common-icon-animation"
                @click="handleBlockDeleteIconClicked"
            ></i>
            <i
                class="el-icon-document-copy items-title-deleteIcon common-icon-animation"
                @click.stop="handleCopyIconClicked"
            ></i>
        </div>
        <div :id="`block-${singleTodolist.title}`" class="todolist-items">
            <span
                v-for="(item, index) in singleTodolist.items"
                :key="index"
                :itemContent="item"
                :class="{ 'todolist-conplete': item.finished }"
                class="todolistItem-uneditable"
            >
                <span v-if="isReportTypeTodolist">{{ item.itemContent }}</span>
                <span v-else>{{ index + 1 + '. ' + item.itemContent }}</span>
            </span>
        </div>
        <div class="todolist-editTime">
            <span>
                创建时间：{{ timeValueToLocal(singleTodolist.createdTime) }}
            </span>
            <span>
                最后修改：{{
                    timeValueToLocal(singleTodolist.lastModifiedTime)
                }}
            </span>
        </div>
    </div>
</template>

<script>
import eventBus from '@/common/eventBus';
import { mapState, mapMutations } from 'vuex';
import { EVENT_DELETE_ITEM } from '@/constants/';
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
        ...mapState(['selectedBlockName', 'selectedTodolistType']),
        isReportTypeTodolist() {
            return this.selectedTodolistType === 'report';
        },
        isBlockSelected() {
            return this.singleTodolist.title === this.selectedBlockName;
        },
        isBlockItemAllFinished() {
            let flag = true,
                items = this.singleTodolist.items;
            items.forEach(item => {
                if (item.finished === false) {
                    flag = false;
                    return flag;
                }
            });
            return flag;
        },
        blockItemsIndex() {
            let arr = [];
            this.singleTodolist.items.map(item => {
                arr.push(item.originIndex);
            });
            return arr;
        }
    },
    methods: {
        ...mapMutations(['setSelectedBlockName']),
        timeValueToLocal: timeValueToLocal,
        /* 根据todolist自身的颜色，设置每个todolistBlock的背景色，透明度自设置 */
        rgbaOpacityReset(rgba, opacity) {
            return rgba.slice(0, rgba.lastIndexOf(',') + 1) + opacity + ')';
        },
        handleBlockSelected() {
            if (!(this.singleTodolist.title === this.selectedBlockName)) {
                this.setSelectedBlockName(this.singleTodolist.title);
            }
        },
        handleBlockDeleteIconClicked() {
            this.$confirm(
                `确认要删除记录「${this.singleTodolist.title}」吗，删除后将不可恢复？`,
                '提示',
                { type: 'warning' }
            )
                .then(() => {
                    eventBus.$emit(EVENT_DELETE_ITEM, this.blockItemsIndex);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        handleCopyIconClicked() {
            let text = document.getElementById(
                `block-${this.singleTodolist.title}`
            ).innerText;
            this.$copyText(text).then(
                () => {
                    this.$notify.success({
                        title: '提示',
                        message: '内容已复制'
                    });
                },
                e => {
                    this.$notify.success({
                        title: '提示',
                        message: '复制出错：' + e
                    });
                }
            );
        }
    }
};
</script>

<style lang="less">
.container-todolist-items {
    // width: calc(100% / 4);
    position: relative;
    min-width: 200px;
    max-width: calc(50% - 5px);
    flex-grow: 1;
    box-sizing: border-box;
    margin: 0px 5px 5px 0px;
    padding: 5px 10px 45px 10px;
    border-radius: 4px;
    transition: all 0.3s;
    &:hover {
        box-shadow: 0px 0 6px 2px #666;
    }
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
            margin-left: 2px;
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
        color: #555;
        & span {
            // font-style: italic;
            font-size: 12px;
            // transform: scale(10 / 12);
        }
    }
}
</style>
