import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './components/theme-provider'
import { router } from './routes/router'

export function App() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return (
      <div className="h-screen flex antialiased items-center justify-center">
        <span className="animate-bounce">is loading...</span>
      </div>
    )
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="mocha.theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
