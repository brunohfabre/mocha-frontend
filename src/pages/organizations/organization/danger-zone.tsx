import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { LoaderCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/api'
import {
  getOrganizationsKey,
  type OrganizationType,
} from '@/services/organizations/get-organizations'
import { useOrganization } from '@/stores/organization'
import { useQueryClient } from '@tanstack/react-query'

export function DangerZone() {
  const navigate = useNavigate()

  const organizationSelected = useOrganization(
    (state) => state.organizationSelected,
  )
  const selectOrganization = useOrganization(
    (state) => state.selectOrganization,
  )

  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = useState(false)

  async function handleDelete() {
    try {
      setIsLoading(true)

      if (!organizationSelected) {
        return
      }

      const organizations = queryClient.getQueryData(
        getOrganizationsKey,
      ) as OrganizationType[]

      if (organizations.length === 1) {
        window.alert('dont have other organizations')

        return
      }

      await api.delete(`/organizations/${organizationSelected.id}`)

      const newOrganizations = organizations.filter(
        (item) => item.id !== organizationSelected.id,
      )

      queryClient.setQueryData(getOrganizationsKey, newOrganizations)

      selectOrganization(newOrganizations[0])

      navigate(-1)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-semibold">Danger Zone</p>

      <div className="flex flex-col gap-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm">Transfer organization</p>
          <Button variant="destructive" disabled>
            Transfer
          </Button>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <p className="text-sm">Delete organizarion</p>
          <Button variant="destructive" onClick={handleDelete}>
            {isLoading ? <LoaderCircle /> : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  )
}
