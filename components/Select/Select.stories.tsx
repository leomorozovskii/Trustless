import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Select, { ISelect } from './Select';

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
} as Meta<typeof Select>;

const Template: StoryFn<ISelect> = (args) => {
  const [value, setValue] = useState(args.value || '');

  return <Select {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Select a token',
  disabled: false,
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  placeholder: 'Select a token',
  value: 'ETH',
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Select a token',
  disabled: true,
};
