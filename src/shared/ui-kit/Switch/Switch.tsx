import * as RadixSwitch from '@radix-ui/react-switch';
import type { FC, HTMLAttributes } from 'react';

import s from './Switch.module.scss';

type SwitchProps = HTMLAttributes<HTMLButtonElement> & {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const Switch: FC<SwitchProps> = ({ label, checked, onCheckedChange, ...props }) => (
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
