<template>
    <div
        :style="{ backgroundColor: rgbaOpacityReset(todolistColor, 0.5) }"
        @click="handleBlockSelected"
        class="container-todolist-items"
    >
        <div>
            <span
                v-for="(item, index) in singleTodolist.todolistItemContent"
                :key="index"
                :itemContent="item"
                :class="{ 'todolist-conplete': item.finished }"
                class="todolistItem-uneditable"
            >
                <!-- <span
                    :style="{ backgroundColor: item.itemColor }"
                    class="item-order"
                >{{ }}</span>-->
                {{ index + 1 + '. ' + item.itemContent }}
            </span>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
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
        /* 根据todolist自身的颜色，设置每个todolistBlock的背景色，透明度自设置 */
        rgbaOpacityReset(rgba, opacity) {
            return rgba.slice(0, rgba.lastIndexOf(',') + 1) + opacity + ')';
        },
        handleBlockSelected() {
            this.setSelectedBlockName(this.singleTodolist.todolistItemName);
        }
    }
};
</script>

<style lang="less">
.container-todolist-items {
    background-color: antiquewhite;
    margin: 5px 0px 0px 5px;
    padding: 10px;
    border-radius: 4px;
    // color: #fff;
    .todolistItem-uneditable {
        display: block;
    }
    .todolist-conplete {
        text-decoration: line-through;
    }
}
</style>
