import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './components/theme-provider'
import { router } from './routes/router'

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="mocha.theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
