import Logo from './Logo'
import AppDialog from './dialogs/AppDialog'
import SelectApp from './SelectApp'

export default function NavBar() {
  return (
    <nav className="p-2 bg-primary">
      <div className="flex items-center gap-2">
        <Logo />
        <SelectApp />
        <AppDialog />
      </div>
    </nav>
  )
}
