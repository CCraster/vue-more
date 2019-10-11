<template>
    <div class="container-item">
        <input
            type="checkbox"
            :checked="itemContent.finished"
            @change="handleItemChecked"
        />
        <!-- <span contenteditable="true" v-model="itemContent.itemContent"></span> -->
        <span
            contenteditable="true"
            class="item-editable"
            @blur="handleItemLoseFocus"
            >{{ itemContent.itemContent }}</span
        >
        <!-- <textarea
            class="item-editable"
            @blur="handleItemLoseFocus"
            v-model="itemContent.itemContent"
        ></textarea>-->
        <i
            class="el-icon-circle-close"
            @click="handleDeleteItemIconClicked"
        ></i>
    </div>
</template>

<script>
import eventBus from '@/common/eventBus';
import { EVENT_EDIT_ITEM, EVENT_DELETE_ITEM } from '@/constants/';
export default {
    name: 'TodolistItem',
    props: {
        itemContent: {
            type: Object,
            default: () => {}
        },
        itemIndex: {
            type: Number
        }
    },
    methods: {
        handleItemChecked(e) {
            this.itemContent.finished = e.target.checked;
            this.itemContent.lastModifiedTime = new Date().valueOf();
            eventBus.$emit(EVENT_EDIT_ITEM, this.itemContent, this.itemIndex);
        },
        handleDeleteItemIconClicked() {
            eventBus.$emit(EVENT_DELETE_ITEM, this.itemIndex);
        },
        /* 处理item内容改变事件 */
        handleItemLoseFocus(e) {
            // this.itemContent.itemContent = e.target.innerText;
            // console.log(this.itemContent);

            if (e.target.innerText !== this.itemContent.itemContent) {
                console.log('change');
                this.itemContent.itemContent = e.target.innerText;
                eventBus.$emit(
                    EVENT_EDIT_ITEM,
                    this.itemContent,
                    this.itemIndex
                );
            }
        }
    }
};
</script>

<style lang="less">
.container-item {
    display: flex;
    align-items: center;
    .item-editable {
        // width: 100px;
        white-space: pre-wrap;
    }
}
</style>
