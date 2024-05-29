import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/stores/auth'

export function AppLayout() {
  const session = useAuth((state) => state.session)

  if (!session) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="h-screen flex antialiased font-sans">
      <Outlet />
    </div>
  )
}
