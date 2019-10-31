<template>
    <div class="login">
        <vue-particles
            class="particles"
            color="#453999"
            linesColor="#453999"
        ></vue-particles>
        <LoginPanel />
    </div>
</template>

<script>
// @ is an alias to /src
import LoginPanel from '@/components/page/LoginPanel';

export default {
    name: 'Login',
    components: {
        LoginPanel
    },
    data() {
        return {};
    },
    mounted() {},
    computed: {},
    methods: {}
};
</script>

<style lang="less" scoped>
.login {
    height: 100%;
    width: 100%;
    display: relative;
    .particles {
        height: 99%; // 100%则页面底部出现白边？？？
        width: 100%;
    }
}
</style>
