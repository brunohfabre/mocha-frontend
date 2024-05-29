import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="h-screen flex antialiased font-sans">
      <Outlet />
    </div>
  )
}
