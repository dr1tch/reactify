import React from 'react'
import clsx from 'clsx'
import { ColorScheme, Size } from '../../types'
import { badgeStyles } from './styles'

type BadgeProps = React.HTMLProps<HTMLSpanElement> & {
  colorScheme?: ColorScheme
  size?: Size
}
// @ts-ignore
function Badge({ colorScheme = 'gray', size = 'md', className = '', ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'rounded-md ring-1 ring-inset font-medium cursor-pointer font-sans flex justify-center items-center gap-2  ',
        // @ts-ignore colors
        badgeStyles.colors[colorScheme],
        // sizes
        badgeStyles.sizes[size],

        className,
      )}
      {...props}
    >
      props.children
    </span>
  )
}

export { Badge }
export type { BadgeProps }
