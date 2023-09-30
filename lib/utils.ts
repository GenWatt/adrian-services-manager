import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData()
  for (const [key, value] of Object.entries(obj)) {
    formData.append(key, value)
  }
  return formData
}
