import React from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';

import s from './Switch.module.scss';

export interface ISwitch extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Switch: React.FC<ISwitch> = ({ label, checked, onCheckedChange, ...props }) => (
  <div className={s.wrapper}>
    <label className={s.label} htmlFor={props.id}>
      {label}
    </label>
    <RadixSwitch.Root className={s.root} checked={checked} onCheckedChange={onCheckedChange} id={props.id}>
      <RadixSwitch.Thumb className={s.thumb} />
    </RadixSwitch.Root>
  </div>
);

export default Switch;
