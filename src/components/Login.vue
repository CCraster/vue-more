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
                    placeholder="输入暗号吧，少年"
                    v-model="loginPassword"
                    size="small"
                    prefix-icon="el-icon-key"
                ></el-input>
            </div>
            <span class="login-forget-tip" @click="s">忘记密码?</span>
            <div class="login-button-container">
                <el-button size="small" type="primary" plain>登陆</el-button>
                <el-button size="small" type="warning" plain>取消</el-button>
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
        }
    }
};
</script>
<style lang="less">
.login-container {
    /* 变量定义 */
    @color-root: rgb(123, 195, 253);
    @color-guest: rgb(246, 117, 5);
    @color-boxShadow: #777;

    height: 220px;
    width: 400px;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 3px;
    // transform: translate(-50%, -50%);
    box-shadow: 0px 0px 5px @color-boxShadow;
    // background: rgba(123, 195, 253, 0.745);
    .login-header {
        // padding-top: 40px;
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
        // #portrait-root:hover {
        //     box-shadow: 0px 0px 10px rgb(123, 195, 253);
        // }
        #portrait-guest {
            left: 50%;
            box-shadow: 0px 0px 10px @color-guest;
        }
        // #portrait-guest:hover {
        //     box-shadow: 0px 0px 10px rgb(246, 117, 5);
        // }
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
        padding-top: 15px;
        position: relative;
        .login-input-container {
            display: inline-block;
            width: 280px;
        }
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
        .login-button-container {
            margin-top: 40px;
        }
        .login-button-container button {
            width: 90px;
        }
    }
}
</style>
