import Button, { ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

const Template = (args: ButtonProps) => (
  <Button {...args}>{args.children}</Button>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
};
