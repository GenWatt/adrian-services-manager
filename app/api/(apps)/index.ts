import { IApiResponse, IAppModel } from '@/types'
import { axiosInstance } from '../axiosInstance'
import { AxiosResponse } from 'axios'

export async function getAllApps() {
  const response: AxiosResponse<IApiResponse<IAppModel[]>> =
    await axiosInstance.get('/app')

  return response.data
}

export async function getAppById(id: string) {
  const response: AxiosResponse<IApiResponse<IAppModel>> =
    await axiosInstance.get(`/app/${id}`)

  return response.data
}

export async function createApp(formData: FormData) {
  const response: AxiosResponse<IApiResponse<IAppModel>> =
    await axiosInstance.post('/app', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

  return response.data
}

export async function updateApp(id: string, formData: FormData) {
  const response: AxiosResponse<IApiResponse<IAppModel>> =
    await axiosInstance.put(`/app/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

  return response.data
}

export async function deleteApp(id: string) {
  const response: AxiosResponse<IApiResponse<IAppModel>> =
    await axiosInstance.delete(`/app/${id}`)

  return response.data
}
