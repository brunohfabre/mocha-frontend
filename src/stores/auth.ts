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
  token: string
  user: UserType | null
  setCredentials: (session: SessionType) => void
  clearCredentials: () => void
}

export const useAuth = create(
  persist<Store>(
    (set) => ({
      token: '',
      user: null,
      setCredentials: ({ token, user }: SessionType) =>
        set(() => ({
          token,
          user,
        })),
      clearCredentials: () =>
        set(() => ({
          token: '',
          user: null,
        })),
    }),
    {
      name: 'mocha.auth',
    },
  ),
)
