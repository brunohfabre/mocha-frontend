import { Link } from 'react-router-dom'

import { Bell, Moon, Notebook, Settings, Sun } from 'lucide-react'

import { useAuth } from '@/stores/auth'
import { useOrganization } from '@/stores/organization'
import { getAbbreviatedName } from '@/utils/get-abbreviated-name'
import { getShortName } from '@/utils/get-short-name'

import { useTheme } from '../theme-provider'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Separator } from '../ui/separator'
import { Organizations } from './organizations'

export function Sidebar() {
  const user = useAuth((state) => state.user)
  const clearCredentials = useAuth((state) => state.clearCredentials)

  const organizationSelected = useOrganization(
    (state) => state.organizationSelected,
  )

  const { theme, setTheme } = useTheme()

  const abbreviatedName = getAbbreviatedName(user?.name ?? '')
  const shortName = getShortName(user?.name ?? '')

  function handleSignOut() {
    clearCredentials()
  }

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <div className="flex w-64 flex-col">
      <Link
        to="/"
        className="flex h-[52px] items-center justify-between pl-4 pr-2"
      >
        <span className="text-xl font-semibold">Mocha</span>

        <Button type="button" size="icon" onClick={toggleTheme} variant="ghost">
          {theme === 'light' ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </Button>
      </Link>

      <Separator />

      <Organizations />

      <Separator />

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col p-2">
          {/* <Button
            type="button"
            variant="ghost"
            className="justify-start px-3 font-normal"
            asChild
          >
            <Link to="/collections">
              <Notebook className="mr-2 size-4" strokeWidth={1.5} />
              Collections
            </Link>
          </Button> */}

          <Button
            type="button"
            variant="ghost"
            className="justify-start px-3 font-normal"
            asChild
          >
            <Link to="/documentations">
              <Notebook className="mr-2 size-4" strokeWidth={1.5} />
              Documentations
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-2 p-2">
          {/* <Link
            to="/get-premium"
            className="flex flex-col p-3 gap-4 rounded-md bg-gradient-to-br from-orange-400  to-pink-400"
          >
            <p className="text-sm font-semibold">Title</p>
            <p className="text-sm">Lorem ipsum dolor sit amet consectetur.</p>
          </Link> */}

          <div className="flex flex-col">
            <Button
              type="button"
              variant="ghost"
              className="justify-start px-3 font-normal"
              asChild
            >
              <Link to={`/organizations/${organizationSelected?.id}`}>
                <Settings className="mr-2 size-4" strokeWidth={1.5} />
                Organization Settings
              </Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="justify-start px-3 font-normal"
              asChild
            >
              <Link to="/notifications">
                <Bell className="mr-2 size-4" strokeWidth={1.5} />
                Notifications
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex h-[52px] cursor-pointer justify-start gap-2 rounded-none p-2"
            variant="ghost"
          >
            <Avatar className="size-9">
              <AvatarImage src={user?.avatarUrl} />

              <AvatarFallback>{abbreviatedName}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-start">
              <p className="text-sm font-medium">{shortName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[calc(var(--radix-dropdown-menu-trigger-width)-8px)]">
          <DropdownMenuItem asChild>
            <Link to="/account">My account</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
