import { IAppModel } from '@/types'
import { Schema, model, models } from 'mongoose'

const AppSchema = new Schema<IAppModel>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  version: String,
  url: String,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  imageUrl: String,
})

const App = models.App || model<IAppModel>('App', AppSchema)

export default App
