import { useRef } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'
import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/api'
import { useAuth } from '@/stores/auth'

export function AppLayout() {
  const token = useAuth((state) => state.token)
  const setCredentials = useAuth((state) => state.setCredentials)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="h-screen flex antialiased font-sans">
      <Sidebar />

      <Separator orientation="vertical" />

      <Outlet />
    </div>
  )
}
