import { api } from '@/lib/api'

export const getProfileKey = ['profile']

export async function getProfile() {
  const response = await api.get('/profile')

  return response.data
}
