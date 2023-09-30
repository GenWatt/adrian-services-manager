import { connect } from '@/lib/database/connect'
import App from '@/models/AppModel'

import { NextRequest, NextResponse } from 'next/server'

interface AppParams {
  params: { appId: string }
}

export async function GET(req: NextRequest, { params }: AppParams) {
  try {
    connect()
    const app = await App.findOne({ _id: params.appId })

    return NextResponse.json({
      success: true,
      message: `Successfully fetched app`,
      data: app,
    })
  } catch (e: any) {
    return NextResponse.json(
      {
        success: false,
        message: `Internal server error`,
      },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest, { params }: AppParams) {
  try {
    const appToDelete = await App.findOne({ _id: params.appId })

    if (!appToDelete) {
      return NextResponse.json(
        {
          success: false,
          message: `App not found`,
        },
        { status: 404 }
      )
    }

    await App.deleteOne({ _id: params.appId })

    return NextResponse.json({
      success: true,
      message: `App named ${appToDelete.name} deleted successfully`,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Internal server error`,
      },
      { status: 500 }
    )
  }
}
