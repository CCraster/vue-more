<template>
    <div class="todolist-nav">
        <div class="common-content-title">Todo List</div>
        <div class="todolist-nav-items">
            <Rag
                v-for="(todolist, i) in todolists"
                :key="i"
                :todolist="todolist"
            />
        </div>
        <div class="todolist-nav-add">
            <i
                class="el-icon-circle-plus-outline common-icon-animation"
                @click="handleAddTodolistIconClicked"
            ></i>
        </div>
    </div>
</template>

<script>
import eventBus from '@/common/eventBus';
import Rag from './Rag';
export default {
    name: 'TodolistNav',
    components: {
        Rag
    },
    props: {
        todolists: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        handleAddTodolistIconClicked() {
            eventBus.$emit('show-add-dialog');
        }
    }
};
</script>

<style lang="less">
.todolist-nav {
    .todolist-nav-items {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .todolist-nav-add {
        font-size: 20px;
        text-align: center;
        margin: 10px 0 20px 0;
        & i {
            color: #007add;
            transition: transform 0.5s;
        }
        & i:hover {
            color: #f67505;
        }
    }
}
</style>
