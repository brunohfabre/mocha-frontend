import { useEffect, useRef } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'

import { api } from '@/lib/api'
import { useAuth } from '@/stores/auth'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

export function GithubCallback() {
  const firstRender = useRef(true)

  const setCredentials = useAuth((state) => state.setCredentials)

  const [searchParams] = useSearchParams()

  const code = searchParams.get('code') ?? ''

  useEffect(() => {
    async function loadGithubInfo() {
      const response = await api.post('/sessions/github', {
        code,
      })

      setCredentials(response.data)
    }

    if (!firstRender.current) {
      return
    }

    if (code) {
      firstRender.current = false

      loadGithubInfo()
    }
  }, [code, setCredentials])

  if (!code) {
    return <Navigate to="/sign-in" replace />
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex gap-2 items-center">
        <GitHubLogoIcon className="w-10 h-10 mr-2" />

        <span className="text-sm">Loading github info</span>
      </div>
    </div>
  )
}
