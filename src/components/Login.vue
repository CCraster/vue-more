<template>
    <div class="login-container">
        <header class="login-header">
            <img
                id="portrait-root"
                class="img-portrait"
                @click="handlePortraitClick($event)"
                src="@/assets/portrait/root.png"
            />
            <!-- </router-link> -->
            <!-- <router-link to="/about"> -->
            <img
                id="portrait-guest"
                class="img-portrait"
                @click="handlePortraitClick($event)"
                src="@/assets/portrait/guest8.png"
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
                ></el-input>
                <span
                    v-show="rootPortraitHighlighted"
                    class="login-forget-tip"
                    @click="handleForgotClick"
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
                    >{{
                        rootPortraitHighlighted ? '取消' : '有东西'
                    }}</el-button
                >
            </div>
        </section>
    </div>
</template>
<script>
import { loginPortraitAnimation, loginPanelAnimation } from '@/animation';
export default {
    name: 'Login',
    data() {
        return {
            rootPortraitHighlighted: true,
            rootPortraitHighlight: null,
            guestPortraitHighlight: null,
            loginPassword: ''
        };
    },
    computed: {
        currentUser() {
            return this.rootPortraitHighlighted ? 'Craster' : 'Guest';
        }
    },
    mounted() {
        loginPanelAnimation('.login-container');
        this.rootPortraitHighlight = loginPortraitAnimation(
            '#portrait-guest',
            '#portrait-root',
            '.login-container'
        );
        this.guestPortraitHighlight = loginPortraitAnimation(
            '#portrait-root',
            '#portrait-guest',
            '.login-container'
        );
    },
    methods: {
        handlePortraitClick(e) {
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
        handleForgotClick() {
            this.$message({
                message: `重置密码什么的是不可能有的啦，密码都能忘，还是别登陆了！`,
                type: 'warning'
                // showClose: true
            });
        },
        handleLoginButtonClick(type) {
            if (type === 'login') {
                if (this.rootPortraitHighlighted) {
                    console.log('root login');
                } else {
                    this.$message({
                        message: '抱歉，「访客登陆」功能仍在开发中！',
                        type: 'warning'
                        // center: true
                    });
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
