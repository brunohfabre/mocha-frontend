import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/stores/auth'

export function InternalLayout() {
  const token = useAuth((state) => state.token)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div>
      <span>internal</span>
      <Outlet />
    </div>
  )
}
