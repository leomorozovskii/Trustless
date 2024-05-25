import { Meta, Story } from '@storybook/react';
import { Link, LinkProps } from './';

export default {
  title: 'components/Link',
  component: Link,
} as Meta;

const Template: Story<LinkProps> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
  href: '/next',
  children: 'Следующая страница',
};
