import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/Dashboard/HomeView.vue'
import TagsView from '@/views/TagsView.vue'
import NotesView from '@/views/NotesView.vue'
import NoteView from '@/views/NoteView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/authStore'
import NewNoteView from '@/views/NewNoteView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: redirectIfAuthenticated,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: authenticatedGuard,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/new',
    name: 'New',
    component: NewNoteView,
    beforeEnter: authenticatedGuard,
    meta: {
      title: 'New'
    }
  },
  {
    path: '/notes',
    name: 'notes',
    component: NotesView,
    beforeEnter: authenticatedGuard,
    meta: {
      title: 'Notes'
    }
  },
  {
    path: '/tags',
    name: 'tags',
    component: TagsView,
    beforeEnter: authenticatedGuard,
    meta: {
      title: 'Tags'
    }
  },
  {
    path: '/note/:noteId',
    name: 'note',
    component: NoteView,
    beforeEnter: authenticatedGuard,
    meta: {
      title: 'Note'
    }
  }
]

function authenticatedGuard(to: any, from: any, next: any): void {
  const authStore = useAuthStore()
  const isUserAuthenticated: boolean = authStore.isAuthenticated
  console.log(authStore.isAuthenticated)
  if (!isUserAuthenticated) {
    next({ name: 'login' })
  } else next()
}

function redirectIfAuthenticated(to: any, from: any, next: any): void {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    next({ name: 'Home' })
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  next()
})

export default router
