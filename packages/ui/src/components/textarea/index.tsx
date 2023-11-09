import React from 'react'
import clsx from 'clsx'

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className = '', ...props }, ref) => {
  return (
    <div className={clsx('relative mt-2 rounded-md shadow-sm w-[initial]', className)}>
      <textarea
        className="flex h-8 w-full rounded-md border-[1.67px] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50"
        ref={ref}
        {...props}
      />
    </div>
  )
})

export { Textarea }
export type { TextareaProps }
