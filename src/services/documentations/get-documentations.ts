import { api } from '@/lib/api'
import { useOrganization } from '@/stores/organization'

const organizationId = useOrganization.getState().organizationSelected?.id

export const getDocumentationsKey = [
  'organizations',
  organizationId,
  'documentations',
]

export async function getDocumentations() {
  const response = await api.get(
    `/organizations/${organizationId}/documentations`,
  )

  return response.data
}
