import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    // mode: "history",     // git pages不支持history模式，暂未找到解决方式20190905
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            redirect: `/home/todolist`
        },
        {
            path: `/home/:menuName`,
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
});
