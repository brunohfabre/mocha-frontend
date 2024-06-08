import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { DangerZone } from './danger-zone'
import { General } from './general'

export function Organization() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16">
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="general" asChild>
          <div className="mt-4 flex flex-col gap-6">
            <General />

            <DangerZone />
          </div>
        </TabsContent>

        <TabsContent value="members">Members tabs</TabsContent>
      </Tabs>
    </div>
  )
}
