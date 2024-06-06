import { useOrganization } from '@/stores/organization'

export function Organization() {
  const organizationSelected = useOrganization(
    (state) => state.organizationSelected,
  )

  return (
    <div className="p-4">{JSON.stringify(organizationSelected, null, 2)}</div>
  )
}
