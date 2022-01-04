import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import Lobby from '../views/Lobby.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Lobby',
    component: Lobby
  }
  ,
  {
    path: '/setup',
    name: 'SetUp',
    component: () => import( '../views/SetUp.vue')
  }
  ,
  {
    path: '/game',
    name: 'Game',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( '../views/Game.vue')
  }

]

const router = createRouter({
  //electron doesnt work with history mode
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes
})

export default router
