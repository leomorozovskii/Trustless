import React, { memo } from 'react';
import classNames from 'classnames';
import s from './Tab.module.scss';

interface TabProps extends React.PropsWithChildren {
  active?: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ children, active = false, onClick }) => {
  const className = classNames(s.container, {
    [s.active]: active,
  });

  return (
    <button className={className} onClick={onClick}>
      <span className={s.label}>{children}</span>
    </button>
  );
};

export default memo(Tab);
