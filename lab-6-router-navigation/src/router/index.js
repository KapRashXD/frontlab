import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CatalogView from '../views/CatalogView.vue'
import ProductDetailsView from '../views/ProductDetailsView.vue'

import ProfileView from '../views/ProfileView.vue'
import ProfileInfoView from '../views/ProfileInfoView.vue'
import ProfileSettingsView from '../views/ProfileSettingsView.vue'

import NotFoundView from '../views/NotFoundView.vue'

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
  {
    path: '/profile',
    component: ProfileView,
    children: [
      { path: '', redirect: '/profile/info' },
      { path: 'info', component: ProfileInfoView },
      { path: 'settings', component: ProfileSettingsView },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
