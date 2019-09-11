import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAnime from 'vue-animejs';
import VueParticles from 'vue-particles';
import './less/common.less'; // 引用全局通用less样式

Vue.use(ElementUI);
Vue.use(VueAnime);
Vue.use(VueParticles);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
