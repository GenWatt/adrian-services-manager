import Image from 'next/image'
import React from 'react'

export interface IImagePreviewProps {
  src?: string
  alt: string
}

export default function ImagePreview({ src, alt }: IImagePreviewProps) {
  return (
    <div className="my2">
      {src ? (
        <img src={src} alt={alt} className="w-full h-64 object-cover" />
      ) : null}
    </div>
  )
}
