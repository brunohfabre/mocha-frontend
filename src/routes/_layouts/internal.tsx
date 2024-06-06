import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/stores/auth'
import { getAbbreviatedName } from '@/utils/get-abbreviated-name'

export function InternalLayout() {
  const token = useAuth((state) => state.token)
  const needFinishSetup = useAuth((state) => state.needFinishSetup)
  const user = useAuth((state) => state.user)
  const clearCredentials = useAuth((state) => state.clearCredentials)

  const location = useLocation()

  if (!token) {
    return <Navigate to="/sign-in" replace />
  }

  if (needFinishSetup && location.pathname !== '/finish-setup') {
    return <Navigate to="/finish-setup" replace />
  }

  const abbreviatedName = getAbbreviatedName(user?.name ?? '')

  function handleSignOut() {
    clearCredentials()
  }

  return (
    <div className="h-screen flex antialiased font-sans flex-col">
      <header className="flex justify-between px-4">
        <Link to="/" className="h-[52px] flex items-center">
          <span className="text-xl font-semibold">Mocha</span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="py-2 flex gap-2 cursor-pointer">
              <Avatar className="size-9">
                <AvatarImage src={user?.avatarUrl} />

                <AvatarFallback>{abbreviatedName}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[calc(var(--radix-dropdown-menu-trigger-width)-8px)]"
            align="end"
          >
            <DropdownMenuItem onClick={handleSignOut}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <Separator />

      <Outlet />
    </div>
  )
}
