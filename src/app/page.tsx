'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'

import LogoLight from '@/assets/logo-light.png'
import LogoDark from '@/assets/logo-dark.png'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-react'

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <div className="min-h-screen max-w-7xl w-full mx-auto flex flex-col p-4 gap-4">
      <header className="flex items-center justify-between">
        {resolvedTheme === 'light' ? (
          <Image src={LogoLight} height={28} alt="Mocha" />
        ) : (
          <Image src={LogoDark} height={28} alt="Mocha" />
        )}

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild variant="outline">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <Button type="button">Download app</Button>
      </main>
    </div>
  )
}
