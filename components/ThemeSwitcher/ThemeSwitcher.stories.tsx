import ThemeSwitcher from './ThemeSwitcher';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../../context/theme/ThemeProvider';

export default {
  title: 'Components/ThemeSwitcher',
  component: ThemeSwitcher,
} as Meta;

const Template: StoryFn = () => {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );
};

export const DefaultThemeSwitcher = Template.bind({});
