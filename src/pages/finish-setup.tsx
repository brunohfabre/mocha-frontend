import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { LoaderCircle } from 'lucide-react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/api'
import { getOrganizationsKey } from '@/services/get-organizations'
import { useAuth } from '@/stores/auth'
import { useOrganization } from '@/stores/organization'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

const formSchema = z.object({
  name: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

export function FinishSetup() {
  const token = useAuth((state) => state.token)
  const user = useAuth((state) => state.user)
  const setCredentials = useAuth((state) => state.setCredentials)

  const selectOrganization = useOrganization(
    (state) => state.selectOrganization,
  )

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const [isLoading, setIsLoading] = useState(false)

  async function createOrganization(data: FormData) {
    try {
      setIsLoading(true)

      const { name } = data

      const response = await api.post('/organizations', {
        name,
      })

      const { organizationId } = response.data

      const organization = {
        id: organizationId,
        name,
        role: 'ADMIN',
      }

      queryClient.setQueryData(getOrganizationsKey, [organization])

      setCredentials({
        token,
        user,
        needFinishSetup: false,
      })

      selectOrganization(organization)

      navigate('/', {
        replace: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-4 py-16">
      <div className="flex flex-col">
        <p className="text-xl font-semibold">Finish setup</p>
        <p className="text-sm text-muted-foreground">
          To finish setup, create an organization
        </p>
      </div>

      <form
        className="rounded-lg border"
        onSubmit={handleSubmit(createOrganization)}
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

        <div className="flex justify-end p-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              'Create'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
