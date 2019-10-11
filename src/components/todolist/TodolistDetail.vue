<template>
    <div class="todolistDetail" v-if="todolistData">
        <TodolistBlock
            v-for="(singleTodolist, key) in todolistContent.todolistContent"
            :key="key"
            :singleTodolist="singleTodolist"
            :todolistColor="todolistContent.todolistColor"
        />
        <!-- {{todolistContent}} -->
    </div>
    <div class="hasNoSelectedTodolist" v-else>还没选择Todolist！</div>
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
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    // justify-content: flex-start;
    // align-items: flex-start;

    // column-count: 3;
    // column-width: 200px;
    // column-gap: 5px;
    overflow: scroll;
}
.hasNoSelectedTodolist {
    display: flex;
    // align-items: center;
    justify-content: center;
}
</style>
