import { api } from '@/lib/api'
import { useOrganization } from '@/stores/organization'

const organizationId = useOrganization.getState().organizationSelected?.id

export const getDocumentationKey = (params: Record<string, any>) => [
  'organizations',
  organizationId,
  'documentations',
  params,
]

export async function getDocumentation({ id }: { id: string }) {
  const response = await api.get(
    `/organizations/${organizationId}/documentations/${id}`,
  )

  const fileResponse = await fetch(response.data.documentation.fileUrl)
  const fileResult = await fileResponse.json()

  return {
    documentation: response.data.documentation,
    data: fileResult,
  }
}
