import { createBrowserRouter } from 'react-router-dom'

import { Home } from '@/pages/home'
import { SignIn } from '@/pages/sign-in'

import { AppLayout } from './_layouts/app'
import { AuthLayout } from './_layouts/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
    ],
  },
])
