// noinspection JSCheckFunctionSignatures
import { defineStore } from 'pinia'
import {useStorage} from "@vueuse/core";

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = useStorage('isAuthenticated', false)
  const userRole = useStorage('userRole', '')
  const userName = useStorage('userName', '')

  function login(email: string) {
    isAuthenticated.value = true
    userRole.value = email
    userName.value = email
  }

  function logout() {
    isAuthenticated.value = false
    userRole.value = null
    userName.value = null
  }

  return { isAuthenticated, userRole, userName, login, logout}
})


