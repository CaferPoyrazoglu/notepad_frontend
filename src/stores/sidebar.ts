import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  const isSidebarOpen = ref(false)
  const selected = useStorage('selected', ref(null))
  const page = ref("")

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  function  newPage(newPage: string) {
    page.value = newPage
  }

  return { isSidebarOpen, toggleSidebar, selected, page, newPage }
})
