import type { ReactNode } from 'react'

interface EmptyProps {
  title: string
  description: string
  children?: ReactNode
}

export function Empty({ title, description, children }: EmptyProps) {
  return (
    <div className="flex-1 flex p-4">
      <div className="flex-1 flex flex-col items-center justify-center gap-6 border rounded-lg border-dashed">
        <div className="flex flex-col items-center gap-1">
          <p>{title}</p>

          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {children}
      </div>
    </div>
  )
}
