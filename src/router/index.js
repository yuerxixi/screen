import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home/index.vue')
const SewageDeal = () => import(/* webpackChunkName: "sewageDeal" */ '../views/SewageDeal/index.vue')
const Lowcarbon = () => import(/* webpackChunkName: "LowCarbon" */ '../views/LowCarbon/index.vue')
const ThreeWaste = () => import(/* webpackChunkName: "ThreeWaste" */ '../views/ThreeWaste/index.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/', // 首页
    name: 'Home',
    component: Home
  },
  {
    path: '/sewageDeal', // 污水处理厂总览
    name: 'SewageDeal',
    component: SewageDeal
  },
  {
    path: '/lowCarbon', // 低碳园/中节能国际中心
    name: 'Lowcarbon',
    component: Lowcarbon
  },
  {
    path: '/threeWaste', // 三废概览
    name: 'ThreeWaste',
    component: ThreeWaste
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
