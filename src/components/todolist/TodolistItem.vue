<template>
    <div class="container-item">
        <input
            v-if="!isReportTypeTodolist"
            :id="checkboxId"
            type="checkbox"
            class="item-checkbox"
            :checked="itemContent.finished"
            @change="handleItemChecked"
        />
        <label :for="checkboxId"></label>
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
            v-if="!isReportTypeTodolist"
            class="el-icon-circle-close item-delete-icon common-icon-animation"
            @click="handleDeleteItemIconClicked"
        ></i>
    </div>
</template>

<script>
import eventBus from '@/common/eventBus';
import { mapState } from 'vuex';
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
    computed: {
        ...mapState(['selectedTodolistType']),
        checkboxId() {
            return 'item-checkbox_' + this.itemIndex;
        },
        isReportTypeTodolist() {
            return this.selectedTodolistType === 'report';
        }
    },
    methods: {
        handleItemChecked(e) {
            this.itemContent.finished = e.target.checked;
            this.itemContent.lastModifiedTime = new Date().valueOf();
            eventBus.$emit(EVENT_EDIT_ITEM, this.itemContent, this.itemIndex);
        },
        handleDeleteItemIconClicked() {
            eventBus.$emit(EVENT_DELETE_ITEM, [this.itemIndex]);
        },
        /* 处理item内容改变事件 */
        handleItemLoseFocus(e) {
            if (e.target.innerText !== this.itemContent.itemContent) {
                this.itemContent.itemContent = e.target.innerText;
                this.itemContent.lastModifiedTime = new Date().valueOf();
                e.target.innerHTML = e.target.innerText;
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
    .item-checkbox {
        display: none;
        & + label {
            width: 18px;
            height: 18px;
            flex-shrink: 0;
            margin-left: 5px;
            line-height: 18px;
            font-size: 14px;
            box-sizing: border-box;
            cursor: pointer;
            color: #007add;
            border-radius: 2px;
            font-weight: bold;
            border: 2px solid #007add;
            text-align: center;
        }
        &:checked + label::before {
            content: '\2713';
            margin-right: 2px;
        }
    }
    .item-editable {
        white-space: pre-wrap;
        margin: 0 4px 2px 4px;
        padding: 0px 4px;
        border-radius: 2px;
        font-size: 14px;
        outline: none;
        border: 1px solid #fff;
        transition: all 0.5s;
        &:hover,
        &:focus {
            border: 1px solid #007add;
            box-shadow: 0px 0px 2px #007add;
        }
    }
    .item-delete-icon {
        font-size: 16px;
    }
}
</style>
