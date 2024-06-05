import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function CreateOrganization() {
  return (
    <div className="max-w-3xl w-full flex flex-col py-12 mx-auto px-4 gap-2">
      <h1 className="text-xl font-semibold">Create organization</h1>
      <div className="border rounded-lg">
        <div className="p-4 flex flex-col">input</div>
        <Separator />
        <footer className="flex p-4 justify-end">
          <Button type="button">Create</Button>
        </footer>
      </div>
    </div>
  )
}
