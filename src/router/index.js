import Vue from 'vue'
import Router from 'vue-router'
import Cookie from '@/utils/cookie'
import { USER_KEY } from '@/constants'

import { LAB_ROUTE } from './lab.js'

const Login = () => import('@/views/Login.vue')
const Home = () => import('@/views/Home.vue')
// const About = () => import('@/views/About.vue')
const TodoPage = () => import('@/components/page/TodoPage')
const Todolist = () => import('@/components/todolist/Todolist')
// const BlogEditor = () =>
//   import(/* webpackChunkName: "chunk-blogEditor" */ '@/components/blog-editor/')
const BlogEditor = () => import('@/components/blog-editor/')

Vue.use(Router)

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
      path: '/home',
      component: Home,
      children: [
        {
          path: '/home/blog-manage',
          component: BlogEditor
        },
        {
          path: '/home/blog',
          component: TodoPage
        },
        {
          path: '/home/todolist',
          component: Todolist
        },
        LAB_ROUTE,
        {
          path: '/home/aboutme',
          component: TodoPage
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let login = Cookie.getAttribute(USER_KEY)
  if (login) {
    if (to.path === '/') {
      next('/home')
    } else {
      next()
    }
  } else {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
