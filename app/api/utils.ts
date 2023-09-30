import fs from 'fs'
import { ZodIssue } from 'zod'

export function createDirIfNotExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

export function getErrorMessage(error: ZodIssue[]) {
  return error.map((err) => err.message).join(', ')
}

export function getStringFromValue(value: string | null | undefined) {
  if (value) {
    return value
  }

  return '-'
}

export function getStringFromDate(date: string | Date | null | undefined) {
  if (!date) {
    return '-'
  }

  const d = new Date(date)

  return d.toLocaleDateString()
}
