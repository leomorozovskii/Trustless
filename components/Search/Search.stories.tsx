import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Search, { ISearch } from './Search';
import '@radix-ui/themes/styles.css';

export default {
  title: 'Components/Search',
  component: Search,
  argTypes: {
    type: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    error: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<ISearch> = (args) => {
  const [value, setValue] = useState<string>(args.value || '');
  return (
    <Search
      {...args}
      value={value}
      onChange={({ target }: any) => setValue(target.value)}
    />
  );
};

const DarkTemplate: StoryFn<ISearch> = (args) => {
  const [value, setValue] = useState<string>(args.value || '');
  return (
    <div data-theme={'dark'}>
      <Search
        {...args}
        value={value}
        onChange={({ target }: any) => setValue(target.value)}
      />
    </div>
  );
};

export const DefaultPlaceholder = Template.bind({});
DefaultPlaceholder.args = {
  placeholder: 'Search...',
  value: '',
  error: '',
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Search...',
  value: 'Query',
  error: '',
};

export const DefaultError = Template.bind({});
DefaultError.args = {
  placeholder: 'Search...',
  value: 'Error',
  error: 'error',
};

export const DefaultDisabled = Template.bind({});
DefaultDisabled.args = {
  placeholder: 'Search...',
  value: 'Disabled',
  error: '',
  disabled: true,
};

export const DefaultDarkPlaceholder = DarkTemplate.bind({});
DefaultDarkPlaceholder.args = {
  placeholder: 'Search...',
  value: '',
  error: '',
};

export const DefaultDark = DarkTemplate.bind({});
DefaultDark.args = {
  placeholder: 'Search...',
  value: 'Query',
  error: '',
};

export const DefaultDarkError = DarkTemplate.bind({});
DefaultDarkError.args = {
  placeholder: 'Search...',
  value: 'Error',
  error: 'error',
};
