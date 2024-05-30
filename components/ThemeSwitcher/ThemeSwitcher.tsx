import React from 'react';
import s from './ThemeSwitcher.module.scss';
import { DayIcon, NightIcon } from '@assets/icons';
import cn from 'classnames';
import { useTheme } from '@src/context/theme/ThemeProvider';

const ThemeSwitcher: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className={cn(s.wrapper)}>
      <div
        onClick={() => toggleTheme('light')}
        className={cn(s.item, s.lightItem)}
      >
        <DayIcon className={s.icon} />
      </div>
      <div
        onClick={() => toggleTheme('dark')}
        className={cn(s.item, s.darkItem)}
      >
        <NightIcon className={s.icon} />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
