import SelectApp from '@/components/SelectApp'
import AppDialog from '@/components/dialogs/AppDialog'

export default function Home() {
  return (
    <section className="m-2">
      <div className="p-2 bg-secondary rounded text-primary-foreground">
        <header>
          <h1 className="text-2xl font-bold">No app selected</h1>
        </header>
        <p className="">
          Please select app to view its details or create new app.
        </p>
      </div>
      <div className="mt-2 flex gap-2">
        <SelectApp />
        <AppDialog />
      </div>
    </section>
  )
}
