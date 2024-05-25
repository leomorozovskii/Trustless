import Checkbox, { ICheckbox } from './Checkbox';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    onCheckedChange: { action: 'checked' },
  },
} as Meta;

const Template: StoryFn<ICheckbox> = (args) => (
  <Checkbox {...args} />
);

const DarkTemplate: StoryFn<ICheckbox> = (args) => (
  <div data-theme={"dark"}>
    <Checkbox {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Default Checkbox',
  checked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  label: 'Checked Checkbox',
  checked: true,
};

export const MixedCheckbox = Template.bind({});
MixedCheckbox.args = {
  label: 'Mixed Checkbox',
  checked: true,
  disabled: false,
  mixed: true,
};
MixedCheckbox.parameters = {
  docs: {
    storyDescription: 'Need to update check icon'
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Checkbox',
  checked: false,
  disabled: true,
};

export const CheckedDisabled = Template.bind({});
CheckedDisabled.args = {
  label: 'Checked Disabled Checkbox',
  checked: true,
  disabled: true,
};

export const DarkThemeDefault = DarkTemplate.bind({});
DarkThemeDefault.args = {
  label: 'Dark Theme Default Checkbox',
  checked: false,
};

export const DarkThemeChecked = DarkTemplate.bind({});
DarkThemeChecked.args = {
  label: 'Dark Theme Checked Checkbox',
  checked: true,
};
MixedCheckbox.parameters = {
  docs: {
    storyDescription: 'Need to update check icon'
  },
};

export const DarkThemeMixedChecked = DarkTemplate.bind({});
DarkThemeMixedChecked.args = {
  label: 'Dark Theme Checked Checkbox',
  mixed: true,
  checked: true,
};
MixedCheckbox.parameters = {
  docs: {
    storyDescription: 'Need to update check icon'
  },
};

export const DarkThemeDisabled = DarkTemplate.bind({});
DarkThemeDisabled.args = {
  label: 'Dark Theme Disabled Checkbox',
  checked: false,
  disabled: true,
};

export const DarkThemeCheckedDisabled = DarkTemplate.bind({});
DarkThemeCheckedDisabled.args = {
  label: 'Dark Theme Checked Disabled Checkbox',
  checked: true,
  disabled: true,
};