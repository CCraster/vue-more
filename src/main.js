import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import VueClipboard from 'vue-clipboard2'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAnime from 'vue-animejs'
import VueParticles from 'vue-particles'
import './styles/common.less' // 引用全局通用less样式
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(VueAnime)
Vue.use(VueParticles)
Vue.use(VueClipboard)
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
