import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Cards from '../views/Cards.vue'
const routes = [
  {
    path: '/cards',
    name: 'cards',
    component: Cards
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
