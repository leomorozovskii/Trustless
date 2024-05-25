import Button, { ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template = (args: ButtonProps) => (
  <Button {...args}>{args.children}</Button>
);

const DarkTemplate = (args: ButtonProps) => (
  <div data-theme={"dark"}>
    <Button {...args}>{args.children}</Button>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
  variant: 'primary',
  type: 'button',
  disabled: false,
};

export const DefaultDisabled = Template.bind({});
DefaultDisabled.args = {
  children: 'Button',
  variant: 'primary',
  type: 'button',
  disabled: true,
};

export const DefaultGhost = Template.bind({});
DefaultGhost.args = {
  children: 'Button',
  variant: 'ghost',
  type: 'button',
  disabled: false,
};

export const DefaultDark = DarkTemplate.bind({});
DefaultDark.args = {
  children: 'Button',
  variant: 'primary',
  type: 'button',
  disabled: false,
};

export const DefaultDarkDisabled = DarkTemplate.bind({});
DefaultDarkDisabled.args = {
  children: 'Button',
  variant: 'primary',
  type: 'button',
  disabled: true,
};
