<template>
    <div class="login-container">
        <header class="login-header">
            <img
                id="portrait-root"
                class="img-portrait"
                alt="portrait-root"
                @click="portraitClicked($event)"
                src="@/assets/image/portrait/root.png"
            />
            <!-- </router-link> -->
            <!-- <router-link to="/about"> -->
            <img
                id="portrait-guest"
                class="img-portrait"
                alt="portrait-guest"
                @click="portraitClicked($event)"
                src="@/assets/image/portrait/guest.png"
            />
            <span>{{ currentUser }}</span>
        </header>
        <section class="login-content">
            <div class="login-input-container">
                <el-input
                    v-show="rootPortraitHighlighted"
                    placeholder="输入暗号吧，少年"
                    v-model="loginPassword"
                    size="small"
                    prefix-icon="el-icon-key"
                    show-password
                ></el-input>
                <span
                    v-show="rootPortraitHighlighted"
                    class="login-forget-tip"
                    @click="forgetPasswordLinkClicked"
                    >忘记密码?</span
                >
                <span v-show="!rootPortraitHighlighted" class="login-guest-tip"
                    >你可以选择「登陆」查看受限内容，或者，尝试一下「有东西」。</span
                >
            </div>
            <div class="login-button-container">
                <el-button
                    @click="handleLoginButtonClick('login')"
                    size="small"
                    type="primary"
                    plain
                    >登陆</el-button
                >
                <el-button
                    @click="handleLoginButtonClick('cancel')"
                    size="small"
                    type="warning"
                    plain
                >
                    {{ rootPortraitHighlighted ? '取消' : '有东西' }}
                </el-button>
            </div>
        </section>
    </div>
