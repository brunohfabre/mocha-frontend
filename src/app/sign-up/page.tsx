'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import LogoLight from '@/assets/logo-light.png'
import LogoDark from '@/assets/logo-dark.png'
import Link from 'next/link'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Loader2, Moon, Sun } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import { AxiosError } from 'axios'

const signUpFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
})

type SignUpFormData = z.infer<typeof signUpFormSchema>

export default function SignUp({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { resolvedTheme, setTheme } = useTheme()

  const { handleSubmit, register, reset, formState } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  })

  const [isLoading, setIsLoading] = useState(false)

  async function signUp({ name, email }: SignUpFormData) {
    try {
      setIsLoading(true)

      await api.post(
        '/register',
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${searchParams.token}`,
          },
        },
      )

      toast.success('Sign up completed successfully')

      reset()
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data.message ??
            'There was an error in sign up, please try again later',
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen max-w-7xl w-full mx-auto flex flex-col p-8 md:p-4 gap-4">
      <header className="flex items-center justify-between">
        <Link href="/">
          {resolvedTheme === 'light' && (
            <Image src={LogoLight} height={28} alt="Mocha" />
          )}
          {resolvedTheme === 'dark' && (
            <Image src={LogoDark} height={28} alt="Mocha" />
          )}
        </Link>

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
            <Link href="/">Download app</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(signUp)}
          className="flex flex-col gap-8 max-w-96 w-full"
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Sign up</h1>
            <span className="text-sm text-muted-foreground">
              Sign up to improve your project management.
            </span>
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register('name')}
              />
              <span className="text-red-500 text-sm">
                {formState.errors.name?.message}
              </span>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@email.com"
                {...register('email')}
              />
              <span className="text-red-500 text-sm">
                {formState.errors.email?.message}
              </span>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              'Sign up'
            )}
          </Button>
        </form>
      </main>

      <footer className="text-center flex justify-center">
        <p className="text-muted-foreground text-sm leading-relaxed w-full max-w-80 md:max-w-none">
          By clicking sign up, you agree to our{' '}
          <Link
            href="/terms-of-service"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy-policy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </footer>
    </div>
  )
}
