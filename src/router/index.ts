import { createRouter, createWebHistory } from 'vue-router'

import HomeView from "@/views/Dashboard/HomeView.vue";
import TagsView from "@/views/TagsView.vue";
import NotesView from "@/views/NotesView.vue";
import NoteView from "@/views/NoteView.vue";

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
    },
  },
  {
    path: '/note/:noteId',
    name: 'note',
    component: NoteView,
    meta: {
      title: 'Note'
    },
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
