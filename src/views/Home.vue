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
            <div
                v-click-outside="handleTokenClickOutside"
                :class="{ 'header-token-collapse': isTokenElementCollapse }"
                class="header-token"
                @click="handleTokenContainerClicked"
            >
                <div
                    class="header-token-submit"
                    :class="{ 'display-none': isTokenElementCollapse }"
                >
                    <div @click.stop>
                        <el-input
                            class="token-input"
                            v-model="accessToken"
                            size="small"
                        ></el-input>
                    </div>
                    <el-button @click.stop="handleTokenBind" size="small"
                        >绑定</el-button
                    >
                    <el-button @click.stop="handleTokenDebind" size="small"
                        >解绑</el-button
                    >
                </div>
                <div
                    class="header-token-tip"
                    :class="{ 'display-none': !isTokenElementCollapse }"
                >
                    <span>token</span>
                    <i v-if="isTokenBinded" class="el-icon-success"></i>
                    <i v-else class="el-icon-warning"></i>
                </div>
            </div>
            <div class="header-user">
                <el-dropdown @command="handleUserLogout">
                    <span class="login-user-name">
                        Hi, {{ loginUserName }}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout"
                            >退出</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
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
import ClickOutside from 'vue-click-outside';
import { mapState } from 'vuex';
import store from '@/store/';
import Cookie from '@/common/cookie';
import Footer from '@/components/page/Footer';
import TodoPage from '@/components/page/TodoPage';
import Todolist from '@/components/todolist/Todolist';
import { ROOT_MENU, GUEST_MENU, USER_KEY, USER_TYPE } from '@/constants/';
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
            accessToken: store.state.token.token,
            isTokenElementCollapse: true
        };
    },
    directives: {
        ClickOutside
    },
    mounted() {
        console.log(this.loginUserType);
    },
    computed: {
        ...mapState(['loginUserType', 'token']),
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
        },
        isTokenBinded() {
            return this.token.token && true;
        }
    },
    methods: {
        // ...mapMutations(['SET_TOKEN']),
        handleMenuSelect(menuName) {
            if (this.activeMenu === menuName) return;
            this.$router.push(menuName);
        },
        handleTokenBind() {
            this.$store.dispatch('Authentication', this.accessToken);
        },
        handleTokenDebind() {
            this.$store.dispatch('Cancellation');
        },
        handleUserLogout() {
            Cookie.remove(USER_KEY);
            this.$router.go(0); // 退出登陆后刷新页面
        },
        /* 通过控制class，token div点击动画 */
        handleTokenContainerClicked() {
            this.isTokenElementCollapse = !this.isTokenElementCollapse;
        },
        handleTokenClickOutside() {
            this.isTokenElementCollapse = true;
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
        display: flex;
        align-items: center;
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
        .header-token {
            width: 200px;
            height: 40px;
            box-sizing: border-box;
            margin-right: 10px;
            padding: 5px 5px;
            transition: all 0.3s;
            background-color: rgb(0, 89, 255);
            .header-token-submit {
                height: 100%;
                display: flex;
                align-items: center;
                .token-input {
                    // width: 80px;
                }
            }
            .header-token-tip {
                color: #fff;
                font-weight: bold;
                font-size: 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                & span {
                    transform: scale(0.9);
                }
            }
            .display-none {
                display: none;
            }
        }
        /* token div缩小的样式 */
        .header-token-collapse {
            width: 40px;
            border-radius: 50%;
        }
        .header-user {
            display: flex;
            align-items: center;
            font-weight: bold;
            color: @color-font;
            .login-user-name {
                color: #fff;
                &:hover {
                    i {
                        transform: rotate(90deg);
                    }
                }
                & i {
                    font-weight: bold;
                    transition: all 0.3s;
                }
            }
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
