import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import Image from 'next/image'
import { IApiResponse, IAppModel } from '@/types'
import AppDetails from '@/components/AppDetails'
import { getAppById } from '@/app/api/(apps)'
import { AppActions } from '@/components/AppActions'

interface Props {
  params: {
    appId: string
  }
}

export default async function page(props: Props) {
  const { appId } = props.params
  const response: IApiResponse<IAppModel> = await getAppById(appId)

  return (
    <div className="p-2">
      {response.data ? (
        <section>
          <header className="mb-2">
            <h1 className="text-2xl font-medium">
              Current app:{' '}
              <span className="font-bold text-teal-300">
                {response.data.name}
              </span>
            </h1>
          </header>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex gap-2">
                {response.data.imageUrl && (
                  <Image
                    src={response.data.imageUrl}
                    alt="App image"
                    width={80}
                    height={80}
                  />
                )}
                App description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary border border-primary p-2 rounded-md">
                {response.data.description
                  ? response.data.description
                  : 'No description'}
              </p>
              <div className="mt-2">
                <h3 className="text-xl">App details</h3>
                <AppDetails app={response.data} />
              </div>
            </CardContent>
          </Card>
          <AppActions app={response.data} />
        </section>
      ) : (
        <div>
          <h1>404</h1>
          <p>App not found</p>
        </div>
      )}
    </div>
  )
}
