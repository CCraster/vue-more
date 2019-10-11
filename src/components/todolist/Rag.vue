<template>
    <div
        class="container-tag"
        :class="{ selectedRag: isSelected }"
        :style="{ backgroundColor: todolistContent.todolistColor }"
        @click="handleTodolistRagClicked(todolistContent.fileName)"
    >
        <span>{{ todolistContent.fileName }}</span>
        <i
            class="el-icon-circle-close common-icon-animation"
            @click="handleDeleteIconClicked"
        ></i>
        <i
            class="el-icon-setting common-icon-animation"
            @click="handleSettingIconClicked"
        ></i>
    </div>
</template>

<script>
// import { EVENT_DELETE_TODOLIST } from '@/constants/';
import eventBus from '@/common/eventBus';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'Rag',
    props: ['todolist'],
    computed: {
        ...mapState(['selectedTodolistName']),
        todolistContent() {
            return JSON.parse(this.todolist.content);
        },
        isSelected() {
            return this.todolist.filename === this.selectedTodolistName;
        }
    },
    methods: {
        ...mapMutations(['setSelectedTodolistName']),
        handleTodolistRagClicked(todolistName) {
            if (todolistName === this.selectedTodolistName) {
                this.setSelectedTodolistName('');
            } else {
                this.setSelectedTodolistName(todolistName);
            }
        },
        handleDeleteIconClicked() {
            this.$confirm(
                `确认要删除Todolist「${this.todolist.filename}」吗，删除后将不可恢复？`,
                '提示',
                { type: 'warning' }
            )
                .then(() => {
                    eventBus.$emit('delete-todolist', this.todolist.filename);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        handleSettingIconClicked() {
            eventBus.$emit('reconfig-todolist', this.todolist.filename);
        }
    }
};
</script>

<style lang="less">
.container-tag {
    width: 170px;
    height: 30px;
    position: relative;
    left: 0px;
    box-sizing: border-box;
    padding: 0 8px;
    color: #fff;
    margin: 2px 0;
    border-radius: 2px;
    font-size: 14px;
    line-height: 30px;
    transition: all 0.3s;
    // background-color: rgba(0, 122, 221, 0.8);
    &.selectedRag {
        // width: 150px;
        left: 10px;
    }
    & span {
        font-weight: 450;
    }
    & i {
        opacity: 0;
        margin-right: 2px;
        float: right;
        font-size: 18px;
        line-height: 30px;
    }
    &:hover {
        box-shadow: 4px 1px 5px #aaa;
    }
    &:hover i {
        opacity: 1;
    }
}
</style>
