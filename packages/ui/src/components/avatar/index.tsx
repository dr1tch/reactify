import React from 'react'
import clsx from 'clsx'

type AvatarProps = React.ImgHTMLAttributes<HTMLImageElement>

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(({ className = '', ...props }, ref) => {
  return <img className={clsx('inline-block h-6 w-6 rounded-full ring-2 ring-white', className)} {...props} ref={ref} />
})

export { Avatar }
export type { AvatarProps }
