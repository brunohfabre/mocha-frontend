import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { z } from 'zod'

import { Empty } from '@/components/empty'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/api'
import {
  getDocumentations,
  getDocumentationsKey,
} from '@/services/documentations/get-documentations'
import { useOrganization } from '@/stores/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'

const formSchema = z.object({
  name: z.string().min(1),
  fileUrl: z.string().url(),
})

type FormData = z.infer<typeof formSchema>

export function Documentations() {
  const organizationSelected = useOrganization(
    (state) => state.organizationSelected,
  )

  const { handleSubmit, reset, register, formState } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const { data, isPending } = useQuery({
    queryKey: getDocumentationsKey,
    queryFn: getDocumentations,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [createDialogVisible, setCreateDialogVisible] = useState(false)

  function handleOpenCreateDialog() {
    setCreateDialogVisible(true)
  }

  function handleCloseCreateDialog() {
    setCreateDialogVisible(false)
    reset({
      name: '',
      fileUrl: '',
    })
  }

  async function createDocumentation(data: FormData) {
    try {
      setIsLoading(true)

      const response = await api.post(
        `/organizations/${organizationSelected?.id}/documentations`,
        data,
      )

      console.log(response.data)
    } finally {
      setIsLoading(false)
    }
  }

  if (isPending) {
    return <div>is loading...</div>
  }

  return (
    <>
      <Dialog open={createDialogVisible} onOpenChange={handleCloseCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Documentation</DialogTitle>
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
          </DialogHeader>

          <form
            className="mt-4 flex flex-col gap-6"
            onSubmit={handleSubmit(createDocumentation)}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Name"
                  autoFocus
                  {...register('name')}
                />
                {formState.errors.name?.message && (
                  <span className="text-sm text-red-500">
                    {formState.errors.name?.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="fileUrl">File URL</Label>
                <Input
                  id="fileUrl"
                  placeholder="File URL"
                  {...register('fileUrl')}
                />
                {formState.errors.fileUrl?.message && (
                  <span className="text-sm text-red-500">
                    {formState.errors.fileUrl?.message}
                  </span>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseCreateDialog}
              >
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {!data.documentations.length ? (
        <Empty
          title="No documentations"
          description="Get started by adding a new documentation."
        >
          <Button type="button" onClick={handleOpenCreateDialog}>
            + Add documentation
          </Button>
        </Empty>
      ) : (
        <div className="gap-2 p-4">
          {data.documentations.map((item: any) => (
            <Button type="button" key={item.id}>
              <Link to={`/documentations/${item.id}`}>{item.name}</Link>
            </Button>
          ))}
        </div>
      )}
    </>
  )
}
