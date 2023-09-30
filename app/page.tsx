import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/apps')

  return (
    <>
      <div>Redirecting to /apps</div>
    </>
  )
}
