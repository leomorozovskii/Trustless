import * as RadixSwitch from '@radix-ui/react-switch';
import React from 'react';

import s from './Switch.module.scss';

type SwitchProps = React.HTMLAttributes<HTMLButtonElement> & {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const Switch: React.FC<SwitchProps> = ({ label, checked, onCheckedChange, ...props }) => (
  <div className={s.wrapper}>
    <label className={s.label} htmlFor={props.id}>
      {label}
    </label>
    <RadixSwitch.Root className={s.root} checked={checked} onCheckedChange={onCheckedChange} id={props.id}>
      <RadixSwitch.Thumb className={s.thumb} />
    </RadixSwitch.Root>
  </div>
);

export { Switch };
