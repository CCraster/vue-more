<template>
    <div>
        <input
            type="checkbox"
            :checked="itemContent.finished"
            @change="handleItemChecked"
        />
        <!-- <span contenteditable="true" v-model="itemContent.itemContent"></span> -->
        <span>{{ itemContent.itemContent }}</span>
        <i
            class="el-icon-circle-close"
            @click="handleDeleteItemIconClicked"
        ></i>
    </div> </template
>>

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
        }
    }
};
</script>

<style lang="less"></style>
