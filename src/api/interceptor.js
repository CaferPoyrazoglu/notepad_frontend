import axiosInstance from '@/api/axiosInstance'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore.ts'

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && error.response.data === 'Token süresi doldu.') {
      try {
        const response = await axiosInstance.post('/auth/refresh-token', null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
          }
        })
        localStorage.setItem('access_token', response.data.access_token)
        const { config } = error
        config.headers.Authorization = `Bearer ${response.data.access_token}`
        return axiosInstance.request(config)
      } catch (refreshError) {
        if (refreshError.response.status === 403) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          const authStore = useAuthStore()
          authStore.logout()
          await router.push({
            path: '/login',
            query: {
              sessionExpired: true
            }
          })
        }
      }
    }

    return Promise.reject(error)
  }
)
