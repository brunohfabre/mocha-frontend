import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { api } from '@/lib/api'
import { useAuth } from '@/stores/auth'

export function AppLayout() {
  const token = useAuth((state) => state.token)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      const response = await api.get('/profile')

      console.log(response.data)
    }

    if (token) {
      loadProfile()
    }
  }, [token])

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
      <Outlet />
    </div>
  )
}
