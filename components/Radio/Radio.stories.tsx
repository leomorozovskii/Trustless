import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Radio, { IRadio, IRadioOption } from './Radio';

export default {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {
    onChange: { action: 'changed' },
  },
} as Meta;

const options: IRadioOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const Template: StoryFn<IRadio> = (args) => <Radio {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: options,
};

export const WithCheckedOption = Template.bind({});
WithCheckedOption.args = {
  defaultValue: 'option1',
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ],
};

export const WithDisabledOption = Template.bind({});
WithDisabledOption.args = {
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', disabled: true },
    { value: 'option3', label: 'Option 3' },
  ],
};

export const WithDisabledActiveOption = Template.bind({});
WithDisabledActiveOption.args = {
  defaultValue: 'option2',
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', disabled: true },
    { value: 'option3', label: 'Option 3' },
  ],
};
