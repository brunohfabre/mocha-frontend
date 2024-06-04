import { Link } from 'react-router-dom'

import { Bell, ChevronsUpDown, Notebook, Settings } from 'lucide-react'

import { useAuth } from '@/stores/auth'
import { getAbbreviatedName } from '@/utils/get-abbreviated-name'
import { getShortName } from '@/utils/get-short-name'

import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Separator } from './ui/separator'

export function Sidebar() {
  const user = useAuth((state) => state.user)
  const clearCredentials = useAuth((state) => state.clearCredentials)

  const abbreviatedName = getAbbreviatedName(user?.name ?? '')
  const shortName = getShortName(user?.name ?? '')

  function handleSignOut() {
    clearCredentials()
  }

  return (
    <div className="w-64 flex flex-col">
      <Link to="/" className="h-[52px] flex items-center px-4">
        <span className="text-xl font-semibold">Mocha</span>
      </Link>

      <Separator />

      <div className="flex p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="flex-1 justify-start pl-3 pr-2 font-normal"
            >
              Organization name
              <ChevronsUpDown className="size-3 ml-auto text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
            <DropdownMenuItem>Org 1</DropdownMenuItem>
            <DropdownMenuItem>Org 2</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/create-organization">+ Create Organization</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col p-2">
          <Button
            type="button"
            variant="ghost"
            className="justify-start px-3 font-normal"
            asChild
          >
            <Link to="/collections">
              <Notebook className="size-4 mr-2" strokeWidth={1.5} />
              Collections
            </Link>
          </Button>
        </div>

        <div className="flex flex-col p-2 gap-2">
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
              <Link to="/organizations/123123123">
                <Settings className="size-4 mr-2" strokeWidth={1.5} />
                Settings
              </Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="justify-start px-3 font-normal"
              asChild
            >
              <Link to="/notifications">
                <Bell className="size-4 mr-2" strokeWidth={1.5} />
                Notifications
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="p-2 flex gap-2 cursor-pointer">
            <Avatar className="size-9">
              <AvatarImage src={user?.avatarUrl} />

              <AvatarFallback>{abbreviatedName}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p className="text-sm font-medium">{shortName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
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
