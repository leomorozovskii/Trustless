import cn from 'classnames';
import React from 'react';

import { DayIcon, NightIcon } from '@berezka-dao/shared/icons';

import { useTheme } from './ThemeProvider';
import s from './ThemeSwitcher.module.scss';

const ThemeSwitcher: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className={cn(s.wrapper)}>
      <button aria-label="Change to light" onClick={() => toggleTheme('light')} className={cn(s.item, s.lightItem)}>
        <DayIcon className={s.icon} />
      </button>
      <button aria-label="Change to dark" onClick={() => toggleTheme('dark')} className={cn(s.item, s.darkItem)}>
        <NightIcon className={s.icon} />
      </button>
    </div>
  );
};

export { ThemeSwitcher };
