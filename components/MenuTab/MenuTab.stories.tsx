import MenuTab from './MenuTab';
import { HistoryIcon } from '../../assets/icons';

export default {
  title: 'Components/MenuTab',
  component: MenuTab,
};

const Template = (args) => <MenuTab {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'History',
  icon: <HistoryIcon />,
  href: '#',
};

export const NoIcon = Template.bind({});
NoIcon.args = {
  children: 'History',
  href: '#',
};

export const Active = Template.bind({});
Active.args = {
  children: 'History',
  icon: <HistoryIcon />,
  active: true,
  href: '#',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'History',
  icon: <HistoryIcon />,
  disabled: true,
  href: '#',
};
