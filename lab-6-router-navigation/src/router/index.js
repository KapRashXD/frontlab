import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CatalogView from '../views/CatalogView.vue'
import ProductDetailsView from '../views/ProductDetailsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: CatalogView,
  },
  {
    path: '/catalog/:id',
    name: 'productDetails',
    component: ProductDetailsView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
