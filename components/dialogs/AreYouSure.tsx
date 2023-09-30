'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { DialogTrigger } from '@radix-ui/react-dialog'

export interface AreYouSureProps {
  children: React.ReactNode
  content: string
  action: () => void
  isLoading?: boolean
}

export default function AreYouSure({
  children,
  content,
  isLoading,
  action,
}: AreYouSureProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[310px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogDescription>{content}</DialogDescription>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogTrigger asChild>
            <Button isLoading={isLoading} onClick={action}>
              Yes
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
