import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserType = {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export type SessionType = {
  user: UserType
  token: string
}

type Store = {
  session: SessionType | null
  setCredentials: (session: SessionType) => void
  clearCredentials: () => void
}

export const useAuth = create(
  persist<Store>(
    (set) => ({
      session: null,
      setCredentials: (session: SessionType) =>
        set(() => ({
          session,
        })),
      clearCredentials: () =>
        set(() => ({
          session: null,
        })),
    }),
    {
      name: 'mocha.auth',
    },
  ),
)
