import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Input, { IInput } from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    error: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<IInput> = (args) => {
  const [value, setValue] = useState<string>(args.value || '');
  return (
    <Input
      {...args}
      value={value}
      onChange={({ target }: any) => setValue(target.value)}
    />
  );
};

export const DefaultPlaceholder = Template.bind({});
DefaultPlaceholder.args = {
  placeholder: '0',
  value: '',
  error: '',
};

export const Default = Template.bind({});
Default.args = {
  placeholder: '0',
  value: '0',
  error: '',
};

export const DefaultError = Template.bind({});
DefaultError.args = {
  placeholder: '0',
  value: '0',
  error: 'error',
};

export const DefaultDisabled = Template.bind({});
DefaultDisabled.args = {
  placeholder: '0',
  value: '0',
  error: '',
  disabled: true,
};
