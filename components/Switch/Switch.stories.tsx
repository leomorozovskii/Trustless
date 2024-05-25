import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Switch, { ISwitch } from './Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    onCheckedChange: { action: 'checked' },
  },
} as Meta;

const Template: StoryFn<ISwitch> = (args) => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Default Switch',
  checked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  label: 'Checked Switch',
  checked: true,
};