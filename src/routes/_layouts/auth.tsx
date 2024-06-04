import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/stores/auth'

export function AuthLayout() {
  const token = useAuth((state) => state.token)

  if (token) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <header className="h-[52px] flex items-center px-4">
        <span className="text-xl font-semibold">Mocha</span>
      </header>

      <Outlet />

      <footer className="h-[52px] flex items-center px-4 justify-center p-4 text-xs text-muted-foreground">
        <p>Coddee Co. All rights reserved.</p>
      </footer>
    </div>
  )
}
