import React from 'react'
import AppItem from './AppItem'
import { IAppModel } from '@/types'
import { getStringFromDate, getStringFromValue } from '@/app/api/utils'

export interface AppDetailsProps
  extends React.HTMLAttributes<HTMLUListElement> {
  app: IAppModel
}

export default function AppDetails({ app, ...props }: AppDetailsProps) {
  return (
    <ul className="list-none" {...props}>
      <AppItem title="Url">
        <a className="text-secondary" href={app.url} target="blank">
          {app.url}
        </a>
      </AppItem>
      <AppItem title="Version">
        <p>{getStringFromValue(app.version)}</p>
      </AppItem>
      <AppItem title="Created at">
        <p>{getStringFromDate(app.createdAt)}</p>
      </AppItem>
      <AppItem title="Updated at">
        <p>{getStringFromDate(app.updatedAt)}</p>
      </AppItem>
      <AppItem title="Category">
        <p>{getStringFromDate(app.category)}</p>
      </AppItem>
    </ul>
  )
}
