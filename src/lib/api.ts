import axios from 'axios'

import { env } from '@/env'
import { useAuth } from '@/stores/auth'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = useAuth.getState().token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      useAuth.getState().clearCredentials()
    }

    return Promise.reject(error)
  },
)
