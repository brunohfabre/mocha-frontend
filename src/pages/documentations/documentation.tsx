import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  getDocumentation,
  getDocumentationKey,
} from '@/services/documentations/get-documentation'
import { createSlug } from '@/utils/create-slug'
import { useQuery } from '@tanstack/react-query'

interface ProcessJsonApiData {
  components: any
  info: {
    title: string
    description: string
    version: string
  }
  openapi: string
  paths: {
    [key: string]: {
      [key: string]: {
        summary: string
        tags: string[]
      }
    }
  }
}

function processJsonApi(data: ProcessJsonApiData) {
  if (!data?.paths) {
    return []
  }

  const tags: Record<
    string,
    { method: string; route: string; summary: string }[]
  > = {}

  Object.entries(data.paths).forEach((pathItem) => {
    const route = pathItem[0]

    Object.entries(pathItem[1]).forEach((methodItem) => {
      const method = methodItem[0]
      const item = methodItem[1]

      const newItem = {
        ...item,
        method,
        route,
      }

      item.tags.forEach((tag) => {
        tags[tag] = tags[tag]?.length ? [...tags[tag], newItem] : [newItem]
      })
    })
  })

  return Object.entries(tags).map(([tag, items]) => ({ tag, items }))
}

export function Documentation() {
  const { id = '' } = useParams<{ id: string }>()

  const { data, isPending } = useQuery({
    queryKey: getDocumentationKey({ id }),
    queryFn: () => getDocumentation({ id }),
  })

  const tags = processJsonApi(data?.data)

  if (isPending) {
    return <div>is loading...</div>
  }

  return (
    <div className="flex flex-1 overflow-auto">
      <div className="flex w-80 flex-col overflow-auto">
        {tags.map((item) => (
          <div key={item.tag} className="flex flex-col bg-red-200 p-4">
            <div>{item.tag}</div>

            <div>
              {item.items.map((route) => (
                <Button
                  type="button"
                  key={createSlug(`${route.method} ${route.route}`)}
                >
                  {route.method} - {route.summary}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Separator orientation="vertical" />
    </div>
  )
}
