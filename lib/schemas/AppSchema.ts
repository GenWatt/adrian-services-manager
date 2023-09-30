import { z } from 'zod'
import { APP_NAME_MIN_LENGTH } from '../constants'
import { IAppViewModel } from '@/types'

const isUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

const appValidationSchema = z.object({
  name: z
    .string()
    .min(
      APP_NAME_MIN_LENGTH,
      `Name should have at least ${APP_NAME_MIN_LENGTH} characters`
    ),
  description: z.string().optional(),
  url: z.string().refine(isUrl, { message: 'Invalid URL' }),
  imageUrl: z.string().optional(),
  category: z.string(),
  version: z.string().optional(),
})

const appDefaultValues: IAppViewModel = {
  name: '',
  description: '',
  url: '',
  imageUrl: '',
  image: null,
  category: '',
  version: '',
}

export { appDefaultValues }

export default appValidationSchema
