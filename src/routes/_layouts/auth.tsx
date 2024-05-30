import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/stores/auth'

export function AuthLayout() {
  const token = useAuth((state) => state.token)

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="h-screen flex antialiased font-sans">
      <Outlet />
    </div>
  )
}
