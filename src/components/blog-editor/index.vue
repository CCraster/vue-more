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
            >新增博客</el-button>
        </div>
        <BaseTable :blogs="blogsTableData" :columns="columns">
            <template slot="index" slot-scope="{ $index }">{{ $index + 1 }}</template>
            <template slot="category" slot-scope="{ row }">
                <el-tag size="mini" type="warning">{{ row.category }}</el-tag>
            </template>
            <template slot="label" slot-scope="{ row }">
                <el-tag v-for="(label, index) in row.label" :key="index" size="mini">{{ label }}</el-tag>
            </template>
            <template
                slot="createdTime"
                slot-scope="{ row }"
            >{{ timeValueToLocal(row.createdTime) }}</template>
            <template
                slot="lastModiifyTime"
                slot-scope="{ row }"
            >{{ timeValueToLocal(row.lastModiifyTime) }}</template>
            <template slot="status" slot-scope="{ row }">{{ BLOG_STATUS[row.status] }}</template>
            <template slot="opt">
                <el-button size="mini" type="primary" plain>编辑博客</el-button>
                <el-button size="mini" type="primary" plain>复制分享链接</el-button>
                <el-button size="mini" type="danger" plain>删除</el-button>
            </template>
        </BaseTable>
        <Pagination />
    </div>
</template>

<script>
import GistApi from '@/apis/gist';
import BaseTable from '@/components/common/table/BaseTable';
import Pagination from '@/components/common/table/Pagination';
import { getGistFiles, timeValueToLocal } from '@/common/util';
import { GIST_BLOG } from '@/constants/';

export default {
    name: 'BlogEditor',
    components: {
        BaseTable,
        Pagination
    },
    data() {
        return {
            blogs: {},
            searchWord: '',
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
        timeValueToLocal: timeValueToLocal
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
}
</style>
