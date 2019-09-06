<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { homeAnimation } from './animation';
export default {
    mounted() {
        homeAnimation('#app');
    }
};
</script>

<style lang="less">
#app {
    height: 100%;
    text-align: center;
    color: #2c3e50;
    background-color: #42b983;
}
</style>
