<template>
    <div id="home" class="home">
        <!-- <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>
        </div>-->
        <!-- <HelloWorld msg="Hello Craster!" /> -->
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import { homeAnimation } from '@/animation';

export default {
    name: 'Home',
    components: {
        // HelloWorld
    },
    mounted() {
        homeAnimation('#home');
    }
};
</script>

<style lang="less">
.home {
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    // overflow: hidden;
    .home-anime-div {
        // width: 20px;
        // height: 20px;
        box-sizing: border-box;
        background: #42b983;
        border: solid #fff 0px;
    }
}
#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
