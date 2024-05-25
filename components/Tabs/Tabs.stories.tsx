import Tabs from './Tabs';

export default {
  title: 'Components/Tabs',
  component: Tabs,
};

const Template = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabs: [
    { label: 'All', href: '/' },
    { label: 'Open', href: '/open' },
    { label: 'Pending', href: '/pending' },
    { label: 'Accepted', href: '/accepted' },
    { label: 'Cancelled', href: '/cancelled' },
  ],
};
