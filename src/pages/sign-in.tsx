import { Button } from '@/components/ui/button'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

export function SignIn() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Button type="button">
        <GitHubLogoIcon className="w-4 h-4 mr-2" />
        Continue with GitHub
      </Button>
    </div>
  )
}
