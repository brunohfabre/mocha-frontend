import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import { QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from './components/theme-provider'
import { api } from './lib/api'
import { queryClient } from './lib/react-query'
import { router } from './routes/router'
import { useAuth } from './stores/auth'

export function App() {
  const token = useAuth((state) => state.token)
  const setCredentials = useAuth((state) => state.setCredentials)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (token) {
      api.get('/profile').then((response) => {
        const { user, needFinishSetup } = response.data

        setCredentials({ token, user, needFinishSetup })
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [token, setCredentials])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center antialiased">
        <span className="animate-bounce">is loading...</span>
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
