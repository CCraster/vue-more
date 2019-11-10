<template>
    <div class="container-blog">
        <div class="blog-table-header">
            <el-input
                v-model="searchWord"
                placeholder="请输入搜索内容"
                style="width: 200px; margin: 0 0 0 10px;"
                size="small"
            >
                <el-button slot="prepend">搜索</el-button>
            </el-input>
            <el-button
                size="small"
                style="float: right; margin: 5px 10px 0 0;"
                icon="el-icon-circle-plus"
                type="primary"
                @click="showAddBlog"
                >新建博客</el-button
            >
        </div>
        <BaseTable :blogs="tableCurrentPageData" :columns="columns">
            <template slot="index" slot-scope="{ $index }">{{
                $index + 1
            }}</template>
            <template slot="category" slot-scope="{ row }">
                <el-tag size="mini" type="warning">{{ row.category }}</el-tag>
            </template>
            <template slot="label" slot-scope="{ row }">
                <el-tag
                    v-for="(label, index) in row.label"
                    :key="index"
                    size="mini"
                    >{{ label }}</el-tag
                >
            </template>
            <template slot="createdTime" slot-scope="{ row }">{{
                timeValueToLocal(row.createdTime)
            }}</template>
            <template slot="lastModiifyTime" slot-scope="{ row }">{{
                timeValueToLocal(row.lastModiifyTime)
            }}</template>
            <template slot="status" slot-scope="{ row }">{{
                BLOG_STATUS[row.status]
            }}</template>
            <template slot="opt" slot-scope="{ row }">
                <el-button
                    size="mini"
                    type="primary"
                    @click="editBlogInfo(row)"
                    plain
                    >编辑博客</el-button
                >
                <el-button size="mini" type="primary" plain
                    >复制分享链接</el-button
                >
                <el-button
                    size="mini"
                    type="danger"
                    @click="confirmDeleteBlog(row)"
                    plain
                    >删除</el-button
                >
            </template>
        </BaseTable>
        <Pagination
            :page-size.sync="pageSize"
            :current-page.sync="pageIndex"
            :total="blogsTableData.length"
            class="blog-pagination"
        />
        <AddBlogDialog
            :visible.sync="isShowAddBlogDialog"
            @isShowEditBlogDialog="isShowEditBlogDialog = true"
            :options="options"
            :categoryAndLabelSet="categoryAndLabelSet"
            :confirm="addBlog"
        />
        <EditBlogDialog
            :visible.sync="isShowEditBlogDialog"
            :blogContent="focusBlogData.content"
            :save="editBlogContent"
        />
    </div>
</template>

<script>
import GistApi from '@/apis/gist';
import BaseTable from '@/components/common/table/BaseTable';
import Pagination from '@/components/common/table/Pagination';
import AddBlogDialog from '@/components/page/AddBlogDialog';
import EditBlogDialog from '@/components/page/EditBlogDialog';
import { getGistFiles, timeValueToLocal } from '@/common/util';
import { GIST_BLOG } from '@/constants/';

export default {
    name: 'BlogEditor',
    components: {
        BaseTable,
        Pagination,
        AddBlogDialog,
        EditBlogDialog
    },
    data() {
        return {
            blogs: {},
            searchWord: '',
            pageSize: 3,
            pageIndex: 1,
            focusBlogData: {},
            isShowAddBlogDialog: false,
            isShowEditBlogDialog: false,
            options: {
                title: '',
                name: '',
                category: '',
                label: [],
                status: -1
            },
            BLOG_STATUS: {
                0: '待发布',
                1: '仅自己可见',
                2: '所有人可见'
            },
            columns: [
                {
                    slotName: 'index',
                    label: '序号'
                },
                {
                    prop: 'name',
                    label: '博客名称'
                },
                {
                    slotName: 'category',
                    label: '分类'
                },
                {
                    slotName: 'label',
                    label: '标签'
                },
                {
                    slotName: 'createdTime',
                    label: '创建时间'
                },
                {
                    slotName: 'lastModiifyTime',
                    label: '最后修改时间'
                },
                {
                    slotName: 'status',
                    label: '博客状态'
                },
                {
                    slotName: 'opt',
                    label: '操作',
                    width: '280px'
                }
            ]
        };
    },
    computed: {
        blogsTableData() {
            let contentsArray = Object.values(this.blogs);
            contentsArray = contentsArray.map(item => {
                return item.content;
            });
            return contentsArray;
        },
        tableCurrentPageData() {
            // console.log(this.pageSize, this.pageIndex);
            return this.blogsTableData.slice(
                (this.pageIndex - 1) * this.pageSize,
                this.pageIndex * this.pageSize
            );
        },
        categoryAndLabelSet() {
            let categorySet = new Set(),
                labelSet = new Set();
            this.blogsTableData.forEach(blog => {
                categorySet.add(blog.category);
                blog.label.forEach(item => {
                    labelSet.add(item);
                });
            });
            return { category: categorySet, label: labelSet };
        }
    },
    async mounted() {
        const loading = this.$loading({
            lock: true,
            text: '加载中。。。',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        this.blogs = getGistFiles(await GistApi.getSingleGist(GIST_BLOG));
        loading.close();
        // console.log(this.blogs);
    },
    methods: {
        timeValueToLocal: timeValueToLocal,
        showAddBlog() {
            this.options = {
                title: '新建博客',
                name: '',
                category: '',
                label: [],
                status: 0
            };
            this.isShowAddBlogDialog = true;
        },
        editBlogInfo(row) {
            this.options = {
                title: '编辑博客',
                ...row
            };
            this.isShowAddBlogDialog = true;
            this.focusBlogData = row;
        },
        confirmDeleteBlog(row) {
            this.$confirm(
                `确认要删除Blog「${row.name}」吗，删除后将不可恢复？`,
                '提示',
                { type: 'warning' }
            )
                .then(() => {
                    this.deleteBlog(row.uid);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        async addBlog(newBlog) {
            let res = await GistApi.editGistFile(GIST_BLOG, newBlog);
            if (res.status === 200) {
                let msg = '「新增/更改」Blog配置成功！';
                this.$message.success(msg);
                this.blogs = getGistFiles(res);
            } else {
                let msg = '「新增/更改」Blog配置失败！';
                this.$message.error(msg);
            }
        },
        async deleteBlog(blogUid) {
            let res = await GistApi.deleteGistFile(GIST_BLOG, blogUid);
            if (res.status === 200) {
                this.$message.success('Blog删除成功！');
                this.blogs = getGistFiles(res);
            } else {
                this.$message.error('Blog删除失败！');
            }
        },
        async editBlogContent(newContent) {
            this.focusBlogData.content = newContent;
            this.focusBlogData.lastModiifyTime = Date.now();
            let res = await GistApi.editGistFile(GIST_BLOG, this.focusBlogData);
            if (res.status === 200) {
                let msg = `「更改」Blog「${this.focusBlogData.name}」内容成功！`;
                this.$message.success(msg);
                // this.blogs = getGistFiles(res);
            } else {
                let msg = `「更改」Blog「${this.focusBlogData.name}」内容失败！`;
                this.$message.error(msg);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.container-blog {
    height: 100%;
    // background-color: #fafafa;
    padding: 5px 0 0 0;
    .blog-table-header {
        @color-border: #ddd;
        height: 42px;
        line-height: 42px;
        // display: flex;
        // align-items: center;
        border-top: 1px solid @color-border;
        border-bottom: 1px solid @color-border;
    }
    .blog-pagination {
        margin-top: 5px;
        float: right;
    }
}
</style>
