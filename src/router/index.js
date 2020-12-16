import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import SelfInformation from '../views/SelfInformation.vue'
import Search from '../views/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
<<<<<<< HEAD
    component: Index
=======
    name: '#',
    redirect: 'Login',
>>>>>>> 86ef6f83d4b94067ad6137391d33608fbbbe76f9
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/selfinformation',
    component: SelfInformation
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

// //挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//       window.sessionStorage.clear();
//       return next();
//   }
//   //获取token
//   const tokenStr = window.sessionStorage.getItem('token');
//   //无token强制跳转到登录页面
//   if (!tokenStr) return next('/login');
//   next();
// })

export default router
