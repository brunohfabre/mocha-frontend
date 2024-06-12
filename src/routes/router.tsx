import { createBrowserRouter } from 'react-router-dom'

import { GithubCallback } from '@/pages/callback/github'
import { CreateOrganization } from '@/pages/create-organization'
import { Documentations } from '@/pages/documentations'
import { Documentation } from '@/pages/documentations/documentation'
import { FinishSetup } from '@/pages/finish-setup'
import { Home } from '@/pages/home'
import { NoMatch } from '@/pages/no-match'
import { Organizations } from '@/pages/organizations'
import { Organization } from '@/pages/organizations/organization'
import { SignIn } from '@/pages/sign-in'

import { AppLayout } from './_layouts/app'
import { AuthLayout } from './_layouts/auth'
import { InternalLayout } from './_layouts/internal'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/organizations',
        element: <Organizations />,
      },
      {
        path: '/documentations',
        element: <Documentations />,
      },
    ],
  },
  {
    path: '/',
    element: <InternalLayout />,
    children: [
      {
        path: '/finish-setup',
        element: <FinishSetup />,
      },
      {
        path: '/create-organization',
        element: <CreateOrganization />,
      },
      {
        path: '/organizations/:id',
        element: <Organization />,
      },
      {
        path: '/documentations/:id',
        element: <Documentation />,
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
      {
        path: '/auth/callback/github',
        element: <GithubCallback />,
      },
    ],
  },
  {
    path: '*',
    element: <NoMatch />,
  },
])
