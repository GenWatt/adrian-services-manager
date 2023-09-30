import axios from 'axios'
const axiosDefaultConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const axiosInstance = axios.create(axiosDefaultConfig)
