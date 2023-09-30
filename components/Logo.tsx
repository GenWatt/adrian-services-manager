'use client'

import { useEffect, useState } from 'react'

export default function Logo() {
  const [width, setWidth] = useState<number>(window.innerWidth)

  function handleResize() {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <h1 className="font-bold text-primary-foreground bg-secondary p-2 rounded-xl">
      <a href="/apps">
        {width > 500 ? (
          <>
            Adrian <span className="text-teal-300">Services</span> Manager
          </>
        ) : (
          <span className="text-teal-300">ASM</span>
        )}
      </a>
    </h1>
  )
}
