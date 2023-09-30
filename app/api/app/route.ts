import { connect } from '@/lib/database/connect'
import appValidationSchema from '@/lib/schemas/AppSchema'
import App from '@/models/AppModel'
import fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import { isAllowedExtension } from '@/lib/validators'
import { createDirIfNotExists, getErrorMessage } from '../utils'
import { NextResponse } from 'next/server'

const allowedExtensions = ['jpg', 'jpeg', 'png']
const imagesDir = './public/images'

function createApp(fromData: FormData) {
  const appName = fromData.get('name') as string
  const appDescription = fromData.get('description') as string
  const appUrl = fromData.get('url') as string
  const appCategory = fromData.get('category') as string
  const appVersion = fromData.get('version') as string

  return {
    name: appName,
    description: appDescription,
    url: appUrl,
    category: appCategory,
    version: appVersion,
  }
}

export async function POST(req: Request) {
  const formData = await req.formData()

  const image = formData.get('file') as File
  const data = createApp(formData)

  const result = appValidationSchema.safeParse(data)

  try {
    if (!result.success) {
      return new NextResponse(getErrorMessage(result.error.issues), {
        status: 400,
      })
    }

    const appExists = await App.exists({ name: data.name })

    if (appExists) {
      return new NextResponse(`App ${data.name} already exists`, {
        status: 400,
      })
    }

    const app = new App(data)

    if (image) {
      if (!isAllowedExtension(allowedExtensions, image.name)) {
        return new NextResponse('File type not allowed', { status: 400 })
      }

      const filename = uuidv4()
      const ext = image.name.split('.').pop()
      const buffer = await image.arrayBuffer()

      createDirIfNotExists(imagesDir)
      await fs.appendFile(
        `${imagesDir}/${filename}.${ext}`,
        Buffer.from(buffer)
      )
      app.imageUrl = `/images/${filename}.${ext}`
    }

    connect()

    await app.save()

    return NextResponse.json({
      success: true,
      message: `Successfully added app`,
      data: app,
    })
  } catch (e: any) {
    console.log(e)
    return new NextResponse(e.message, { status: 500 })
  }
}

export async function GET() {
  try {
    connect()
    const apps = await App.find({})

    return NextResponse.json({
      success: true,
      message: `Successfully fetched apps`,
      data: apps,
    })
  } catch (e: any) {
    console.log(e)
    return new NextResponse(e.message, { status: 500 })
  }
}
