<template>
    <el-dialog
        :title="options.title"
        :visible="visible"
        @update:visible="updateVisible"
        width="400px"
        class="container-add-blog"
    >
        <div>
            <label>博客标题：</label>
            <el-input
                v-model="options.name"
                size="small"
                style="width: 193px;"
                placeholder="请输入博客标题"
            ></el-input>
        </div>
        <div>
            <label>分类：</label>
            <el-select
                v-model="options.category"
                size="small"
                placeholder="请选择博客分类"
                filterable
                default-first-option
                allow-create
            >
                <el-option
                    v-for="(category, index) in categoryAndLabelSet.category"
                    :key="index"
                    :label="category"
                    :value="category"
                ></el-option>
            </el-select>
        </div>
        <div>
            <label>标签：</label>
            <el-select
                v-model="options.label"
                size="small"
                placeholder="请选择博客标签"
                multiple
                filterable
                default-first-option
                allow-create
            >
                <el-option
                    v-for="(label, index) in categoryAndLabelSet.label"
                    :key="index"
                    :label="label"
                    :value="label"
                ></el-option>
            </el-select>
        </div>
        <div>
            <label>发布状态：</label>
            <el-select
                v-model="options.status"
                size="small"
                placeholder="请选择博客发布状态"
            >
                <el-option
                    v-for="(status, index) in blogStatus"
                    :key="index"
                    :label="status.label"
                    :value="status.value"
                ></el-option>
            </el-select>
        </div>
        <div>
            <el-button type="primary" size="small" @click="confirmSubmit" plain
                >确定</el-button
            >
            <el-button
                type="primary"
                size="small"
                @click="showEditBlogDialog"
                plain
                >编辑内容</el-button
            >
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: 'AddBlogDialog',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        options: {
            type: Object,
            default: () => {}
        },
        categoryAndLabelSet: {
            type: Object,
            default: () => {}
        },
        confirm: {
            type: Function
        }
    },
    data() {
        return {
            blogStatus: [
                {
                    value: 0,
                    label: '待发布'
                },
                {
                    value: 1,
                    label: '仅自己可见'
                },
                {
                    value: 2,
                    label: '所有人可见'
                }
            ]
        };
    },
    methods: {
        updateVisible(v) {
            this.$emit('update:visible', v);
        },
        showEditBlogDialog() {
            this.$emit('isShowEditBlogDialog', true);
            this.updateVisible(false);
        },
        confirmSubmit() {
            let timeValue = new Date().valueOf();
            if (
                !this.options.name ||
                !this.options.category ||
                this.options.label.length === 0
            ) {
                this.$message.error('请完善blog信息！');
                return;
            }
            if (!this.options.uid) {
                this.options.uid = 'blog-' + timeValue;
                this.options.content = '';
                this.options.createdTime = this.options.lastModiifyTime = timeValue;
            } else {
                this.options.lastModiifyTime = timeValue;
            }
            delete this.options.title;
            this.confirm(this.options);
            this.updateVisible(false);
        }
    }
};
</script>

<style lang="less" scoped>
.container-add-blog {
    .el-dialog__body > div:not(:last-child) {
        margin-bottom: 10px;
        & > label {
            display: inline-block;
            width: 80px;
            text-align-last: justify;
        }
    }
    .el-dialog__body > div {
        text-align: center;
    }
}
</style>
