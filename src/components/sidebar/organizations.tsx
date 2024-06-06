import { Link } from 'react-router-dom'

import { Check, ChevronsUpDown } from 'lucide-react'

import {
  getOrganiaztions,
  getOrganizationsKey,
} from '@/services/get-organizations'
import { useOrganization } from '@/stores/organization'
import { useQuery } from '@tanstack/react-query'

import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function Organizations() {
  const organizationSelected = useOrganization(
    (state) => state.organizationSelected,
  )
  const selectOrganization = useOrganization(
    (state) => state.selectOrganization,
  )

  const { data, isPending } = useQuery({
    queryKey: getOrganizationsKey,
    queryFn: getOrganiaztions,
  })

  if (data?.length && !organizationSelected) {
    selectOrganization(data[0])
  }

  if (isPending) {
    return <div>is loading</div>
  }

  return (
    <div className="flex p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="flex-1 justify-start pl-3 pr-2 font-normal"
          >
            {organizationSelected?.name}
            <ChevronsUpDown className="ml-auto size-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
          {data?.map((organization) => (
            <DropdownMenuItem
              key={organization.id}
              onClick={() => selectOrganization(organization)}
              className="justify-between"
            >
              {organization.name}

              {organization.id === organizationSelected?.id && (
                <Check className="size-4" />
              )}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/create-organization">+ Create Organization</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
