import React from 'react'
import clsx from 'clsx'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon = undefined, rightIcon = undefined, className = '', ...props }, ref) => {
    return (
      <div className={clsx('relative mt-2 rounded-md shadow-sm w-[initial]', className)}>
        {leftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{leftIcon}</div>
        )}
        <input
          className="flex h-8 w-full rounded-md border-[1.67px] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50"
          ref={ref}
          {...props}
        />
        {rightIcon && <div className="absolute inset-y-0 right-0 flex items-center">{rightIcon}</div>}
      </div>
    )
  },
)

export { Input }
export type { InputProps }
