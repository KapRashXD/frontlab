import { createRouter, createWebHistory } from 'vue-router'

import PostsView from '../views/PostsView.vue'
import PostDetailsView from '../views/PostDetailsView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'posts',
      component: PostsView,
    },
    {
      path: '/posts/:id',
      name: 'postDetails',
      component: PostDetailsView,
    },
  ],
})
