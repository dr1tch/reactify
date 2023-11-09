import React from 'react'
import { Input, InputProps } from '../src/components/input'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: { control: { type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] } },
  },
}
export default meta
const Template: StoryFn<typeof Input> = (args: InputProps) => <Input {...args} />
export const Green = Template.bind({})
Green.args = {
  placeholder: 'green',
  type: 'number',
  className: 'w-1/2',
}
