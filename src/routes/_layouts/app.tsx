import { Navigate, Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/stores/auth'

export function AppLayout() {
  const token = useAuth((state) => state.token)
  const needFinishSetup = useAuth((state) => state.needFinishSetup)

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  if (needFinishSetup) {
    return <Navigate to="/finish-setup" replace />
  }

  return (
    <div className="flex h-screen font-sans antialiased">
      <Sidebar />

      <Separator orientation="vertical" />

      <Outlet />
    </div>
  )
}
