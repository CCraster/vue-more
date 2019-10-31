<template>
    <el-table :data="blogs">
        <el-table-column
            v-for="(column, index) in columns"
            :key="index"
            v-bind="column"
            align="center"
        >
            <template slot-scope="scope">
                <slot v-if="column.slotName" :name="column.slotName" v-bind="scope" />
                <template v-else>{{ scope.row[column.prop] }}</template>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: 'BaseTable',
    props: {
        blogs: {
            type: Array,
            default: []
        },
        columns: {
            type: Array,
            default: []
        }
    },
    mounted() {
        console.log(this.columns);
    }
};
</script>