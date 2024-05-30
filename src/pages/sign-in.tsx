import { Button } from '@/components/ui/button'
import { env } from '@/env'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

export function SignIn() {
  function handleOpenGithub() {
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${env.VITE_GITHUB_CLIENT_ID}`,
      '_self',
    )
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <Button type="button" onClick={handleOpenGithub}>
        <GitHubLogoIcon className="w-4 h-4 mr-2" />
        Continue with GitHub
      </Button>
    </div>
  )
}
