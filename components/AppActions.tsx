'use client'

import React from 'react'
import { Button } from './ui/button'
import { IAppModel } from '@/types'
import useApiApp from '@/lib/hooks/useApiApp'
import { useAppsContext } from '@/lib/context/AppContext'
import useError from '@/lib/hooks/useError.'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import AreYouSure from './dialogs/AreYouSure'

export interface AppActionsProps {
  app: IAppModel
}

export function AppActions({ app }: AppActionsProps) {
  const { isLoading, deleteAppAsync } = useApiApp()
  const appContext = useAppsContext()
  const { showError } = useError()
  const { toast } = useToast()
  const router = useRouter()

  async function handleDeleteApp() {
    try {
      const response = await deleteAppAsync(app._id)
      appContext.deleteApp(app._id)
      toast({
        title: 'App deleted',
        description: response.message,
      })
      router.push('/apps')
    } catch (error) {
      showError(error)
    }
  }

  return (
    <section className="mt-4 flex justify-end">
      <AreYouSure
        content="Are you sure you want to delete this app?"
        action={handleDeleteApp}
      >
        <Button isLoading={isLoading} variant={'destructive'}>
          Delete {app.name}
        </Button>
      </AreYouSure>
    </section>
  )
}
