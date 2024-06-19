import Button, { ButtonProps } from './Button';
import { ButtonPlus } from '../../assets/icons';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template = (args: ButtonProps) => <Button {...args}>{args.children}</Button>;

const IconTemplate = (args: ButtonProps) => (
  <Button {...args}>
    <ButtonPlus />
  </Button>
);

const DarkTemplate = (args: ButtonProps) => (
  <div data-theme={'dark'}>
    <Button {...args}>{args.children}</Button>
  </div>
);

const DarkIconTemplate = (args: ButtonProps) => (
  <div data-theme={'dark'}>
    <Button {...args}>
      <ButtonPlus />
    </Button>
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

export const DefaultIconButton = IconTemplate.bind({});
DefaultIconButton.args = {
  children: '',
  variant: 'primary',
  type: 'button',
  disabled: false,
};

export const DefaultDarkIconButton = DarkIconTemplate.bind({});
DefaultDarkIconButton.args = {
  children: '',
  variant: 'primary',
  type: 'button',
  disabled: false,
};
