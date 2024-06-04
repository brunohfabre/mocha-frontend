import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function NoMatch() {
  const navigate = useNavigate()

  function handleBack() {
    navigate('/', {
      replace: true,
    })
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <header className="h-[52px] flex items-center px-4">
        <span className="text-xl font-semibold" onClick={handleBack}>
          Mocha
        </span>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-16">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-9xl font-semibold">404</h1>

          <p className="text-sm">It seems you got a little bit lost</p>
        </div>

        <Button type="button" variant="outline" onClick={handleBack}>
          Go back to home
        </Button>
      </div>

      <footer className="h-[52px] flex items-center px-4 justify-center p-4 text-xs text-muted-foreground">
        <p>Coddee Co. All rights reserved.</p>
      </footer>
    </div>
  )
}
