import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/stores/auth'

export function AuthLayout() {
  const session = useAuth((state) => state.session)

  if (session) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="h-screen flex antialiased font-sans">
      <Outlet />
    </div>
  )
}
