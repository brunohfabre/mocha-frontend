import { useParams } from 'react-router-dom'

import {
  getDocumentation,
  getDocumentationKey,
} from '@/services/documentations/get-documentation'
import { useQuery } from '@tanstack/react-query'

export function Documentation() {
  const { id = '' } = useParams<{ id: string }>()

  const { data, isPending } = useQuery({
    queryKey: getDocumentationKey({ id }),
    queryFn: () => getDocumentation({ id }),
  })

  if (isPending) {
    return <div>is loading...</div>
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <header>documentation - {id}</header>
      <pre>{JSON.stringify(data?.data, null, 2)}</pre>
    </div>
  )
}
