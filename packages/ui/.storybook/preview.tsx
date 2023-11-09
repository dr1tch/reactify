import React, { useEffect, useState } from 'react'

import type { Preview } from '@storybook/react'

import { useDarkMode } from 'storybook-dark-mode'
import '../src/style/index.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const colorScheme = useDarkMode() ? 'dark' : 'light'

      useEffect(() => {
        const sbRoot = document.getElementsByClassName('sb-show-main')[0] as HTMLElement
        if (sbRoot) {
          sbRoot.style.backgroundColor = colorScheme === 'dark' ? '#333' : '#fff'
        }
      }, [useDarkMode()])

      return <Story {...context} />
    },
  ],
}

export default preview
