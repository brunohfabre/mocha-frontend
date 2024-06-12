import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { OrganizationType } from '@/services/organizations/get-organizations'

type Store = {
  organizationSelected: OrganizationType | null
  selectOrganization: (organization: OrganizationType | null) => void
}

export const useOrganization = create(
  persist<Store>(
    (set) => ({
      organizationSelected: null,
      selectOrganization: (organization: OrganizationType | null) =>
        set(() => ({
          organizationSelected: organization,
        })),
    }),
    {
      name: 'mocha.organization',
    },
  ),
)
