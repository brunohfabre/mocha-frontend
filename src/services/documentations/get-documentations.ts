import { api } from '@/lib/api'
import { useOrganization } from '@/stores/organization'

import { DocumentationType } from './documentation-types'

const organizationId = useOrganization.getState().organizationSelected?.id

export const getDocumentationsKey = [
  'organizations',
  organizationId,
  'documentations',
]

export async function getDocumentations(): Promise<{
  documentations: DocumentationType[]
}> {
  const response = await api.get(
    `/organizations/${organizationId}/documentations`,
  )

  return response.data
}
