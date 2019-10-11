<template>
    <div class="home">
        <div class="home-header">
            <img src="@/assets/logo_1.png" />
            <el-menu
                :default-active="activeMenu"
                mode="horizontal"
                class="header-menu"
                @select="handleMenuSelect"
                background-color="#007add"
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
            <div class="header-token">
                <el-input v-model="accessToken" size="small"></el-input>
                <el-button @click="handleSubmitToken" size="small"
                    >提交</el-button
                >
            </div>
            <div class="header-user">Hi, {{ loginUserName }}!</div>
        </div>
        <div class="home-main">
            <component :is="menus[activeMenu]"></component>
        </div>
        <div class="home-footer">
            <Footer />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import store from '@/store/';
import Footer from '@/components/page/Footer';
import TodoPage from '@/components/page/TodoPage';
import Todolist from '@/components/todolist/Todolist';
import { ROOT_MENU, GUEST_MENU, USER_TYPE } from '@/constants/';
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
                todolist: Todolist,
                aboutme: TodoPage
            },
            accessToken: store.state.token.token
        };
    },
    mounted() {
        console.log(this.loginUserType);
    },
    computed: {
        ...mapState(['loginUserType']),
        userMenu() {
            return this.loginUserType === USER_TYPE.ROOT
                ? ROOT_MENU
                : GUEST_MENU;
        },
        activeMenu() {
            return this.$route.params.menuName;
        },
        loginUserName() {
            return this.loginUserType === USER_TYPE.ROOT ? 'Craster' : 'Guest';
        }
        // accessToken() {
        //     return this.token.token;
        // }
    },
    methods: {
        // ...mapMutations(['SET_TOKEN']),
        handleMenuSelect(menuName) {
            if (this.activeMenu === menuName) return;
            this.$router.push(menuName);
        },
        handleSubmitToken() {
            this.$store.dispatch('Authentication', this.accessToken);
        }
    }
};
</script>

<style lang="less">
.home {
    /* 变量定义 */
    @color-root: #666;
    @color-guest: #f67505;
    @color-boxShadow: #777;
    @color-font: #fff;

    height: 100%;
    .home-header {
        // background-color: #2196f3;
        background-color: #007add;
        padding: 0px 15%;
        height: 60px;
        display: flex;
        user-select: none;
        & img {
            height: 60px;
        }
        .header-menu {
            flex-grow: 1;
            margin: 0 0px 0 50px;
            font-weight: bold;
        }
        .header-user {
            line-height: 60px;
            font-weight: bold;
            color: @color-font;
        }
    }
    .home-main {
        height: calc(100% - 120px);
        // min-height: ~'calc(100% - 120px)';
        padding: 0px 15%;
        background-color: #fff;
    }
    .home-footer {
        height: 60px;
        background-color: #fff;
        padding: 0px 15%;
    }
}
</style>
