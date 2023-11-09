import React from 'react'
import { Button, ButtonProps } from '../src/components/button'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'clicked' },
    colorScheme: { control: { type: 'select', options: ['default', 'error', 'success'] } },
  },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Button> = (args: ButtonProps) => <Button {...args} />

const TemplateAlphaColors: StoryFn<typeof Button> = (args: ButtonProps) => (
  <div className='bg-[url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")] h-[150px] bg-center bg-no-repeat flex justify-center items-center align-middle'>
    <Button {...args} />
  </div>
)
// export const Primary = Template.bind({})
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   label: 'Button',
//   variant: 'PRIMARY',
//   onClick: () => alert('clicking primary'),
// }

export const Green = Template.bind({})
Green.args = {
  children: 'Button',
  colorScheme: 'green',
  loadingText: 'Loading',
}

// export const Tertiary = Template.bind({})
// Tertiary.args = {
//   label: 'Button',
//   variant: 'TERTIARY',
// }

// export const Disabled = Template.bind({})
// Disabled.args = {
//   label: 'Button',
//   isDisabled: true,
// }

export const Normal = Template.bind({})
