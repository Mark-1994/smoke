import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Users from '../views/user/Users.vue'
import Link from '../views/link/Link.vue'
import Record from '../views/record/Record.vue'
import Share from '../views/share/Share.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/users',
    children: [{
      path: '/users',
      name: 'Users',
      component: Users
    }, {
      path: '/link',
      name: 'Link',
      component: Link
    }, {
      path: '/record',
      name: 'Record',
      component: Record
    }]
  },
  {
    path: '/share',
    name: 'Share',
    component: Share
  }
]

const router = new VueRouter({
  routes
})

export default router
