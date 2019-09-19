<template>
    <el-container class="home">
        <el-header class="home-header">
            <Header />
        </el-header>
        <el-main class="home-main">
            <TodoPage />
        </el-main>
        <el-footer class="home-footer">
            <Footer />
        </el-footer>
    </el-container>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/page/Header';
import Footer from '@/components/page/Footer';
import TodoPage from '@/components/page/TodoPage';
export default {
    name: 'Home',
    components: {
        Header,
        Footer,
        TodoPage
    },
    computed: {
        ...mapState(['isRootUserLogin'])
    }
};
</script>

<style lang="less" scoped>
.home {
    /* 变量定义 */
    @color-root: #666;
    @color-guest: rgb(246, 117, 5);
    @color-boxShadow: #777;

    height: 100%;
    .home-header {
        background-color: #ccc;
    }
    .home-main {
        background-color: #fff;
    }
    .home-footer {
        background-color: #fff;
        padding: 0px 10%;
    }
}
</style>
