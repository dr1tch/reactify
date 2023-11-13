import React from 'react'
import clsx from 'clsx'

type SelectProps = React.ImgHTMLAttributes<HTMLSelectElement>

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className = '', ...props }, ref) => {
  return (
    <select className={clsx('inline-block h-6 w-6 rounded-full ring-2 ring-white', className)} {...props} ref={ref} />
  )
})

export { Select }
export type { SelectProps }
