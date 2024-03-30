import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useIsLoadingStore = defineStore('isLoading', () => {
  const isLoading = ref(false)
  return { isLoading }
})
