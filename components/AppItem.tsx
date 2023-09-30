import React from 'react'

export interface AppItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
  title?: string
}

export default function AppItem({ children, title, ...props }: AppItemProps) {
  return (
    <li className="border-b-2 flex justify-between py-2" {...props}>
      {title && <h5>{title}</h5>}
      {children}
    </li>
  )
}
