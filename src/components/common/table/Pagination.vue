<template>
    <div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentPageChange"
            :current-page.sync="currentPageSync"
            :page-sizes="[1, 2, 3]"
            :page-size.sync="pageSizeSync"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        pageSize: {
            type: Number,
            default: 10
        },
        currentPage: {
            type: Number,
            default: 1
        },
        total: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            pageSizeSync: 1,
            currentPageSync: 1
        };
    },
    watch: {
        pageSize: {
            immediate: true,
            handler() {
                this.pageSizeSync = this.pageSize;
            }
        },
        currentPage: {
            immediate: true,
            handler() {
                this.currentPageSync = this.currentPage;
            }
        }
    },
    methods: {
        handleSizeChange() {
            this.$emit('update:pageSize', this.pageSizeSync);
        },
        handleCurrentPageChange() {
            this.$emit('update:currentPage', this.currentPageSync);
        }
    }
};
</script>
