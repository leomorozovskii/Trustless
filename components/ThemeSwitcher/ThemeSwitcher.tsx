import React, { useState } from 'react';
import s from './ThemeSwitcher.module.scss';
import { DayIcon, NightIcon } from '@assets/icons';
import cn from 'classnames';

const ThemeSwitcher: React.FC = () => {
  const [isSwitched, setIsSwitched] = useState<boolean>(false);

  return (
    <div
      className={cn(s.wrapper, isSwitched && s.wrapperDark)}>
      <div
        onClick={() => setIsSwitched(false)}
        className={cn(s.item, isSwitched && s.itemDark)}
      >
        <DayIcon
          className={cn(!isSwitched ? s.dayActive : s.day)}
        />
      </div>
      <div
        onClick={() => setIsSwitched(true)}
        className={cn(s.item, isSwitched ? s.darkItem : s.itemNotActive)}
      >
        <NightIcon
          className={cn(isSwitched ? s.nightActive : s.night)}
        />
      </div>
    </div>
  );
}

export default ThemeSwitcher;