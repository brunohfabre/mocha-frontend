import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { LoaderCircle } from 'lucide-react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/api'
import {
  getOrganizationsKey,
  type OrganizationType,
} from '@/services/get-organizations'
import { useOrganization } from '@/stores/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

const formSchema = z.object({
  name: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

export function General() {
  const organizationSelected = useOrganization(
    (state) => state.organizationSelected,
  )
  const selectOrganization = useOrganization(
    (state) => state.selectOrganization,
  )

  const queryClient = useQueryClient()

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: organizationSelected || {},
  })

  const [isLoading, setIsLoading] = useState(false)

  async function updateOrganization({ name }: FormData) {
    try {
      setIsLoading(true)

      const response = await api.put(
        `/organizations/${organizationSelected?.id}`,
        { name },
      )

      selectOrganization({
        ...organizationSelected!,
        name,
      })

      queryClient.setQueryData(
        getOrganizationsKey,
        (prevState: OrganizationType[]) =>
          prevState.map((item) =>
            item.id === organizationSelected?.id ? { ...item, name } : item,
          ),
      )

      console.log(response.data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-semibold">General</p>

      <form
        className="rounded-lg border"
        onSubmit={handleSubmit(updateOrganization)}
      >
        <div className="flex flex-col px-4 py-6">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Organization name</Label>
            <Input
              id="name"
              placeholder="Organization name"
              {...register('name')}
            />
            {formState.errors.name?.message && (
              <span className="text-sm text-red-500">
                {formState.errors.name?.message}
              </span>
            )}
          </div>
        </div>

        <Separator />

        <div className="flex justify-end gap-2 p-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
