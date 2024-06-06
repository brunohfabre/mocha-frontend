import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { useOrganization } from './organization'

export type UserType = {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export type SessionType = {
  user: UserType | null
  token: string
  needFinishSetup: boolean
}

type Store = {
  token: string
  user: UserType | null
  needFinishSetup: boolean
  setCredentials: (session: SessionType) => void
  clearCredentials: () => void
}

export const useAuth = create(
  persist<Store>(
    (set) => ({
      token: '',
      user: null,
      needFinishSetup: true,
      setCredentials: ({ token, user, needFinishSetup }: SessionType) =>
        set(() => ({
          token,
          user,
          needFinishSetup,
        })),
      clearCredentials: () => {
        useOrganization.getState().selectOrganization(null)

        set(() => ({
          token: '',
          user: null,
          needFinishSetup: true,
        }))
      },
    }),
    {
      name: 'mocha.auth',
    },
  ),
)
