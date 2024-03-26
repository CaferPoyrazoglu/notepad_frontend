import { createRouter, createWebHistory } from 'vue-router'

import HomeView from "@/views/Dashboard/HomeView.vue";
import TagsView from "@/views/TagsView.vue";
import NotesView from "@/views/NotesView.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/notes',
    name: 'notes',
    component: NotesView,
    meta: {
      title: 'Notes'
    }
  },
  {
    path: '/tags',
    name: 'tags',
    component: TagsView,
    meta: {
      title: 'Tags'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`
  next()
})

export default router
