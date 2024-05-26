import React, { memo } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import s from './Checkbox.module.scss';
import { CheckboxCheck } from '@assets/icons';

export interface ICheckbox extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
  disabled?: boolean;
  mixed?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Checkbox: React.FC<ICheckbox> = ({
  label,
  checked,
  onCheckedChange,
  disabled,
  ...props
}) => {
  return (
    <div className={s.wrapper}>
      <RadixCheckbox.Root
        className={s.root}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        checked={checked}
        id={props.id}
      >
        <RadixCheckbox.Indicator>
          <CheckboxCheck className={s.check} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label className={s.label} htmlFor={props.id}>
        {label}
      </label>
    </div>
  );
};

export default memo(Checkbox);
