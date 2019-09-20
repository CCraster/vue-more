<template>
    <el-container class="home">
        <el-header class="home-header">
            <img src="@/assets/logo_1.png" />
            <el-menu
                :default-active="activeMenu"
                mode="horizontal"
                class="header-menu"
                @select="handleMenuSelect"
                background-color="#2196f3"
                text-color="#fff"
                active-text-color="#f67505"
            >
                <el-menu-item
                    v-for="menu in userMenu"
                    :key="menu.index"
                    :index="menu.index"
                    >{{ menu.name }}</el-menu-item
                >
            </el-menu>
            <div class="header-user">Hi, {{ loginUserName }}!</div>
        </el-header>
        <el-main class="home-main">
            <component :is="menus[activeMenu]"></component>
        </el-main>
        <el-footer class="home-footer">
            <Footer />
        </el-footer>
    </el-container>
</template>

<script>
import { mapState } from 'vuex';
import Footer from '@/components/page/Footer';
import TodoPage from '@/components/page/TodoPage';
import { ROOT_MENU, GUEST_MENU } from '@/constants/';
export default {
    name: 'Home',
    components: {
        Footer,
        TodoPage
    },
    data() {
        return {
            menus: {
                blog: TodoPage,
                todolist: TodoPage,
                aboutme: TodoPage
            }
        };
    },
    computed: {
        ...mapState(['isRootUserLogin']),
        userMenu() {
            return this.isRootUserLogin ? ROOT_MENU : GUEST_MENU;
        },
        activeMenu() {
            return this.$route.params.menuName;
        },
        loginUserName() {
            return this.isRootUserLogin ? 'Craster' : 'Guest';
        }
    },
    methods: {
        handleMenuSelect(menuName) {
            if (this.activeMenu === menuName) return;
            this.$router.push(menuName);
        }
    }
};
</script>

<style lang="less" scoped>
.home {
    /* 变量定义 */
    @color-root: #666;
    @color-guest: #f67505;
    @color-boxShadow: #777;
    @color-font: #fff;

    height: 100%;
    .home-header {
        background-color: #2196f3;
        padding: 0px 10%;
        height: 60px;
        display: flex;
        user-select: none;
        & img {
            height: 60px;
        }
        .header-menu {
            flex-grow: 1;
            margin: 0 300px 0 50px;
            font-weight: bold;
        }
        .header-user {
            line-height: 60px;
            font-weight: bold;
            color: @color-font;
        }
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
