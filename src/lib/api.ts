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
    // Faz alguma coisa com o erro da requisição
    return Promise.reject(error)
  },
)

// Adiciona um interceptador na resposta
api.interceptors.response.use(
  (response) => {
    // Qualquer código de status que dentro do limite de 2xx faz com que está função seja acionada
    // Faz alguma coisa com os dados de resposta
    return response
  },
  (error) => {
    // Qualquer código de status que não esteja no limite do código 2xx faz com que está função seja acionada
    // Faz alguma coisa com o erro da resposta
    return Promise.reject(error)
  },
)
