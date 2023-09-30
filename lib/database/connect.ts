import mongoose from 'mongoose'

export const connect = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI must be defined in .env.local file')
    }

    await mongoose.connect(process.env.MONGO_URI!)
    console.log('Connected to database')
  } catch (error) {
    console.log(error)
  }
}
