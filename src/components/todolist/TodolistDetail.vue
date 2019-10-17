<template>
    <div class="todolistDetail" v-if="todolistData">
        <div class="common-content-title todolist-detail-toolContainer">
            <span>可用工具</span>
            <el-select
                v-model="todolistMode"
                size="mini"
                style="width: 90px; float: right; margin-right: 10px;"
            >
                <el-option
                    v-for="mode in displayMode"
                    :key="mode.value"
                    :label="mode.label"
                    :value="mode.value"
                ></el-option>
            </el-select>
        </div>
        <div id="div-todolistDetailContent" class="todolist-detail-content">
            <TodolistBlock
                v-for="(singleTodolist, key) in todolistContent.todolistContent"
                :key="key"
                :singleTodolist="singleTodolist"
                :todolistColor="todolistContent.todolistColor"
            />
        </div>
    </div>
    <div class="hasNoSelectedTodolist" v-else>未选择Todolist！</div>
</template>

<script>
import TodolistBlock from './TodolistBlock';
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
    computed: {
        todolistContent() {
            return this.todolistData
                ? JSON.parse(this.todolistData.content)
                : {};
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
        // display: flex;
        // align-items: center;
    }
    .todolist-detail-content {
        height: calc(100% - 34px);
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-flow: row wrap;
        align-content: flex-start;
        padding: 5px 0 0px 5px;
        transition: all 3s;
        overflow: scroll;
    }
}
.hasNoSelectedTodolist {
    display: flex;
    // align-items: center;
    justify-content: center;
}
</style>
