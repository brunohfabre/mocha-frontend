import { useEffect, useRef, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'
import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/api'
import { useAuth } from '@/stores/auth'

export function AppLayout() {
  const firstRender = useRef(true)

  const token = useAuth((state) => state.token)
  const setCredentials = useAuth((state) => state.setCredentials)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      firstRender.current = false

      const response = await api.get('/profile')

      const { user } = response.data

      setCredentials({
        token,
        user,
      })

      setIsLoading(false)
    }

    if (token && firstRender.current) {
      loadProfile()
    }
  }, [token, setCredentials])

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  if (isLoading) {
    return (
      <div className="h-screen flex antialiased items-center justify-center">
        <span className="animate-bounce">is loading...</span>
      </div>
    )
  }

  return (
    <div className="h-screen flex antialiased font-sans">
      <Sidebar />

      <Separator orientation="vertical" />

      <Outlet />
    </div>
  )
}
