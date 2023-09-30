'use client'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function error(props: any) {
  return (
    <div className="m-2 p-2 bg-destructive rounded-md text-primary-foreground">
      <header>
        <h1 className="text-2xl font-bold">Error occures</h1>
      </header>
      <section className="p-2">
        <p>{props.error.message}</p>
      </section>
      <Button onClick={props.reset}>Try again</Button>
    </div>
  )
}
