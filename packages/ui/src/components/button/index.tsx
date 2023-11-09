import React from 'react'
import clsx from 'clsx'
import { ColorScheme, Size, Variant } from '../../types'
import { buttonStyles } from './styles'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  colorScheme?: ColorScheme
  isDisabled?: boolean
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  size?: Size
  spinner?: React.ReactNode
  spinnerPlacement?: 'start' | 'end'
  variant?: Variant
  loadingText?: string
}

function Button({
  colorScheme = 'gray',
  isDisabled = false,
  isLoading = false,
  leftIcon = undefined,
  rightIcon = undefined,
  size = 'md',
  spinner = undefined,
  spinnerPlacement = 'start',
  variant = 'solid',
  className = '',
  loadingText,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-lg font-medium cursor-pointer font-sans flex justify-center items-center gap-2  ',
        // @ts-ignore colors
        buttonStyles[variant][colorScheme],
        // sizes
        buttonStyles.sizes[size],
        {
          // borders
          'border-0': variant === 'solid',
          'border border-1 bg-transparent': variant === 'outline',
          'border-0 bg-transparent': variant === 'ghost',
          'border-0 bg-transparent hover:underline transition ease-in-out delay-300': variant === 'link',
        },
        {
          // isDisabled
          'cursor-not-allowed opacity-50': isDisabled,
        },
        className,
      )}
      {...props}
      disabled={isDisabled || isLoading}
    >
      {isLoading && spinnerPlacement === 'start' && (
        <svg
          className={clsx('animate-spin text-white', buttonStyles.spinnerSize[size])}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {isLoading && loadingText ? <span>{loadingText}</span> : props.children}
      {isLoading && spinnerPlacement === 'end' && (
        <svg
          className={clsx('animate-spin text-white', buttonStyles.spinnerSize[size])}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </button>
  )
}

export { Button }
export type { ButtonProps }
