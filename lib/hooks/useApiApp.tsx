import { createApp, deleteApp, getAllApps } from '@/app/api/(apps)'
import React from 'react'

export default function useApiApp() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function createAppAsync(app: FormData) {
    setIsLoading(true)
    const response = await createApp(app)
    setIsLoading(false)
    return response
  }

  async function deleteAppAsync(appId: string) {
    setIsLoading(true)
    const response = await deleteApp(appId)
    setIsLoading(false)
    return response
  }

  async function getAllAppsAsync() {
    setIsLoading(true)
    const response = await getAllApps()
    setIsLoading(false)
    return response
  }

  return {
    createAppAsync,
    deleteAppAsync,
    getAllAppsAsync,
    isLoading,
  }
}
