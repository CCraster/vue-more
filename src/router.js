import Vue from 'vue';
import Router from 'vue-router';
import Cookie from '@/common/cookie';
import { USER_KEY } from '@/constants';
import Login from './views/Login.vue';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
    // mode: "history",     // git pages不支持history模式，暂未找到解决方式20190905
    routes: [
        {
            path: '/',
            name: 'root'
            // redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            redirect: `/home/blog`
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

router.beforeEach((to, from, next) => {
    let login = Cookie.getAttribute(USER_KEY);
    if (login) {
        if (to.path === '/') {
            next('/home');
        } else {
            next();
        }
    } else {
        if (to.path !== '/login') {
            next('/login');
        } else {
            next();
        }
    }
});

export default router;
