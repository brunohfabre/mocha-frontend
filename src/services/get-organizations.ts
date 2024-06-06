import { api } from '@/lib/api'

export type OrganizationType = {
  id: string
  name: string
}

export const getOrganizationsKey = ['organizations']

export async function getOrganiaztions(): Promise<OrganizationType[]> {
  const response = await api.get('/organizations')

  return response.data.organizations
}
