import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import VueAnime from 'vue-animejs';
import './less/common.less'; // 引用全局通用less样式

Vue.use(VueAnime);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
