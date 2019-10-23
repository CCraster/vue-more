<template>
    <div class="todolistDetail">
        <div class="common-content-title todolist-detail-toolContainer">
            <span style="flex-grow: 1">可用工具</span>
            <el-input
                v-model="searchWord"
                placeholder="请输入搜索内容"
                style="width: 190px; float: right; margin-right: 5px;"
                size="mini"
            >
                <el-button slot="prepend">搜索</el-button>
            </el-input>
            <el-select
                v-model="todolistMode"
                size="mini"
                style="width: 90px; float: right; margin-right: 5px;"
            >
                <el-option
                    v-for="mode in displayMode"
                    :key="mode.value"
                    :label="mode.label"
                    :value="mode.value"
                ></el-option>
            </el-select>
        </div>
        <div
            v-if="
                JSON.stringify(todolistData) !== '{}' &&
                    JSON.stringify(todolistData.todolistContent) !== '{}'
            "
            id="div-todolistDetailContent"
            class="todolist-detail-content"
        >
            <TodolistBlock
                v-for="(singleTodolist, index) in todolistData.todolistContent"
                :key="index"
                :singleTodolist="singleTodolist"
                :todolistColor="todolistData.todolistColor"
            />
        </div>
        <!-- 未选择todolist的提示 -->
        <div class="hasNoSelectedTodolist" v-else>暂无数据。。。</div>
    </div>
</template>

<script>
import eventBus from '@/common/eventBus';
import TodolistBlock from './TodolistBlock';
import { EVENT_CHANGE_TODOLIST_MODE } from '@/constants/';
export default {
    name: 'TodolistDetail',
    components: {
        TodolistBlock
    },
    props: {
        todolistData: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            todolistMode: 'week',
            searchWord: '',
            displayMode: [
                {
                    value: 'year',
                    label: '年粒度'
                },
                {
                    value: 'month',
                    label: '月粒度'
                },
                {
                    value: 'week',
                    label: '周粒度'
                },
                {
                    value: 'day',
                    label: '天粒度'
                }
            ]
        };
    },
    computed: {},
    watch: {
        todolistMode: {
            deep: true,
            handler(newMode) {
                eventBus.$emit(EVENT_CHANGE_TODOLIST_MODE, newMode);
            }
        },
        searchWord: {
            deep: true,
            handler() {
                eventBus.$emit('enter-search-word', this.searchWord);
            }
        }
    }
};
</script>

<style lang="less">
@color-boxShadow: #ccc;
.common-boxShadow-mixin() {
    box-shadow: 0px 0px 5px @color-boxShadow;
}
.todolistDetail {
    .todolist-detail-toolContainer {
        top: 60px;
        width: 100%;
        height: 34px;
        display: flex;
        align-items: center;
    }
    .todolist-detail-content {
        height: calc(100% - 34px);
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-flow: row wrap;
        align-content: flex-start;
        padding: 5px 0 0px 5px;
        transition: all 0.3s;
        overflow: scroll;
    }
}
.hasNoSelectedTodolist {
    display: flex;
    // align-items: center;
    font-size: 14px;
    justify-content: center;
}
</style>
