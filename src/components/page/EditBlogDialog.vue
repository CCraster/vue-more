<template>
    <el-dialog :visible="visible" @update:visible="updateVisible" width="70%">
        <mavon-editor v-model="blogContentSync" @save="save" />
    </el-dialog>
</template>

<script>
export default {
    name: 'EditBlogDialog',
    props: {
        blogContent: {
            type: String,
            default: ''
        },
        visible: {
            type: Boolean,
            default: false
        },
        save: {
            type: Function
        }
    },
    data() {
        return {
            blogContentSync: ''
        };
    },
    watch: {
        blogContent: {
            immediate: true,
            handler() {
                this.blogContentSync = this.blogContent;
            }
        }
    },
    methods: {
        updateVisible(v) {
            this.$emit('update:visible', v);
        }
    }
};
</script>

<style lang="less" scoped></style>
