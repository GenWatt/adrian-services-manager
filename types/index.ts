export interface IAppModel {
  _id: string
  name: string
  description?: string
  url: string
  imageUrl?: string
  createdAt: Date
  updatedAt?: Date
  category: string
  version?: string
}

export type IAppViewModel = Omit<
  IAppModel,
  'createdAt' | 'updatedAt' | '_id'
> & {
  image: File | null
}

export interface IApiResponse<T> {
  success: boolean
  message: string
  data: T
}
