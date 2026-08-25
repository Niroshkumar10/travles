import axios from 'axios'

import { env } from '@/config/env'
import { useAuthStore } from '@/stores/useAuthStore'

/**
 * Axios instance for a future real backend. Not used by the mock services
 * directly today (see src/services/*\/api.js) — once a real API exists,
 * each service file swaps its fixture-backed function body for a call
 * through this client, keeping call signatures (and every consumer)
 * unchanged.
 */
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000,
})

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().session?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  },
)
