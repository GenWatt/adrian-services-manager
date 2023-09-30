'use client'

import { getAllApps } from '@/app/api/(apps)'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAppsContext } from '@/lib/context/AppContext'
import useApiApp from '@/lib/hooks/useApiApp'
import useError from '@/lib/hooks/useError.'
import { IApiResponse, IAppModel } from '@/types'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import React, { useEffect } from 'react'
import Loading from './ui/loading'

interface Params {
  appId?: string
}

interface SelectAppProps {
  placeholder?: string
}

export default function SelectApp({
  placeholder = 'Select app',
}: SelectAppProps) {
  const { showError } = useError()
  const params: Params = useParams()
  const router = useRouter()
  const appContext = useAppsContext()
  const { isLoading, getAllAppsAsync } = useApiApp()

  async function getApps() {
    try {
      const appResponse: IApiResponse<IAppModel[]> = await getAllAppsAsync()

      appContext.clearApps()
      appContext.addApps(appResponse.data)

      const app = appResponse.data.find(
        (app: IAppModel) => app._id === params.appId
      )
      if (params.appId && app) appContext.addCurrentApp(app)
    } catch (error) {
      showError(error)
    }
  }

  useEffect(() => {
    if (appContext.apps.length) return
    getApps()
  }, [])

  function handleChange(value: string) {
    appContext.addCurrentAppById(value)
    router.push(`/apps/${value}`)
  }

  function createPlaceholder() {
    if (isLoading) return <Loading />
    if (!isLoading && !appContext.apps.length) return 'No apps found'
    return placeholder
  }

  return (
    <Select value={appContext.currentApp?._id} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={createPlaceholder()} />
      </SelectTrigger>
      <SelectContent>
        {appContext.apps.map((app: IAppModel) => (
          <SelectItem key={app._id} value={app._id}>
            {app.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