</template>
<script>
import { loginPortraitAnimation, loginPanelAnimation } from '@/animation';
import GistApi from '@/apis/gist';
import Cookie from '@/common/cookie';
import { GIST_ROOTUSER, USER_KEY, USER_TYPE } from '@/constants/';
import { getGistFiles } from '@/common/util';
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'LoginPanel',
    data() {
        return {
            rootPortraitHighlighted: true,
            rootPortraitHighlight: null,
            guestPortraitHighlight: null,
            loginPassword: ''
        };
    },
    computed: {
        ...mapState(['loginUserType']),
        currentUser() {
            return this.rootPortraitHighlighted ? 'Craster' : 'Guest';
        }
    },
    mounted() {
        loginPanelAnimation('.login-container'); // 执行登陆面板进入动画
        // 初始化root用户头像点击动画
        this.rootPortraitHighlight = loginPortraitAnimation(
            '#portrait-guest',
            '#portrait-root',
            '.login-container'
        );
        // 初始化guest用户头像点击动画
        this.guestPortraitHighlight = loginPortraitAnimation(
            '#portrait-root',
            '#portrait-guest',
            '.login-container'
        );
    },
    methods: {
        ...mapMutations(['setLoginUserType']),
        /* 登陆面板头像点击处理函数 */
        portraitClicked(e) {
            let targetId = e.target.id;
            if (
                targetId === 'portrait-root' &&
                this.rootPortraitHighlighted === false
            ) {
                this.rootPortraitHighlight.play();
                this.rootPortraitHighlighted = true;
            } else if (
                targetId === 'portrait-guest' &&
                this.rootPortraitHighlighted === true
            ) {
                this.guestPortraitHighlight.play();
                this.rootPortraitHighlighted = false;
            }
        },
        /* 忘记密码链接点击处理函数 */
        forgetPasswordLinkClicked() {
            this.$message({
                message: `重置密码什么的是不可能有的啦，密码都能忘，还是别登陆了！`,
                type: 'warning'
                // showClose: true
            });
        },
        /* 登陆面板按钮被点击的处理函数 */
        async handleLoginButtonClick(type) {
            if (type === 'login') {
                if (this.rootPortraitHighlighted) {
                    this.handleRootUserLogin();
                } else {
                    this.handleGuestUserLogin();
                }
            } else {
                if (this.rootPortraitHighlighted) {
                    this.$message({
                        message: `抱歉，「取消」功能是根据颜值开启的！`,
                        type: 'error'
                        // center: true
                    });
                } else {
                    this.$message({
                        message: '抱歉，「访客有东西」功能仍在开发中！',
                        type: 'warning'
                        // center: true
                    });
                }
            }
        },
        /* Root-处理登陆按钮事件 */
        async handleRootUserLogin() {
            // 若没输入密码，显示提示并退出
            if (!this.loginPassword) {
                this.$message({
                    message: '请输入密码以登陆！',
                    type: 'warning'
                });
                return;
            }
            // 有输入密码，进行验证
            let res = await GistApi.getSingleGist(GIST_ROOTUSER);
            let userList = getGistFiles(res)['user.js'].content;
            if (this.loginPassword === userList.password) {
                this.$message({
                    message: 'Bingo, welcome!',
                    type: 'success'
                });
                Cookie.setAttribute(USER_KEY, USER_TYPE.ROOT, 1); //
                this.setLoginUserType(USER_TYPE.ROOT); // 更改为ROOT用户
                console.log(this.loginUserType);
                this.$router.push('home/todolist'); // 登陆成功跳转
            } else {
                this.$message({
                    message: '抱歉，您输入的密码有误！',
                    type: 'error'
                });
            }
        },
        /* Guest-处理登陆按钮事件 */
        handleGuestUserLogin() {
            this.$message({
                // message: '可惜，你其实可以做的更好！',
                message: 'Hello！',
                type: 'warning'
            });
            Cookie.setAttribute(USER_KEY, USER_TYPE.GUEST_ORDINARY, 1);
            this.setLoginUserType(USER_TYPE.GUEST_ORDINARY);
            this.$router.push('home/blog');
        }
    }
};
</script>
<style lang="less" scoped>
.login-container {
    /* 变量定义 */
    @color-root: rgb(123, 195, 253);
    @color-guest: rgb(246, 117, 5);
    @color-boxShadow: #777;

    height: 220px;
    width: 400px;
    box-sizing: border-box;
    position: absolute;
    // top: 50%;
    left: 50%;
    border-radius: 3px;
    transform: translate(-50%, 0%);
    box-shadow: 0px 0px 5px @color-boxShadow;
    .login-header {
        height: 70px;
        text-align: center;
        .img-portrait {
            position: absolute;
            box-sizing: border-box;
            width: 30px;
            border: 2px solid #fff;
            border-radius: 50%;
            cursor: pointer;
        }
        .img-portrait:hover {
            box-shadow: 0px 0px 10px @color-boxShadow !important;
        }
        #portrait-root {
            width: 80px;
            left: 50%;
            box-shadow: 0px 0px 10px @color-root;
        }
        #portrait-guest {
            left: 50%;
            box-shadow: 0px 0px 10px @color-guest;
        }
        span {
            display: inline-block;
            margin-top: 40px + 4px;
            color: #fff;
            font-weight: bold;
        }
    }
    .login-content {
        // width: 300px;
        text-align: center;
        // padding-top: 15px;
        position: relative;
        .login-input-container {
            display: inline-block;
            width: 280px;
            height: 70px;
            padding-top: 20px;
            .login-forget-tip {
                position: absolute;
                display: block;
                color: #fff;
                margin-top: 6px;
                right: 60px;
                font-size: 12px;
            }
            .login-forget-tip:hover {
                text-decoration: underline;
                cursor: pointer;
            }
            .login-forget-tip:active {
                font-weight: bold;
                color: #409eff;
            }
            .login-guest-tip {
                position: relative;
                display: inline-block;
                color: #fff;
                width: 280px;
                font-size: 14px;
                padding: 0 20px;
                left: -20px; // 位置受限于login-input-container，借助定位修正span的位置
                border-left: 2px solid @color-guest;
                border-right: 2px solid @color-guest;
            }
        }
        .login-button-container {
            // margin-top: 40px;
        }
        .login-button-container button {
            width: 90px;
        }
    }
}
</style>
