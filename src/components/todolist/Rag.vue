<template>
    <div
        class="container-tag"
        :class="{ selectedRag: isSelected }"
        :style="{ backgroundColor: todolistContent.todolistColor }"
        @click="handleTodolistRagClicked(todolistContent.uid)"
    >
        <span>{{ todolistContent.fileName }}</span>
        <i
            class="el-icon-circle-close common-icon-animation"
            @click.stop="handleDeleteIconClicked"
        ></i>
        <i
            class="el-icon-setting common-icon-animation"
            @click.stop="handleSettingIconClicked"
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
            return this.todolist.content;
        },
        isSelected() {
            return this.todolistContent.uid === this.selectedTodolistName;
        }
    },
    methods: {
        ...mapMutations(['setSelectedTodolistName', 'setSelectedTodolistType']),
        /* 对于选中的todolist，自动滚动到底部 */
        scrollToBottom() {
            this.$nextTick(() => {
                let todolistDetailElement = document.getElementById(
                    'div-todolistDetailContent'
                );
                if (
                    todolistDetailElement &&
                    !(todolistDetailElement.scrollTop > 0)
                ) {
                    this.$anime({
                        targets: todolistDetailElement,
                        easing: 'easeInOutCubic',
                        duration: '1500',
                        scrollTop: [0, todolistDetailElement.scrollHeight]
                    });
                }
            });
        },
        handleTodolistRagClicked(uid) {
            if (uid === this.selectedTodolistName) {
                this.setSelectedTodolistName('');
                this.setSelectedTodolistType('');
            } else {
                this.setSelectedTodolistName(uid);
                this.setSelectedTodolistType(this.todolistContent.todolistType);
            }
            this.scrollToBottom();
        },
        handleDeleteIconClicked() {
            this.$confirm(
                `确认要删除Todolist「${this.todolistContent.fileName}」吗，删除后将不可恢复？`,
                '提示',
                { type: 'warning' }
            )
                .then(() => {
                    eventBus.$emit('delete-todolist', this.todolistContent.uid);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        handleSettingIconClicked() {
            eventBus.$emit('reconfig-todolist', this.todolistContent.uid);
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
    &.selectedRag {
        width: 190px;
        box-shadow: 2px 0px 8px 1px rgba(0, 0, 0, 0.5);
        // left: 10px;
    }
    & span {
        font-weight: 450;
        user-select: none;
    }
    & i {
        opacity: 0;
        margin-right: 2px;
        float: right;
        font-size: 18px;
        line-height: 30px;
    }
    &:hover {
        box-shadow: 2px 0px 8px 1px rgba(0, 0, 0, 0.5);
    }
    &:hover i {
        opacity: 1;
    }
}
</style>
