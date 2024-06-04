import { Link } from 'react-router-dom'

import { Empty } from '@/components/empty'
import { Button } from '@/components/ui/button'

export function Organizations() {
  return (
    <Empty
      title="No organizations"
      description="Get started by creating a new organization."
    >
      <Button type="button" asChild>
        <Link to="/create-organization">+ Create organization</Link>
      </Button>
    </Empty>
  )

  return <div>organizations</div>
}
