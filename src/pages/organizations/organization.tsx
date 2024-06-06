import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useOrganization } from '@/stores/organization'

export function Organization() {
  const organizationSelected = useOrganization(
    (state) => state.organizationSelected,
  )

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16">
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          {JSON.stringify(organizationSelected, null, 2)}
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Reprehenderit exercitationem perferendis molestiae laudantium soluta
            vel voluptatem repellendus maxime, obcaecati non illum mollitia fuga
            eos accusamus, doloremque culpa cumque qui beatae?
          </p>
        </TabsContent>

        <TabsContent value="members">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}
