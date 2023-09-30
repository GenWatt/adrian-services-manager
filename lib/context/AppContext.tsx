'use client'

import { IAppModel } from '@/types'
import { useContext, useState, createContext } from 'react'

interface IAppsContext {
  apps: IAppModel[]
  addApp: (app: IAppModel) => void
  addApps: (apps: IAppModel[]) => void
  deleteApp: (appId: string) => void
  updateApp: (appId: string, app: IAppModel) => void
  clearApps: () => void
  currentApp: IAppModel | null
  addCurrentApp: (app: IAppModel) => void
  findAppById: (appId: string) => IAppModel | undefined
  addCurrentAppById: (appId: string) => void
}

const AppsContext = createContext<IAppsContext | null>(null)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [apps, setApps] = useState<IAppModel[]>([])
  const [currentApp, setCurrentApp] = useState<IAppModel | null>(null)

  function addApp(app: IAppModel) {
    setApps((prev) => [...prev, app])
  }

  function addApps(apps: IAppModel[]) {
    setApps((prev) => [...prev, ...apps])
  }

  function deleteApp(appId: string) {
    setApps(apps.filter((app) => app._id !== appId))
  }

  function updateApp(appId: string, app: IAppModel) {
    setApps(apps.map((app) => (app._id === appId ? app : app)))
  }

  function clearApps() {
    setApps([])
  }

  function addCurrentApp(app: IAppModel) {
    setCurrentApp(app)
  }

  function findAppById(appId: string) {
    return apps.find((app) => app._id === appId)
  }

  function addCurrentAppById(appId: string) {
    const app = findAppById(appId)
    console.log('app', app)
    if (app) setCurrentApp(app)
  }

  const value = {
    apps,
    addApp,
    addApps,
    deleteApp,
    updateApp,
    clearApps,
    currentApp,
    addCurrentApp,
    findAppById,
    addCurrentAppById,
  }
  return <AppsContext.Provider value={value}>{children}</AppsContext.Provider>
}

export const useAppsContext = () => {
  const context = useContext(AppsContext)
  if (context === null) {
    throw new Error('useAppsContext must be used within AppProvider')
  }
  return context
}
