<template>
    <div>
        <el-pagination
            @size-change="1"
            @current-change="2"
            current-page="3"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
        ></el-pagination>
    </div>
</template>