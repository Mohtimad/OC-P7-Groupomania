import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register'
import Login from '../views/Login'
import Profile from '../views/Profile'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: "Register",
    component: Register,
  },
  {
    path: '/login',
    name: "Login",
    component: Login,
  },
  {
    path: '/profile',
    name: Profile,
    component: Profile,
  }
]
const router = new VueRouter({
  routes
})

export default router
