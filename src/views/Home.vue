<template>
    <div class="home">
        <vue-particles
            class="particles"
            color="#453999"
            linesColor="#453999"
        ></vue-particles>
        <Login />
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { mapState, mapGetters, mapMutations } from 'vuex';
import Login from '@/components/Login';

export default {
    name: 'Home',
    components: {
        Login
    },
    data() {
        return {};
    },
    mounted() {},
    computed: {
        ...mapState(['homeFirstAnimeFinished']),
        ...mapGetters(['currentPageColor'])
    },
    methods: {
        ...mapMutations([
            'updateHomeFirstAnimeFinished',
            'updateCurrentPageColorIndex'
        ])
    }
};
</script>

<style lang="less" scoped>
.home {
    height: 100%;
    width: 100%;
    display: relative;
    .particles {
        height: 99%; // 100%则页面底部出现白边？？？
        width: 100%;
    }
}
</style>
